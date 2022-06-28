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
  return {
    statusCode: 400,
    status:'fail',
    message: 'The given data was invalid',
    errors
  }
}

module.exports = {validation}