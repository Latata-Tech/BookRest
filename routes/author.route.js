//191110597 - Rizky Kurniawan Pakpahan
const express = require("express");
const sqlite3 = require("sqlite3");
const currentDateTime = require("../helpers/date.helper");
const router = express.Router();
const { authenticationToken } = require("../helpers/jwt.helper");
const { validation } = require("../helpers/validation.helper");
const db = new sqlite3.Database("data.db");

router.get("/", authenticationToken, (req, res) => {
  db.all("SELECT id, nama FROM author", (err, data) => {
    if (err) {
      res.send(err.message);
      return;
    }
    res.send(data);
  });
});

router.post("/", authenticationToken, (req, res) => {
  const { id, nama, jk, tahun_lahir } = req.body;
  let validationError = validation({ id, jk, nama, tahun_lahir });
  if (validationError.data.length > 0) {
    res.status(400).send(validationError);
  } else {
    db.run(
      "INSERT INTO author (id, nama, jk, tahun_lahir,created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [id, nama, jk, tahun_lahir, currentDateTime(), currentDateTime()],
      function (err) {
        if (err) {
          res.send(err.message);
          return;
        }
        console.log("Inserted " + this.changes + " record");
        res.status(201);
        res.end();
      }
    );
  }
});

router.get("/:id", authenticationToken, (req, res) => {
  db.get("SELECT * FROM author WHERE id=?", [req.params.id], (err, data) => {
    if (err) {
      res.send(err.message);
      return;
    }
    res.send(data);
  });
});

router.delete("/:id", authenticationToken, (req, res) => {
  db.run("DELETE FROM author WHERE id=?", [req.params.id], (err) => {
    if (err) {
      res.send(err.message);
      return;
    }
    console.log("Updated " + this.changes + " record");
    res.status(204);
    res.end();
  });
});

router.put("/:id", authenticationToken, (req, res) => {
  const { nama, jk, tahun_lahir } = req.body;
  let validationError = validation({ jk, nama, tahun_lahir });
  if (validationError.data.length > 0) {
    res.status(400).send(validationError);
  } else {
    db.run(
      "UPDATE author SET nama=?, jk=?, tahun_lahir=?, updated_at=? WHERE id=?",
      [nama, jk, tahun_lahir, currentDateTime(), req.params.id],
      function (err) {
        if (err) {
          res.status(400).send(err.message);
          return;
        }
        console.log("Updated " + this.changes + " record");
        res.status(200);
        res.end();
      }
    );
  }
});

module.exports = router;
