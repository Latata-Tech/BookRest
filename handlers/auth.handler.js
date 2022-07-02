//191110597 - Rizky Kurniawan Pakpahan
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");
const { generateToken } = require("../helpers/jwt.helper");
const { ResponseHelper } = require("../helpers/response.helper");
const { validation } = require("../helpers/validation.helper");

const db = new sqlite3.Database("data.db");

const register = async (name, email, password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    let validationError = validation({ name, email, password });
    if (validationError.data.length > 0) {
      return validationError;
    }
    const isEmailAlreadyUsed = await new Promise((resolve, reject) => {
      checkEmailExist(email, resolve, reject);
    });
    if (isEmailAlreadyUsed) {
      return ResponseHelper(400, "fail", "Email already used");
    }
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, bcrypt.hashSync(password, salt)],
      (err) => {
        if (err) {
          throw new Error(err.message);
        }
      }
    );
    return ResponseHelper(
      201,
      "success",
      "Register success, please sign in to continue"
    );
  } catch (err) {
    return ResponseHelper(500, "fail", err.message);
  }
};

const checkEmailExist = (email, resolve, reject) => {
  db.get("SELECT * FROM users WHERE email=?", [email], (err, data) => {
    if (err) {
      reject(err.message);
    }
    return resolve(data);
  });
};

const authentication = async (email, password) => {
  try {
    let validationError = validation({ email, password });
    if (validationError.data.length > 0) {
      return validationError;
    }
    const isUserExist = await new Promise((resolve, reject) => {
      checkEmailExist(email, resolve, reject);
    });
    if (isUserExist && bcrypt.compareSync(password, isUserExist.password)) {
      let access_token = generateToken(email);
      db.run(
        "INSERT INTO oauth_access_token(user_id, access_token, valid) VALUES (?,?,?)",
        [isUserExist.id, access_token, 1]
      );
      return ResponseHelper(200, "success", "success to authentication", {
        token: access_token,
      });
    }
    return ResponseHelper(400, "fail", "Username or Password not match");
  } catch (err) {
    return ResponseHelper(500, "fail", err.message);
  }
};

const logout = (access_token) => {
  try {
    db.run(
      "UPDATE oauth_access_token SET valid = ? WHERE access_token = ?",
      [0, access_token],
      function (err) {
        if (err) {
          console.log(err.message);
          throw new Error(err.message);
        }
      }
    );
    return ResponseHelper(200, "success", "Success logout");
  } catch (e) {
    ResponseHelper(500, "fail", err.message);
  }
};

module.exports = { register, authentication, logout };
