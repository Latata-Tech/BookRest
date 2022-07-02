//Rizky Kurniawan pakpahan
const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const currentDateTime = require("../helpers/date.helper");
const { authenticationToken } = require("../helpers/jwt.helper");
const { validation } = require("../helpers/validation.helper");
const db = new sqlite3.Database("data.db");
const io = require("../socket");
const { getAuthors, getAuthor } = require("../handlers/author.handler");

router.get("/", authenticationToken, (req, res) => {
  db.all("SELECT id, nama FROM author", (err, data) => {
    if (err) {
      res.send(err.message);
      return;
    }
    res.send(data);
  });
});

router.post("/", authenticationToken, async (req, res) => {
  const { id, nama, jeniskelamin, tahunlahir } = req.body;
  let validationError = validation({ id, jeniskelamin, nama, tahunlahir });
  if (validationError.data.length > 0) {
    res.status(400).send(validationError);
  } else {
    if (await getAuthor(id)) {
      res.status(409);
      res.send({
        status: "fail",
        message: "Author ID Already Exist!",
      });
    } else {
      db.run(
        "INSERT INTO author (id, nama, jk, tahun_lahir, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
        [
          id,
          nama,
          jeniskelamin,
          tahunlahir,
          new Date().getTime(),
          new Date().getTime(),
        ],
        async function (err) {
          if (err) {
            res.send(err.message);
            return;
          }
          io.emit("author", await getAuthors());
          res.status(201);
          res.end();
        }
      );
    }
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
  db.run("DELETE FROM author WHERE id=?", [req.params.id], async (err) => {
    if (err) {
      res.send(err.message);
      return;
    }
    io.emit("author", await getAuthors());
    res.status(204);
    res.end();
  });
});

router.put("/:id", authenticationToken, async (req, res) => {
  const { nama, jk, tahun_lahir } = req.body;
  let validationError = validation({ jk, nama, tahun_lahir });
  if (validationError.data.length > 0) {
    res.status(400).send(validationError);
  } else {
    db.run(
      "UPDATE author SET nama=?, jk=?, tahun_lahir=?, updated_at=? WHERE id=?",
      [nama, jk, tahun_lahir, new Date().getTime(), req.params.id],
      async function (err) {
        if (err) {
          res.status(400).send(err.message);
          return;
        }
        io.emit("author", await getAuthors());
        io.emit("detail_author", await getAuthor(req.params.id));
        res.status(200);
        res.end();
      }
    );
  }
});

module.exports = router;
