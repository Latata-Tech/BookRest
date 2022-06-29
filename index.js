const express = require('express')
const app = express();
const cors = require('cors')
const routerAuthor = require('./routes/author.route')
const routerBook = require('./routes/book.route')
const routerAuth = require('./routes/auth.route')

app.use(express.json())
// enable cors
app.use(cors())
app.use('/auth', routerAuth)
app.use('/authors', routerAuthor)
app.use('/books', routerBook)
const server = app.listen(3000, () => {
  console.log("Server dah jalan di http://localhost:3000")
})

// 191111827 - fiqri ardiansyah
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  app.io = io;
  app.socket = socket;
})


