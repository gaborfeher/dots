import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      dots: [],
      limit: 5000000,
    };

    this.addDot = this.addDot.bind(this);
    this.run = this.run.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    for (let i = 0; i < this.state.dots.length; ++i) {
      let dot = this.state.dots[i];
      ctx.fillRect(dot.x - 1, dot.y - 1, 3, 3);
    }
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <button
              onClick={this.run}
              disabled={this.state.dots.length >= this.state.limit}>
            Mirror
          </button> &nbsp;
          <button onClick={this.reset}>Clear</button> &nbsp;
          Number of dots: {this.state.dots.length} &nbsp;
          Limit: {this.state.limit}
        </div>
        <canvas
            ref="canvas"
            className="Canvas"
            onClick={this.addDot}
            width={this.props.width}
            height={this.props.height}
            style={{
              width: this.props.width + 'px',
              height: this.props.height + 'px'
            }}>
        </canvas>
      </div>
    );
  }

  addDot(event) {
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    this.setState(prevState => ({
      dots: prevState.dots.concat([{x: x, y: y}])
    }));
  }

  run() {
    let limit = this.state.limit;

    function mirror(dots, steps) {
      let newDots = [];
      for (var i = 0; i < dots.length; ++i) {
        for (var j = 0; j < dots.length; ++j) {
          if (dots.length + newDots.length >= limit) {
            return dots.concat(newDots);
          }
          if (i !== j) {
            newDots.push({
              x: 2 * dots[i].x - dots[j].x,
              y: 2 * dots[i].y - dots[j].y
            });
          }
        }
      }
      return dots.concat(newDots);
    }
    this.setState(prevState => ({dots: mirror(prevState.dots)}));
  }

  reset() {
    this.setState(prevState => ({dots: []}));
  }

}

export default App;
