var User = require('../models/user.js');

exports.create = function(req, res) {
    new User(req.body.data.attributes).save(function(error, user) {
            if (error) res.json(error);

            res.json(user)
        })
};

exports.list = function(req, res) {
    User.find(function(error, users) {
        res.send(users)
    })
};

exports.remove = function(req, res) {
    User.find(function(error, users) {
        res.send(users)
    })
};

exports.replace = function(req, res) {
    User.find(function(error, users) {
        res.send(users)
    })
};

exports.search = function(req, res) {
    User.findById(req.params.id, function(error, user) {
        if (error) res.send(error);

        res.send(user)
    })
};

exports.update = function(req, res) {
    User.findById(req.params.id, function(error, user) {
        user.save(function (error, user) {
            res.send(user)
        })
    })
};
