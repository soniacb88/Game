class Bullet {
    constructor(ctx, playerX, playerY) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "./images/harpontrans.png";
        this.posX = playerX + 50
        this.posY = playerY + 90
        this.vy = 8;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, 90, 90);
    }

    move() {
        this.posX += this.vy;
    }
}