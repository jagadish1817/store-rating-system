const db = require("../config/db");

const addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  const sql = "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)";

  db.query(sql, [name, email, address, owner_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Store Added Successfully",
    });
  });
};

const getAllStores = (req, res) => {
  const sql = "SELECT * FROM stores";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

module.exports = { addStore, getAllStores ,};
