import Drawable from "./drawable";
import Ball from './Ball';
import Vector2D from "./Vector2d";

class Plane implements Drawable{
   
    private x0: number;
    private y0: number;
    private x1: number;
    private y1: number;
    private width: number;

    constructor(x0: number,
                y0: number,
                x1: number,
                y1: number,
                width: number) {

            this.x0 = x0;
            this.y0 = y0;
            this.x1 = x1;
            this.y1 = y1;
            this.width = width;
        }

    public asVector(): Vector2D {
        return new Vector2D(this.x1 - this.x0, this.y1 - this.y0);
    }

    public draw(context: CanvasRenderingContext2D): void {
        context.beginPath();
        context.lineWidth = this.width;
        context.lineCap = 'round';
        context.moveTo(this.x0, this.y0);
        context.lineTo(this.x1, this.y1);
        context.stroke();
    }
}

export default Plane;