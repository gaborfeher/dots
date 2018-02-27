import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dots: [],
      limit: 50000,
    };

    this.addDot = this.addDot.bind(this);
    this.run = this.run.bind(this);
    this.reset = this.reset.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <button
              onClick={this.run}
              disabled={this.state.dots.length >= this.state.limit}>
            Mirror
          </button>
          <button onClick={this.reset}>Clear</button>

          Number of dots: {this.state.dots.length}

          Limit: {this.state.limit}
        </div>
        <div className="App" onClick={this.addDot}>
          {this.state.dots.map((dot, i) =>
              <div key={i} className="dot" style={{left: dot.x, top: dot.y}} />
          )}
        </div>
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
      var len = dots.length;
      for (var i = 0; i < dots.length; ++i) {
        for (var j = 0; j < dots.length; ++j) {
          if (dots.length + newDots.length >= limit) {
            return dots.concat(newDots);
          }
          if (i != j) {
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
