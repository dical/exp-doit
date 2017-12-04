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
    , config = require('./config')[env];

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

var users = require('./controllers/users.js');

app.patch('/users/:id', users.edit);
app.post('/users', users.create);
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

var passportraiz=require('./passport.js')(passport);

app.use(passport.initialize());
app.use(passport.session());

//Flujo de autenticacion CON FACEBOOK
//esto inicia el flujo de autenticacion y redirige a facebook
app.get('/auth/facebook', 
	passport.authenticate('facebook',{ authType: 'rerequest', scope: ['email'] }));
	//2. recibir la respuesta de facebook
app.get('/auth/facebook/callback', 
	passport.authenticate('facebook',{failureRedirect: '/'}),
	function(req,res){
		console.log(req.session);
		res.redirect('/');
});

//esto inicia el flujo de autenticacion y redirige a twitter
app.get('/auth/twitter', 
	passport.authenticate('twitter'));
	//2. recibir la respuesta de twitter
app.get('/auth/twitter/callback', 
	passport.authenticate('twitter',{failureRedirect: '/sessions'}),
	function(req,res){
		console.log(req.session);
		res.redirect('/');
});


//Flujo de autenticacion CON GOOGLE
//esto inicia el flujo de autenticacion y redirige a google
app.get('/auth/google', 
	passport.authenticate('google',{ scope: [
		'https://www.googleapis.com/auth/plus.login',
		'https://www.googleapis.com/auth/userinfo.email',
  	  	'https://www.googleapis.com/auth/plus.profile.emails.read'] }));
	//2. recibir la respuesta de google
app.get('/auth/google/oauth2callback', 
	passport.authenticate('google',{failureRedirect: '/sessions'}),
	function(req,res){
		console.log(req.session);
		res.redirect('/');
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
