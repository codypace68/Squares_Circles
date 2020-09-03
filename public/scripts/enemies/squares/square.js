import {Enemy} from '../enemy.js';

class Square extends Enemy {
    constructor(x, y) {
        const radius = 10;
        const color = '#ffb205';
        super(x, y, radius, color);
        this.speed = 1;
        this.movingRight = false;
        this.movingUp = false;
        this.killPlayer = true;
    }

    update(cWidth, cHeight, player, gameCycle) {
        if (player.invincibilityActive && player.squareRepelent) {
            const x1 = player.x;
            const y1 = player.y;
            const x0 = this.x;
            const y0 = this.y;
            const distance = Math.sqrt((Math.pow((x1 - x0), 2)) + (Math.pow((y1 - y0), 2)));
            let distanceRatio = distance === 0 ? 0 : (1 * 2) / distance;
            distanceRatio = -((1 * 2) / distance);
            if (distanceRatio >= 1) return;
            const newPoint = {
                x: (1 - distanceRatio) * x0 + distanceRatio * x1,
                y: (1 - distanceRatio) * y0 + distanceRatio * y1
            }

            this.x = newPoint.x;
            this.y = newPoint.y;
            return;
        }

        this.x += this.movingRight ? this.speed : -this.speed;
        this.y += this.movingUp ? -this.speed : this.speed;

        if (this.x + this.hitBoxSize / 2 > cWidth) {
            this.x -= this.speed;
            this.movingRight = false;
        }
        if (this.x - this.hitBoxSize / 2 <= 0) {
            this.x += this.speed;
            this.movingRight = true;
        }
        if (this.y + this.hitBoxSize / 2 >= cHeight) {
            this.y - this.speed;
            this.movingUp = true;
        }
        if (this.y - this.hitBoxSize / 2 <= 0) {
            this.y += this.speed;
            this.movingUp = false;
        }
    }

    draw(ctx, gameCycle, player) {
        ctx.beginPath();
        ctx.shadowColor = null;
        ctx.shadowBlur = null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.rect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black'
        ctx.stroke();
        ctx.fill();
    }
}

export {Square};