var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: { type: String, required: "Nombre del evento requerido" },
    own: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: "Dueño del evento requerido" },
    details: String,
    start: { type: Date, required: "Fecha de inicio requerida" },
    end: { type: Date, required: "Fecha de termino requerida" },
    phone: {
        code: Number,
        number: Number
    },
    address: {
        city: { type: String, required: "Ciudad del eventa requerida" },
        street: { type: String, required: "Calle del evento requerida" },
        number: { type: Number, required: "Numero de la ubicacion del evento requerido" }
    },
    coordinates: { type: String, required: "Coordenadas del evento requeridas" },
    price: { type: Number, required: "Precio del evento requerido" },
    quotas: { type: Number, required: "Cupos del eventos requeridos" }
});

module.exports = mongoose.model('Event', eventSchema);
