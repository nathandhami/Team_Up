const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  displayName: String,
  email: String,
  password: String,
  image: String,
  facebook: Object,
  twitter: Object,
  google: Object,
});

UserSchema.pre('save', function(next) {
  const user = this;
  const salt = 15;

  if (!user.isModified('password')) return next();

  if (user.password) {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        throw err;
        // return next(err);
      }
      user.password = hash;
      next();
    });
  }
});

UserSchema.methods.comparePassword = function(password, next) {
  bcrypt.compare(password, this.password, (err, res) => {
    if (err) return next(err);
    next(null, res);
  });
};

module.exports = mongoose.model('User', UserSchema);
