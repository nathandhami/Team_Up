const mongoose = require('mongoose');
var shortid = require('shortid');

const EventSchema = new mongoose.Schema({
  teamupName: String,
  from: { type: Date },
  to: { type: Date },
  sport: String,
  maxPlayers: Number,
  locationName: String,
  locationAddress: String,
  locationCoordinates: [Number],
  createdBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
  aliasId: {type: String, unique:true, default: shortid.generate},
});

EventSchema.virtual('roomId')
  .get(function() {
    return 'room-' + this.aliasId;
  });


EventSchema.virtual('url')
  .get(function() {
    return '/event/chatroom/' + this.aliasId;
  });

module.exports = mongoose.model('Event', EventSchema);
