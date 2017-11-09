var Message = require('../models/message.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (req.body.hasOwnProperty('user')) {
        req.body.user = new mongoose.Types.ObjectId(req.body.user)
    }

    if (req.body.hasOwnProperty('event')) {
        req.body.event = new mongoose.Types.ObjectId(req.body.event)
    }

    console.log(req.body);

    new Message(req.body).save(function(error, message) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(message)
    })
};

exports.list = function (req, res) {
    var sort = { start: 'desc' },
        find = { };

    if (req.query.hasOwnProperty('user')) {
        find['user'] = new mongoose.Types.ObjectId(req.query.user);
    }

    if (req.query.hasOwnProperty('event')) {
        find['event'] = new mongoose.Types.ObjectId(req.query.event);
    }

    Message.find(find).sort(sort).populate('user event response').exec(function (error, messages) {
        if (error) return res.status(403).json(error);

        return res.json(messages)
    })
};
