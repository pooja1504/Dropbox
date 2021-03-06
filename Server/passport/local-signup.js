const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
 console.log("its local-signup main");
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim()
  };

console.log("its local-signup"+userData.firstName);
  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});