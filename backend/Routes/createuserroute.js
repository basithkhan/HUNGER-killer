const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "thisisajwtsecrettokenbasithkhans";

router.post(
  "/createuser",
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    }

    try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.json({ success: false, message: 'User with this email already exists' });
      }

      // If the user does not exist, proceed with creating a new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        location: req.body.location,
      });

      res.json({ success: true, message: 'User created successfully' });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error creating user' });
    }
  }
);

router.post(
  "/loginuser",
  body("email", "Invalid email").isEmail(),
  body("password", "Invalid password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    }

    const email = req.body.email;
    try {
      const userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Please check your email or password" });
      }

      const passwordMatch = await bcrypt.compare(req.body.password, userData.password);

      if (!passwordMatch) {
        return res.status(400).json({ errors: "Please check your email or password" });
      }
const data = {
  user:{
    id:userData.id
  }
}
const authToken = jwt.sign(data, jwtSecret)
return res.json({success:true, authToken:authToken})      
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: 'Error during login' });
    }
  }
);

module.exports = router;
