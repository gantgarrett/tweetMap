import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'

class App extends Component {
  state = { windowHeight: window.innerHeight};

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
};

  resize() {
    this.setState({windowHeight: window.innerHeight});   
  };

  render() {
    const {windowHeight} = this.state;
    return(
      <div style={{
        height: {windowHeight }+ 'px !important',
     }}
     className="map-container">
        <Map />
        Height = {windowHeight}px
      </div>
    )
  }
}

export default App;
