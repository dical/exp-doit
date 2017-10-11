var express = require('express')
    , cors = require('cors')
    , mongoose = require('mongoose')
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

app.post('/users', users.create);
app.get('/users/:id', users.search);

var events = require('./controllers/events.js');

app.post('/events', events.create);
app.get('/events', events.list);
app.get('/events/:id', events.search);

var sessions = require('./controllers/sessions.js');

app.post('/sessions', sessions.create);

var server = app.listen(process.env.PORT || 8081, function() {
    console.log("Express server listening on port %d", server.address().port);
});
