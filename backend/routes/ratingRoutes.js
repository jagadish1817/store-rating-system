const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/submit", (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const checkSql = "SELECT * FROM ratings WHERE user_id = ? AND store_id = ?";

  db.query(checkSql, [user_id, store_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      const updateSql =
        "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?";

      db.query(updateSql, [rating, user_id, store_id], (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Rating Updated Successfully",
        });
      });
    } else {
      const insertSql =
        "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

      db.query(insertSql, [user_id, store_id, rating], (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: "Rating Submitted Successfully",
        });
      });
    }
  });
});

router.put("/update", (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const sql =
    "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?";

  db.query(sql, [rating, user_id, store_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json({ message: "Rating Updated Successfully" });
  });
});

router.get("/average/:store_id", (req, res) => {
  const { store_id } = req.params;

  const sql =
    "SELECT AVG(rating) AS average_rating FROM ratings WHERE store_id = ?";

  db.query(sql, [store_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

router.get("/store/:store_id/users", (req, res) => {
  const { store_id } = req.params;

  const sql = `
    SELECT 
      users.name,
      users.email,
      ratings.rating
    FROM ratings
    JOIN users ON users.id = ratings.user_id
    WHERE ratings.store_id = ?
  `;

  db.query(sql, [store_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});
module.exports = router;
