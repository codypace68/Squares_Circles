import {
    Enemy
} from '../enemy.js';

class Circle extends Enemy {
    constructor(x, y) {
        const radius = 7;
        const color = 'rgba(0,0,255,.6)';
        super(x, y, radius, color);
        this.speed = 1;
        this.movingRight = false;
        this.movingUp = false;
        this.collsionZone = false;
    }

    update(cWidth, cHeight, player, gameCycle) {
        // if circle magnet is being used and circle is smaller than player move it toward the player
        if (player.invincibilityActive && this.radius < player.radius && player.circleMagnet) {
            const x1 = player.x;
            const y1 = player.y;
            const x0 = this.x;
            const y0 = this.y;
            const distance = Math.sqrt((Math.pow((x1 - x0), 2)) + (Math.pow((y1 - y0), 2)));
            let distanceRatio = distance === 0 ? 0 : (this.speed * 2) / distance;
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
        const shadowRatio = parseInt(gameCycle % 100 / 5);
        const cycleRatio = gameCycle % 100;
        let shadowBlur = shadowRatio > 10 ? 19 - shadowRatio + 1 : shadowRatio + 1; // mininum of 3


        if (this.radius < player.radius && player.edibleDetector) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius / (100 / cycleRatio), 0, 360 * (Math.PI / 180));
            ctx.strokeStyle = `rgba(0,0,0,${1 - cycleRatio / 100})`;
            ctx.lineWidth = this.radius * cycleRatio / 100
            ctx.stroke();
            ctx.fillStyle = `rgba(0,0,0,${1 - cycleRatio / 100})`
            ctx.fill();
            ctx.strokeStyle = null;
            ctx.fillStyle = null;
            ctx.lineWidth = 2
        }

        ctx.beginPath();
        ctx.shadowColor = null;
        ctx.shadowBlur = null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    checkCollision(player) {
        this.collsionZone = this.checkCollisionZone(player);

        // if one is on the left of the other
        if (this.x - this.hitBoxSize / 2 >= player.x + player.hitBoxSize / 2 ||
            player.x - player.hitBoxSize / 2 >= this.x + this.hitBoxSize / 2) return false;

        // if one is above the other
        if (this.y - this.hitBoxSize / 2 >= player.y + player.hitBoxSize / 2 ||
            player.y - player.hitBoxSize / 2 >= this.y + this.hitBoxSize / 2) return false;

        return true;
    }

    checkCollisionZone(player) {
        const hitBox = this.hitBoxSize + 40;
        // if one is on the left of the other
        if (this.x - hitBox / 2 >= player.x + player.hitBoxSize / 2 ||
            player.x - player.hitBoxSize / 2 >= this.x + hitBox / 2) return false;

        // if one is above the other
        if (this.y - hitBox / 2 >= player.y + player.hitBoxSize / 2 ||
            player.y - player.hitBoxSize / 2 >= this.y + hitBox / 2) return false;

        return true;
    }
}

export {
    Circle
};