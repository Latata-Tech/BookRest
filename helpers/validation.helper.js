const { ResponseHelper } = require("./response.helper");

//191111291 - Farhan Ismul Afriza
const validation = (...params) => {
  let errors = [];
  let obj = params[0]
  let keys = Object.keys(obj)
  for(let i = 0; i < keys.length; i++){
    if(!obj[keys[i]]){
      let error = {}
      error[keys[i]] = 'The ' + keys[i] + ' field is required.'
      errors.push(error)
    }
  }
  return ResponseHelper(400, 'fail', 'The given data was invalid', errors)
}

module.exports = {validation}