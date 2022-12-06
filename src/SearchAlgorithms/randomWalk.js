export function randomWalk(labyrinth, startObstacle, finishObstacle) {

    const visitedObstaclesOrder = [];
    const toBeVisitedOrder = [startObstacle];
    while (toBeVisitedOrder.length > 0) {

        shuffleOrder(toBeVisitedOrder);
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
        console.log(neighbor);
        
        neighbor.previousObstacle = obstacle;
    }
    return neighbors;
}

export function getObstaclesShortestPathOrderRW(finishObstacle) {
    const obstaclesShortestPathOrder = [];
    let currentObstacle = finishObstacle;
    while (currentObstacle !== null) {
        
        obstaclesShortestPathOrder.unshift(currentObstacle);
        currentObstacle = currentObstacle.previousObstacle;
    }
    return obstaclesShortestPathOrder;
}

function shuffleOrder(obstacleArray) {

    for (let i = obstacleArray.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [obstacleArray[i], obstacleArray[j]] = [obstacleArray[j], obstacleArray[i]];
    }
}

/*export function randomWalk(labyrinth, startObstacle, finishObstacle) {
    
    const unvisitedObstacles = [labyrinth[0][0]];
    while (unvisitedObstacles.length > 0) {

        shuffleOrder(unvisitedObstacles);
        const nextObstacle = unvisitedObstacles.shift();
        if (nextObstacle.isWall) continue;
        nextObstacle.isVisited = true;
    }
}

function updateUnvisitedNeighbors(obstacle, labyrinth) {

    const unvisitedNeighbors = getUnvisitedNeighbors(obstacle, labyrinth);
    for (const neighbor of unvisitedNeighbors) {

        neighbor.previousObstacle = obstacle;
    }
}

function getUnvisitedNeighbors(labyrinth, obstacle) {

    const neighbors = [];
    const {row, col} = obstacle;
    if (row > 0) neighbors.push(labyrinth[row - 1][col]);
    if (col > 0) neighbors.push(labyrinth[row][col - 1]);
    if (row < labyrinth.length - 1) neighbors.push(labyrinth[row + 1][col]);
    if (col < labyrinth[0].length - 1) neighbors.push(labyrinth[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function shuffleOrder(obstacleArray) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
*/