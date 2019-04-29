import Force from "./Force";
import Plane from "./Plane";
import Particle from "./Particle";
import Ball from "./Ball";

class AnimationUniverse {
    private readonly context: CanvasRenderingContext2D;
    private balls:Ball[] = [];
    private plane:Plane;
    private t0:number = new Date().getTime();
    private forces: Force;
    private universeHeight: number;
    private universeWidth: number;

    constructor(context: CanvasRenderingContext2D, height, width) {
      this.context = context;
      this.universeHeight = height;
      this.universeWidth = width;
      this.forces = new Force();
  }

  public setG(g : number) {
    this.forces.setG(g);
  }

  public addParticle(p : Particle) {
    this.balls.push(p as Ball);
  }

  public startAnimation() {
    this.doStartAnimation();
  }

  private doStartAnimation() {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, this.universeWidth, this.universeHeight);

    for(let ball of this.balls) {
      // var otherBalls = [...this.balls];
      // otherBalls.splice(i,1);
      ball.onEachStep(dt, null, this.forces);
      ball.checkWallCollision(this.universeHeight, this.universeWidth);
      ball.draw(this.context);
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


