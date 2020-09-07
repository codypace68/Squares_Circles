import {
    classList
} from '../enemies/enemyClasses.js';

import {levelDefs} from '../main.js';

const EnemyStage = class {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.enemies = [];
        this.enemiesAlive = 0;
        this.squaresAlive = 0;
        this.squareSize = 12;
        this.drawHitBoxes = false;
        this.drawFollowingLines = false;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
        })

        document.getElementById('show-enemy-hit-boxes').checked = this.drawHitBoxes;
        document.getElementById('show-enemy-hit-boxes').addEventListener('change', (e) => {
            this.drawHitBoxes = document.getElementById('show-enemy-hit-boxes').checked;
        })

        document.getElementById('show-enemy-following-line').checked = this.drawFollowingLines;
        document.getElementById('show-enemy-following-line').addEventListener('change', (e) => {
            this.drawFollowingLines = document.getElementById('show-enemy-following-line').checked;
        })

    }

    createEnemies(level, defaultPlayerRadius) {
        this.enemies = []; // delete old enemies
        this.enemiesAlive = 0;

        levelDefs[level].enemies.forEach(def => {
            for (let i = 0; i < def.quanity; i += 1) {
                this.enemies.push(new classList[def.class](parseInt(Math.random() * (this.width - 60)) + 60, parseInt(Math.random() * this.height)))
                this.enemiesAlive += 1;
            }
        })
    }

    updateEnemyPositions(player, gameCycle) {
        this.enemies.forEach(enemy => {
            if (enemy.display) enemy.update(this.canvas.width, this.canvas.height, player, gameCycle);
        })
    }

    drawEnemies(gameCycle, player) {
        this.enemies.forEach(enemy => {
            if (enemy.display) enemy.draw(this.ctx, gameCycle, player)
        })
    }

    clearStage() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}

export {
    EnemyStage,
    levelDefs,
};