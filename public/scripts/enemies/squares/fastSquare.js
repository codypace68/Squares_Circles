import {
    Enemy
} from '../enemy.js';

class FastSquare extends Enemy {
    constructor(x, y) {
        const radius = 25;
        const color = '#ff2300';
        super(x, y, radius, color);
        this.speed = 4;
        this.movingRight = false;
        this.movingUp = false;
        this.killPlayer = true;
    }

    update(cWidth, cHeight, player, gameCycle) {
        if (player.invincibilityActive && player.squareRepelent) {
            // Move enemy away from player along the direction a line would go through the two.
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
        let cycles = 50;
        let tailLength = 2;
        let segmentSeperation = 2;
        let cycleRatio = gameCycle % cycles / cycles > .5 ? 1 - (gameCycle % cycles / cycles) : gameCycle % cycles / cycles;

        // draw current position
        ctx.beginPath();
        ctx.shadowColor = null;
        ctx.shadowBlur = null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.rect(this.x - this.radius / 2, this.y - this.radius / 2, this.radius, this.radius);
        ctx.fillStyle = this.color;
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red'
        ctx.stroke();
        ctx.fill();

        // draw after images unless player is repelling (and thus slowing down) these squares
        if (player.invincibilityActive && player.squareRepelent) return;
        for (let i = 1; i < 10; i += 1) {
            let prevX0;
            let prevY0;

            // determines direction the after images should be drawn
            if (this.movingRight && this.movingUp) {
                prevX0 = this.x - ((tailLength + cycleRatio * segmentSeperation) * i);
                prevY0 = this.y + ((tailLength + cycleRatio * segmentSeperation) * i);
            } else if (this.movingRight && !this.movingUp) {
                prevX0 = this.x - ((tailLength + cycleRatio * segmentSeperation) * i);
                prevY0 = this.y - ((tailLength + cycleRatio * segmentSeperation) * i);
            } else if (!this.movingRight && this.movingUp) {
                prevX0 = this.x + ((tailLength + cycleRatio * segmentSeperation) * i);
                prevY0 = this.y + ((tailLength + cycleRatio * segmentSeperation) * i);
            } else {
                prevX0 = this.x + ((tailLength + cycleRatio * segmentSeperation) * i);
                prevY0 = this.y - ((tailLength + cycleRatio * segmentSeperation) * i);
            }

            ctx.beginPath();
            ctx.shadowColor = null;
            ctx.shadowBlur = null;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.rect(prevX0 - this.radius / 2, prevY0 - this.radius / 2, this.radius - i, this.radius - i);
            ctx.fillStyle = `rgba(255,0,0,${1 / i})`;
            ctx.lineWidth = 2;
            ctx.fill();
        }
    }

}

export {
    FastSquare
};