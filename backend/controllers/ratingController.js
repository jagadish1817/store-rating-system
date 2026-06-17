const db = require("../config/db");

const submitRating = (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const sql = "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

  db.query(sql, [user_id, store_id, rating], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Rating Submitted Successfully",
    });
  });
};

const updateRating = (req, res) => {
  const { user_id, store_id, rating } = req.body;

  const sql =
    "UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?";

  db.query(sql, [rating, user_id, store_id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Rating Updated Successfully" });
  });
};
module.exports = { submitRating, updateRating };
