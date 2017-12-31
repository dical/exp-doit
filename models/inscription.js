var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var inscription = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    event: {
        type: Schema.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

inscription.index({ event: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Inscription', inscription);