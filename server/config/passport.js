// config/passport.js

const User = require('../models/User.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // !!!
const passport = require('passport');

passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
        cb(err, userDocument);
    });
});

passport.use(
    new LocalStrategy((username, password, next) => {
        User.findOne({ username }, (err, foundUser) => {
            if (err) {
                next(err);
                return;
            }

            if (!foundUser) {
                next(null, false, { message: 'Incorrect username.' });
                return;
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                next(null, false, { message: 'Incorrect password.' });
                return;
            }

            next(null, foundUser);
        });
    })
);
