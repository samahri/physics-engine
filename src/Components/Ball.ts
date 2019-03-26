import Drawable from "./drawable";
import Vector2D from "./Vector2d";
import Particle from "./Particle";
import Forces   from "./Forces";

class Ball extends Particle implements Drawable{
    private radius : number;
    private color: string;
    
    constructor(radius:number,
                x: number,
                y: number,
                vx: number,
                vy: number,
                mass:number) {
        super(x, y, vx, vy, 0, 0, mass);
        this.radius = radius;
        this.color = '#0000ff';
    }

    public onEachStep(dt:number, g: number, k:number) {
        /**
         * 1. move object
         * 2. Calculate Force
         * 3. Update Acceleration
         * 4. Update Velocity
         */
        
        var gravitationalForce = Forces.constantGravity(this.mass,g);
        var airDrag = Forces.linearDrag(this.velo, k);

        var forces = Forces.sum(gravitationalForce, airDrag);

        this.pos.add(this.velo.clone().multiplyScalar(dt));
        this.acc = forces.multiplyScalar(1/this.mass);
        this.velo.add(this.acc.clone().multiplyScalar(dt));
        
        if (this.pos.y > 500 - this.radius) {
            this.pos.y = 500 - this.radius;
            this.velo.y *= -0.5;
            
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.velo.y *= -0.5;
        }

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.velo.x *= -0.5;
        }

        if (this.pos.x > 700 - this.radius) {
            this.pos.x = 700 - this.radius;
            this.velo.x *= -0.5;
        }
    }

    public draw(context: CanvasRenderingContext2D) {
       
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
    }

    public static Builder = class {
        private radius:number = 1;
        private x: number = 0;
        private y: number = 0;
        private vx: number = 0;
        private vy: number = 0;
        private ax: number = 0;
        private ay: number = 0;
        private mass:number = 1;

        setX(x:number) {
            this.x = x;
            return this;
        }

        build():Ball {
            return new Ball(this.radius,
                this.x,
                this.y,
                this.vx,
                this.vy,
                this.mass);
        }
    }
}

export default Ball;