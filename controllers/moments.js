var Moment = require('../models/moment.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (req.body.hasOwnProperty('user')) {
        req.body.user = new mongoose.Types.ObjectId(req.body.user)
    }

    if (req.body.hasOwnProperty('event')) {
        req.body.event = new mongoose.Types.ObjectId(req.body.event)
    }

    new Moment(req.body).save(function(error, moment) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(moment)
    })
};

exports.list = function (req, res) {
    var sort = { date: 'desc' },
        find = { };
        popu = { path: 'user event' };

    if (req.query.hasOwnProperty("user")) {
        find['user'] = new mongoose.Types.ObjectId(req.query.user);
    }

    if (req.query.hasOwnProperty("event")) {
        find['event'] = new mongoose.Types.ObjectId(req.query.event);
    }

    Moment.find(find).sort(sort).populate('user event').exec(function (error, moments) {
        if (error) return res.status(403).json(error);

        if (req.query.hasOwnProperty("own")) {
            moments = moments.filter(function(moment) {
                return moment.event.own.toString() === req.query.own
            })
        }

        return res.json(moments)
    })
};
