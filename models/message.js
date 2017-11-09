var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var messageSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    event: { type: Schema.ObjectId, ref: 'Event' },
    type: { type: String, enum: ['comment', 'notify', 'activity'], default: 'comment' },
    details: String,
    date: { type: Date, default: Date.now() },
    responses: [{ type: Schema.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Message', messageSchema);