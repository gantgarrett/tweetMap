require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Twit = require('twit')
const cors = require('cors')
const app = express()
const port = 3030

var T = new Twit({
  consumer_key:         process.env.REACT_APP_CONSUMER_KEY,
  consumer_secret:      process.env.REACT_APP_CONSUMER_SECRET,
  access_token:         process.env.REACT_APP_ACCESS_TOKEN,
  access_token_secret:  process.env.REACT_APP_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser())

var stream = T.stream('statuses/filter', {track: 'Reactjs', language: 'en'})
stream.on('tweet', function (tweet) {
  if (tweet.coordinates !== null) {
    console.log(tweet.coordinates.coordinates)
  }
  console.log(tweet.text)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// -------------------------------------------------------------------------------- 
// WebSocket server stuff!!!
// -------------------------------------------------------------------------------- 
const WebSocket = require('ws')
 
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
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send("Hello I'm the server! My Coordinates are: 40.273267, -97.604141" )
})
// -------------------------------------------------------------------------------- 