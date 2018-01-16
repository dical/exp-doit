var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: "Nombre de usuario requerido", unique : true },
    password: { type: String, default: 'doitexp@2018', required: "Contraseña requerida", select: false },
    state: { type: String, enum: ["enable", "signed", "disabled"], default: "signed" },
    names: { type: String, required: "Nombre(s) requeridos" },
    surnames: String,
    phrase: { type: String, default: 'Edita tu frase en la rueda ubicada en la parte superior derecha' },
    business: {
        rut: {
            body: { type: Number, unique: true, sparse: true },
            checker: { type: Number }
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
        facebook: {uid:String,
                    accessToken:String,
                    provider:String
                },
        twitter: {uid:String,
                    accessToken:String,
                    provider:String
                },
        google: {uid:String,
                    accessToken:String,
                    provider:String
                },
    },
    address: {
        city:String,
        street: String,
        number: Number
    },
    born: { type: Date, required: "Fecha de nacimiento requerida", select: false },
    signed: { type: Date, default:  Date.now, select: false },
    image: { type: String, default: "/images/landscape.jpg" }
});

module.exports = mongoose.model("User", userSchema);

