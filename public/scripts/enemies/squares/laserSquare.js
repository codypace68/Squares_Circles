import {
    Enemy
} from '../enemy.js';

class LaserSquare extends Enemy {
    constructor(x, y) {
        const radius = 10;
        const color = '#ffb205';
        super(window.innerWidth - 20, 20, radius, color);
        this.speed = 1;
        this.movingRight = false;
        this.laserCoords = [
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            }
        ]
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

        if (this.x + this.hitBoxSize / 2 > cWidth - 50) {
            this.x -= this.speed;
            this.movingRight = false;
        }
        if (this.x - this.hitBoxSize / 2 <= 50) {
            this.x += this.speed;
            this.movingRight = true;
        }
        if (this.y + this.hitBoxSize / 2 >= cHeight - 50) {
            this.y - this.speed;
            this.movingUp = true;
        }
        if (this.y - this.hitBoxSize / 2 <= 50) {
            this.y += this.speed;
            this.movingUp = false;
        }
    }

    draw(ctx, gameCycle, player) {
        const laserRadius = window.innerWidth + 20;
        const cycleRatio = gameCycle % 100 / 100;

        // draw "lasers" coming from corner
        for (let i = 0; i <= 3; i += 1) { // four corners
            const degree = 90 * i + 45 + (gameCycle / 10);
            const radian = degree * (Math.PI / 180);
            this.laserCoords[i].x = this.x + (laserRadius * Math.cos(radian));
            this.laserCoords[i].y = this.y + (laserRadius * Math.sin(radian));

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.laserCoords[i].x, this.laserCoords[i].y);
            ctx.strokeStyle = 'rgba(255, 0, 0, .8)';
            ctx.shadowColor = 'rgba(255, 0, 0, .6)';
            ctx.shadowBlur = 15 * cycleRatio;
            ctx.stroke();
        }

        // draw the square itself
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

    checkCollision(player, gameCycle) {
        if (player.invincibilityActive) return super.checkCollision(player);
        const cycleRatio = gameCycle % 100 / 100;
        const x0 = this.x;
        const y0 = this.y;
        let collision = false;

        // formula ref https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter#:~:text=Put%20(x0%2Cy0,your%20line%20and%20circle%20intersects.
        for (let i = 0; i <= 3; i += 1) {
            const degree = 90 * i + 45 + gameCycle;
            const x1 = this.laserCoords[i].x;
            const y1 = this.laserCoords[i].y;
            const a = y0 - y1;
            const b = x1 - x0;
            const c = ((x0 - x1) * y0) + (x0 * (y1 - y0));
            const dist = Math.abs( (a * player.x) + (b * player.y) + c) / Math.sqrt((Math.pow(a, 2)) + (Math.pow(b, 2)));
            console.log(dist, player.radius)
            if (dist < player.radius && gameCycle > 5) collision = true;
        }

        return collision
    }
}

export {
    LaserSquare
};