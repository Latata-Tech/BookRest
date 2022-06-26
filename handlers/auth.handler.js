//191111291 - Farhan Ismul Afriza
const bcrypt = require('bcrypt')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('data.db')

const register = (name, email, password) => {
    const salt = bcrypt.genSaltSync(10)
    let isEmailAlreadyUsed = checkEmailExist(email)
    if(isEmailAlreadyUsed){
        return {
            statusCode: 400,
            status: 'fail',
            message: 'Email already used'
        }
    }
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
        name,
        email,
        bcrypt.hashSync(password, salt)
    ], (err) => {
        if (err) {
            throw new Error(err.message)
        }
    })
    return {
        statusCode: 201,
        status: 'success',
        message: 'Success add new user'
    }
}

const checkEmailExist = (email) => {
    let data = db.get('SELECT * FROM users WHERE email=?', [
        email
    ], (err, data) => {
        if (err) {
            throw new Error(err.message)
        }
        return data
    })
    return data
}

module.exports = {register}