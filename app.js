var express = require('express')
    , cors = require('cors')
    , mongoose = require('mongoose')
	, passport = require('passport')
    , app = module.exports = express()
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , env = process.env.NODE_ENV || 'development'
    , session = require('express-session')
    , cookiesession = require("cookie-session")
    , config = require('./config')[env]
    , FacebookStrategy = require("passport-facebook").Strategy
    , User = require("./models/user")
    , fileUpload = require('express-fileupload');

mongoose.connect(config.db, { useMongoClient: true });

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

app.use(
    cookiesession({
        keys: [
            'ramudaksjqw',
            'sessasdjhkahkhasd'
        ]
    })
);

app.use(
    session({
        secret: 'teclado de gato',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true
        }
    })
);

app.use(fileUpload());

var users = require('./controllers/users.js');

app.patch('/users/:id', users.edit);
app.post('/users', users.create);
app.post('/recovery', users.recovery);
app.get('/users/:id', users.search);
app.get('/users', users.searchMany);

var events = require('./controllers/events.js');

app.patch('/events/:id', events.edit);
app.post('/events', events.create);
app.get('/events', events.list);
app.get('/events/:id', events.search);

var messages = require('./controllers/messages.js');

app.get('/messages', messages.list);
app.post('/messages', messages.create);

var moments = require('./controllers/moments.js');

app.get('/moments', moments.list);
app.post('/moments', moments.create);

var inscriptions = require('./controllers/inscriptions.js');

app.delete('/inscriptions/:_id', inscriptions.remove);
app.get('/inscriptions', inscriptions.list);
app.post('/inscriptions', inscriptions.create);

var ranks = require('./controllers/ranks.js');

app.get('/ranks', ranks.list);
app.patch('/ranks/:_id', ranks.edit);
app.post('/ranks', ranks.create);

var notifications = require('./controllers/notifications');

app.get('/notifications', notifications.list);

var images = require('./controllers/images');
app.post('/images', images.upload)

var passportraiz=require('./passport.js')(passport);

app.use(passport.initialize());
app.use(passport.session());

//Flujo de autenticacion CON FACEBOOK
//esto inicia el flujo de autenticacion y redirige a facebook
app.get('/auth/facebook', // para donde lo manda ?? authenticate ?? a la estrategia
    passport.authenticate('facebook',{ authType:'rerequest', scope: ['publish_pages','public_profile','email','user_birthday'] }),  
//    function(req,res){
//    }
);

    //passport.authenticate('facebook',{ }));
	//2. recibir la respuesta de facebook
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook',{failureRedirect: '/'}),
	function(req,res){
        res.redirect('http://localhost:3000/user/'+req.session.passport.user._id);
        res.json(user);
});




// LOGOUT ROUTE
app.get('/auth/logout',
  function(req, res) {
       	req.logout();
      	req.session = null; 
      	res.redirect('/');
});


var sessions = require('./controllers/sessions.js');

app.post('/sessions', sessions.create);

var server = app.listen(process.env.PORT || 8081, function() {
    console.log("Express server listening on port %d", server.address().port);
});
