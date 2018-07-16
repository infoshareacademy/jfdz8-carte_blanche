var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var cells;
var direction;
var apple;
var score;
var seconds;

var difficulties = {
    easy: 180,
    medium: 120,
    hard: 60
};

var intervalId;
var timerIntervalId;

var startButton = document.getElementById('button__game--play');
var stopButton = document.getElementById('button__game--reset');

var playSound = document.getElementById('audio--play');
var eatSound = document.getElementById('eat--play');
var overSound = document.getElementById('over--play');
var volumeOnButton = document.getElementById('speaker--loud');
var volumeOffButton = document.getElementById('speaker--muted');
var allAudios = document.querySelectorAll('audio');
var muteOff;
var muteOn;
var speakerLoud = document.getElementById('speaker--loud');
var speakerMuted = document.getElementById('speaker--muted');

displayBoard();

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

var snakeMute = function (elem) {
    elem.muted = true;
    elem.pause();
    elem.currentTime = 0;
};

var snakeSound = function (audio) {
    audio.play();
    /* todo nie działa ani w czasie gry, ani po naciśnięciu STOP / START */
    /* audio.muted = false;
    todo ? pojawiają się dźwięki eat i over na snakeMute; uruchamia wszystkie dźwięna na 'click' speakerMuted
    */
};

function soundOff() {
    allAudios.forEach(muted => snakeMute(muted));
    muteOff = volumeOnButton.style.display = 'none';
    muteOn = volumeOffButton.style.display = 'inline';
}

function soundOn() {
    allAudios.forEach(audio=> snakeSound(audio));
    muteOff = volumeOnButton.style.display = 'inline';
    muteOn = volumeOffButton.style.display = 'none';
}

speakerLoud.addEventListener('click', soundOff);
speakerMuted.addEventListener('click', soundOn);
/* todo ? zmienia obrazek, nie włącza dźwięku*/

stopButton.addEventListener('click', function () {
    displayBoard();
    clearInterval(intervalId);
    snakeMute(playSound);
    snakeMute(playSound);
});

startButton.addEventListener('click', function () {
    direction = 'right';
    drawApple();
    snakeSound(playSound);
    snakeTimer();
    displayGameTime();
    clearInterval(intervalId);
    var selectedDifficulty = document.getElementById('difficulties').value;
    var speed = difficulties[selectedDifficulty];
    intervalId = setInterval(drawSnake, speed);
});

function gameOver() {
    clearInterval(intervalId);
    setTimeout(function () {
        alert('GAME OVER! Twój wynik: ' + score)
    }, 0);
    snakeSound(overSound);
    snakeMute(playSound);
}

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
        drawApple();
        snakeSound(eatSound);
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
            gameOver();
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

function displayCurrentScore() {
    ctx.fillStyle = '#1c7aa7';
    ctx.fillText("PUNKTY: " + score, 40, 40);
}

function displayGameTime() {
    ctx.fillStyle = '#1c7aa7';
    ctx.fillText("CZAS: " + seconds + 's', 720, 40);
}
