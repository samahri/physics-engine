import Ball from '../../src/Components/Ball';
import { expect } from 'chai';
import 'mocha';
import Force from '../../src/Components/Force';

describe("Testing BallJS", () => {
    
    describe("Given no forces, when animation starts", () => {
        var radius = 45;
        var mass = 55;

        var ballX:number;
        var ballY:number;
        var vx0:number;
        var vy0:number;
        var ball:Ball;
        var dt: number;
        var forces = new Force();
         
        forces.setG(0);

        it ("when ball is initally stationary", () => {
            ballX = 300;
            ballY = 200;
            vx0 = 0;
            vy0 = 0;
            dt = 0.5;
            
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.onEachStep(dt, null, forces);

            expect(ball.pos.x).to.equal(300);
            expect(ball.pos.y).to.equal(200);
            expect(ball.velo.x).to.equal(0);
            expect(ball.velo.y).to.equal(0);
            expect(ball.acc.x).to.equal(0);
            expect(ball.acc.y).to.equal(0);
        })

        it("when ball is moving at a constant velocity", () => {
            ballX = 300;
            ballY = 250;
            vx0 = 30;
            vy0 = -10;
            dt = 0.5;

            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.onEachStep(dt, null, forces);

            expect(ball.pos.x).to.equal(315);
            expect(ball.pos.y).to.equal(245);
            expect(ball.velo.x).to.equal(30);
            expect(ball.velo.y).to.equal(-10);
            expect(ball.acc.x).to.equal(0);
            expect(ball.acc.y).to.equal(0);
        })
        
    });

    describe("Given a constant gravitational force, when animation starts", () => {
        var radius = 45;
        var mass = 55;

        var ballX:number;
        var ballY:number;
        var vx0:number;
        var vy0:number;
        var ball:Ball;
        var dt: number;
        var forces = new Force();

        forces.setG(50);
        
        it ("when ball is initally stationary", () => {
            ballX = 400;
            ballY = 300;
            vx0 = 0;
            vy0 = 0;
            dt = 0.45;

            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.onEachStep(dt, null, forces);

            expect(ball.pos.x).to.equal(400); 
            expect(ball.pos.y).to.equal(310.125); 
            expect(ball.velo.x).to.equal(0);
            expect(ball.velo.y).to.equal(22.5);
            expect(ball.acc.x).to.equal(0);
            expect(ball.acc.y).to.equal(50);

        })

        it("when ball is moving at a constant velocity", () => {
            ballX = 500;
            ballY = 100;
            vx0 = 100;
            vy0 = -75;
            dt = 0.45;

            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.onEachStep(dt, null, forces);

            expect(ball.pos.x).to.equal(545); // 520.25
            expect(ball.pos.y).to.equal(76.375); 
            expect(ball.velo.x).to.equal(100);
            expect(ball.velo.y).to.equal(-52.5); // -52.5
            expect(ball.acc.x).to.equal(0);
            expect(ball.acc.y).to.equal(50);
        })
    })

    describe("When the ball hits a wall or floor, it bounces back", () => {
        var radius = 45;
        var mass = 55;

        var ballX:number;
        var ballY:number;
        var vx0:number;
        var vy0:number;
        var ball:Ball;

        it("when the ball hits the left wall", () => {
            ballX = 40;
            ballY = 300;
            vx0 = -10;
            vy0 = 40;
           
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.checkWallCollision(700, 500);

            expect(ball.pos.x).to.equal(45);
            expect(ball.pos.y).to.equal(300); 
            expect(ball.velo.x).to.equal(10);
            expect(ball.velo.y).to.equal(40);
        })

        it("when the ball hits the roof", () => {
            ballX = 412;
            ballY = 44;
            vx0 = -10;
            vy0 = -40;
           
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.checkWallCollision(700, 500);

            expect(ball.pos.x).to.equal(412);
            expect(ball.pos.y).to.equal(45); 
            expect(ball.velo.x).to.equal(-10);
            expect(ball.velo.y).to.equal(40);
        })

        it("when the ball hits the right wall", () => {
            ballX = 455.3;
            ballY = 300;
            vx0 = 10;
            vy0 = 40;
           
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.checkWallCollision(700, 500);

            expect(ball.pos.x).to.equal(455);
            expect(ball.pos.y).to.equal(300); 
            expect(ball.velo.x).to.equal(-10);
            expect(ball.velo.y).to.equal(40);
        })

        it("when the ball hits the floor", () => {
            ballX = 255.3;
            ballY = 655.1;
            vx0 = 10;
            vy0 = 40;
           
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.checkWallCollision(700, 500);

            expect(ball.pos.x).to.equal(255.3);
            expect(ball.pos.y).to.equal(655); 
            expect(ball.velo.x).to.equal(10);
            expect(ball.velo.y).to.equal(-40);
        })

        it("when the ball doesn't hit any wall", () => {
            ballX = 445;
            ballY = 300;
            vx0 = -10;
            vy0 = 40;
           
            ball = new Ball(radius, ballX, ballY, vx0, vy0, mass);

            ball.checkWallCollision(700, 500);

            expect(ball.pos.x).to.equal(445);
            expect(ball.pos.y).to.equal(300); 
            expect(ball.velo.x).to.equal(-10);
            expect(ball.velo.y).to.equal(40);
        })
    })
})