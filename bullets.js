class Bullet {
    constructor(ctx, playerX, playerY) {
        this.ctx = ctx;
        // this.width = 20;
        // this.height = 20;

        this.image = new Image();
        this.image.src = "./images/harpontrans.png";
        //this.image.src = "./images/bala.png";
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