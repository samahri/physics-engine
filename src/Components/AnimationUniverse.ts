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

    this.renderFrame();

    window.requestAnimationFrame(() => this.startAnimation());
  }

  private renderFrame() {
    var dt = this.getUpdatedTime();

    this.context.clearRect(0, 0, this.universeWidth, this.universeHeight);

    for(var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      ball.onEachStep(dt, null, this.forces);
      
      for (var j = i + 1; j < this.balls.length; j++) {
        var otherBall = this.balls[j];
        ball.checkObjectCollision(otherBall);
      }

      ball.checkWallCollision(this.universeHeight, this.universeWidth);
      ball.draw(this.context);
    }
    // this.plane.draw(this.context);
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


