const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    console.log("Received Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    const verified = jwt.verify(token.trim(), process.env.JWT_SECRET);

    req.user = verified;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
