
/*var mongoose = require('mongoose')
    , Schema = mongoose.Schema;




var userSchema = new Schema({
    username: { type: String, minlength:[5, "El nombre de usuario es muy corto"],maxlength:[30, "El nombre de usuario es muy Largo"]},
    password: { 
        type: String,
        select: false,
        minlength:[9, "la Clave es muy corta"]
    },
    state: { type: String, enum: ["enable"], select: false },
    names: { type: String, },
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
    mail: { type: String},
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
                }
    },
    direction: {
        city: String,
        street: String,
        location: Number
    },
    born: { type: Date,  select: false },
    signed: { type: Date, default:  Date.now, select: false },
    image: { type: String, default: "/images/landscape.jpg" }
});


 //crear el modelo
var User = mongoose.model("User", userSchema);
//exportar el modelo
module.exports.User = User;*/




var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, required: "Nombre de usuario requerido", unique : true },
    password: { type: String, required: "Contraseña requerida", select: false },
    state: { type: String, enum: ["enable"], select: false },
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
    direction: {
        city: String,
        street: String,
        location: Number
    },
    born: { type: Date, required: "Fecha de nacimiento requerida", select: false },
    signed: { type: Date, default:  Date.now, select: false },
    image: { type: String, default: "/images/landscape.jpg" }
});

module.exports = mongoose.model('User', userSchema);
