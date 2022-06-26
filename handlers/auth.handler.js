//191111291 - Farhan Ismul Afriza
const bcrypt = require('bcrypt')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('data.db')

const register = async (name, email, password) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const isEmailAlreadyUsed = await new Promise((resolve, reject) => {
            checkEmailExist(email, resolve, reject)
        })
        if (isEmailAlreadyUsed) {
            return {
                statusCode: 400,
                status: 'fail',
                message: 'Email already used'
            }
        }
        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, bcrypt.hashSync(password, salt)], (err) => {
            if (err) {
                throw new Error(err.message)
            }
        })
        return {
            statusCode: 201,
            status: 'success',
            message: 'Success add new user'
        }
    } catch (err) {
        return {
            statusCode: 500,
            status: 'fail',
            message: err.message
        }
    }
}

const checkEmailExist = (email, resolve, reject) => {
    db.get('SELECT * FROM users WHERE email=?', [email], (err, data) => {
        if (err) {
            reject(err.message)
        }
        return resolve(data)
    })
}

const authentication = async (email, password) => {
    try {
        const isUserExist = await new Promise((resolve, reject) => {
            checkEmailExist(email, resolve, reject)
        })
        if (bcrypt.compareSync(password, isUserExist.password)) {
            return {
                statusCode: 200,
                status: 'success',
                message: 'success to authentication'
            }
        }
        return {
            statusCode: 400,
            status: 'fail',
            message: 'Username or Password not match'
        }
    } catch (err) {
        return {
            statusCode: 500,
            status: 'fail',
            message: err.message
        }
    }
}

module.exports = { register, authentication }