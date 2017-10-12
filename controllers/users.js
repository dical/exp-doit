var Business = require('../models/business.js');
var User = require('../models/user.js');

exports.create = function(req, res) {
    new User(req.body).save(function(error, user) {
        if (error) return res.status(403).json(error);

        if (req.body.hasOwnProperty('rut')) {
            new Business(req.body).save(function (error, business) {
                if (error) return res.status(403).json(error);

                return res.status(201).json(user)
            })
        }

        return res.status(201).json(user)
    })
};

exports.search = function (req, res) {
    User.findOne(req.param.id, function (error, user) {
        if (error) res.status(403).json(error);

        res.json(user)
    })
};
