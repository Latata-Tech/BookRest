const {app, server} = require('./config')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
io.on('connection', (socket) => {
    app.socket = socket
})
module.exports = io