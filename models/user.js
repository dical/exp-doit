var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        required: 'Nombre de usuario requerido',
        type: String,
        unique : true
    },
    password: {
        type: String,
        required: 'Contraseña requerida',
        select: false
    },
    state: {
        type: String,
        enum: [ 'enabled', 'signed', 'disabled' ],
        select: false
    },
    names: {
        type: String,
        required: 'Nombre(s) requerido(s)'
    },
    surnames: String,
    phrase: {
        type: String,
        default: 'Edita tu frase en la rueda ubicada en la parte superior derecha'
    },
    business: {
        rut: {
            body: {
                type: Number,
                unique: true,
                sparse: true
            },
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
    mail: {
        type: String,
        required: 'Correo electronico requerido',
        unique : true
    },
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
        street: String,
        number: Number
    },
    born: {
        max: Date.now(),
        required: 'Fecha de nacimiento requerida',
        select: false,
        type: Date
    },
    sex: {
        type: String,
        enum: [ 'm', 'f' ]
    },
    signed: {
        type: Date,
        default: Date.now,
        select: false
    },
    image: {
        type: String,
        default: '/images/landscape.jpg'
    },
    agreement: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);
