import Vector2D from "./Vector2d";

class Force{
    private static g = 0;
    private static k = 0;

    private constructor(){}

    public static setG(g: number) {
        this.g = g;
    }

    public static setK(k: number) {
        this.k = k;
    }

    public static constantGravity(mass:number): Vector2D {
        return new Vector2D(0, mass * this.g);
    }

    public static linearDrag(velocity: Vector2D): Vector2D {
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