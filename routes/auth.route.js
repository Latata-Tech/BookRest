//191110597 - Rizky Kurniawan Pakpahan
const e = require("express");
const express = require("express");
const router = express.Router();
const {
  register,
  authentication,
  logout,
} = require("../handlers/auth.handler");
const { authenticationToken } = require("../helpers/jwt.helper");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let response = await authentication(email, password);
  res.status(response.statusCode);
  res.send(response);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let response = await register(name, email, password);
  res.status(response.statusCode);
  res.send(response);
});

router.post("/logout", authenticationToken, (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  let response = logout(token);
  res.status(response.statusCode);
  res.send(response);
});

module.exports = router;
