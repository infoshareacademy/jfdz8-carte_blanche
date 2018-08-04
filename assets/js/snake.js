var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var cells;
var direction;
var apple;
var seconds;
var difficulties = {
    easy: 180,
    medium: 120,
    hard: 60
};
var intervalId;
var timerIntervalId;

var score;
var myBestScore = 0;
var scoreStorage;

var startButton = document.getElementById('button__game--play');
var stopButton = document.getElementById('button__game--reset');

var lastScore = document.getElementById('last-score');
var bestScore = document.getElementById('best-score');


var gameSound = document.getElementById('audio--play');
var eatSound = document.getElementById('eat--play');
var overSound = document.getElementById('over--play');
var volumeOnButton = document.getElementById('speaker--loud');
var volumeOffButton = document.getElementById('speaker--muted');
var allAudios = document.querySelectorAll('audio');

var gameInstruction = document.getElementById('instruction');
var infoButton = document.getElementById('button__info');
var escapeButton = document.getElementById('instruction__escape');

stopButton.addEventListener('click', resetGame);
startButton.addEventListener('click', startGame);

volumeOnButton.addEventListener('click', soundOff);
volumeOffButton.addEventListener('click', soundOn);

infoButton.addEventListener('click', displayInstruction);
escapeButton.addEventListener('click', escapeInstruction);

displayBoard();

function gameOver(score) {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    setTimeout(function () {
        lastScore.innerText = 'Ostatni wynik: ' + score;
        localStorage.setItem('lastScoreStorage', score);
        if (score > myBestScore) {
            bestScore.innerHTML = 'Najlepszy wynik: ' + score;
            myBestScore = score;
            localStorage.setItem('bestScoreStorage', myBestScore);
        }
        alert('GAME OVER! Twój wynik: ' + score);
    }, 0);
    play(overSound); // FIXME - does not play sound
    stop(gameSound);
    startButton.addEventListener('click', startGame);
}

function getLastScoreStorage() {
    if (localStorage.getItem('lastScoreStorage')) {
        scoreStorage = localStorage.getItem('lastScoreStorage');
        lastScore.innerText = 'Ostatni wynik: ' + scoreStorage;
    } else {
        lastScore.innerText = 'Ostatni wynik:';
    }
}

function getBestScoreStorage() {
    if (localStorage.getItem('bestScoreStorage')) {
        myBestScore = localStorage.getItem('bestScoreStorage');
        bestScore.innerHTML = 'Najlepszy wynik: ' + myBestScore;
    } else {
        bestScore.innerHTML = 'Najlepszy wynik:';
    }
}

function resetGame() {
    displayBoard();
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    stop(gameSound);
    infoButton.addEventListener('click', displayInstruction);
    startButton.addEventListener('click', startGame);
}

function startGame() {
    direction = 'right';
    drawApple();

    reset(gameSound);
    play(gameSound);

    startTimer();
    displayGameTime();
    clearInterval(intervalId);
    var selectedDifficulty = document.getElementById('difficulties').value;
    var speed = difficulties[selectedDifficulty];
    intervalId = setInterval(drawSnake, speed);
    escapeInstruction();
    infoButton.removeEventListener('click', displayInstruction);
    startButton.removeEventListener('click', startGame);
}

function displayBoard() {
    ctx.clearRect(0,0, 888, 555);
    score = 0;
    seconds = 10;
    cells = [
        {x: 200, y: 100},
        {x: 220, y: 100},
        {x: 240, y: 100}
    ];
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (i === cells.length - 1) {
            ctx.fillStyle = '#ffad01';
        } else {
            ctx.fillStyle = '#2fbffe';
        }
        ctx.fillRect(cell.x, cell.y, 20, 20);
    }
    displayCurrentScore();
    getLastScoreStorage();
    getBestScoreStorage();
}

function drawSnake() {
    ctx.clearRect(0,0, 888, 555);
    addCell();
    cells.shift();
    var lastCell = cells[cells.length-1];
    if(lastCell.x === apple.x*20 && lastCell.y === apple.y*20) {
        countScore();
        addCell();
        drawApple();
        play(eatSound);
    }
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];

        if (i === cells.length - 1) {
            ctx.fillStyle = '#ffad01';
        } else {
            ctx.fillStyle = '#2fbffe';
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
            gameOver(score);
            resetGame();
            displayBoard();
            ctx.fillStyle = 'rgba(223, 226, 221, 1)'
        }
        ctx.fillRect(cell.x, cell.y, 20, 20);
    }
    var appleImage = new Image();
    appleImage.src = 'assets/images/party.png';
    ctx.drawImage(appleImage, apple.x*20, apple.y*20, 20, 20);
    displayCurrentScore();
}

function drawApple() {
    apple = {x: Math.floor(Math.random()*39), y: Math.floor(Math.random()*24)};
    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        if (apple.x*20 === cell.x && apple.y*20 === cell.y) {
            drawApple();
        }
    }
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
    displayGameTime();
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

function startTimer() {
    seconds = 60;
    clearInterval(timerIntervalId);
    timerIntervalId = setInterval(function decrementSeconds() {
        seconds -= 1;
        if (seconds === 0) {
            gameOver(score);
            resetGame();
            clearInterval(timerIntervalId);
        }
    }, 1000);
}

function displayGameTime() {
    ctx.fillStyle = '#016db5';
    ctx.fillText("CZAS: " + parseInt(seconds) + 's', 720, 40);
}

function countScore() {
    score += 5;
}

function displayCurrentScore() {
    ctx.fillStyle = '#016db5';
    ctx.fillText("PUNKTY: " + score, 40, 40);
}

function mute(elem) {
    elem.muted = true;
}

function unmute(elem) {
    elem.muted = false;
}

function play(audio) {
    audio.play();
}

function stop(audio) {
    audio.pause()
}

function reset(audio) {
    audio.currentTime = 0
}

function soundOff() {
    allAudios.forEach(muted => mute(muted));
    volumeOnButton.style.display = 'none';
    volumeOffButton.style.display = 'inline';
}

function soundOn() {
    allAudios.forEach(audio => unmute(audio));
    volumeOnButton.style.display = 'inline';
    volumeOffButton.style.display = 'none';
}

function displayInstruction() {
    gameInstruction.style.display = 'block';
}

function escapeInstruction() {
    gameInstruction.style.display = 'none'
}
