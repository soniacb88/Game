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
    },
    score: 0,
    life: 1,

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
            if (this.framesCounter % 200 == 0) {

                this.generateObstacles()

            }

            this.isCollision()
            this.isCollisionDiver()

        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 150, 250, './images/3divers.png', this.width, this.height, this.playerKeys);
        this.obstacles = [];
        this.bullets = [];
        Score.init(this.ctx, this.score)
        Life.init(this.ctx, this.life)
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
        Score.draw(this.score)
        Life.draw(this.life)
    },

    moveAll: function () {
        this.background.move()
        this.player.move()
        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })



    },

    generateObstacles: function () {
        this.obstacles.push(new Obstacle(this.ctx, 150, 150, this.width, Math.floor(Math.random() * (750 - 100) + 100)))

    },
    gameOver: function () {
        clearInterval(this.interval)
    },

    isCollision: function () {
        this.player.bullets.forEach((bullet) => this.obstacles.forEach((obstacle) => {
            if (bullet.posX > obstacle.posX && bullet.posY > obstacle.posY) {

                let index = this.obstacles.indexOf(obstacle);
                if (index > -1) {
                    this.obstacles.splice(index, 1);
                }
                this.score++
            }
        }))
    },

    isCollisionDiver: function () {
        this.obstacles.forEach((obstacle) => {
            if (this.player.posX > obstacle.posX && this.player.posY < obstacle.posY) {
                this.lifes--
                if (this.life < 0) {
                    this.gameOver()
                }
            }
        })
    },


    clearObstacles: function () {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= -130))
    }
}