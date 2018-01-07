var Message = require('../models/message.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    new Message(req.body).save(function(error, message) {
        if (error) return res.status(403).json(error);

        if (req.body.hasOwnProperty('to')) {
            Message.findByIdAndUpdate(req.body.to, { $addToSet: { responses: { $each: [ message._id ] } } }, function (error) {
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

    Message.find(find).sort(sort).populate(['user event', {
        path: 'responses',
        populate: { path: 'user event' }
    }]).exec(function (error, messages) {
        if (error) return res.status(403).json(error);

        return res.json(messages)
    })
};
