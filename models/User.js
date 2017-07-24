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
  const saltRound = 10;

  if (!user.isModified('password')) return next();

  if (user.password) {
    bcrypt.hash(user.password, saltRound, (err, hash) => {
      if (err) {
        throw err;
        // return next(err);
      }
      user.password = hash;
      next();
    });
  }
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
