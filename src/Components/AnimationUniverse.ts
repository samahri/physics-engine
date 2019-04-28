import Force from "./Force";
import Plane from "./Plane";
import Particle from "./Particle";
import Ball from "./Ball";

class AnimationUniverse {
    private readonly context: CanvasRenderingContext2D;
    private balls:Ball[] = [];
    private plane:Plane;
    private t0:number = new Date().getTime();

    constructor(context: CanvasRenderingContext2D) {
      this.context = context;
      // 
      // Force.setK(100);
  }

  public setG(g : number) {
    Force.setG(g);
  }

  public addParticle(p : Particle) {
    this.balls.push(p as Ball);
  }

  public startAnimation(height: number, width: number) {
    this.doStartAnimation(height, width);
  }

  private doStartAnimation(height: number, width: number) {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, width, height);

    // for(var i = 0; i < this.balls.length; i++) {
    //   var otherBalls = [...this.balls];
    //   otherBalls.splice(i,1);
    //   this.balls[i].onEachStep(dt, otherBalls);
    //   this.balls[i].draw(this.context);
    // }

    this.balls[0].onEachStep(dt, this.balls[1]);
    this.balls[1].onEachStep(dt, this.balls[0]);
    this.balls[0].draw(this.context);
    this.balls[1].draw(this.context);

    // this.plane.draw(this.context);

    window.requestAnimationFrame(() => this.doStartAnimation(height, width));
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


