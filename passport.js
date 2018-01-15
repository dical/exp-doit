var TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy =require('passport-google-oauth').OAuth2Strategy,
    User = require('./models/user.js'),
    config = require("./config.js");


var passport =require('passport');
var mongoose = require('mongoose');

module.exports = function(passport) {
    //configurar nuestra autenticacion
    
 passport.use(new FacebookStrategy({
         clientID: config.facebook.id,
         clientSecret:config.facebook.secret,
         callbackURL:'http://localhost:8081/auth/facebook/callback',
         profileFields: ['id', 'displayName', 'photos','birthday', 'email', 'name'],
         passReqToCallback: false
    },function(accessToken, refreshToken, profile, cb){
            //guardar en la bd
            /*console.log(profile)
            console.log(profile._json.locale)
            console.log(profile._json.hometown)
            console.log(profile._json.location)*/
            
            var fecha=profile._json.birthday;
            convertDateFormat(fecha);
            function convertDateFormat(string) {
                var fechaDato = string.split('/');
                return fechaDato[2] + '-' + fechaDato[0] + '-' + fechaDato[1];
            };
            var number=profile._json.id;
            function random(number){
                var digitos= Math.round(Math.random()*number);
                return digitos;
                
            };
            
        User.findOne(
            {
                social:
                {
                    facebook:
                    {
                        uid:profile.id
                    }
                },
                social:
                {
                    facebook:
                    {
                        provider:profile.provider
                    }
                }
            }, function(err,user){
                if(err)throw(err);
                

                if(!err && user!= null){ 
                    return cb(null, user)
                }else{
                
                var user= new User();
                    user.username=profile.name.familyName+''+random(number.substring(0, 4));
                    user.names=profile.name.givenName + ' ' + profile.name.familyName;
                    user.password='doitexp'+''+random(number.substring(2, 7));
                    user.surnames=profile.name.familyName;
                    user.phrase='Edita tu frase en la rueda ubicada en la parte superior derecha';
                    user.mail=profile.emails[0].value;
                   
                    user.social={
                        facebook:{
                                    accessToken: accessToken,
                                    provider: profile.provider,
                                    uid: profile.id 
                                }
                    },
                    user.born=convertDateFormat(fecha);
                    user.image=profile.photos[0].value;

                    user.save(function(err){
                        if(err)
                            throw err;
                        return cb(null, user);           
                    })
                }

        });

}));

        //definir com guardar el usuario en la session
    passport.serializeUser(function(user, done){
        //obtener el id y guardarlo dentro de la session
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
                
            });
        done(null, user);


    });
        // definir como vamos a retomar el usuario de la session
    passport.deserializeUser(function(id, done){
        User.findById(id._id, function(error, user) {
            done(error, user);

       });
        //aca se busca en la base de dats y se muestra el usuario
        done(null, id);
    });
}




