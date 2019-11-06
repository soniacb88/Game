const Life = {
    ctx: undefined,
    life: undefined,

    init: function (ctx, life) {
        this.ctx = ctx;
        this.life = life;
    },

    draw: function (life) {
        this.ctx.fillStyle = 'white';
        this.ctx.font = '25px sans-serif';
        this.ctx.fillText("Life: " + life, 50, 80);
    }
}