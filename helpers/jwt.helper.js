const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (email) => {
    return jwt.sign({
            data: email
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: (24 * 60 * 60 * 1000),
        }
    )
}


const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
module.exports = {authenticationToken, generateToken}