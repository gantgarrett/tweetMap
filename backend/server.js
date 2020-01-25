require('dotenv').config()
const WebSocket = require('ws')
const express = require('express')
const bodyParser = require('body-parser')
const Twit = require('twit')
const cors = require('cors')
const app = express()
const port = 3030

let dict = {};
const wss = new WebSocket.Server({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }
});

var T = new Twit({
  consumer_key:         process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret:      process.env.REACT_APP_CONSUMER_SECRET,
  access_token:         process.env.REACT_APP_ACCESS_TOKEN,
  access_token_secret:  process.env.REACT_APP_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
let message01 = "";
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser())

var stream = T.stream('statuses/sample')
stream.on('tweet', function (tweet) {
  if (tweet.coordinates !== null) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log('coordinates found on ', dateTime, ' at ', tweet.coordinates.coordinates)
    // dict[dateTime] = tweet.coordinates.coordinates;
    // ws.send(tweet.coordinates.coordinates.toString())
  }
  //console.log(tweet.text)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  message01 = "Hello I'm the server! My Coordinates are: 40.273267, -97.604141";
  ws.send( message01)
})

