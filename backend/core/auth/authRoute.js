const express = require("express");
const { generateModel } = require("../api/genericModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../../middlewares/authorization");
const router = express.Router();

// Define a function to set up dynamic routes
function setupAuth(resource) {
  const { name, schema } = resource;
  const userModel = generateModel(name, schema);

  // Register a new user
  router.post("/register", async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        // Bulk registration for an array of users
        const hashedUsers = [];

        for (const user of req.body) {
          if (!user.password) {
            return res
              .status(400)
              .json({ error: "Password is required for all users" });
          }

          // Generate a salt and hash the user's password
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);

          // Create a new user in the database with the hashed password
          const newUser = await userModel.create({
            ...user,
            password: hashedPassword,
          });

          hashedUsers.push(newUser);
        }

        res
          .status(201)
          .json({
            message: "Users registered successfully",
            users: hashedUsers,
          });
      } else {
        // Single user registration
        const { password } = req.body;

        if (!password) {
          return res.status(400).json({ error: "Password is required" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
          ...req.body,
          password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", user });
      }
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "An error occurred while registering the user(s)" });
    }
  });

  //get user

  router.get("/user", auth, async (req, res) => {
  const username = req.user;
    try {
  
        const User = await userModel.findOne({ username: username });
        return res.status(200).json(User);

    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // Login a user
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      // Find the user in the database by their username or email
      const user = await userModel.findOne({
        $or: [
          { username },
          { email: username }, // Assuming email field exists in the user model
        ],
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        if (user.active) {
          const accessToken = jwt.sign(
            user.username,
            process.env.ACCESS_TOKEN_SECRET
          );
          res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            user: user,
          });
        } else {
          res.status(401).json({
            message:
              "You are not allowed to access this account. Contact system admin for more information",
          });
        }
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  });

  return router;
}

module.exports = { setupAuth };
