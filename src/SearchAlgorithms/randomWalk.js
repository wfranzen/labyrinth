export function randomWalk(labyrinth, startObstacle, finishObstacle) {
    const visitedObstaclesOrder = [];
    startObstacle.distance = 0;  // DISTANCE NOT NECESSARY
    const unvisitedObstacles = getAllObstacles(labyrinth);
    while (unvisitedObstacles.length > 0) {
        sortObstaclesByDistance(unvisitedObstacles);  // DISTANCE NOT NECESSARY
        shuffleOrder(unvisitedObstacles);
        const closestObstacle = unvisitedObstacles.shift();  // DISTANCE NOT NECESSARY
        if (closestObstacle.isWall) continue;

        closestObstacle.isVisited = true;
        visitedObstaclesOrder.push(closestObstacle);
        if (closestObstacle === finishObstacle) return visitedObstaclesOrder;
        updateUnvisitedNeighbors(closestObstacle, labyrinth);
    }
}

function sortObstaclesByDistance(unvisitedObstacles) {
    unvisitedObstacles.sort((obstacleA, obstacleB) => obstacleA.distance - obstacleB.distance);
}

function updateUnvisitedNeighbors(obstacle, labyrinth) {
    const unvisitedNeighbors = getUnvisitedNeighbors(obstacle, labyrinth);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = obstacle.distance + 1;  // DISTANCE NOT NECESSARY
        neighbor.previousObstacle = obstacle;
    }
}

function getUnvisitedNeighbors(obstacle, labyrinth) {
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

export function getObstaclesShortestPathOrderRW(finishObstacle) {
    const obstaclesShortestPathOrder = [];
    let currentObstacle = finishObstacle;
    while (currentObstacle !== null) {
        obstaclesShortestPathOrder.unshift(currentObstacle);
        currentObstacle = currentObstacle.previousObstacle;
        console.log("Test");
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