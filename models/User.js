const mongoose = require('mongoose');

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


module.exports = mongoose.model('User', UserSchema);
