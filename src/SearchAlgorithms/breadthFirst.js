// NOTE: This algorithm is actually Djiksta's but given equal distance between every obstacle in the labyrinth,
// it functions identically to Breadth First Search. That is also why the Djikstra file is commented out.

export function breadthFirst(labyrinth, startObstacle, finishObstacle) {

    const visitedObstaclesOrder = [];
    startObstacle.distance = 0;
    const unvisitedObstacles = getAllObstacles(labyrinth);
    while (unvisitedObstacles.length > 0) {

        sortObstaclesByDistance(unvisitedObstacles);
        const closestObstacle = unvisitedObstacles.shift();
        if (closestObstacle.isWall) continue;
        if (closestObstacle.distance === Infinity) {

            window.alert("No possible solution.")
            return visitedObstaclesOrder; 
        }
        closestObstacle.isVisited = true;
        visitedObstaclesOrder.push(closestObstacle);
        if (closestObstacle === finishObstacle) {

            return visitedObstaclesOrder
        };
        
        updateUnvisitedNeighbors(closestObstacle, labyrinth);
    }
}

function sortObstaclesByDistance(unvisitedObstacles) {

    unvisitedObstacles.sort((obstacleA, obstacleB) => obstacleA.distance - obstacleB.distance);
}

function updateUnvisitedNeighbors(obstacle, labyrinth) {

    const unvisitedNeighbors = getUnvisitedNeighbors(obstacle, labyrinth);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = obstacle.distance + 1;
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

export function getObstaclesShortestPathOrderBFS(finishObstacle) {

    const obstaclesShortestPathOrder = [];
    let currentObstacle = finishObstacle;
    while (currentObstacle !== null) {

        obstaclesShortestPathOrder.unshift(currentObstacle);
        currentObstacle = currentObstacle.previousObstacle;
    }
    return obstaclesShortestPathOrder;
}