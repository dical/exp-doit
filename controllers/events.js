var Event = require('../models/event.js');

exports.create = function(req, res) {
    new Event(req.body).save(function(error, event) {
        if (error) res.status(403).json(error);

        res.status(201).json(event)
    })
};

exports.list = function (req, res) {
    Event.find({}).sort({ start : 'desc' }).exec(function (error, events) {
        if (error) res.status(403).json(error);

        res.json(events)
    })
};

exports.search = function (req, res) {
    Event.findById(req.params.id, function (error, event) {
        if (error) res.status(403).json(error);

        res.json(event)
    })
};
