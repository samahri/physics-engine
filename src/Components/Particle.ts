import Vector2D from "./Vector2d";
import Ball from "./Ball";

abstract class Particle {
    protected pos: Vector2D;
    protected velo: Vector2D;
    protected acc:Vector2D;
    private _mass: number;

    protected constructor(x: number,
                y: number,
                vx: number,
                vy: number,
                ax: number,
                ay: number,
                mass: number) {

        this.pos = new Vector2D(x, y);
        this.velo = new Vector2D(vx,vy);
        this.acc = new Vector2D(ax,ay);
        this._mass = mass;
    }

    public abstract onEachStep(dt:number, /** otherObjects:Particle[]*/ ball:Ball);

    public abstract draw(context: CanvasRenderingContext2D)

    get mass() {
        return this._mass;
    }
}

export default Particle;