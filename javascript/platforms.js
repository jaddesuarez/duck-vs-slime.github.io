class Platforms {
    constructor(ctx, canvasSize, platformPosX, platformPosY, platformSizeW, platformSizeH, platformImage) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformPos = {
            x: platformPosX,
            y: platformPosY
        }
        this.platformSize = {
            w: platformSizeW,
            h: platformSizeH
        }
        this.image = new Image()
        this.image.src = platformImage
        this.init()
    }

    init() {
        this.drawPlatform()

    }
    drawPlatform() {
        this.ctx.drawImage(
            this.image,
            this.platformPos.x,
            this.platformPos.y,
            this.platformSize.w,
            this.platformSize.h)
    }
}