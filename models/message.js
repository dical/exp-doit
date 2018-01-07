var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var message = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    },
    details: String,
    date: {
        type: Date,
        default: Date.now()
    },
    responses: {
        type: [{
            type: Schema.ObjectId,
            ref: 'Message'
        }],
        default: undefined
    }
});

module.exports = mongoose.model('Message', message);