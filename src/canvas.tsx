import * as React from 'react';
import AnimationUniverse from './Components/AnimationUniverse';
import './canvas.css';
import Ball from './Components/Ball';
var data = require('./data.json');


class Canvas extends React.Component {

  private animationUniverse;


  componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.animationUniverse = new AnimationUniverse(ctx);

    this.animationUniverse.addParticle(new Ball(45, 200, 0, 0, 0, 45));
    this.animationUniverse.startAnimation();
  }

  addBall = (x, y) => {
    this.animationUniverse.addParticle(new Ball(45, x, y, 0, 0, 45));
  }
  
  render() {
    return (
      <div className="App">
        <canvas 
          ref="canvas" 
          className="CanvasElement" 
          width={data.canvas.width} 
          height={data.canvas.height}
          onClick = {(event) => this.addBall(event.nativeEvent.offsetX, event.nativeEvent.offsetY)}></canvas>
      </div>
    );
  }
}

export default Canvas;
