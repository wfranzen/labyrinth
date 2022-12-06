import React, {Component} from 'react';

import './Obstacle.css';

export default class Obstacle extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render() {
        const {
            col,
            row,
            isFinish, 
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        const decideSequenceSpot = isFinish ? 'obstacle-finish' : isStart ? 'obstacle-start' : isWall ? 'obstacle-wall' : '';

        return (
            <div
            id={`obstacle-${row}-${col}`}
            className={`obstacle ${decideSequenceSpot}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}
            ></div>
        );
    }

}