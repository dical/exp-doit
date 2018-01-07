var TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy =require('passport-google-oauth').OAuth2Strategy,
    User = require('./models/user.js').User,
    config = require("./config.js");


var passport =require('passport');
var mongoose = require('mongoose');

module.exports = function(passport) {
    //configurar nuestra autenticacion
    //1. definir la estrategiaco
    
 passport.use(new FacebookStrategy({
         clientID: config.facebook.id,
         clientSecret:config.facebook.secret,
         callbackURL:'http://localhost:8081/auth/facebook/callback',
         profileFields: ['id', 'displayName', 'photos', 'email']
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
        User.findOne({social:{facebook:{uid:profile.id}},social:{facebook:{provider:profile.provider}}}, function(err,user){
                if(err) throw(err);
                if(!err && user!= null) return cb(null, user);
            var user= new User({
                username:profile.displayName,
                mail:profile.emails[0].value,
                social:{
                    facebook:{
                                accessToken: accessToken,
                                provider: profile.provider,
                                uid: profile.id 
                            }
                }
            });
            //user.save(function(err) {
                //if(err) throw err;
                cb(null, user);
            //});
             //cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
        });
}));

        //definir com guardar el usuario en la session
    passport.serializeUser(function(user, done){
        //obtener el id y guardarlo dentro de la session
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
                //console.log(user._id);
            });
        //done(null, user);


    });
        // definir como vamos a retomar el usuario de la session
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user) {
            done(err, user);
            //console.log("hola usuario", user.username);
         //   console.log("hola usuario", user.email);
          //  if(user.name == null){
           //     console.log("el usuario debe ingresar mas datos");
          //  }
       });
        //aca se busca en la base de dats y se muestra el usuario
        //done(null, obj);
    });
}



