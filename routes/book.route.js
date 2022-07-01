/// 191111291 - Farhan Ismul Afriza
const express = require('express')
const sqlite3 = require('sqlite3')
const {authenticationToken} = require('../helpers/jwt.helper')
const router = express.Router()
const db = new sqlite3.Database('data.db')
const io = require('../socket')
const currentDateTime = require("../helpers/date.helper");
const {isbnExist} = require("../handlers/book.handler");
const {validation} = require("../helpers/validation.helper");


//books
router.get('/', authenticationToken, (req, res) => {
    db.all('SELECT book.isbn, book.judul, book.author, book.created_at, book.updated_at, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id', (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.post('/', authenticationToken, async (req, res) => {
    const {isbn, judul, author} = req.body
    let validationError = validation({isbn, judul, author});
    if(validationError.data.length > 0){
        res.status(400).send(validationError);
    }else{
        if (await isbnExist(isbn)) {
            res.status(409)
            res.send({
                status: 'fail',
                message: 'ISBN Already Exist!'
            })
        } else {
            db.run('INSERT INTO book (isbn, judul, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?)', [req.body.isbn, req.body.judul, req.body.author, currentDateTime(), currentDateTime()], function (err) {
                if (err) {
                    res.send(err.message)
                    return;
                }
                res.status(201)
                io.emit('new book') /// realtime data
                res.end()
            })
        }
    }
})

router.get('/:id', authenticationToken, (req, res) => {
    db.get('SELECT book.isbn, book.judul, book.author, book.created_at, book.updated_at, author.nama FROM book LEFT OUTER JOIN author ON book.author = author.id WHERE isbn=?', [req.params.id], (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.delete('/:id', authenticationToken, (req, res) => {
    db.run('DELETE FROM book WHERE isbn=?', [req.params.id], (err) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.status(204)
        io.emit('remove book', {
            isbn: req.params.id
        }) /// realtime data
        res.end()
    })
})

router.put('/:id', authenticationToken, (req, res) => {
    const {judul, author} = req.body;
    const validationError = validation({judul, author})
    if(validationError.data.length > 0){
        res.status(400).send(validationError)
    }else{
        db.run('UPDATE book SET judul=?, author=?, updated_at=? WHERE isbn=?', [req.body.judul, req.body.author, currentDateTime(), req.params.id], function (err) {
            if (err) {
                res.send(err.message)
                return;
            }
            io.emit('update book', {
                judul: req.body.judul,
                author: req.body.author,
                updated_at: currentDateTime(),
                isbn: req.params.id
            }) /// realtime data
            res.send('success');
            res.end()
        })
    }
})

module.exports = router