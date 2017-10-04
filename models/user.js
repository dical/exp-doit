var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: "Nombre de usuario requerido" },
    password: { type: String, required: "Contraseña requerida" },
    type: { type: String, enum: ["user"] },
    names: { type: String, required: "Nombre(s) requeridos" },
    surnames: { type: String, required: "Apellido(s) requeridos" },
    profession: String,
    phone: {
        code: Number,
        number: Number
    },
    mail: { type: String, required: "Correo electronico requerido" },
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
    born: { type: Date, required: "Fecha de nacimiento requerida" },
    signed: { type: Date, required: "Fecha de registro requerida" }
});

module.exports = mongoose.model('User', userSchema);
