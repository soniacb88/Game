window.onload = function () {
    document.getElementById("juego").onclick = function () {
        Game.sound()
    }

    document.getElementById("start-button").onclick = function () {
        Game.status = 2
        Game.sound()
        Game.init()
        //     let canvas = document.getElementById("canvas");
        //     startGame(canvas);

        // };

        // function startGame(canvas) {
        //     let game = new Game(canvas)
        //     game.init();
        // }
    }
}

// window.onload = function () {
//     Game.init()
// }