var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: 'Nombre de usuario requerido', unique : true },
    password: { type: String, required: "Contraseña requerida", select: false },
    state: { type: String, default: 'signed', enum: ["enable", "disabled", "signed"], select: false },
    names: { type: String, required: "Nombre(s) requeridos" },
    surnames: String,
    phrase: { type: String, default: 'wubba lubba dub dub' },
    business: {
        rut: {
            body: { type: Number, unique: true, sparse: true },
            checker: Number
        },
        area: String,
        account: String,
        coordinates: String
    },
    phone: {
        code: Number,
        number: Number
    },
    mail: { type: String, required: "Correo electronico requerido", unique : true },
    social: {
        facebook: {
            uid: String,
            accessToken: String,
            provider: String
        },
        twitter: {
            uid: String,
            accessToken: String,
            provider: String
        },
        google: {
            uid: String,
            accessToken: String,
            provider: String
        }
    },
    address: {
        city: String,
        number: Number,
        street: String
    },
    born: { type: Date, select: false },
    signed: { type: Date, default:  Date.now, select: false },
    image: String
});

module.exports = mongoose.model('User', userSchema);
