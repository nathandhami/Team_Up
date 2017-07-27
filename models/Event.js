const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  teamupName: String,
  from: { type: Date },
  to: { type: Date },
  sport: String,
  locationName: String,
  locationAddress: String,
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
});


EventSchema.virtual('url')
  .get(function() {
    return '/event/' + this._id;
  });

module.exports = mongoose.model('Event', EventSchema);
