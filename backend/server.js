require('dotenv').config()
const express = require('express')
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

var stream = T.stream('statuses/sample')
 
stream.on('tweet', function (tweet) {
  console.log(tweet)
})

app.use(cors())

app.get('/', (req, res) => {
    username = req.body.username
    res.send('Hello World')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

