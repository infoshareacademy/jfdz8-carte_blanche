var canvas = document.getElementById('myCanvas');
var play = document.getElementById('play');
var scoresContainer = document.getElementById('scores-container');
var bestScoreContainer = document.getElementById('best-score');
var ctx = canvas.getContext('2d');
var appleX = randomizeApple();
var appleY = randomizeApple();
var appleLocation = {x:appleX, y:appleY};
var tileSize = 10;
var direction;
var snake;
var intervalId;
var score;
var bestScore = 0;

function snakeLength() {
    var length = 4;
    snake = [];
    for (var i = 0; i<length; i++) {
        snake.push({x:i, y:0});
    }
}

function drawSnake(x, y) {
    ctx.beginPath();
    ctx.rect(x*tileSize, y*tileSize, tileSize, tileSize);
    ctx.fillStyle = "#dd1817";
    ctx.fill();
    ctx.closePath();
}

function drawApple() {
    ctx.beginPath();
    ctx.rect(appleLocation.x, appleLocation.y, tileSize, tileSize);
    ctx.fillStyle = "#3a3fdd";
    ctx.fill();
    ctx.closePath();
}

function randomizeApple() {
    return Math.floor(Math.random()*10)*50
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode === 39 && direction !== 'left') {
        direction = 'right';
    } else if (e.keyCode === 37 && direction !== 'right') {
        direction = 'left';
    } else if (e.keyCode === 38 && direction !== 'down') {
        direction = 'up';
    } else if (e.keyCode === 40 && direction !== 'up') {
        direction = 'down';
    }
}

function controlSnake() {
    if (direction === 'left') {
        snake.push({x:snake[snake.length-1].x-1, y:snake[snake.length-1].y});
        snake.shift();
    } else if (direction === 'up') {
        snake.push({x:snake[snake.length-1].x, y:snake[snake.length-1].y-1});
        snake.shift();
    } else if (direction === 'down') {
        snake.push({x:snake[snake.length-1].x, y:snake[snake.length-1].y+1});
        snake.shift();
    } else {
        snake.push({x:snake[snake.length-1].x+1, y:snake[snake.length-1].y});
        snake.shift();
    }
    for (var i=0; i<snake.length; i++) {
        drawSnake(snake[i].x, snake[i].y);
    }
}

function elongateSnake() {
    var snakeX = snake[snake.length-1].x;
    var snakeY = snake[snake.length-1].y;
    if (appleX/10 === snakeX && appleY/10 === snakeY) {
        switch(direction) {
            case "left":
                snake.push({x:snake[snake.length-1].x-1, y:snake[snake.length-1].y});
                break;
            case "right":
                snake.push({x:snake[snake.length-1].x+1, y:snake[snake.length-1].y});
                break;
            case "up":
                snake.push({x:snake[snake.length-1].x, y:snake[snake.length-1].y-1});
                break;
            case "down":
                snake.push({x:snake[snake.length-1].x, y:snake[snake.length-1].y+1});
                break;
        }
        appleX = randomizeApple();
        appleY = randomizeApple();
    }
    appleLocation = {x:appleX, y:appleY};
}

function collideWall() {
    if (snake[snake.length-1].x < 0 ||
        snake[snake.length-1].y < 0 ||
        snake[snake.length-1].x > 50 ||
        snake[snake.length-1].y > 50) {
        gameOver()
    }
}

function collideSelf() {
    for (i=2; i<snake.length; i++) {
        if (snake[snake.length-1].x === snake[snake.length-i].x &&
            snake[snake.length-1].y === snake[snake.length-i].y) {
            gameOver()
        }
    }
}

function gameOver() {
    clearInterval(intervalId);
    direction = 'right';
    getScore();
    updateBestScore();
    setInterval(alert('GAME OVER'), 0);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controlSnake();
    elongateSnake();
    drawApple();
    collideWall();
    collideSelf();
}

function start() {
    clearInterval(intervalId);
    appleX = randomizeApple();
    appleY = randomizeApple();
    drawApple();
    snakeLength();
    intervalId = setInterval(draw, 100);
}

function getScore() {
    score = snake.length - 4;
    var currentScore = document.createElement('li');
    currentScore.innerHTML = score;
    scoresContainer.appendChild(currentScore);
}

function updateBestScore() {
    if (score > bestScore) {
        bestScoreContainer.innerHTML = score;
        bestScore = score;
    }
}

play.addEventListener('click', start);

// intervalId = setInterval(draw, 100);
// setTimeout(function () {
//     clearInterval(intervalId);
//     intervalId = setInterval(draw, 70);
// }, 20000);
// setTimeout(function () {
//     clearInterval(intervalId);
//     intervalId = setInterval(draw, 40);
// }, 50000);