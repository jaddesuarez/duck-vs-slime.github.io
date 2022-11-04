class Bullets {
    constructor(ctx, canvasSize, playerPosX, playerPosY, playerSizeW, playerSizeY, directLeft) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.directLeft = directLeft
        this.playerPosX = playerPosX
        this.bulletPos = {
            x: playerPosX + playerSizeW,
            y: playerPosY + playerSizeY / 2
        }
        if (this.directLeft) {
            this.bulletPos.x = this.playerPosX
        }
        this.bulletSize = {
            w: 30,
            h: 14
        }
        this.bulletVel = 7
        this.image = new Image()
        this.image.src = "./images/feather_front.png"
        this.init()
    }
    init() {
        this.drawBullets()
    }
    drawBullets() {
        this.ctx.drawImage(
            this.image,
            this.bulletPos.x,
            this.bulletPos.y,
            this.bulletSize.w,
            this.bulletSize.h)
        if (this.directLeft) {
            this.image.src = "./images/feather_back.png"
        } else {
            this.image.src = "./images/feather_front.png"
        }
        this.moveBullets()
    }
    moveBullets() {
        if (this.directLeft) {
            this.bulletPos.x -= this.bulletVel
        } else {
            this.bulletPos.x += this.bulletVel
        }
    }
}
