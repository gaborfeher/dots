import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    let dots = [{x: 10, y: 10}, {x: 10, y: 20}, {x: 50, y: 50}];
    return (
      <div className="App">
        {dots.map((dot, i) => <p key={i} style={{left: dot.x, top: dot.y, position: 'absolute'}}>x</p>)}
      </div>
    );
  }
}

export default App;
