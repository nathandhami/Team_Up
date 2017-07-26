const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  teamupName: String,
  sport: String,
  locationName: String,
  locationAddress: String,
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Event', EventSchema);
