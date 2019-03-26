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
        var xSqrd = Math.pow(this._x,2);
        var ySqrd = Math.pow(this._y,2);

        return Math.sqrt(xSqrd + ySqrd);
    }

    public clone(): Vector2D {
        return new Vector2D(this._x, this._y);
    }

    public static distance(v1: Vector2D, v2:Vector2D):number {
        return v1.clone().subtract(v2).length();
    }

}

export default Vector2D;