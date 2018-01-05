var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
<<<<<<< HEAD

var promise = mongoose.connect('mongodb://localhost/douglas', {
  useMongoClient: true
});



var userSchema = new Schema({
<<<<<<< HEAD
    username: { type: String, minlength:[5, "El nombre de usuario es muy corto"],maxlength:[30, "El nombre de usuario es muy Largo"]},
    password: { 
        type: String,
        select: false,
        minlength:[9, "la Clave es muy corta"]
    },
=======
    username: { type: String, required: "Nombre de usuario requerido", unique : true },
    password: { type: String, required: "Contraseña requerida", select: false },
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
=======

var userSchema = new Schema({
    username: { type: String, required: "Nombre de usuario requerido", unique : true },
    password: { type: String, required: "Contraseña requerida", select: false },
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
    state: { type: String, enum: ["enable"], select: false },
    names: { type: String, },
    surnames: String,
    phrase: { type: String, default: 'wubba lubba dub dub' },
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
<<<<<<< HEAD
<<<<<<< HEAD
    mail: { type: String},
=======
    mail: { type: String, required: "Correo electronico requerido", unique : true },
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
=======
    mail: { type: String, required: "Correo electronico requerido", unique : true },
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
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

<<<<<<< HEAD
<<<<<<< HEAD

 //crear el modelo
var User = mongoose.model("User", userSchema);
//exportar el modelo
module.exports.User = User;

//module.exports = mongoose.model('User', userSchema);

//importar las dependencias
/*
var mongoose =require("mongoose"),
Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// Using `mongoose.connect`...
var promise = mongoose.connect('mongodb://localhost/dbfacebook', {
  useMongoClient: true,
  /* other options 
});
// Or

 //mongoose.connect(setup.db, { useMongoClient: true });

 var user_schema = new Schema({
    username: { type: String},
    //email: { type: String, required: "Correo electronico requerido", unique : true },
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
        instagram: {uid:String,
                    accessToken:String,
                    provider:String
                }
    }
   
 });

 //crear el modelo
var User = mongoose.model("User", user_schema);
//exportar el modelo
module.exports.User = User;*/
=======
=======
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
module.exports = mongoose.model('User', userSchema);
>>>>>>> d0b62756bcf66c38a6ed3291a566d9379e049503
