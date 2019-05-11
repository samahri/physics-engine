import Vector2D from "./Vector2d";
import Ball from "./Ball";
import Force from "./Force";

abstract class Particle {
    protected _pos: Vector2D;
    protected _velo: Vector2D;
    protected _acc:Vector2D;
    private _mass: number;

    protected constructor(x: number,
                y: number,
                vx: number,
                vy: number,
                ax: number,
                ay: number,
                mass: number) {

        this._pos = new Vector2D(x, y);
        this._velo = new Vector2D(vx,vy);
        this._acc = new Vector2D(ax,ay);
        this._mass = mass;
    }

    public get pos() { return this._pos;}

    public get velo() { return this._velo;}

    public get acc() {return this._acc;}

    public abstract onEachStep(dt:number, otherObjects:Particle[], forces:Force);

    public abstract draw(context: CanvasRenderingContext2D)

    get mass() {
        return this._mass;
    }
}

export default Particle;