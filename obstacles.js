class Obstacle {
    constructor(ctx, width, height, gameWidth, gameHeight) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.posX = gameWidth;
        this.posY = gameHeight * 1.1 - this.height;
        this.vx = 5;
        this.image = new Image()
        this.image.src = "./images/output-onlinejpgtools (1) copia.png"

    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    }


    move() {
        this.posX -= this.vx;
    }

}