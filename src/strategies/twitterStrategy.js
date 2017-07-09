'use strict';

const nconf = require('../config/nconfConfig');
const passport = require('passport');
const User = require('../../models/User');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
  passport.use(new TwitterStrategy({
      consumerKey: nconf.get('twitter:consumerKey'),
      consumerSecret: nconf.get('twitter:consumerSecret'),
      callbackURL: nconf.get('twitter:callbackURL'),
      passReqToCallback: true,
    },
    (req, token, tokenSecret, profile, done) => {
      const query = {
        'twitter.id': profile.id,
      };
      // console.log(profile);

      const fullName = profile.displayName.split(' ');
      const firstName = fullName[0];
      const lastName = fullName[fullName.length - 1];

      User.findOne(query, (err, user) => {
        if (!user) {
          const userDocument = new User({
            // email: profile.emails[0].value,
            firstname: firstName,
            lastname: lastName,
            image: profile._json.profile_image_url,
            displayName: profile.displayName,
            twitter: {
              id: profile.id,
              token: token,
            },
          });
          userDocument.save((err, user) => {
            if (err) throw err;
            done(null, user);
          });
        } else {
          done(null, user);
        }
      });
    }));
};