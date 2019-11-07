const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    playerKeys: {
        TOP_KEY: 38,
        SPACE: 32,
        RIGHT_KEY: 39,
        LEFT_KEY: 37
    },
    score: 0,
    life: 3,
    status: 1,

    init: function () {
        let juego = document.getElementById("juego")
        juego.classList.toggle("unvisible")
        let canvas = document.getElementById("canvas")
        canvas.classList.toggle("unvisible")
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
            if (this.player.vx > 0) {
                this.player.vx -= 0.02
            }
            if (this.player.vx < 0) {
                this.player.vx += 0.02
            }

            if (this.framesCounter % 70 == 0) {
                this.generateFish()
            }
            if (this.framesCounter % 75 == 0) {
                this.generateFish2()
            }


            if (this.framesCounter > 1000) this.framesCounter = 0;
            this.clearObstacles()
            this.clearFish()
            this.clearFish2()
            if (this.framesCounter % 200 == 0) {

                this.generateObstacles()

            }


            this.isCollision()
            this.isCollisionDiver()

        }, 1000 / this.fps)
    },

    reset: function () {
        this.background = new Background(this.ctx, this.width, this.height);
        this.background2 = new Background2(this.ctx, this.width, this.height);
        this.player = new Player(this.ctx, 300, 300, './images/player-swiming.png', this.width, this.height, this.playerKeys);
        this.obstacles = [];
        this.bullets = [];
        this.fish = [];
        this.fish2 = [];
        Score.init(this.ctx, this.score)
        Life.init(this.ctx, this.life)
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll: function () {

        this.background.draw();
        this.fish.forEach(fish => {
            fish.draw()
        });
        this.fish2.forEach(fish2 => {
            fish2.draw()
        });
        this.background2.draw();
        this.player.draw(this.framesCounter);
        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        });

        Score.draw(this.score)
        Life.draw(this.life)
    },

    moveAll: function () {
        this.background.move()
        this.fish.forEach(fish => {
            fish.move()
        })
        this.fish2.forEach(fish2 => {
            fish2.move()
        })
        this.background2.move()
        this.player.move()
        this.obstacles.forEach(obstacle => {
            obstacle.move()
        })
    },

    generateObstacles: function () {
        this.obstacles.push(new Obstacle(this.ctx, 150, 150, this.width, Math.floor(Math.random() * (750 - 100) + 100)))

    },

    generateFish: function () {
        this.fish.push(new Fish(this.ctx, 60, 60, this.width, Math.floor(Math.random() * (800 - 100) + 100)))
    },

    generateFish2: function () {
        this.fish2.push(new Fish2(this.ctx, 70, 70, this.width, Math.floor(Math.random() * (800 - 200) + 200)))
    },

    gameOver: function () {
        let gameover = document.getElementById("gameover")
        gameover.classList.toggle('unvisible')
        let canvas = document.getElementById("canvas")
        canvas.classList.toggle("unvisible")
        clearInterval(this.interval)

        this.clear()
    },

    isCollision: function () {
        this.player.bullets.forEach((bullet) => this.obstacles.forEach((obstacle) => {
            if (bullet.posX > obstacle.posX &&
                bullet.posY > obstacle.posY &&
                bullet.posY < obstacle.posY + obstacle.height) {

                let index = this.obstacles.indexOf(obstacle);
                if (index > -1) {
                    this.obstacles.splice(index, 1);
                }
                let index2 = this.player.bullets.indexOf(bullet);
                if (index2 > -1) {
                    this.player.bullets.splice(index2, 1);
                }
                this.score++
            }
        }))
    },

    isCollisionDiver: function () {
        this.obstacles.forEach((obstacle) => {
            if (this.player.posX + this.player.width / 2 >= obstacle.posX - obstacle.width / 2 &&
                this.player.posX - this.player.width / 2 <= obstacle.posX + obstacle.width / 2 &&
                this.player.posY >= obstacle.posY - obstacle.height / 2 &&
                this.player.posY <= obstacle.posY + obstacle.height / 2) {
                this.life--

                let index = this.obstacles.indexOf(obstacle);
                if (index > -1) {
                    this.obstacles.splice(index, 1)
                }
                if (this.life < 0) {
                    this.gameOver()
                    this.status = 2
                }
            }
        })
    },

    clearObstacles: function () {
        this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= -130))
    },

    clearFish: function () {
        this.fish = this.fish.filter(fish => (fish.posX >= -130))
    },

    clearFish2: function () {
        this.fish2 = this.fish2.filter(fish2 => (fish2.posX >= -130))
    },

    audio: function () {
        this.audio = new Audio()
        this.audio.play();
        this.audio.pause();
    }

}