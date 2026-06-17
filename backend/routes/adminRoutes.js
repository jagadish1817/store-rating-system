const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ TOTAL USERS
router.get("/total-users", (req, res) => {
  const sql = "SELECT COUNT(*) AS total_users FROM users";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

// ✅ TOTAL STORES
router.get("/total-stores", (req, res) => {
  const sql = "SELECT COUNT(*) AS total_stores FROM stores";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

// ✅ TOTAL RATINGS
router.get("/total-ratings", (req, res) => {
  const sql = "SELECT COUNT(*) AS total_ratings FROM ratings";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

module.exports = router;
