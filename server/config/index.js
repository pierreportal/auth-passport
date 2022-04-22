// We reuse this import in order to have access to the `body` property in requests
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const MONGO_URI = require("../utils/consts");

const passport = require('passport');
require('./passport');

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(
    session({
      secret: "truc",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      },
    })
  );

  // app.use(passport.initialize());
  // app.use(passport.session());
  app.use(passport.authenticate('session'));

  app.use((req, res, next) => {
    //   req.user = req.session.user;
    console.log('USE', req.session)
    next()
  })
};
