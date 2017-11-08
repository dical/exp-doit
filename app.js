var express = require('express')
    , cors = require('cors')
    , mongoose = require('mongoose')
	, passport = require('passport')
    , app = module.exports = express()
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , env = process.env.NODE_ENV || 'development'
    , config = require('./config')[env];

mongoose.connect(config.db, { useMongoClient: true });

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

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

var notifications = require('./controllers/notifications.js');

app.get('/notifications', notifications.list);

app.get('/auth/facebook', passport.authenticate('facebook',{scope:['publish_actions','user_friends','email']}));
	//2. recibir la respuesta de facebook
app.get('/auth/facebook/callback', passport.authenticate('facebook',{failureRedirect: '/sessions'}),
	function(req,res){
		console.log(req.session);
		res.redirect("holamundo");
	});


app.get('/auth/twitter', passport.authenticate('twitter'));
	//2. recibir la respuesta de twitter
app.get('/auth/twitter/callback', passport.authenticate('twitter',{failureRedirect: '/sessions'}),
	function(req,res){
		console.log(req.session);
		res.redirect("holamundo");
	});

app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login'] }));
	//2. recibir la respuesta de google
app.get('/auth/google/oauth2callback', 
	passport.authenticate('google',{failureRedirect: '/sessions'}),
	function(req,res){
		console.log(req.session);
		res.redirect("holamundo");
	});



var sessions = require('./controllers/sessions.js');

app.post('/sessions', sessions.create);

var server = app.listen(process.env.PORT || 8081, function() {
    console.log("Express server listening on port %d", server.address().port);
});
