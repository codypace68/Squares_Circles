// This stage can be used to add a backdrop to a stage as it sets behind the other two canvases

const Stage =  class {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d', {alpha: false});
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx.beginPath();
        this.ctx.rect(0,0, this.canvas.width, this.canvas.height )
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.ctx.beginPath();
            this.ctx.rect(0,0, this.canvas.width, this.canvas.height )
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
        })
    }

    
}

export {Stage};