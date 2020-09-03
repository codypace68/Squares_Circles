class Enemy {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.display = true;
        this.hitBoxSize = (radius * 2) / Math.sqrt(2);
    }
}

export {Enemy};