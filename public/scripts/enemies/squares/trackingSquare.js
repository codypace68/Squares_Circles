import {
    Enemy
} from '../enemy.js';

class TrackingSquare extends Enemy {
    constructor(x, y) {
        const radius = 10;
        const color = '#ff2300';
        super(x, y, radius, color);
        this.speed = 1;
        this.killPlayer = true;
    }

    update(cWidth, cHeight, player, gameCycle) {
        const x1 = player.x;
        const y1 = player.y;
        const x0 = this.x;
        const y0 = this.y;
        const distance = Math.sqrt((Math.pow((x1 - x0), 2)) + (Math.pow((y1 - y0), 2)));
        let distanceRatio = distance === 0 ? 0 : (this.speed * 2) / distance;
        if (player.invincibilityActive) distanceRatio = -((this.speed * 2) / distance);// move square away from player if player is currently invincible
        if (distanceRatio >= 1) return;
        const newPoint = {
            x: (1 - distanceRatio) * x0 + distanceRatio * x1,
            y: (1 - distanceRatio) * y0 + distanceRatio * y1
        }

        this.x = newPoint.x;
        this.y = newPoint.y;
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
        ctx.strokeStyle = 'red'
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 10;
        ctx.fill();
    }
}

export {
    TrackingSquare
};