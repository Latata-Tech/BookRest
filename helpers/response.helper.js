//191111291 - Farhan Ismul Afriza
const ResponseHelper = (statusCode, status, message, data) => {
  return data !== undefined ? { statusCode, status, message, data } : { statusCode, status, message }
}

module.exports = { ResponseHelper };