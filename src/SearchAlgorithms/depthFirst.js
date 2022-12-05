export function depthFirst(labyrinth, startObstacle, finishObstacle) {

    const visitedObstaclesOrder = [];
    const toBeVisitedOrder = [startObstacle];
    while (toBeVisitedOrder.length > 0) {

        
        const nextObstacle = toBeVisitedOrder.pop();
        
        if (nextObstacle.isWall) continue;
        nextObstacle.isVisited = true;
        
        for (const neighbor of getUnvisitedNeighbors(nextObstacle, labyrinth)) {
            toBeVisitedOrder.push(neighbor);
        }

        visitedObstaclesOrder.push(nextObstacle);
        if (nextObstacle === finishObstacle) return visitedObstaclesOrder;
    }
}

function getUnvisitedNeighbors(obstacle, labyrinth) {

    const neighbors = [];
    const {row, col} = obstacle;
    if (row > 0) neighbors.push(labyrinth[row - 1][col]);
    if (col > 0) neighbors.push(labyrinth[row][col - 1]);
    if (row < labyrinth.length - 1) neighbors.push(labyrinth[row + 1][col]);
    if (col < labyrinth[0].length - 1) neighbors.push(labyrinth[row][col + 1]);
    const testNeighbors = neighbors.filter(neighbor => !neighbor.isVisited);
    for (const neighbor of testNeighbors) {
        console.log(neighbor);
        console.log(neighbor.isVisited);
        neighbor.previousObstacle = obstacle;
    }
    return neighbors;
}

export function getObstaclesShortestPathOrderDFS(finishObstacle) {
    const obstaclesShortestPathOrder = [];
    let currentObstacle = finishObstacle;
    var count = 0;
    while (currentObstacle !== null) {
        
        obstaclesShortestPathOrder.unshift(currentObstacle);
        currentObstacle = currentObstacle.previousObstacle;
        if (count > 100) {
            break;
        }
        count++;
    }
    return obstaclesShortestPathOrder;
}

/*
export function depthFirst(labyrinth, startObstacle, finishObstacle) {
    const visitedObstaclesOrder = [];
    const toBeVisited = [];
    const unvisitedObstacles = getAllObstacles(labyrinth);
    toBeVisited.push(unvisitedObstacles.shift());  // First unvisited obstacle is the starting tile at (0, 0)
    while (toBeVisited.length > 0) {
        const nextObstacle = toBeVisited.shift();
        if(nextObstacle.isWall) continue;
        nextObstacle.isVisited = true;
        visitedObstaclesOrder.push(nextObstacle);
        if (nextObstacle === finishObstacle) return visitedObstaclesOrder;
        for (const obstacle in updateToBeVisited(nextObstacle, labyrinth)) {
            toBeVisited.unshift(obstacle);
        }
    }
}

function updateToBeVisited(obstacle, labyrinth) {
    const toBeVisited = getToBeVisited(obstacle, labyrinth);
    for (const neighbor of toBeVisited) {
        neighbor.previousObstacle = obstacle;
    }
    return toBeVisited;
}

function getToBeVisited(obstacle, labyrinth) {
    const neighbors = [];
    const {row, col} = obstacle;
    if (row > 0) neighbors.push(labyrinth[row - 1][col]);
    if (col > 0) neighbors.push(labyrinth[row][col - 1]);
    if (row < labyrinth.length - 1) neighbors.push(labyrinth[row + 1][col]);
    if (col < labyrinth[0].length - 1) neighbors.push(labyrinth[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllObstacles(labyrinth) {
    const obstacles = [];
    for (const row of labyrinth) {
        for (const obstacle of row) {
            obstacles.push(obstacle);
        }
    }
    return obstacles;
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
*/