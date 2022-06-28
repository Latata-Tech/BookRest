//191111291 - Farhan Ismul Afriza
const e = require('express')
const express = require('express')
const router = express.Router()
const { register, authentication } = require('../handlers/auth.handler')

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    let response = await authentication(email, password)
    res.status(response.statusCode)
    res.send(response)
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    let response = await register(name, email, password)
    res.status(response.statusCode)
    res.send(response)
})

module.exports = router