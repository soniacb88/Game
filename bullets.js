class Bullet {
    constructor(ctx, radius, playerX, playerY, playerWidth, playerHeight, floor) {
        this.ctx = ctx;
        this.radius = radius;

        this.posX = playerX + playerWidth;
        this.posY = playerY + playerHeight / 2;
        this.playerHeight = playerHeight;
        this.floor = floor;


        this.vx = 5;
        this.vy = 0.5;
        this.gravity = 0.002;
        this.image = new Image()
        this.image.src = "./images/kisspng-harpoon-fishing-fishing-for-the-fork-5a87e25d6c56c3.0099960515188547494438.jpg"
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        // this.ctx.beginPath();
        // this.ctx.fillStyle = 'green'
        // this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2)
        // this.ctx.fill()
        // this.ctx.closePath();
    }

    move() {
        this.posX += this.vx;
        this.posY += this.vy;
        this.vy += this.gravity;

        if (this.posY >= this.floor + this.playerHeight) this.vy *= -1
    }

}