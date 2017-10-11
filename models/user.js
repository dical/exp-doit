var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: "Nombre de usuario requerido", unique : true },
    password: { type: String, required: "Contraseña requerida", select: false },
    state: { type: String, enum: ["enable"], select: false },
    names: { type: String, required: "Nombre(s) requeridos" },
    surnames: { type: String },
    phrase: String,
    business: {
        rut: {
            body: { type: Number, unique: true },
            checker: { type: Number }
        },
        area: { type: String },
        account: { type: String },
        coordinates: { type: String }
    },
    phone: {
        code: Number,
        number: Number
    },
    mail: { type: String, required: "Correo electronico requerido", unique : true },
    social: {
        facebook: String,
        twitter: String,
        instagram: String
    },
    direction: {
        city: String,
        street: String,
        location: Number
    },
    born: { type: Date, required: "Fecha de nacimiento requerida", select: false },
    signed: { type: Date, default:  Date.now, select: false }
});

module.exports = mongoose.model('User', userSchema);
