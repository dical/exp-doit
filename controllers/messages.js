var Message = require('../models/message.js'),
    Event = require('../models/event.js'),
    Notification = require('../models/notification'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (!req.body.hasOwnProperty('to')) {
        req.body['responses'] = []
    }

    new Message(req.body).save(function(error, message) {
        if (error) return res.status(403).json(error);

        if (req.body.hasOwnProperty('to')) {
            Message.findByIdAndUpdate(req.body.to, { $addToSet: { responses: { $each: [ message._id ] } } }, function (error) {
                if (error) return res.status(403).json(error);

                return res.status(201).json(message)
            })
        } else {
            Event.findById(message.event, function(error, event) {
                if (error) return res.status(403).json(error);

                if (event && event.own.toString() === message.user.toString()) {
                    new Notification({ event: event._id, activity: 'owner_new_message', details: 'Nuevo mensaje del dueño del evento' }).save()
                }

                return res.status(201).json(message)
            })
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
