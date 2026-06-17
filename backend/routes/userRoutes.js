const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");

// GET ALL USERS
router.get("/all", (req, res) => {
  const sql = `
    SELECT
      id,
      name,
      email,
      address,
      role
    FROM users
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

// CHANGE PASSWORD
router.put("/change-password", async (req, res) => {
  try {
    const { userId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "UPDATE users SET password=? WHERE id=?",
      [hashedPassword, userId],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({
          message: "Password Updated Successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
