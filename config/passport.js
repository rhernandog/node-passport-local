const localStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// User model
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return done(null, false, { message: "The email is not registered" });
          }
          // Check that the password mathces
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return done(null, false, { message: "Incorrect password" });
          }
          // The password is correct
          return done(null, user);
        } catch (err) {
          // eslint-disable-next-line
          console.log(err);
          return done(null, false, { message: "Invalid username or password" });
        }
        
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
