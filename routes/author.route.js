const express = require('express')
const sqlite3 = require('sqlite3')
const router = express.Router()
const db = new sqlite3.Database('data.db')

router.get('/', (req, res) => {
    db.all('SELECT id, nama FROM author', (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.post('/', (req, res) => {
    db.run('INSERT INTO author (id, nama, jk, tahun_lahir) VALUES (?, ?, ?, ?)', [req.body.id, req.body.nama, req.body.jk, req.body.tahun_lahir], function (err) {
        if (err) {
            res.send(err.message)
            return;
        }
        console.log('Inserted ' + this.changes + ' record')
        res.status(201)
        res.end()
    })
})

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM author WHERE id=?', [req.params.id], (err, data) => {
        if (err) {
            res.send(err.message)
            return;
        }
        res.send(data)
    })
})

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
    db.run('UPDATE author SET id=?, nama=?, jk=?, tahun_lahir=? WHERE id=?', [req.params.id, req.body.nama, req.body.jk, req.body.tahun_lahir, req.params.id], function (err) {
        if (err) {
            res.send(err.message)
            return;
        }
        console.log('Updated ' + this.changes + ' record')
        res.end()
    })
})

module.exports = router