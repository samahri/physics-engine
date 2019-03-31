var data = require('../data.json');

import Ball  from "./Ball";
import Vector2D from "./Vector2d";
import Force from "./Force";
import Plane from "./Plane";

class AnimationUniverse {
    private readonly context: CanvasRenderingContext2D;
    private balls:Ball[] = [];
    private plane:Plane;
    private t0:number = new Date().getTime();
    private forceFactors:Force;

    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
      this.forceFactors = new Force.Builder().setG(data.g).setK(20).build();
  }

  public startAnimation() {
    this.balls.push(new Ball(50, 200, 50, 0, 0, 15));
    // this.balls.push(new Ball(50, 400, 50, 0, 0, 15));
    // this.plane = new Plane(200, 200, 300, 350, 5);
    this.doStartAnimation();
  }

  private doStartAnimation() {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, data.canvas.width, data.canvas.height);

    for(var i = 0; i < this.balls.length; i++) {
      this.balls[i].onEachStep(dt, this.forceFactors);
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


