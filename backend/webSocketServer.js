const http = require('http')
const WebSocketServer = require('websocket').server
let connection = null

const httpserver = http.createServer((req, res) => {
    console.log('we have received a request')
})

const websocket = new WebSocketServer({
    "httpServer": httpserver
})

websocket.on('request', request => {
    connection = request.accept(null, request.origin)
    connection.on('open', e => console.log('Opened'))
    connection.on('close', () => console.log('Closed'))
    connection.on('message', message => {
        console.log(`Received message ${message}`)
    })
})

httpserver.listen(8080, () => console.log('server on port 8080'))
