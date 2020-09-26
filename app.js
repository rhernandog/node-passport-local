const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");

const flash = require("connect-flash");
const session = require("express-session");

const connectToDb = require("./db/index");
connectToDb();

// Init Passport config
require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(expressLayouts);
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Add Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routing
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

// eslint-disable-next-line
app.listen(PORT, console.log(`server started on port ${PORT}`));
