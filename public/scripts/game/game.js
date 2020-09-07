import { levelDefs} from '../main.js';

const Game = class {
    constructor(mainStage, playerStage, enemyStage) {
        this.mainStage = mainStage;
        this.playerStage = playerStage;
        this.enemyStage = enemyStage;
        this.level = 0;
        this.initGame();
        this.gameCycle = 0;
        this.enemyFreezeCycles = 0;
        this.scaleValue = 1;
        this.menuDisplayed = false;
        this.paused = false;
        this.score = 0;
        this.retryLevel;
        const myRadios = document.getElementsByName('power-up');
        let setCheck;
        let x = 0;

        // add ability for radio buttons to be unchecked
        for (x = 0; x < myRadios.length; x++) {
            myRadios[x].onclick = function () {
                if (setCheck != this) {
                    setCheck = this;
                } else {
                    this.checked = false;
                    setCheck = null;
                }
            };

        }

        // auto level up (dev only)
        document.getElementById('level-up').addEventListener('click', this.levelUp.bind(this));

        // auto level down (dev only)
        document.getElementById('level-down').addEventListener('click', this.levelDown.bind(this));

        // reset game after death
        document.getElementById('reset-game').addEventListener('click', this.resetGame.bind(this));

        // level up
        document.getElementById('next-level').addEventListener('click', this.levelUp.bind(this));

        // pause game if user leaves the screen with mouse
        document.querySelector('body').addEventListener('mouseleave', (e) => this.paused = true);
        document.querySelector('body').addEventListener('mouseenter', (e) => this.paused = false);

        // Display invicibility button if on  mobile
        function detectMob() {
            const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i
            ];

            return toMatch.some((toMatchItem) => {
                return navigator.userAgent.match(toMatchItem);
            });
        }

        if (detectMob()) {
            document.getElementById('mobile-invincibility').style.display = 'block';

        }

        // start the game cycle
        window.requestAnimationFrame(this.mainCycle.bind(this));
    }

    drawPlayer() {
        const player = this.playerStage.player;
        this.drawCircle(this.playerStage.ctx, player.radius, player.x, player.y, 'rgba(255,155,8,.5)', player.mouseDown, player.invincibilityActive ? 'green' : 'red', true)
        if (player.showHitBox) this.drawHitBox(this.playerStage.ctx, {// dev only
            x: player.x,
            y: player.y
        }, player.hitBoxSize)
    }

    drawCircle(ctx, radius, x, y, color, displayShadow, shadowColor, isPlayer) {
        const shadowRatio = parseInt(this.gameCycle % 100 / 5);
        let shadowBlur = shadowRatio > 10 ? 19 - shadowRatio + 1 : shadowRatio + 1; // mininum of 3

        ctx.beginPath();
        ctx.shadowColor = displayShadow ? shadowColor : null;
        ctx.shadowBlur = displayShadow ? shadowBlur : null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(x, y, radius * this.scaleValue, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    drawHitBox(ctx, pointCenter, hitBoxSize) {
        ctx.beginPath();
        ctx.rect(pointCenter.x - (hitBoxSize / 2), pointCenter.y - (hitBoxSize / 2), hitBoxSize, hitBoxSize);
        ctx.fillStyle = 'rgba(255, 0, 0, .6)';
        ctx.fill();
    }

    checkCollsion() {
        const player = this.playerStage.player;
        this.enemyStage.enemies.forEach(enemy => {
            if (!enemy.display) return;
            if (!enemy.checkCollision(player, this.gameCycle)) return;

            // Everything past this point is a collision
            if (enemy.killPlayer) { // if square
                if (player.invincibilityActive) { // if player has iniated invicibility it can kill squares
                    enemy.display = false;
                    this.enemyStage.enemiesAlive -= 1;
                    this.updateScore(15)
                    return;
                }

                // if player didn't have invincibility active they die
                this.setGameOver();
                return;
            }


            // player cannot interact with circles while invincible
            if (!player.invincibilityActive) {
                if (enemy.radius < player.radius) { // player eats point
                    this.updateScore(enemy.radius);
                    player.radius += enemy.radius / 3;
                    player.hitBoxSize = (player.radius * 2) / Math.sqrt(2)
                    enemy.display = false;
                    // if (player.radius > 8) numCols += 5;
                    this.enemyStage.enemiesAlive -= 1;

                    if (enemy.isStar) {
                        this.enemyFreezeCycles += 500;
                        this.enemyStage.enemies.filter(value => value.killPlayer && value.display).forEach(enemy => {
                            enemy.display = parseInt(Math.random() * 10) > 1;
                            if (!enemy.display) this.enemyStage.squaresAlive -= 1;
                        })
                    }
                } else { // point eats player
                    enemy.radius += player.radius / 2;
                    enemy.hitBoxSize = (enemy.radius * 2) / Math.sqrt(2)
                    this.setGameOver();
                }
            }
        })

        if (player.alive) {
            if (this.enemyStage.enemiesAlive === 0 && this.enemyStage.squaresAlive === 0) {
                this.setLevelUp()
                return;
            }
            const percentInvMeter = player.radius - this.playerStage.defaultPlayerRadius

            // Check if invincibilty should run out, decrement radius if not
            document.getElementById('invincibility-left').style.width = `${percentInvMeter}%`;

            // alert player when invincibility meter is empty
            if (player.radius - this.playerStage.defaultPlayerRadius <= 1) {
                document.getElementById('invincibility-meter').classList.add('empty');
            } else document.getElementById('invincibility-meter').classList.remove('empty');

            if (player.invincibilityActive) {
                player.radius -= .3; // decrease radius while invincibility is active
                player.hitBoxSize = (player.radius * 2) / Math.sqrt(2)
                if (player.radius <= this.playerStage.defaultPlayerRadius) player.invincibilityActive = false;
                this.updateScore(-.5)
            }

            if (percentInvMeter >= 100 && !player.invincibilityActive) player.radius = 100 + this.playerStage.defaultPlayerRadius;
        }

    }

    updateScore(score) {
        this.score += score
        document.getElementById('current-score').innerHTML = "Score: " + parseInt(this.score);
    }

    setGameOver() {
        this.menuDisplayed = true;
        document.getElementById('game-over-select-power-up-header').innerHTML = `Please select your powerup for level ${this.level}. <br> Click "Retry Level" when ready`
        document.getElementById('game-over-menu').style.display = 'flex';
        this.playerStage.player.alive = false;
        this.retryLevel = true;
    }

    resetGame() {
        this.playerStage.player.alive = true;
        this.playerStage.player.radius = this.playerStage.defaultPlayerRadius;
        this.playerStage.player.hitBoxSize = (this.playerStage.defaultPlayerRadius * 2) / Math.sqrt(2);
        this.playerStage.player.invincibilityActive = false;
        this.playerStage.player.mouseDown = false;
        this.playerStage.player.speedBoost = this.retryLevel ? document.getElementById('speed-boost-retry').checked : document.getElementById('speed-boost').checked;
        this.playerStage.player.squareRepelent = this.retryLevel ? document.getElementById('square-repelent-retry').checked : document.getElementById('square-repelent').checked;
        this.playerStage.player.circleMagnet = this.retryLevel ? document.getElementById('circle-magnet-retry').checked : document.getElementById('circle-magnet').checked;
        this.playerStage.player.edibleDetector = this.retryLevel ? document.getElementById('edible-detector-retry').checked : document.getElementById('edible-detector').checked;
        this.playerStage.player.x = 0;
        this.playerStage.player.y = 0;
        this.playerStage.requestedPosition = {
            x: 0,
            y: 0,
        }
        this.enemyStage.enemiesAlive = 0;
        this.enemyStage.squaresAlive = 0;
        this.enemyFreezeCycles = 0;
        this.score = 0;
        document.getElementById('invincibility-left').style.width = `0%`;
        document.getElementById('invincibility-meter').classList.add('empty');
        this.enemyStage.createEnemies(this.level, this.playerStage.defaultPlayerRadius); // clear old enemies and draw new ones
        document.getElementById('game-over-menu').style.display = 'none';
        document.getElementById('level-won-menu').style.display = 'none';
        document.getElementById('current-score').innerHTML = "Score: 0";
        this.menuDisplayed = false;
    }

    setLevelUp() {
        console.log('running level up', this.level + 1)
        this.menuDisplayed = true;
        document.getElementById('level-won-menu').style.display = 'flex';
        document.getElementById('final-score').innerHTML = `Final Score: ${parseInt(this.score)}`;
        document.getElementById('level-won-text-header').innerHTML = levelDefs[this.level].levelUpText;
        console.log(document.getElementById('level-won-select-power-up-header'))
        document.getElementById('level-won-select-power-up-header').innerHTML = `Please select your powerup for level ${this.level + 1}. <br> Click "Play Level" when ready`
    }

    levelUp() {
        this.level += 1;
        document.getElementById('level-label').innerHTML = `Level ${this.level}`;
        this.retryLevel = false;
        this.resetGame();
    }

    levelDown() {
        if (this.level - 1 <= 0) return;
        this.level -= 1;
        document.getElementById('level-label').innerHTML = `Level ${this.level}`;
        this.retryLevel = false;
        this.resetGame();
    }

    initGame() {
        // Initializes game  
        if (this.level === 0) return;
        this.enemyStage.createEnemies(this.level, this.playerStage.defaultPlayerRadius); // clear old enemies and draw new ones
    }

    mainCycle() {
        if (this.level === 0) return requestAnimationFrame(this.mainCycle.bind(this));
        if (this.paused) return requestAnimationFrame(this.mainCycle.bind(this));// don't run logic while game is paused
        if (this.enemyFreezeCycles === 0) this.enemyStage.updateEnemyPositions(this.playerStage.player, this.gameCycle);
        if (this.playerStage.player.alive) this.playerStage.updatePlayerPosition(this.playerStage.player.invincibilityActive ? 5 : 2);
        if (this.playerStage.player.alive && !this.menuDisplayed) this.checkCollsion();


        // draw stages
        this.enemyStage.clearStage();
        this.enemyStage.drawEnemies(this.gameCycle, this.playerStage.player);

        this.playerStage.clearStage();
        if (this.playerStage.player.alive) this.drawPlayer();
        if (this.playerStage.player.showGuidingPoint) this.playerStage.drawGuidingPoint();
        if (this.enemyFreezeCycles > 0) this.enemyFreezeCycles -= 1;
        this.gameCycle += 1;// game cycle is used for animations 
        requestAnimationFrame(this.mainCycle.bind(this));
    }
}

export {
    Game
};