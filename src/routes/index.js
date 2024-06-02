const express = require("express");
const router = express.Router();

PORT = process.env.PORT;
router.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: `Welcome, the server is serving`,
  });
});

module.exports = router;
