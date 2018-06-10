
// var snake = (function () {
    // var arena = document.getElementById('arena');
    // var scoreCointainer = document.getElementById('score');
var SIZE_X = 10
var SIZE_Y = 10
    var score = 0;
    var fruit = getFruitPosition();
    function getFruitPosition() {
        return {x:Math.floor(Math.random()*10), y:Math.floor(Math.random()*10)}
    }

    var playerPosition = {
        x: 0,
        y: 0,
        dirX: 1,
        dirY: 0
    };

    function createArena(sizeY, sizeX) {
        return Array(sizeY).fill(0).map(function(element) {
            return Array(sizeX).fill('')
        })
    }

    var moves = {
        ArrowRight: function () {
            playerPosition.x += 1
        },
        ArrowLeft: function () {
            playerPosition.x -= 1
        },
        ArrowUp: function () {
            playerPosition.y -= 1
        },
        ArrowDown: function () {
            playerPosition.y += 1
        }
    };
    var pressedKey = '';
    window.addEventListener('keydown', function (event) {
        pressedKey = event.code;
        moves[pressedKey]();
        step();
        console.log(pressedKey)
    });

    function step() {
        if (playerPosition.x >= SIZE_X || playerPosition.y >= SIZE_Y || playerPosition.x < 0 || playerPosition.y < 0) {
            gameOver();
            return
        }
        var arena = createArena(SIZE_Y, SIZE_X);
        arena[fruit.y][fruit.x] = 'o';
        arena[playerPosition.y][playerPosition.x] = 'X';
        console.table(arena);
    }

    function gameOver() {
        alert('GAME OVER, GO HOME!')
    }


// })();