import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map'


const URL = 'ws://localhost:8080'

class App extends Component {
  state = { 
    windowHeight: window.innerHeight,
    messages: [],
  };

  ws = new WebSocket(URL);

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();  
      this.ws.onopen = () => {
        // on begin we send info to server
        this.ws.send("Hey I'm a client my coordinates are 36.229237, -120.156653");
      }
  
      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages and console log it
        // const message = JSON.parse(evt.data)
        this.addMessage(evt.data)
        console.log(evt.data)
      }
  
      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
          ws: new WebSocket(URL),
        })
      }
    }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }));

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }
  

  resize() {
    this.setState({windowHeight: window.innerHeight});   
  };

  render() {
    const {windowHeight, messages} = this.state;
    return(
      <div style={{
        height: {windowHeight }+ 'px !important',
     }}
     className="map-container">
        <Map />
        Height = {windowHeight}px
        <p>
          {messages.map(x => x) + '\n'}
        </p>
      </div>
    )
  }
}

export default App;


// WEBSOCKET STUFF

// const WebSocket = require('ws')
// const url = 'ws://localhost:8080'
// const connection = new WebSocket(url)

// connection.onopen = () => {
//   connection.send('Message From Client') 
// }

// connection.onerror = (error) => {
//   console.log(`WebSocket error: ${error}`)
// }

// connection.onmessage = (e) => {
//   console.log(e.data)
// }

// connection.on('open', function open(){
//     connection.send("Hey I'm a client my coordinates are 36.229237, -120.156653");
// });
   
// connection.on('message', function incoming(data) {
//     console.log(data);
// });
