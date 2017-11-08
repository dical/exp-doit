var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var notifySchema = new Schema({
    name: String,
    user: { type: Schema.ObjectId, ref: 'User' },
    event: { type: Schema.ObjectId, ref: 'Event' },
    details: String,
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Notify', notifySchema);
