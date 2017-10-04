var express = require('express')
    , mongoose = require('mongoose')
    , app = module.exports = express()
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , env = process.env.NODE_ENV || 'development'
    , config = require('./config')[env];

mongoose.connect(config.db, { useMongoClient: true });

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//
var users = require('./controllers/users.js');

app.delete('/users', users.remove);
app.get('/users', users.list);
app.get('/users/:id', users.search);
app.patch('/users', users.update);
app.put('/users', users.replace);
app.post('/users', users.create);

//
var clients = require('./controllers/clients.js');

app.delete('/clients', clients.remove);
app.get('/clients', clients.list);
app.patch('/clients', clients.update);
app.put('/clients', clients.replace);
app.post('/clients', clients.create);

//
var events = require('./controllers/events.js');

app.delete('/events', events.remove);
app.get('/events', events.list);
app.patch('/events', events.update);
app.put('/events', events.replace);
app.post('/events', events.create);

//
var sessions = require('./controllers/sessions.js');

app.post('/sessions', sessions.create);

var server = app.listen(process.env.PORT || 3001, function() {
    console.log("Express server listening on port %d", server.address().port);
});
