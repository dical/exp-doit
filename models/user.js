var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    type: String,
    names: String,
    surnames: String,
    profession: String,
    phone: {
        code: Number,
        number: Number
    },
    mail: String,
    social: {
        facebook: String,
        twitter: String,
        instagram: String
    },
    direction: {
        country: String,
        city: String,
        street: String,
        location: Number
    },
    born: Date,
    signed: Date
});

module.exports = mongoose.model('User', userSchema);
