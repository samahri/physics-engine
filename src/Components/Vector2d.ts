import * as math from 'mathjs';

class Vector2D {

    private _x: number;
    private _y: number;

    constructor(x:number, y:number) {
        this._x = x;
        this._y = y;
    }

    get x():number {
        return this._x;
    }

    set x(x:number) {
        this._x = x;
    }

    set y(y:number) {
        this._y = y;
    }

    get y():number {
        return this._y;
    }

    public add (vector: Vector2D): Vector2D {
        this._x += vector.x;
        this._y += vector.y;

        return this;
    }

    public subtract(vector: Vector2D): Vector2D {
        this._x -= vector._x;
        this._y -= vector._y;

        return this;
    }

    public multiplyScalar(value: number): Vector2D {
        this._x *= value;
        this._y *= value;

        return this;
    }

    public length(): number {
        let xSqrd = Math.pow(this._x,2);
        let ySqrd = Math.pow(this._y,2);

        var length = Math.sqrt(xSqrd + ySqrd);
        var roundedLength = math.round(length, 2);

        return roundedLength;
    }

    public clone(): Vector2D {
        return new Vector2D(this._x, this._y);
    }

    public unit(): Vector2D {
        var length = this.length();
        let unitVector = this.clone().multiplyScalar(1/length);

        unitVector.x = math.round(unitVector.x, 2);
        unitVector.y = math.round(unitVector.y, 2);
        return unitVector;
    }

    public angle(): number {
        return math.round(Math.atan2(this.y, this.x), 2);
    }

    public static distance(v1: Vector2D, v2:Vector2D):number {
        return v1.clone().subtract(v2).length();
    }

}

export default Vector2D;