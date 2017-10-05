var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var clientSchema = new Schema({
    rut: { type: String, required: "Rut del cliente requerido" },
    name: { type: String, required: "Nombre del cliente requerido" },
    area: { type: String, required: "Rubro del cliente requerido" },
    account: { type: String, required: "Cuenta corriente del cliente requerido" },
    phone: {
        code: Number,
        number: Number
    },
    mail: { type: String, required: "Correo electronico del cliente requerido" },
    direction: {
        city: { type: String, required: "Ciudad del cliente requerida" },
        street: { type: String, required: "Calle del cliente requerida" },
        number: { type: Number, required: "Numero de la ubicacion del cliente requerido" }
    },
    coordinates: { type: String, required: "Coordenadas de la ubicacion del cliente requerido" },
    admins: [ String ],
    signed: Date
});

module.exports = mongoose.model('Client', clientSchema);
