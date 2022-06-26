const express = require('express')
const sqlite3 = require('sqlite3')
const app = express();
const cors = require('cors')

const db = new sqlite3.Database('data.db')
db.run('CREATE TABLE IF NOT EXISTS author (id TEXT PRIMARY KEY, nama TEXT, jk TEXT, tahun_lahir INTEGER)')
db.run('CREATE TABLE IF NOT EXISTS book (isbn TEXT PRIMARY KEY, judul TEXT, author TEXT)')

// const bodyParser = require('body-parser')
// app.use(bodyParser.json())
app.use(express.json())

// enable cors
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to the club')
})

// author
app.get('/authors', (req, res) => {
  db.all('SELECT id, nama FROM author', (err, data) => {
    if (err) {
      res.send(err.message)
      return;
    }
    res.send(data)
  })
})

app.post('/authors', (req, res) => {
  db.run('INSERT INTO author (id, nama, jk, tahun_lahir) VALUES (?, ?, ?, ?)', [req.body.id, req.body.nama, req.body.jk, req.body.tahun_lahir ], function (err) {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Inserted ' + this.changes + ' record')    
    res.status(201)
    res.end()
  })
})

app.get('/authors/:id', (req, res) => {
  db.get('SELECT * FROM author WHERE id=?', [req.params.id], (err, data) => {
    if (err) {
      res.send(err.message)
      return;
    }
    res.send(data)
  })
})

app.delete('/authors/:id', (req, res) => {
  db.run('DELETE FROM author WHERE id=?', [req.params.id], (err) => {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Updated ' + this.changes + ' record')
    res.status(204)
    res.end()
  })
})

app.put('/authors/:id', (req, res) => {
  db.run('UPDATE author SET id=?, nama=?, jk=?, tahun_lahir=? WHERE id=?', [req.params.id, req.body.nama, req.body.jk, req.body.tahun_lahir, req.params.id], function (err) {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Updated ' + this.changes + ' record')
    res.end()
  })
})


//books
app.get('/books', (req, res) => {
  db.all('SELECT book.isbn, book.judul, book.author, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id', (err, data) => {
    if (err) {
      res.send(err.message)
      return;
    }
    res.send(data)
  })
})

app.post('/books', (req, res) => {
  db.run('INSERT INTO book (isbn, judul, author) VALUES (?, ?, ?)', [req.body.isbn, req.body.judul, req.body.author], function (err) {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Inserted ' + this.changes + ' record')    
    res.status(201)
    res.end()
  })
})

app.get('/books/:id', (req, res) => {
  db.get('SELECT book.isbn, book.judul, book.author, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id WHERE isbn=?', [req.params.id], (err, data) => {
    if (err) {
      res.send(err.message)
      return;
    }
    res.send(data)
  })
})

app.delete('/books/:id', (req, res) => {
  db.run('DELETE FROM book WHERE isbn=?', [req.params.id], (err) => {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Updated ' + this.changes + ' record')
    res.status(204)
    res.end()
  })
})

app.put('/books/:id', (req, res) => {
  db.run('UPDATE book SET isbn=?, judul=?, author=? WHERE isbn=?', [req.params.isbn, req.body.judul, req.body.author, req.params.id], function (err) {
    if (err) {
      res.send(err.message)
      return;
    }
    console.log('Updated ' + this.changes + ' record')
    res.end()
  })
})

app.listen(3000, ()=>{ console.log('Server dah jalan')})
