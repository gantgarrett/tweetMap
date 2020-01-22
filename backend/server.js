require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const Twit = require('twit')
const cors = require('cors')
const app = express()
const port = 3000

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

var stream = T.stream('statuses/sample')
stream.on('tweet', function (tweet) {
  if (tweet.coordinates !== null) {
    console.log(tweet.coordinates.coordinates)
  }
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

