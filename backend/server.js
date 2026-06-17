const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Server Running Successfully");
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected Route",
    user: req.user,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
