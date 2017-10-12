var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var businessSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: "Dueño del evento requerido" },
    rut: {
        body: { type: Number, unique: true },
        checker: { type: Number }
    },
    area: { type: String },
    account: { type: String },
    coordinates: { type: String }
});

module.exports = mongoose.model('Business', businessSchema);
