import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = this.initialState();

    this.addDot = this.addDot.bind(this);
    this.run = this.run.bind(this);
    this.reset = this.reset.bind(this);
  }

  initialState() {
    return {
      dots: [],
      limit: 200000,
      // for optimization:
      dotSet: new Set(),
      fullyMirroredUntilId: 0,
    };
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
      dots: prevState.dots.concat([{x: x, y: y}]),
    }));
  }

  run() {
    function add(dot, dotList, dotSet) {
      let dotKey = dot.x + '-' + dot.y;
      if (!dotSet.has(dotKey)) {
        dotSet.add(dotKey);
        dotList.push(dot);
      }
    }

    function mirrorTo(state, dotList, dotSet) {
      for (var i = state.fullyMirroredUntilId; i < state.dots.length; ++i) {
        for (var j = 0; j < state.dots.length; ++j) {
          if (dotList.length >= state.limit) {
            return;
          }
          if (i !== j) {
            add({
                x: 2 * state.dots[i].x - state.dots[j].x,
                y: 2 * state.dots[i].y - state.dots[j].y
              },
              dotList,
              dotSet);
          }
        }
      }
    }

    function mirror(state) {
      let dotList = state.dots.slice();  // shallow clone
      let dotSet = new Set(state.dotSet);  // shallow clone
      mirrorTo(state, dotList, dotSet);
      return {
        dots: dotList,
        dotSet: dotSet,
        fullyMirroredUntilId: state.dots.length
      };
    }

    this.setState(prevState => (mirror(prevState)));
  }

  reset() {
    let that = this;
    this.setState(prevState => (that.initialState()));
  }

}

export default App;
