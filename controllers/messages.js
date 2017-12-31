var Message = require('../models/message.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (req.body.hasOwnProperty('user')) {
        req.body.user = new mongoose.Types.ObjectId(req.body.user)
    }

    if (req.body.hasOwnProperty('event')) {
        req.body.event = new mongoose.Types.ObjectId(req.body.event)
    }

    var newMessage = new Message(req.body);

    if (req.body.hasOwnProperty('respond') && req.body.respond.hasOwnProperty('_id')) {
        delete newMessage.responses;
    } else {
        newMessage['responses'] = []
    }

    newMessage.save(function(error, message) {
        if (error) return res.status(403).json(error);

        if (req.body.hasOwnProperty('respond') && req.body.respond.hasOwnProperty('_id')) {
            Message.findByIdAndUpdate(req.body.respond._id, { $addToSet: { responses: { $each: [ message._id ] } } }, function (error) {
                if (error) return res.status(403).json(error);

                return res.status(201).json(message)
            })
        } else {
            return res.status(201).json(message)
        }
    })
};

exports.list = function (req, res) {
    var sort = { date: 'desc' },
        find = { responses: { $exists: true } };

    if (req.query.hasOwnProperty('user')) {
        find['user'] = new mongoose.Types.ObjectId(req.query.user);
    }

    if (req.query.hasOwnProperty('event')) {
        find['event'] = new mongoose.Types.ObjectId(req.query.event);
    }

    if (req.query.hasOwnProperty('type')) {
        find['type'] = req.query.type;
    }

    if (req.query.hasOwnProperty('sort')) {
        sort['date'] = req.query.sort;
    }

    Message.find(find).sort(sort).populate('user event responses').exec(function (error, messages) {
        if (error) return res.status(403).json(error);

        return res.json(messages)
    })
};
