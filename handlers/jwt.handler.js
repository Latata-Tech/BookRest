const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('data.db')

const isAccessTokenValid = async (access_token) => {
  try{
    const data = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM oauth_access_token WHERE access_token=?', [access_token], (err, data) => {
        if(err) {
          reject(err)
        }
        resolve(data)
      })
    })
    if(data.valid === 0){
      return false
    }
    return true
  }catch(err) {
    return new Error(err.message)
  }
}

module.exports = {isAccessTokenValid}