const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../services/userService");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await registerUser(email, password);
    res
      .status(201)
      .json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await loginUser(email);
    res.json({ message: "Login successful", uid: userRecord.uid });
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid credentials", error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await logoutUser();
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout", error: error.message });
  }
});

module.exports = router;
