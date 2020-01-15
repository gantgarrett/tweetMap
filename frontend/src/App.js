import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'

class App extends Component {
  render() {
    return(
      <div className="map-container">
        <Map />
      </div>
    )
  }
}

export default App;
