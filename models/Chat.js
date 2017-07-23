const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  name:     String,
  image:    String,
  message:  String,
  date:     Date,
  eventId:  Number,
});

module.exports = mongoose.model('Chat', ChatSchema);
