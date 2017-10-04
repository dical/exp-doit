var User = require('../models/user.js');

exports.create = function(req, res) {
    new User({
        name: req.body.title,
        password: req.body.author
    })
        .save(function(error, user) {
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

exports.update = function(req, res) {
    User.findById(req.body.id, function(error, user) {
        user.save();

        res.json()
    })
};
