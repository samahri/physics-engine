import Vector2D from "./Vector2d";

class Forces {
    private constructor(){}

    public static constantGravity(mass:number, g:number): Vector2D {
        return new Vector2D(0, mass * g);
    }

    public static linearDrag(velocity: Vector2D, k: number): Vector2D {
        var force:Vector2D;
        var speed = velocity.length();

        if (speed > 0) {
            force = velocity.clone().multiplyScalar(-1 * k);
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

export default Forces;