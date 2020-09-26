const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  const messages = req.flash();
  res.render("login", { messages });
});

// User Login Post
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register");
});

// Register User Route
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  // Check all fields are added
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill all the fields" });
  }
  // Check matching passwords
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 8 characters long" });
  }
  // Check if there is any errors in the registration form
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    // Validation passed
    try {
      const userExists = await User.findOne({ email });
      // Email already used
      if (userExists) {
        errors.push({ msg: "There is already a user with that email address. Please use a dfferent one" });
        return res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      }
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      // No user registered with that email
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      newUser.save()
        .then(() => {
          req.flash("success_msg", "You are registered and you can login.");
          res.redirect("/users/login");
        })
        .catch(e => res.json({ error: e }));
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      res.json({ error: err });
    }
  }
});

// Logout -> redirect
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
