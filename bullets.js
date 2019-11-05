class Bullet {
    constructor(ctx, playerX, playerY) {
        this.ctx = ctx;
        // this.width = 20;
        // this.height = 20;

        this.image = new Image();
        this.image.src = "./images/output-onlinejpgtools (1).png";

        this.posX = playerX
        this.posY = playerY

        this.vy = 8;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, 100, 100);
    }
    move() {
        this.posX += this.vy;
    }
}