const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// Create a user using POST : "/api/auth/createuser" without authentication
router.post(
  "/createuser",
  // Validation part:
  [
    body("name", "Enter a valid name").isLength({ min: 4 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    // Write validation result based on request incoming
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    // Find whether the user with the same email is present or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Creating a secured password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      // Send a token using JWT - JSON Web Token
      const JWT_secret = "kasturi@@@loves###kunal";
      const data = {
        user: {
          id: user.id,
        },
      };

      const tokenAuth = jwt.sign(data, JWT_secret);
      res.json({
        authToken: tokenAuth,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// Authenticate a user using POST "/api/auth/login", NO login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log("User found:", user);
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please check your credentials and try again" });
      }

      const passCompare = await bcrypt.compare(password, user.password);
      console.log("Password match:", passCompare);
      if (!passCompare) {
        return res
          .status(400)
          .json({ error: "Please check your credentials and try again" });
      }

      const JWT_secret = "kunal@@@kasuu@@taware###";
      const data = {
        user: {
          id: user.id,
        },
      };

      const tokenAuth = jwt.sign(data, JWT_secret);
      res.json({ authToken: tokenAuth });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
