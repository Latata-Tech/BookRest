//191110597 - Rizky Kurniawan Pakpahan
const ResponseHelper = (statusCode, status, message, data) => {
  return data !== undefined
    ? { statusCode, status, message, data }
    : { statusCode, status, message };
};

module.exports = { ResponseHelper };
