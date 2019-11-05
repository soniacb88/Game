const Score = {
    ctx: undefined,
    score: undefined,

    init: function (ctx, score) {
        this.ctx = ctx;
        this.score = score;
    },

    draw: function (score) {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '40px sans-serif'
        this.ctx.fillText("Points: " + score, 50, 50);
    }
}