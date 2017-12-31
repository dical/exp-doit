var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var momentSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    event: { type: Schema.ObjectId, ref: 'Event' },
    img: String,
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Moment', momentSchema);