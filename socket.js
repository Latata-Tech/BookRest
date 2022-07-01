const {app, server} = require('./config')
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
io.on('connection', (socket) => {
    console.log('jalan')
})
module.exports = io