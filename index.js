const express = require('express')
const app = express();
const cors = require('cors')
const routerAuthor = require('./routes/author.route')
const routerBook = require('./routes/book.route')
const routerAuth = require('./routes/auth.route')
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
app.use(express.json())
// enable cors
app.use(cors())
app.use('/auth', routerAuth)
app.use('/authors', routerAuthor)
app.use('/books', routerBook)
app.listen(3000, () => {
  console.log('Server dah jalan')
})
