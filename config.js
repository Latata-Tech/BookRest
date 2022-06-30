const express = require('express')
const app = express();
app.use(express.json())
const server = app.listen(3000, () => {
    console.log('Server dah jalan di http://localhost:3000')
})

module.exports = { app, server }