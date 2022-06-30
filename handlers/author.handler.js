const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("data.db");

//191111291 - Farhan Ismul Afriza
const getAuthors = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.all  ('SELECT * FROM author', (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }catch (err) {
        console.log(err)
    }
}

// 191110 - Rizky Pakpakhan
const getAuthor = async (id) => {
    try {
        return await new Promise((resolve, reject) => {
            db.get('SELECT * FROM author WHERE id = ?', [id], (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }catch (err) {
        console.log(err)
    }
}

module.exports = { getAuthors, getAuthor }