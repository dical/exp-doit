var mongoose = require('mongoose');

var TwitterStrategy =  require('passport-twitter').Strategy,
    FacebookStrategy =  require('passport-facebook').Strategy,
    User = require('./models/user.js').User,
    GoogleStrategy =require('passport-google-oauth').OAuth2Strategy;
var passport =require("passport");
var config=require("./config.js");


module.exports = function(passport){
    
    //configurar nuestra autenticacion
    //1. definir la estrategia
    passport.use(new FacebookStrategy({
         clientID: config.facebook.id,
         clientSecret:config.facebook.secret,
         callbackURL:'http://doitexp.com/auth/facebook/callback',
         profileFields: ['id', 'displayName', 'photos', 'email']
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
        User.findOne({social:{facebook:{uid:profile.id}},social:{facebook:{provider:profile.provider}}}, function(err,user){
            if(err) throw(err);
            if(!err && user!= null) return cb(null, user);
            var user= new User({
                usernames:profile.displayName,
                email:profile.emails[0].value,
                social:{
                    facebook:{
                                accessToken: accessToken,
                                provider: profile.provider,
                                uid: profile.id }
                        }
                });
            user.save(function(err) {
                if(err) throw err;
                cb(null, user);
            });
             //cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
        });
}));
//configurar nuestra autenticacion CON TWITTER
    //1. definir la estrategia
    passport.use(new TwitterStrategy({
         consumerKey: config.twitter.key,
         consumerSecret:config.twitter.secret,
         callbackURL:'http://www.doitexp.com/auth/twitter/callback'
    },function(accessToken, refreshToken, profile, cb){
    //guardar en la bd
        User.findOne({social:{twitter:{uid:profile.id}}, social:{twitter:{provider:profile.provider}}}, function(err,user){
            if(err) throw(err);
            if(!err && user!= null) return cb(null, user);
            var user= new User({
                usernames:profile.displayName,
                social:{
                    twitter:{
                            accessToken: accessToken,
                            provider: profile.provider,
                            uid: profile.id
                    }
                }

            });
            user.save(function(err) {
                if(err) throw err;
                cb(null, user);
            });
             //cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
        });
}));
//configurar nuestra autenticacion CON GOOGLE PLUS
    //1. definir la estrategia
    passport.use(new GoogleStrategy({
         clientID: config.google.id,
         clientSecret:config.google.secret,
         callbackURL:'http://doitexp.com/auth/google/oauth2callback',
         profileFields: ['id', 'displayName', 'photos', 'email']
    },function(accessToken, refreshToken, profile, cb){
//guardar en la bd
        User.findOne({social:{google:{uid:profile.id}}, social:{google:{provider:profile.provider}}}, function(err,user){
            if(err) throw(err);
            if(!err && user!= null) return cb(null, user);
            var user= new User({
                usernames:profile.displayName,
                email:profile.emails[0].value,
                social:{
                    google:{
                        accessToken: accessToken,
                        provider: profile.provider,
                        uid: profile.id
                    }
                }  
            });
            user.save(function(err) {
                if(err) throw err;
                cb(null, user);
            });
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
            console.log("hola usuario", user.usernames);
            if(user.name == null){
                console.log("el usuario debe ingresar mas datos");
            }
        });
        //aca se busca en la base de dats y se muestra el usuario
        //done(null, obj);
    });

}

