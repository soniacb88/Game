const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    playerKeys: {
        TOP_KEY: 38,
        SPACE: 32
    }

    ,
    // score: 0,

    init: function () {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.start();
    },

    start: function () {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;

            this.clear();
            this.drawAll();
            this.moveAll();

            if (this.framesCounter > 1000) this.framesCounter = 0;
            this.clearObstacles()
            if (this.framesCounter % 150 == 0) {

                this.generateObstacles()

            }
            //   if(this.framesCounter % 100 === 0) this.score++;
            //   if(this.isCollision()) this.gameOver()

        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 250, 300, './images/3divers.png', this.width, this.height, this.playerKeys);
        this.obstacles = [];
        // ScoreBoard.init(this.ctx, this.score)
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll: function () {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.obstacles.forEach(obstacle => {
            obstacle.draw()

        });
        // ScoreBoard.draw(this.score)
    },

    moveAll: function () {
        this.background.move()
        this.player.move()
        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
        // },


    },

    generateObstacles: function () {
        this.obstacles.push(new Obstacle(this.ctx, 200, 200, this.width, Math.floor(Math.random() * (800 - 200) + 200)))

    },

    // isCollision: function() {
    //     // colisiones genéricas
    //     // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    //     return this.obstacles.some(obs => (this.bullets.posX + this.bullets.width > obs.posX && obs.posX + obs.width > this.bullets.posX && this.bullets.posY + this.bullets.height > obs.posY && obs.posY + obs.height > this.bullets.posY ))
    //   },


    clearObstacles: function () {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= 0))
    }
}