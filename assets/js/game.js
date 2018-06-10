
// var snake = (function () {
    // var arena = document.getElementById('arena');
    // var scoreCointainer = document.getElementById('score');
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
        var arena = createArena(10, 10);
        arena[fruit.y][fruit.x] = 'o';
        arena[playerPosition.y][playerPosition.x] = 'X';
        console.table(arena)
    }

// })();