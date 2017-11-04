var User = require('../models/user.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (req.body.hasOwnProperty('rut')) {
        req.body['business'] = {
            rut: {
                body: req.body.rut.split('-')[0],
                checker: req.body.rut.split('-')[1]
            }
        };
    }

    new User(req.body).save(function(error, user) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(user)
    })
};

exports.search = function (req, res) {
    User.findById(req.params.id, function (error, user) {
        if (error) return res.status(403).json(error);

        return res.json(user)
    })
};

exports.searchMany = function (req, res) {
    var ids = req.query.ids.split(',').map(function (e) {
        return mongoose.Types.ObjectId(e)
    });

    User.find({
        '_id': {
            $in: ids
        }
    }, function (error, users) {
        if (error) return res.status(403).json(error);

        return res.json(users)
    })
};
