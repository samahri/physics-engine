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

    public onEachStep(dt:number, /** otherObjects:Particle[]*/ ball:Ball) {
        
        var gravitationalForce = Force.constantGravity(this.mass);
        // console.log(gravitationalForce)
        var airDrag = Force.linearDrag(this.velo);

        var forces = Force.sum(gravitationalForce, airDrag);

        this.acc = forces.multiplyScalar(1/this.mass);
        this.velo.add(this.acc.clone().multiplyScalar(dt));
        this.pos.add(this.velo.clone().multiplyScalar(dt));

        // otherObjects.forEach(obj => {
            // var ball = obj as Ball;
            if (this.didCollide(ball)) {

                // collision detection adjustment
                var collisionVector = this.pos.clone().subtract(ball.pos.clone());
                var collisionVectorDifference = this.radius + ball.radius - collisionVector.length();
                var collisionAngle = this.pos.clone().subtract(ball.pos.clone()).angle();
                
                this.pos.x += (collisionVectorDifference) * Math.cos(collisionAngle);
                this.pos.y += (collisionVectorDifference) * Math.sin(collisionAngle);
                
                // need to update the below
                // vector velocities are swapped; invalid answer
                // var temp = ball.velo.clone().multiplyScalar(ball.mass / this.mass);
                // ball.velo = this.velo.clone().multiplyScalar(this.mass / ball.mass);
                // this.velo = temp;
                var e = 1;
                const A = [[this.mass, ball.mass], [-1, 1]];
                const B = [this.mass * this.velo.x + ball.mass * ball.velo.x,
                this.velo.x - ball.velo.y];

                [this.velo.x, ball.velo.x] = math.usolve(A,B); 
                // [this.velo.x, ball.velo.x] = [0,0]
                // this.velo.x = math.usolve(A,B)[0];
                // ball.velo.x = math.usolve(A,B)[1];
                console.log(math.usolve(A, B));
                console.log('x: ' + this.pos.x + ',y: ' + this.pos.y);
                console.log('ball 2 velo ' + ball.velo.x);

            }
        // });
        
        if (this.pos.y > 500 - this.radius) {
            this.pos.y = 500 - this.radius;
            this.velo.y *= -1.0;
        }

        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.velo.y *= -1.0;
        }

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.velo.x *= -1;
        }

        if (this.pos.x > 700 - this.radius) {
            this.pos.x = 700 - this.radius;
            this.velo.x *= -1;
        }
    }

    public didCollide(otherParticle: Particle):boolean {
        var otherBall = otherParticle as Ball;
        return (this.pos.clone().subtract(otherBall.pos.clone()).length() < (this.radius + otherBall.radius) + 1);      
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