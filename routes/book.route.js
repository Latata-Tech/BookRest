/// 191111827 - fiqri ardiansyah -add socket
const express = require('express')
const sqlite3 = require('sqlite3')
const { authenticationToken } = require('../helpers/jwt.helper')
const router = express.Router()
const db = new sqlite3.Database('data.db')

//books
router.get('/', authenticationToken,(req, res) => {
    db.all('SELECT book.isbn, book.judul, book.author, book.created_at, book.updated_at, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id', (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    }) 
})

router.post('/', authenticationToken,(req, res) => {
    db.run('INSERT INTO book (isbn, judul, author, created_at) VALUES (?, ?, ?, ?)', [req.body.isbn, req.body.judul, req.body.author, new Date().getTime()], function (err) {
        if (err) {
            res.send(err.message)
            return;
        }
        res.status(201)
        req.app.io.emit('new book') /// realtime data
        res.end()
    })
})

router.get('/:id', authenticationToken,(req, res) => {
    db.get('SELECT book.isbn, book.judul, book.author, book.created_at, book.updated_at, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id WHERE isbn=?', [req.params.id], (err, data) => {
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
        res.status(204)
        req.app.io.emit('remove book') /// realtime data
        res.end()
    })
})

router.put('/:id', authenticationToken,(req, res) => {
    const time = new Date().getTime();
    db.run('UPDATE book SET judul=?, author=?, updated_at=? WHERE isbn=?', [req.body.judul, req.body.author,time, req.params.id], function (err) {
        if (err) {
            res.send(err.message)
            return;
        }
        req.app.io.emit('update book', {
            judul: req.body.judul,
            author: req.body.author,
            updated_at: time
        }) /// realtime data
        res.send('success');
        res.end()
    })
})

module.exports = router