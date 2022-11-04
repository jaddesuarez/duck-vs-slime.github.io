class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = {
            w: 52,
            h: 52
        }
        this.playerPos = {
            x: 50,
            y: this.canvasSize.h - this.playerSize.h
        }
        this.playerPos.y0 = this.playerPos.y
        this.playerVel = {
            x: 10,
            y: 2
        }
        this.key = {
            left: 'ArrowLeft',
            rigth: 'ArrowRight',
            jump: 'ArrowUp',
            shoot: ' '
        }
        this.pressed = {
            left: false,
            rigth: false,
            jump: false
        }
        this.shootTrack = new Audio("./songs/quack.mp3")
        this.canJump = true
        this.playerPhysics = { gravity: 0.4 }
        this.floor = this.canvasSize.h - this.playerSize.h
        this.directLeft = false
        this.image = new Image()
        this.image.src = "./images/duckfront_(36x36).png"
        this.image.frames = 10
        this.image.framesIndex = 0
        this.bullets = []
        this.init()
    }
    init() {
        this.drawPlayer()
        this.setEventHandlers()
    }
    drawPlayer(framesCounter) {
        this.checkTop()
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h)
        if (this.pressed.rigth === true) {
            this.image.src = "./images/duckfront_(36x36).png"
        }
        if (this.pressed.left === true) {
            this.image.src = "./images/duckback_(36x36).png"
        }
        if (this.pressed.left === true || this.pressed.rigth === true) {
            this.animate(framesCounter)
        }
        this.setGravity()
        this.bullets.forEach(elem => elem.drawBullets())
        this.clearBullets()
    }
    animate(framesCounter) {
        if (framesCounter % 2 == 0) {
            this.image.framesIndex++;
        }
        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0;
        }
    }
    moveLeft() {
        if (this.playerPos.x > 0) {
            this.playerPos.x -= 5
        } else { }
    }
    moveRigth() {
        if (this.playerPos.x < this.canvasSize.w - this.playerSize.w) {
            this.playerPos.x += 5
        } else { }
    }
    checkTop() {
        if (this.playerPos.y < 0) {
            this.playerPos.y = 0
            this.playerVel.y = 0
        }
    }
    jump() {
        if (this.canJump) {
            this.playerVel.y = -12
            this.playerPos.y -= 5
            this.canJump = false
        }
    }
    shoot() {
        this.bullets.push(new Bullets(
            this.ctx,
            this.canvasSize,
            this.playerPos.x,
            this.playerPos.y,
            this.playerSize.w,
            this.playerSize.h,
            this.directLeft
        ))
        this.shootTrack.play()
    }
    clearBullets() {
        this.bullets = this.bullets.filter(elem => elem.bulletPos.x <= this.canvasSize.w) //Memory
    }
    setGravity() {
        if (this.playerPos.y < this.floor) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += this.playerPhysics.gravity
        } else {
            this.playerPos.y = this.floor
            this.playerVel.y = 1
            this.canJump = true
        }
    }
    setEventHandlers() {
        event.preventDefault()
        document.onkeydown = event => {
            switch (event.key) {
                case this.key.left:
                    this.pressed.left = true
                    this.directLeft = true
                    // console.log(this.playerPos.y)
                    // console.log('Arrow Left', `- PlayerPos.x = ${this.playerPos.x}px`)
                    // console.log('Arrow Left', `- PlayerPos.x = ${this.playerPos.y}px`)
                    break;
                case this.key.rigth:
                    this.pressed.rigth = true
                    this.directLeft = false
                    // this.animate(framesCounter)
                    // console.log('Arrow Right', `- PlayerPos.x = ${this.playerPos.x}px`)
                    // console.log('Arrow Right', `- PlayerPos.x = ${this.playerPos.y}px`)
                    break;
                case this.key.jump:
                    this.pressed.jump = true
                    this.jump()
                    // console.log('Jump')
                    break;
                case this.key.shoot:
                    event.preventDefault()
                    this.shoot()
                    // console.log('Shoot', this.bullets)
                    break;
            }
        }
        document.onkeyup = event => {
            switch (event.key) {
                case this.key.left:
                    this.pressed.left = false
                    break;
                case this.key.rigth:
                    this.pressed.rigth = false
                    break;
                case this.key.jump:
                    this.pressed.jump = false
                    break;
            }
        }
    }
}