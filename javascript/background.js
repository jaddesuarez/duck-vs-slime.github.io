class Background {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.score = 0
        this.backgroundPos = {
            x: 0,
            y: 0
        }

        this.backgroundImage = new Image()
        this.backgroundImage.src = './images/background.png'
        this.scoreImage = new Image()
        this.scoreImage.src = './images/item.png'
        this.livesImage = new Image()
        this.livesImage.src = './images/heart.png'
    }

    drawBackground() {
        this.ctx.drawImage(this.backgroundImage, this.backgroundPos.x, this.backgroundPos.y, this.canvasSize.w, this.canvasSize.h)
        this.ctx.drawImage(this.scoreImage, this.canvasSize.w - 100, 10, 30, 30)
        this.ctx.drawImage(this.livesImage, this.canvasSize.w - 200, 10, 30, 30)
    }
}