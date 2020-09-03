const PlayerStage = class {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.bbox = this.canvas.getBoundingClientRect();
        this.defaultPlayerRadius = 8;
        this.orgin = {
            x: this.width / 2,
            y: this.height / 2,
        }
        this.player = {
            x: 0,
            y: 0,
            radius: this.defaultPlayerRadius,
            hitBoxSize: (this.defaultPlayerRadius * 2) / Math.sqrt(2),
            showHitBox: document.getElementById('show-player-hit-box').checked,
            showGuidingPoint: document.getElementById('show-player-guiding-point').checked,
            alive: true,
            invincibilityActive: false,
            squareRepelent: false,
            edibleDetector: false,
            circleMagnet: false,
            squareMagnet: false,
            circleRepelent: false,
            currentLevel: 1,
            baseLevel: 1,
            mouseDown: false,
            requestedPosition: {
                x: 0,
                y: 0,
            }
        }
        this.mouseMoved = false;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.orgin = {
                x: this.width / 2,
                y: this.height / 2,
            }
            this.bbox = this.canvas.getBoundingClientRect();
        })

        document.querySelector('body').addEventListener('mousemove', (e) => {
            this.player.requestedPosition.x = e.clientX;
            this.player.requestedPosition.y = e.clientY;
            this.mouseMoved = true;
        })

        document.querySelector('body').addEventListener('touchmove', (e) => {
            this.player.requestedPosition.x = e.touches[0].clientX - this.bbox.x;
            this.player.requestedPosition.y = e.touches[0].clientY - this.bbox.y;
            this.mouseMoved = true;
        })

        // activate invicibilty if possible
        document.querySelector('body').addEventListener('mousedown', () => {
            if (this.player.radius > this.defaultPlayerRadius + 2) this.player.invincibilityActive = true;
            this.player.mouseDown = true;
        })

        // deactivate invincibilty
        document.querySelector('body').addEventListener('mouseup', () => {
            // player needs to be at least 2 bigger than default radius
            this.player.invincibilityActive = false;
            this.player.mouseDown = false;
        })


        document.getElementById('show-player-hit-box').addEventListener('change', (e) => {
            this.player.showHitBox =  document.getElementById('show-player-hit-box').checked;
        })

        document.getElementById('show-player-guiding-point').addEventListener('change', (e) => {
            this.player.showGuidingPoint =  document.getElementById('show-player-guiding-point').checked;
        })
    }

    drawGuidingPoint() {
        this.ctx.beginPath();
        this.ctx.arc(this.player.requestedPosition.x, this.player.requestedPosition.y, 6, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.player.color;
        this.ctx.fill();

        // need to redraw the player as well
        this.ctx.beginPath();
        this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.player.color;
        this.ctx.fill();

        // temp
        this.ctx.beginPath();
        this.ctx.moveTo(this.player.x, this.player.y);
        this.ctx.lineTo(this.player.requestedPosition.x, this.player.requestedPosition.y);
        this.ctx.stroke();

        // draw line size
        const distance = Math.sqrt((Math.pow((this.player.requestedPosition.x - this.player.x), 2)) + (Math.pow((this.player.requestedPosition.y - this.player.y), 2)));// Distance between the points
        const newPoint = {
            x: (1 - (distance * .5) / distance) * this.player.x + ((distance * .5) / distance) * this.player.requestedPosition.x,
            y: (1 - (distance * .5) / distance) * this.player.y + ((distance * .5) / distance) * this.player.requestedPosition.y
        }
        this.ctx.beginPath();
        this.ctx.moveTo(newPoint.x, newPoint.y);
        this.ctx.font = "30px Arial";
        this.ctx.fillText(`${parseInt(distance)}px`, newPoint.x, newPoint.y);
    }

    updatePlayerPosition(speed) {
        // https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
        const x1 = this.player.requestedPosition.x;
        const y1 = this.player.requestedPosition.y;
        const x0 = this.player.x;
        const y0 = this.player.y;
        const distance = (Math.sqrt((Math.pow((x1 - x0), 2)) + (Math.pow((y1 - y0), 2)))) * .5;// Halfway point
        const distanceRatio = distance === 0 ? 0 : speed / distance;// move the number of pixels specified by the speed
        if (distanceRatio >= 1) return;
        const newPoint = {
            x: (1 - distanceRatio) * x0 + distanceRatio * x1,
            y: (1 - distanceRatio) * y0 + distanceRatio * y1
        }
        this.player.x = newPoint.x;
        this.player.y = newPoint.y;
    }

    clearStage() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}

export {
    PlayerStage
};