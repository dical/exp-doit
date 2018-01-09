var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var rank = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    ranker: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    value: {
        default: 0,
        type: Number
    }
});

rank.index({ ranker: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Rank', rank);
