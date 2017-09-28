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

var api = require('./controllers/api.js');

app.post('/thread', api.create);
app.get('/thread/:title.:format?', api.show);
app.get('/thread', api.list);

var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d", server.address().port);
});
