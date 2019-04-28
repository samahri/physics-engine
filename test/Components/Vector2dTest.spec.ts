import Vector2D from '../../src/Components/Vector2d';
import { expect } from 'chai';
import 'mocha';


describe("Testing Vector2d", () => {

    it('adding 2 Vectors', () => {
        let vector = new Vector2D(50, 100);
        vector.add(new Vector2D(-10, 20));

        expect(vector.x).to.equal(40);
        expect(vector.y).to.equal(120);

    })

    it('subtracting 2 Vectors', () => {

        let vector = new Vector2D(-90, 50);
        vector.subtract(new Vector2D(-20, 30));

        expect(vector.x).to.equal(-70);
        expect(vector.y).to.equal(20);
    })

    it('multiplying a vector by a non-zero scalar', () => {
        let vector = new Vector2D(-90, 50);
        vector.multiplyScalar(4)

        expect(vector.x).to.equal(-360);
        expect(vector.y).to.equal(200);
    })

    it('multiplying a vector by zero', () => {
        let vector = new Vector2D(-90, 50);
        vector.multiplyScalar(0);

        expect(vector.x).to.equal(0);
        expect(vector.y).to.equal(0);
    })

    it('getting a vector\'s length', () => {
        let vector = new Vector2D(-90, 50);
        let length = vector.length();

        expect(vector.x).to.equal(-90);
        expect(vector.y).to.equal(50);
        expect(length).to.equal(103); /** answer rounded up */

        let vector2 = new Vector2D(-90, 49);
        let length1 = vector2.length();

        expect(vector2.x).to.equal(-90);
        expect(vector2.y).to.equal(49);
        expect(length1).to.equal(102); /** answer rounded down */

    })

    it('cloning a vector', () => {
        var vector = new Vector2D(10, 13);
        var vectorClone = vector.clone();
        vectorClone.multiplyScalar(4);
        expect(vector).to.not.eql(vectorClone);
    })

    it('getting a vector\'s unit length', () => {
        let vector = new Vector2D(-90, -20);
        let unitVector= vector.unit();

        expect(vector.x).to.equal(-90);
        expect(vector.y).to.equal(-20);
        expect(unitVector.x).to.equal(-0.98);
        expect(unitVector.y).to.equal(-0.22);

        let unitVectorLength = unitVector.length();
        expect(unitVectorLength).to.equal(1);
    });

    it('getting a vector\'s angle', () => {
        let vector = new Vector2D(-90, -20);
        let angle = vector.angle();

        expect(angle).to.equal(-2.92);

        let vector2 = new Vector2D(-90, 0);
        let angle2 = vector2.angle();

        expect(angle2).to.equal(3.14);
    })

    it('getting the distance between two vectors', () => {
        let vector1 = new Vector2D(0, 40);
        let vector2 = new Vector2D(10, 0);

        let distance = Vector2D.distance(vector1, vector2);

        expect(distance).to.equal(41);
        expect(distance).to.equal(Vector2D.distance(vector2, vector1));

    });
});