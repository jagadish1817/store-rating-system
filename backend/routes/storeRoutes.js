const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { addStore, getAllStores } = require("../controllers/storeController");

router.post("/add", addStore);
router.get("/all", getAllStores);
router.get("/admin/all", (req, res) => {
  const sql = `
    SELECT
      stores.id,
      stores.name,
      stores.email,
      stores.address,
      ROUND(AVG(ratings.rating),1) AS rating
    FROM stores
    LEFT JOIN ratings
      ON stores.id = ratings.store_id
    GROUP BY stores.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});
module.exports = router;
