const app = {
    appName: 'Game',
    version: '1.0.0',
    license: undefined,
    author: 'Jadde Suarez y Hugo Paniagua',
    description: 'Platform game',
    ctx: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    player: undefined,
    platforms: [],
    items: [],
    enemies: [],
    score: 0,
    lives: 3,
    backgroundTrack: new Audio("./songs/backgroundTrack.mp3"),
    enemyTrack: new Audio("./songs/Buzzer.mp3"),
    winGameTrack: new Audio("./songs/Applause.mp3"),
    gameOverTrack: new Audio("./songs/Sad Violin.mp3"),
    canvasSize: {
        w: undefined,
        h: undefined
    },

    init() {
        this.setDimensions()
        this.setContext()
        this.createBackground()
        this.createPlatforms()
        this.createItems()
        this.createEnemies()
        this.createPlayer()
        this.drawScore()
        this.player.setEventHandlers()
        this.backgroundTrack.play()
        this.start()
    },

    setDimensions() {
        this.canvasSize = {
            w: 800,
            h: 600
        }
        document.querySelector('canvas').setAttribute('height', this.canvasSize.h)
        document.querySelector('canvas').setAttribute('width', this.canvasSize.w)
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize)
    },

    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize, this.score)
    },

    createPlatforms() {
        this.platforms.push(
            new Platforms(this.ctx, this.canvasSize, 0, this.canvasSize.h / 4 - 10, 280, 40, "./images/grass_8x1.png"), //platform 1 up-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 380, this.canvasSize.h / 4 + 40, 200, 40, "./images/grass_6x1.png"), //platform 2 up-right
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 130, this.canvasSize.h / 2 + 20, 130, 40, "./images/grass_4x1.png"), //platform 3 mid
            new Platforms(this.ctx, this.canvasSize, 0, (this.canvasSize.h / 4) + (this.canvasSize.h / 2), 200, 40, "./images/grass_6x1.png"), //platform 4 bottom-left
            new Platforms(this.ctx, this.canvasSize, this.canvasSize.w - 250, (this.canvasSize.h / 4 - 50) + (this.canvasSize.h / 2), 250, 40, "./images/grass_8x1.png") //platform 5 bottom-rigth
        )
    },

    createItems() {
        this.items.push(
            new Items(this.ctx, this.canvasSize, 25, this.canvasSize.h / 4 - 50), // platform 1 - item 1
            new Items(this.ctx, this.canvasSize, 120, this.canvasSize.h / 4 - 50), // platform 1 - item 2
            new Items(this.ctx, this.canvasSize, 225, this.canvasSize.h / 4 - 50), // platform 1 - item 3

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 355, this.canvasSize.h / 4 + 5), // platform 2 - item 4
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 230, this.canvasSize.h / 4 + 5), // platform 2 - item 5

            new Items(this.ctx, this.canvasSize, this.canvasSize.w / 2 - 75, this.canvasSize.h / 2 - 20), // platform 3 - item 6

            new Items(this.ctx, this.canvasSize, 50, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 40), // platform 4 - item 7
            new Items(this.ctx, this.canvasSize, 125, (this.canvasSize.h / 4) + (this.canvasSize.h / 2) - 40), // platform 4 - item 8

            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 200, (this.canvasSize.h / 4 - 65) + (this.canvasSize.h / 2) - 25),// platform 5 - item 9
            new Items(this.ctx, this.canvasSize, this.canvasSize.w - 75, (this.canvasSize.h / 4 - 65) + (this.canvasSize.h / 2) - 25)// platform 5 - item 10
        )
    },

    createEnemies() {
        this.enemies.push(
            new Enemies(this.ctx, this.canvasSize, 50, 140 - 44, 10, 210), // platform 1 - enemy 1
            new Enemies(this.ctx, this.canvasSize, 570, 400 - 44, 570, 730), // platform 5 - enemy 2
            new Enemies(this.ctx, this.canvasSize, 230, this.canvasSize.h - 44, 230, 700) //Floor - enemy 3
        )
    },

    checkCollisionPlatforms() {
        this.platforms.forEach((elem) => {
            // YAY
            if (
                this.player.playerPos.x < elem.platformPos.x + elem.platformSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.platformPos.x &&
                this.player.playerPos.y < elem.platformPos.y + elem.platformSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.platformPos.y
            ) {

                if (this.player.playerVel.y > 0) {
                    this.player.playerPos.y = elem.platformPos.y - this.player.playerSize.h
                    this.player.playerVel.y = 0
                    this.player.canJump = true
                }

                if (this.player.playerVel.y < 0) {
                    this.player.playerPos.y = elem.platformPos.y + elem.platformSize.h
                    this.player.playerVel.y = 0
                }
            }

        })

    },

    checkCollisionItems() {
        this.items.forEach((elem) => {
            if (
                this.player.playerPos.x < elem.itemPos.x + elem.itemSize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.itemPos.x &&
                this.player.playerPos.y < elem.itemPos.y + elem.itemSize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.itemPos.y
            ) {
                let item = this.items.indexOf(elem)
                this.items.splice(item, 1)
                this.score++
                // console.log('score = ', this.score)
                let coinTrack = new Audio("./songs/coin.wav")
                coinTrack.play()
            }
        })

    },

    checkCollisionEnemiesPlayers() {
        this.enemies.forEach((elem) => {
            if (
                elem.enemyVel === 0
            ) {

            } else if (
                this.player.playerPos.x < elem.enemyPos.x + elem.enemySize.w &&
                this.player.playerPos.x + this.player.playerSize.w > elem.enemyPos.x &&
                this.player.playerPos.y < elem.enemyPos.y + elem.enemySize.h &&
                this.player.playerSize.h + this.player.playerPos.y > elem.enemyPos.y
            ) {
                this.player.playerPos.x = 50
                this.player.playerPos.y = this.canvasSize.h - this.player.playerSize.h
                // this.player.playerPos.x = 50
                // this.player.playerPos.y = this.canvasSize.h - this.player.playerSize.h
                this.lives--
                // console.log(this.lives)
                this.enemyTrack.play()
            }
        })
    },

    checkCollisionBulletsEnemies() {
        this.player.bullets.forEach((bullet) => {
            this.enemies.forEach((enemy) => {
                if (enemy.enemyVel === 0) { }
                else if (
                    bullet.bulletPos.x < enemy.enemyPos.x + enemy.enemySize.w &&
                    bullet.bulletPos.x + bullet.bulletSize.w > enemy.enemyPos.x &&
                    bullet.bulletPos.y < enemy.enemyPos.y + enemy.enemySize.h &&
                    bullet.bulletSize.h + bullet.bulletPos.y > enemy.enemyPos.y
                ) {
                    enemy.enemyVel = 0
                    setTimeout(() => {
                        enemy.enemyVel = 3
                    }, 5000)
                    let elem = this.player.bullets.indexOf(bullet)
                    this.player.bullets.splice(elem, 1)
                }
            })
        })
    },
    checkLives() {
        if (this.lives === 0) {
            this.gameOver()
        }
    },
    drawLives() {
        this.ctx.fillStyle = '#794d1d'
        this.ctx.font = '30px "Comic Sans MS"'
        this.ctx.fillText(this.lives, this.canvasSize.w - 160, 35)
    },
    drawScore() {
        this.ctx.fillStyle = '#794d1d'
        this.ctx.font = '30px "Comic Sans MS"'
        this.ctx.fillText(this.score, this.canvasSize.w - 60, 35)
    },
    start() {
        this.interval = setInterval(() => {
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            this.clearAll()
            this.drawAll()
            if (this.player.pressed.left === true) {
                this.player.moveLeft()
            }
            if (this.player.pressed.rigth === true) {
                this.player.moveRigth()
            }
            this.checkCollisionPlatforms()
            this.checkCollisionItems()
            this.checkCollisionEnemiesPlayers()
            this.checkCollisionBulletsEnemies()
            this.checkLives()
            this.winGame()
        }, 20)

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawAll() {
        this.background.drawBackground()
        this.platforms.forEach((elem) => {
            elem.drawPlatform()
        })
        this.enemies.forEach((elem) => {
            elem.drawEnemies(this.framesCounter)
        })
        this.items.forEach((elem) => {
            elem.drawItems(this.framesCounter)

        })
        this.player.drawPlayer(this.framesCounter)
        this.drawScore()
        this.drawLives()
    },

    winGame() {
        if (this.score === 10) {
            clearInterval(1)
            document.querySelector('#win-game').style.display = 'block'
            this.backgroundTrack.pause()
            this.winGameTrack.play()
        } else {

        }
    },

    gameOver() {
        clearInterval(1)
        document.querySelector('#game-over').style.display = 'block'
        this.backgroundTrack.pause()
        this.gameOverTrack.play()
    }

}
