const Victor = require('../node_modules/victor/index');

export default class Plane {
    constructor(x, y, props) {
        this.position = new Victor(x, y);
        this.velocity = new Victor(0, -2);
        this.acceleration = new Victor(0, 0);
        this.ctx = props.context;
        this.global = props;
        this.color = 'white';
        this.angle = 0;
        this.steeringAngle = 2;

        this.width = 10;
        this.height = 20;

        document.body.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) {
                this.rotate(-this.steeringAngle);
            } else if (e.keyCode == 39) {
                this.rotate(this.steeringAngle);
            }
        })
    }

    update() {
        const angleRadians = this.angle * Math.PI / 180;

        this.velocity.add(this.acceleration);

        let x = this.velocity.x * Math.cos(angleRadians) - this.velocity.y * Math.sin(angleRadians);
        let y = this.velocity.y * Math.cos(angleRadians) - this.velocity.x * Math.sin(angleRadians);
        let velocity = new Victor(x, y);
        this.position.add(velocity);

        this.fixBorders()
    }

    rotate(dir) {
        this.angle += dir;

        if (Math.abs(this.angle) > 359) {
            this.angle = 0;
        }
    }

    fixBorders() {
        this.position.x > this.global.width && (this.position.x = 0);
        this.position.x < 0 && (this.position.x = this.global.width);

        this.position.y > this.global.height && (this.position.y = 0);
        this.position.y < 0 && (this.position.y = this.global.height);
    }

    draw() {
        this.update();
        this.ctx.strokeStyle = this.color;

        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
        this.ctx.rotate(this.angle * Math.PI / 180);
        this.ctx.rect(-this.width/2, -this.height/2 , this.width, this.height);
        this.ctx.fill();

        this.ctx.restore();
    }
}