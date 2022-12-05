import React, {Component} from 'react';
import Obstacle from './Obstacle/Obstacle';
import {breadthFirst, getObstaclesShortestPathOrderBFS} from '../SearchAlgorithms/breadthFirst';
import {depthFirst, getObstaclesShortestPathOrderDFS} from '../SearchAlgorithms/depthFirst';
import {randomWalk, getObstaclesShortestPathOrderRW} from '../SearchAlgorithms/randomWalk';

import './AlgoDrawing.css';

const START_OBSTACLE_ROW = 0;
const START_OBSTACLE_COL = 0;
const FINISH_OBSTACLE_ROW = 13;
const FINISH_OBSTACLE_COL = 13;

export default class AlgoDrawing extends Component {

    constructor() {
        super();
        this.state = {
            labyrinth: [],
            mouseIsPressed: false,
        };
    }

    componentDidMount() {
        const labyrinth = getInitialLabyrinth();
        this.setState({labyrinth});
    }

    handleMouseDown(row, col) {
        const newLabyrinth = getNewLabyrinthWithWallToggled(this.state.labyrinth, row, col);
        this.setState({
            labyinth: newLabyrinth, 
            mouseIsPressed: true,
        });
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newLabyrinth = getNewLabyrinthWithWallToggled(this.state.labyrinth, row, col);
        this.setState({labyinth: newLabyrinth});
    }

    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    animateBreadthFirst(visitedObstaclesOrder, obstaclesShortestPathOrder) {
        for (let i = 0; i <= visitedObstaclesOrder.length; i++) {
            if (i === visitedObstaclesOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(obstaclesShortestPathOrder);
                }, 20 * i);
                return;
            }
            setTimeout(() => {
                const obstacle = visitedObstaclesOrder[i];
                document.getElementById(`obstacle-${obstacle.row}-${obstacle.col}`).className = 'obstacle obstacle-visited';
            }, 20 * i);
        }
    }

    animateShortestPath(obstaclesShortestPathOrder) {
        for (let i = 0; i < obstaclesShortestPathOrder.length; i++) {
            setTimeout(() => {
                const obstacle = obstaclesShortestPathOrder[i];
                document.getElementById(`obstacle-${obstacle.row}-${obstacle.col}`).className = 'obstacle obstacle-backwards';
            }, 40 * i);
        }
    }

    visualizeBreadthFirst() {
        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = breadthFirst(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderBFS(finishObstacle);
        this.animateBreadthFirst(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    visualizeDepthFirst() {
        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = depthFirst(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderDFS(finishObstacle);
        this.animateBreadthFirst(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    visualizeRandomWalk() {
        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = randomWalk(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderRW(finishObstacle);
        this.animateBreadthFirst(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    render() {
        const {labyrinth, mouseIsPressed} = this.state;

        return (
            <>
                <button onClick={() => this.visualizeBreadthFirst()}>
                    Search Using Breadth-First
                </button>
                <button onClick={() => this.visualizeBreadthFirst()}>
                    Search Using Djikstra's
                </button>
                <button onClick={() => this.visualizeDepthFirst()}>
                    Search Using Depth-First
                </button>
                <button onClick={() => this.visualizeRandomWalk()}>
                    Search Using Random Walk
                </button>
                <div className="labyrinth"> 
                    {labyrinth.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((obstacle, obstacleIdx) => {
                                    const {row, col, isStart, isFinish, isWall} = obstacle;
                                    return (
                                        <Obstacle
                                            key={obstacleIdx}
                                            col={col}
                                            isStart={isStart}
                                            isFinish={isFinish}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) => 
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}
                                        ></Obstacle>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

}

const getInitialLabyrinth = () => {
    const labyrinth = [];
    for (let row = 0; row < 15; row++) {
        const currentRow = [];
        for (let col = 0; col < 15; col++) {
            currentRow.push(createObstacle(col, row));
        }
        labyrinth.push(currentRow);
    }
    return labyrinth;
};

const createObstacle = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_OBSTACLE_ROW && col === START_OBSTACLE_COL,
        isFinish: row === FINISH_OBSTACLE_ROW && col === FINISH_OBSTACLE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousObstacle: null,
    };
};

const getNewLabyrinthWithWallToggled = (labyinth, row, col) => {
    const newLabyrinth = labyinth.slice();
    const obstacle = newLabyrinth[row][col];
    const newObstacle = {
        ...obstacle,
        isWall: !obstacle.isWall,
    };
    newLabyrinth[row][col] = newObstacle;
    return newLabyrinth;
};


/**
import React, {Component} from 'react';
import Obstacle from './Obstacle/Obstacle';

import './AlgoDrawing.css';

export default class AlgoDrawing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            obstacles: [],
        };
    }

    componentDidMount() {
        const obstacles = [];
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col =0; col < 15; col++) {
                const currentObstacle = {
                    col,
                    row,
                    isStart: row == 1 && col == 1,
                    isFinish: row == 13 && col == 13,
                };
                currentRow.push(currentObstacle);
            }
            obstacles.push(currentRow);
        }
        this.setState({obstacles});
    }

    render() {
        const {obstacles} = this.state;
        console.log(obstacles)

        return (
            <div className="labyrinth"> 
                {obstacles.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((obstacle, obstacleIdx) => {
                                const {isStart, isFinish} = obstacle;
                                return (
                                    <Obstacle
                                        key={obstacleIdx}
                                        isStart={isStart}
                                        isFinish={isFinish}
                                        test={'foo'}
                                        test2={'bar'}
                                    >
                                    </Obstacle>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

 */