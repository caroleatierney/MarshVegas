//***********************************************
//***************** back end ********************
//***********************************************
//****** sends the request to db postgresql *****
//***********************************************

const express = require("express");
const router = express.Router();
const postgres = require("./postgres.js");

// ==================================================
// ===================== GET ========================
// ==================================================
postgresql: router.get("/", (req, res) => {
  postgres.query(`SELECT * FROM MarshVegasBeaches ORDER BY id ASC;`, (err, results) => {
    res.json(results.rows);
  });
});

// ==================================================
// ===================== POST =======================
// ==================================================
router.post("/", (req, res) => {
  // console.log("create-id", req.body)

  postgres.query(
    `INSERT INTO MarshVegasBeaches (name, photo, photo_credit, access, parking, hours, avail_rec, notes)
    VALUES
    (
    '${req.body.name}',
    '${req.body.photo}',
    '${req.body.photo_credit}',
    '${req.body.access}',
    '${req.body.parking}',
    '${req.body.hours}',
    '${req.body.avail_rec}',
    '${req.body.notes}'
    )
  `,
    (err, results) => {
      if (err) {
        res.status(500).json(err);
        console.log(err);
      } else {
        postgres.query(
          `SELECT * FROM MarshVegasBeaches ORDER BY id ASC;`,
          (err, results) => {
            res.json(results.rows);
          }
        );
      }
    }
  );
});

// ==================================================
// ================== DELETE ========================
// ==================================================
router.delete("/:id", (req, res) => {
  // console.log("delete-id", req.params.id)

  postgres.query(
    `DELETE FROM MarshVegasBeaches WHERE id = ${req.params.id};`,
    (err, results) => {
      postgres.query(
        `SELECT * FROM MarshVegasBeaches ORDER BY id ASC;`,
        (err, results) => {
          res.json(results.rows);
        }
      );
    }
  );
});

// ==================================================
// ===================== PUT ========================
// ==================================================
router.put("/:id", (req, res) => {
  console.log("update/put-res", req.params.id);

  postgres.query(
    `
    UPDATE MarshVegasBeaches

    SET
    name='${req.body.name}',
    photo='${req.body.photo}',
    photo_credit='${req.body.photo_credit}',
    access='${req.body.access}',
    parking='${req.body.parking}',
    hours='${req.body.hours}',
    avail_rec='${req.body.avail_rec}',
    notes='${req.body.notes}'

    WHERE id = ${req.params.id};`,
    (err, results) => {
      postgres.query(
        "SELECT * FROM MarshVegasBeaches ORDER BY id ASC;",
        (err, results) => {
          res.json(results.rows);
        }
      );
    }
  );
});

module.exports = router;
