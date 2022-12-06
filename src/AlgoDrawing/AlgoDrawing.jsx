import React, {Component} from 'react';
import Obstacle from './Obstacle/Obstacle';
import {breadthFirst, getObstaclesShortestPathOrderBFS} from '../SearchAlgorithms/breadthFirst';
import {depthFirst, getObstaclesShortestPathOrderDFS} from '../SearchAlgorithms/depthFirst';
import {randomWalk, getObstaclesShortestPathOrderRW} from '../SearchAlgorithms/randomWalk';
import {randomJump, getObstaclesShortestPathOrderRJ} from '../SearchAlgorithms/randomJump';

import './AlgoDrawing.css';

var LABYRINTH_WIDTH = 5;
const START_OBSTACLE_ROW = 0;
const START_OBSTACLE_COL = 0;
var FINISH_OBSTACLE_ROW = LABYRINTH_WIDTH - 1;
var FINISH_OBSTACLE_COL = LABYRINTH_WIDTH - 1;


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
            labyrinth: newLabyrinth, 
            mouseIsPressed: true,
        });
    }

    handleMouseEnter(row, col) {

        if (!this.state.mouseIsPressed) return;
        const newLabyrinth = getNewLabyrinthWithWallToggled(this.state.labyrinth, row, col);
        this.setState({labyrinth: newLabyrinth});
    }

    handleMouseUp() {

        this.setState({mouseIsPressed: false});
    }

    handleSizeChange(valueChange) {

        if (LABYRINTH_WIDTH === 2 && valueChange === -1) {
            window.alert("Lower size limit reached.")
        } else if (LABYRINTH_WIDTH === 23 && valueChange === 1) {
            window.alert("Upper size limit reached.")
        } else if (LABYRINTH_WIDTH >= 2) {
            LABYRINTH_WIDTH = LABYRINTH_WIDTH + valueChange;
            FINISH_OBSTACLE_COL += valueChange;
            FINISH_OBSTACLE_ROW += valueChange;
            const labyrinth = getInitialLabyrinth();
            this.setState({labyrinth});
        }
    }

    animateAlgorithm(visitedObstaclesOrder, obstaclesShortestPathOrder) {

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
                obstacle.isVisited = true;
            }, 20 * i);
        }
    }

    animateShortestPath(obstaclesShortestPathOrder) {

        for (let i = 0; i < obstaclesShortestPathOrder.length; i++) {

            setTimeout(() => {
                const obstacle = obstaclesShortestPathOrder[i];
                document.getElementById(`obstacle-${obstacle.row}-${obstacle.col}`).className = 'obstacle obstacle-backwards';
                obstacle.isVisited = true;
            }, 40 * i);
        }
    }

    visualizeBreadthFirst() {

        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = breadthFirst(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderBFS(finishObstacle);
        this.animateAlgorithm(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    visualizeDepthFirst() {

        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = depthFirst(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderDFS(finishObstacle);
        this.animateAlgorithm(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    visualizeRandomWalk() {

        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = randomWalk(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderRW(finishObstacle);
        this.animateAlgorithm(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    visualizeRandomJump() {

        const {labyrinth} = this.state;
        const startObstacle = labyrinth[START_OBSTACLE_ROW][START_OBSTACLE_COL];
        const finishObstacle = labyrinth[FINISH_OBSTACLE_ROW][FINISH_OBSTACLE_COL];
        const visitedObstaclesOrder = randomJump(labyrinth, startObstacle, finishObstacle);
        const obstaclesShortestPathOrder = getObstaclesShortestPathOrderRJ(finishObstacle);
        this.animateAlgorithm(visitedObstaclesOrder, obstaclesShortestPathOrder);
    }

    runSelectedAlgorithm(searchAlgo) {
        
        // eslint-disable-next-line
        if (searchAlgo == 1) {
            this.visualizeBreadthFirst();
        // eslint-disable-next-line
        } else if (searchAlgo == 2) {
            this.visualizeDepthFirst();
        // eslint-disable-next-line
        } else if (searchAlgo == 3) {
            this.visualizeBreadthFirst();
        // eslint-disable-next-line
        } else if (searchAlgo == 4) {
            this.visualizeRandomWalk();
        // eslint-disable-next-line
        } else if (searchAlgo == 5) {
            this.visualizeRandomJump();
        } else {
            console.log(searchAlgo)
        }
    }

    resetBoard() {

        const newLabyrinth = this.state.labyrinth;
        for (let row = 0; row < LABYRINTH_WIDTH; row++) {

            for (let col = 0; col < LABYRINTH_WIDTH; col++) {
    
                newLabyrinth[row][col].isVisited = false;
                if (document.getElementById(`obstacle-${row}-${col}`).className === 'obstacle obstacle-backwards' 
                || document.getElementById(`obstacle-${row}-${col}`).className === 'obstacle obstacle-visited') {
                    document.getElementById(`obstacle-${row}-${col}`).className = 'obstacle obstacle-empty';
                }

                
                // newLabyrinth[row][col].className = 'obstacle obstacle-empty';
            }
        }

        this.setState({newLabyrinth});
    }

    render() {
        const {labyrinth, mouseIsPressed} = this.state;

        return (
            <>
                <form>
                    <select id="searchAlgorithm">
                        <option value="1">Breadth-First</option>
                        <option value="2">Depth-First</option>
                        <option value="3">Djikstra's</option>
                        <option value="4">Random Walk</option>
                        <option value="5">Random Jump</option>
                    </select>
                </form>
                <button onClick={() => this.runSelectedAlgorithm(document.getElementById("searchAlgorithm").value)}>
                    Run Selected Algorithm
                </button>
                <button onClick={() => this.handleSizeChange(1)}>
                    Increase Size
                </button>
                <button onClick={() => this.handleSizeChange(-1)}>
                    Reduce Size
                </button>
                <button onClick={() => this.resetBoard()}>
                    Clear Board
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
    for (let row = 0; row < LABYRINTH_WIDTH; row++) {

        const currentRow = [];
        for (let col = 0; col < LABYRINTH_WIDTH; col++) {

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

const getNewLabyrinthWithWallToggled = (labyrinth, row, col) => {

    const newLabyrinth = labyrinth.slice();
    const obstacle = newLabyrinth[row][col];
    const newObstacle = {
        ...obstacle,
        isWall: !obstacle.isWall,
    };
    newLabyrinth[row][col] = newObstacle;
    return newLabyrinth;
};