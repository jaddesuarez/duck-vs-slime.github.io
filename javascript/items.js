class Items {
    constructor(ctx, canvasSize, itemPosX, itemPosY) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.itemPos = {
            x: itemPosX,
            y: itemPosY
        }
        this.itemSize = {
            w: 25,
            h: 25
        }
        this.image = new Image()
        this.image.src = "./images/item_animated.png"
        this.image.frames = 4
        this.image.framesIndex = 0
        this.init()
    }

    init() {
        this.drawItems()
    }
    drawItems(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.itemPos.x,
            this.itemPos.y,
            this.itemSize.w,
            this.itemSize.h)
        this.animate(framesCounter)

    }
    animate(framesCounter) {
        if (framesCounter % 7 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
}