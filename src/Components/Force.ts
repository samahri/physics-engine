import Vector2D from "./Vector2d";

class Force{
    private g: number;
    private k: number;

    public constructor(){
        this.g = 0;
        this.k = 0;
    }

    public setG(g: number) {
        this.g = g;
    }

    public setK(k: number) {
        this.k = k;
    }

    public constantGravity(mass:number): Vector2D {
        return new Vector2D(0, mass * this.g);
    }

    public linearDrag(velocity: Vector2D): Vector2D {
        var force:Vector2D;
        var speed = velocity.length();

        if (speed > 0) {
            force = velocity.clone().multiplyScalar(-1 * this.k);
        } else {
            force = new Vector2D(0,0);
        }

        return force;
    }

    public static sum(...forces: Vector2D[]): Vector2D {
        var sumVector = new Vector2D(0,0);
        forces.forEach(element => {
            sumVector.add(element);
        });

        return sumVector;
    }
}

export default Force;