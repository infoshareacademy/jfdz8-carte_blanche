var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var cells, direction, apple, score;
var seconds;
var intervalId;
var timerIntervalId;
var startButton = document.getElementById('button__game--play');
var stopButton = document.getElementById('button__game--reset');
var difficulties = {
    easy: 180,
    medium: 120,
    hard: 60
};

displayBoard();

stopButton.addEventListener('click', function () {
    displayBoard();
    clearInterval(intervalId);
});

startButton.addEventListener('click', function () {
    initGame();
    snakeTimer();
    displayGameTime();
    clearInterval(intervalId);
    var selectedDifficulty = document.getElementById('difficulties').value;
    var speed = difficulties[selectedDifficulty];
    intervalId = setInterval(drawSnake, speed);
});

function snakeTimer() {
    timerIntervalId = setInterval(function decrementSeconds() {
        seconds -= 1;
        displayGameTime();
        if (seconds === 0) {
            gameOver();
            clearInterval(timerIntervalId);
        }
    }, 1000);
}


function gameOver() {
    clearInterval(intervalId);
    setTimeout(function () {
        alert('GAME OVER! Twój wynik: ' + score)
    }, 0);
}

document.addEventListener('keydown', function (e) {
    var keyCode = e.keyCode;
    if(keyCode === 37 && direction !== 'right') {
        direction = 'left';
    }
    if(keyCode === 38 && direction !== 'down') {
        direction = 'up';
    }
    if(keyCode === 39 && direction !== 'left') {
        direction = 'right';
    }
    if(keyCode === 40 && direction !== 'up') {
        direction = 'down';
    }
});

function drawApple() {
    apple = {x: Math.floor(Math.random()*39), y: Math.floor(Math.random()*24)};
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (apple.x*20 === cell.x && apple.y*20 === cell.y) {
            drawApple()
        }
    }
}

function drawSnake() {
    ctx.clearRect(0,0, 888, 555);
    addCell();
    cells.shift();
    var lastCell = cells[cells.length-1];
    if(lastCell.x === apple.x*20 && lastCell.y === apple.y*20) {
        score +=5;
        addCell();
        drawApple()
    }
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];

        if (i === cells.length - 1) {
            ctx.fillStyle = '#fff451';
        } else {
            ctx.fillStyle = '#1c7aa7';
        }

        if (cell.x > 780) {
            cell.x = 0;
        }
        if (cell.x < 0) {
            cell.x = 780;
        }
        if (cell.y > 480) {
            cell.y = 0;
        }
        if (cell.y < 0) {
            cell.y = 480;
        }
        if(i < cells.length-2 && cell.x === lastCell.x && cell.y === lastCell.y) {
            gameOver()
        }
        ctx.fillRect(cell.x, cell.y, 20, 20);
    }
    var appleImage = new Image();
    appleImage.src = 'assets/images/party.png';
    ctx.drawImage(appleImage, apple.x*20, apple.y*20, 20, 20);
    displayCurrentScore();
}

function addCell() {
    var lastCell = cells[cells.length-1];
    if (direction === 'right') {
        cells.push({x: lastCell.x + 20, y: lastCell.y})
    }
    if (direction === 'down') {
        cells.push({x: lastCell.x, y: lastCell.y + 20})
    }
    if (direction === 'left') {
        cells.push({x: lastCell.x - 20, y: lastCell.y})
    }
    if (direction === 'up') {
        cells.push({x: lastCell.x, y: lastCell.y - 20})
    }
}

function initGame() {
    direction = 'right';
    drawApple();
}

function displayCurrentScore() {
    ctx.fillStyle = '#1c7aa7';
    ctx.fillText("PUNKTY: " + score, 40, 40);
}

function displayGameTime() {
    ctx.fillStyle = '#1c7aa7';
    ctx.fillText("CZAS: " + seconds + 's', 720, 40);
}

function displayBoard() {
    ctx.clearRect(0,0, 888, 555);
    score = 0;
    seconds = 60;
    cells = [
        {x: 200, y: 100},
        {x: 220, y: 100},
        {x: 240, y: 100}
    ];
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (i === cells.length - 1) {
            ctx.fillStyle = '#fff451';
        } else {
            ctx.fillStyle = '#1c7aa7';
        }
        ctx.fillRect(cell.x, cell.y, 20, 20);
    }
    displayCurrentScore();
    displayGameTime();
}
