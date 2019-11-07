class Player {
    constructor(ctx, width, height, image, gameWidth, gameHeight, keys) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.image = new Image();
        this.image.src = image;

        this.posX = 0;
        this.posY = gameHeight * 1.1;
        this.posY0 = gameHeight * 1.1 - this.height;
        this.posX0 = gameWidth - this.width;
        this.vy = 0.2;
        this.vx = 0;
        this.gravity = 0.1;
        this.gameWidth = gameWidth;
        this.frames = 3;
        this.framesIndex = 0.4
        this.keys = keys;
        this.bullets = [];
        this.setListeners()
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.framesIndex * Math.floor(this.image.width / this.frames),
            0,
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.height
        )
        this.animate(framesCounter)
        this.clearBullets()
        this.bullets.forEach(bullet => bullet.draw())
        this.animate(framesCounter)
    }

    move() {
        console.log(this.posX)
        if (this.posX >= this.posX0) {
            this.posX = this.posX0
        }
        if (this.posX <= -20) {
            this.posX = -20
        }
        if (this.posY <= this.posY0) {
            if (this.posY <= 0) {
                this.vy = this.gravity;
                this.posY = 1;
            } else {
                this.posY += this.vy;
                this.vy += this.gravity;
            }

        } else {
            this.vy = 1;
            this.posY = this.posY0;
        }
        this.posX += this.vx
        this.bullets.forEach(bullet => bullet.move())
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.framesIndex++;
            if (this.framesIndex > 2) this.framesIndex = 0;
        }
    }

    setListeners() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case this.keys.TOP_KEY:
                    this.posY -= this.vy;
                    this.vy -= 3;
                    break;


                case this.keys.SPACE:
                    this.shoot();
                    break;

                case this.keys.RIGHT_KEY:
                    this.vx += 0.9;
                    break;
                case this.keys.LEFT_KEY:
                    this.vx -= 0.9
            }
        })
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY))
    }

    clearBullets() {

        this.bullets = this.bullets.filter(bullet => bullet.posX <= this.gameWidth)
    }

}