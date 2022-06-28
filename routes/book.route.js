const express = require('express')
const sqlite3 = require('sqlite3')
const { authenticationToken } = require('../helpers/jwt.helper')
const router = express.Router()
const db = new sqlite3.Database('data.db')

//books
router.get('/', authenticationToken,(req, res) => {
    db.all('SELECT book.isbn, book.judul, book.author, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id', (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.post('/', authenticationToken,(req, res) => {
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

router.get('/:id', authenticationToken,(req, res) => {
    db.get('SELECT book.isbn, book.judul, book.author, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id WHERE isbn=?', [req.params.id], (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.delete('/:id', authenticationToken,(req, res) => {
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

router.put('/:id', authenticationToken,(req, res) => {
    db.run('UPDATE book SET isbn=?, judul=?, author=? WHERE isbn=?', [req.params.isbn, req.body.judul, req.body.author, req.params.id], function (err) {
        if (err) {
            res.send(err.message)
            return;
        }
        console.log('Updated ' + this.changes + ' record')
        res.end()
    })
})

module.exports = router