import * as React from 'react';
import AnimationUniverse from './Components/AnimationUniverse';
import './canvas.css';
import Ball from './Components/Ball';


class Canvas extends React.Component {

  private animationUniverse;

  state = {
    "canvas" : {
        "height": 500,
        "width": 700
        },
    "g": 1000
    }


  componentDidMount() {
    const canvas = this.refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.animationUniverse = new AnimationUniverse(ctx,this.state.canvas.height, this.state.canvas.width);
    var ball1 = 
      {x: 300,
        y:  455
      };

      var ball2 = 
      {x: 100,
        y:  455
      };

    this.animationUniverse.addParticle(new Ball(45, ball1.x, ball1.y, 300, 0, 45));
    this.animationUniverse.addParticle(new Ball(45, ball2.x, ball2.y, -100, 0, 45));
    this.animationUniverse.setG(20);
    this.animationUniverse.startAnimation();
  }

  addBall = (x:number, y:number) => {
    this.animationUniverse.addParticle(new Ball(45, x, y, 0, 0, 45));
  }

  // changeHandler = (event) => {
  //   var g = event.target.value;
  //   if (isNaN(g)) {
  //     g = 0;
  //   }
  //   this.setState({'g': g})
   
  // }
  
  render() {
   
    return (
      <div className="App">
        <canvas 
          ref="canvas" 
          className="CanvasElement" 
          width = {this.state.canvas.width} 
          height = {this.state.canvas.height}
          onClick = {(event) => this.addBall(event.nativeEvent.offsetX, event.nativeEvent.offsetY)} 
          />
      </div>
    );
  }
}

export default Canvas;
