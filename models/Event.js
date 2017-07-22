const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  teamupName: String,
  sport: String,
  locationName: String,
  locationAddress: String,
});

module.exports = mongoose.model('Event', EventSchema);
