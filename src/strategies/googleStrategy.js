'use strict';

const nconf = require('../config/nconfConfig');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = () => {
  passport.use(new GoogleStrategy({
      clientID: nconf.get('google:clientID'),
      clientSecret: nconf.get('google:clientSecret'),
      callbackURL: nconf.get('google:callbackURL')
    },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function(err, user) {
      //   done(err, user);
      // });

      const user = {
        email: profile.emails[0].value,
        image: profile._json.image.url,
        displayName: profile.displayName,
        google: {
          id: profile.id,
          token: accessToken
        }
      };

      done(null, profile);
    }));
};
