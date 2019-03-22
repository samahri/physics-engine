import Drawable from "./drawable";
import Vector2D from "./Vector2d";

class Ball implements Drawable{
    private radius : number;
    private color: string;
    private mass: number;
    private pos: Vector2D;
    private velo: Vector2D;
    private acc:Vector2D;
    private t = 0;

    constructor(radius:number,
                x: number,
                y: number,
                vx: number,
                vy: number,
                mass:number) {
        this.radius = radius;
        this.color = '#0000ff';
        this.pos = new Vector2D(x, y);
        this.velo = new Vector2D(vx,vy);
        this.acc = new Vector2D(0,0)
    }

    public onEachStep(dt:number, forces: Vector2D) {
        
        this.pos.add(this.velo.clone().multiplyScalar(dt));
        this.acc = forces;
        this.velo.add(this.acc.clone().multiplyScalar(dt));
        this.t+=dt;
        console.log(`x = ${this.pos.x}`);
        
        if (this.pos.y > 500 - this.radius) {
            
            this.pos.y = 500 - this.radius;
           
            this.velo.y *= -0.9;
            
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.velo.y *= -0.9;
        }

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.velo.x *= -0.8
        }

        if (this.pos.x > 700 - this.radius) {
            this.pos.x = 700 - this.radius;
            this.velo.x *= -0.8;
        }
    }

    public draw(context: CanvasRenderingContext2D) {
       
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
    }
}

export default Ball;