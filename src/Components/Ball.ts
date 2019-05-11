import CanvasDrawable from "./CanvasDrawable";
import Particle from "./Particle";
import Force   from "./Force";
import * as math from 'mathjs';

class Ball extends Particle {
    
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

    public onEachStep(dt:number,  otherObjects:Particle[], forces: Force) {
        
        var gravitationalForce = forces.constantGravity(this.mass);
        // var airDrag = Force.linearDrag(this.velo);

        var forcesSum = Force.sum(gravitationalForce);

        // Newton's second law, a = F / mass
        this._acc = forcesSum.multiplyScalar(1/this.mass);

        // V = V0 + a * dt
        this.velo.add(this.acc.clone().multiplyScalar(dt));

        // P = P0 + V * dt + 0.5 * a * dt^2, since 0.5 * dt^2 =~ 0, it is removed
        this.pos.add(this.velo.clone().multiplyScalar(dt));
    }

    public checkWallCollision(height: number, width: number) {

        let e = -0.5;
        let et = 1;

        if (this.pos.y > height - this.radius) {
            this.pos.y = height - this.radius;
            this.velo.y *= e;

            this.velo.x *= et;
        }

        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.velo.y *= e;

            this.velo.x *= et;
        }

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.velo.x *= e;

            this.velo.x *= et;
        }

        if (this.pos.x > width - this.radius) {
            this.pos.x = width - this.radius;
            this.velo.x *= e;

            this.velo.x *= et;
        }
    }

    public checkObjectCollision(otherBall: Ball) {
        var collisionVector = this.pos.clone().subtract(otherBall.pos.clone());
        var distanceFromOtherBall = collisionVector.length();
        
        if (distanceFromOtherBall < this.radius + otherBall.radius) {

            // collision detection adjustment
            var collisionDifferenceVector = 
                collisionVector.unit().multiplyScalar(this.radius + otherBall.radius - distanceFromOtherBall);

            this.pos.add(collisionDifferenceVector);
                        
            // var e = 1;
            const A = [[this.mass, otherBall.mass], [-1, 1]];
            const Bx = [this.mass * this.velo.x + otherBall.mass * otherBall.velo.x,
            this.velo.x - otherBall.velo.y];
            // const By = [this.mass * this.velo.x + otherBall.mass * otherBall.velo.y,
            //     this.velo.y - otherBall.velo.y];

            [this.velo.x, otherBall.velo.x] = math.usolve(A,Bx);
            // [this.velo.y, otherBall.velo.y] = math.usolve(A,By);

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