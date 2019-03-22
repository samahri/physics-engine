import * as React from 'react';
import { Component } from 'react';
import AnimationUniverse from './Components/AnimationUniverse';
import './canvas.css';
var data = require('./data.json');


class Canvas extends Component {
  componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const bouncingBall:AnimationUniverse = new AnimationUniverse(ctx);

    bouncingBall.startAnimation();
  }
  
  render() {
    return (
      <div className="App">
        <canvas ref="canvas" className="CanvasElement" width={data.canvas.width} height={data.canvas.height}></canvas>
      </div>
    );
  }
}

export default Canvas;
