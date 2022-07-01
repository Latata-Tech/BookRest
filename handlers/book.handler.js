const sqlite = require('sqlite3')
const db = new sqlite.Database('data.db')
const isbnExist = async (isbn) => {
    try{
        const data = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM book WHERE isbn=?',[isbn], (err, data) => {
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        })
        return data
    }catch (e) {
        console.log(e)
    }
}

module.exports = {isbnExist}