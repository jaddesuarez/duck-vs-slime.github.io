class Enemies {
    constructor(ctx, canvasSize, enemyPosX, enemyPosY, enemyMinPosX, enemyMaxPosX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemyPos = {
            x: enemyPosX,
            y: enemyPosY
        }
        this.enemySize = {
            w: 65,
            h: 44
        }
        this.enemyVel = Math.floor(Math.random() * 4 + 2);
        this.enemyMinPosX = enemyMinPosX
        this.enemyMaxPosX = enemyMaxPosX
        this.image = new Image()
        this.image.src = "./images/slimefront_(44x30).png"
        this.image.frames = 10
        this.image.framesIndex = 0
        this.init()
    }
    init() {
        this.drawEnemies()
    }
    drawEnemies(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.enemyPos.x,
            this.enemyPos.y,
            this.enemySize.w,
            this.enemySize.h)
        if (this.enemyPos.x > this.enemyMaxPosX) {
            this.image.src = "./images/slimeback_(44x30).png"
        }
        if (this.enemyPos.x < this.enemyMinPosX) {
            this.image.src = "./images/slimefront_(44x30).png"
        }
        this.moveEnemies()
        this.animate(framesCounter)
    }

    animate(framesCounter) {
        if (framesCounter % 2 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
    moveEnemies() {
        if (this.enemyPos.x > this.enemyMaxPosX) {
            this.enemyVel *= -1
        }
        if (this.enemyPos.x < this.enemyMinPosX) {
            this.enemyVel *= -1
        }
        this.enemyPos.x += this.enemyVel
    }
}