// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
const express = require("express");
require("dotenv/config");
require("./db");


const app = express();
require("./config")(app);
// require('./config/passport');

const passportAuthRoutes = require("./routes/auth-passport.routes");
app.use("/api", passportAuthRoutes);

require("./error-handling")(app);

module.exports = app;
