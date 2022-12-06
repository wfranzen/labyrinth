export function depthFirst(labyrinth, startObstacle, finishObstacle) {

    const visitedObstaclesOrder = [];
    const toBeVisitedOrder = [startObstacle];
    while (toBeVisitedOrder.length > 0) {

        
        const nextObstacle = toBeVisitedOrder.pop();
        if (nextObstacle === finishObstacle) return visitedObstaclesOrder;
        if (nextObstacle.isWall) continue;
        nextObstacle.isVisited = true;
        
        for (const neighbor of getUnvisitedNeighbors(nextObstacle, labyrinth)) {

            if (toBeVisitedOrder.indexOf(neighbor) === -1 && !neighbor.isVisited) { 
                toBeVisitedOrder.push(neighbor); 
            }
        }

        visitedObstaclesOrder.push(nextObstacle);
    }

    if (toBeVisitedOrder.length === 0) {
        window.alert("No possible solution.")
        return visitedObstaclesOrder;
    }
}

function getUnvisitedNeighbors(obstacle, labyrinth) {

    const neighbors = [];
    const {row, col} = obstacle;
    //  The IF statements create the DFS priorities respectively --> UP, RIGHT, DOWN, LEFT
    if (row > 0) neighbors.push(labyrinth[row - 1][col]);
    if (col > 0) neighbors.push(labyrinth[row][col - 1]);
    if (row < labyrinth.length - 1) neighbors.push(labyrinth[row + 1][col]);
    if (col < labyrinth[0].length - 1) neighbors.push(labyrinth[row][col + 1]);

    const testNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of testNeighbors) {
        
        neighbor.previousObstacle = obstacle;
    }
    return neighbors;
}

export function getObstaclesShortestPathOrderDFS(finishObstacle) {
    const obstaclesShortestPathOrder = [];
    let currentObstacle = finishObstacle;
    while (currentObstacle !== null) {
        
        obstaclesShortestPathOrder.unshift(currentObstacle);
        currentObstacle = currentObstacle.previousObstacle;
    }
    return obstaclesShortestPathOrder;
}