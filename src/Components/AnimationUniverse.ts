var data = require('../data.json');

import Ball  from "./Ball";
import Force from "./Force";
import Plane from "./Plane";
import Particle from "./Particle";

class AnimationUniverse {
    private readonly context: CanvasRenderingContext2D;
    private balls:Particle[] = [];
    private plane:Plane;
    private t0:number = new Date().getTime();

    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
      Force.setG(data.g);
      Force.setK(100);
  }

  public addParticle(p : Particle) {
    this.balls.push(p);
  }

  public startAnimation() {
    this.balls.push();
    this.balls.push();
    // this.plane = new Plane(200, 200, 300, 350, 5);
    this.doStartAnimation();
  }

  private doStartAnimation() {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, data.canvas.width, data.canvas.height);

    for(var i = 0; i < this.balls.length; i++) {
      var otherBalls = [...this.balls];
      otherBalls.splice(i,1);
      this.balls[i].onEachStep(dt, otherBalls);
      this.balls[i].draw(this.context);
    }

    // this.plane.draw(this.context);

    window.requestAnimationFrame(() => this.doStartAnimation());
  }

  private getUpdatedTime():number {
    var t1 = new Date().getTime();
    var dt = 0.001*(t1-this.t0);

    this.t0 = t1;

    if (dt > 0.2) {
      dt = 0;
    }

    return dt;
  }
}
export default AnimationUniverse;


