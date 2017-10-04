var User = require('../models/user.js');

exports.create = function(req, res) {
    new User(req.body.data.attributes).save(function(error, user) {
            if (error) res.json(error);

            res.json(user)
        })
};
