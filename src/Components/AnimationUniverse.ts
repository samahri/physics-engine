var data = require('../data.json');

import Ball  from "./Ball";
import Vector2D from "./Vector2d";

class AnimationUniverse {
    private readonly context: CanvasRenderingContext2D;
    private balls:Ball[] = [];
    private t0:number = new Date().getTime();
    private g:Vector2D;

    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
      this.g = new Vector2D(data.g.x, data.g.y);
      
  }

  public startAnimation() {
    this.balls.push(new Ball(20, 200, 50, 0, 0, 15));
    this.balls.push(new Ball(40, 100, 200, 0, 0, 50));
    this.doStartAnimation();
  }

  private doStartAnimation() {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, data.canvas.width, data.canvas.height);

    for(var i = 0; i < this.balls.length; i++) {
      this.balls[i].onEachStep(dt, this.g);
      this.balls[i].draw(this.context);
    }
    
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


