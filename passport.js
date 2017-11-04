var mongoose = require('mongoose');
var User = require("./models/user.js").User;

var TwitterStrategy =  require('passport-twitter').Strategy,
    FacebookStrategy =  require('passport-facebook').Strategy,
    GoogleStrategy =require('passport-google-oauth').OAuth2Strategy;
var passport =require("passport");
var config=require("./config.js");


module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		User.findById(obj, function(err, user) {
            done(err, user);
    
        //done(null, obj);
        });
	});

	
    //configurar nuestra autenticacion
    //1. definir la estrategia
    passport.use(new FacebookStrategy({
         clientID: config.facebook.id,
         clientSecret:config.facebook.secret,
         callbackURL:'http://localhost:8081/auth/facebook/callback'
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
        User.findOrCreate({uid: profile.id},{
                username: profile.displayName,
                provider: 'facebook',
                accessToken: accessToken
         },function(err, user){
                cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
                
         });
            /* este es un usuario creado falsamente
            var user = {
                 accessToken:accessToken,
                profile:profile
            }
            */
    }));
    //configurar nuestra autenticacion CON TWITTER
    //1. definir la estrategia
    passport.use(new TwitterStrategy({
         consumerKey: config.twitter.key,
         consumerSecret:config.twitter.secret,
         callbackURL:'http://www.example.com/auth/twitter/callback'
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
        User.findOrCreate({uid: profile.id},{
                username: profile.displayName,
                provider: 'twitter',
                accessToken: accessToken
         },function(err, user){
                cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
                
         });
            /* este es un usuario creado falsamente
            var user = {
                 accessToken:accessToken,
                profile:profile
            }
            */
    }));
    //configurar nuestra autenticacion CON GOOGLE PLUS
    //1. definir la estrategia
    passport.use(new GoogleStrategy({
         clientID: config.google.id,
         clientSecret:config.google.secret,
         callbackURL:'http://localhost:8081/auth/google/oauth2callback'
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
        User.findOrCreate({uid: profile.id},{
                username: profile.displayName,
                provider: 'google',
                accessToken: accessToken
         },function(err, user){
                cb(null, user);
            //guardar al usuario en la session
            //mandar a llamar al cb, completa la autentitcacion
                
         });
    }));
	
}


