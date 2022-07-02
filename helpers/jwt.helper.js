//191110597 - Rizky Kurniawan Pakpahan
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { isAccessTokenValid } = require("../handlers/jwt.handler");
const { ResponseHelper } = require("./response.helper");
dotenv.config();

const generateToken = (email) => {
  return jwt.sign(
    {
      data: email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 24 * 60 * 60 * 1000,
    }
  );
};

const authenticationToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    const tokenValid = await isAccessTokenValid(token);
    if (tokenValid) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    } else if (tokenValid instanceof Error) {
      throw tokenValid;
    } else {
      res.status(400).send(ResponseHelper(400, "fail", "Token invalid"));
    }
  } catch (err) {
    return ResponseHelper(500, "fail", err.message);
  }
};
module.exports = { authenticationToken, generateToken };
