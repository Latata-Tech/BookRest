//191111291 - Farhan Ismul Afriza
const express = require('express')
const router = express.Router()
const {register} = require('../handlers/auth.handler')

router.post('/login', (req, res) => {
    const {email, password} = req.body
    try{

    }catch(err){

    }
})

router.post('/register', (req, res) => {
    const {name, email, password} = req.body
    try{
        let response = register(name, email, password)
        res.status(response.statusCode)
        res.send(response)
    }catch(err) {
        res.status(500)
        res.send({
            status:'fail',
            message: err.message
        })
    }
})

module.exports = router