class Enemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.display = true;
        this.hitBoxSize = (radius * 2) / Math.sqrt(2);
    }

    checkCollision(player) {
        // if one is on the left of the other
        if (this.x - this.hitBoxSize / 2 >= player.x + player.hitBoxSize / 2 ||
            player.x - player.hitBoxSize / 2 >= this.x + this.hitBoxSize / 2) return false;

        // if one is above the other
        if (this.y - this.hitBoxSize / 2 >= player.y + player.hitBoxSize / 2 ||
            player.y - player.hitBoxSize / 2 >= this.y + this.hitBoxSize / 2) return false;

        return true;
    }
}

export {Enemy};