var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var notification = new Schema({
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    },
    activity: String,
    details: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Notification', notification);
