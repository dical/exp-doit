var Event = require('../models/event.js');

exports.create = function(req, res) {
    new Event(req.body).save(function(error, event) {
        if (error) res.status(403).json(error);

        res.status(201).json(event)
    })
};

exports.edit = function(req, res) {
    Event.findById(req.params.id, function(error, event) {
        event.save(function (error, event) {
            if (error) res.status(403).json(error);

            res.status(200).json(event)
        })
    })
};

exports.list = function (req, res) {
    Event.find(function (error, events) {
        if (error) res.status(403).json(events);

        res.json(events)
    })
};

exports.search = function (req, res) {
    Event.findById(req.params.id).populate('own').exec(function (error, event) {
        if (error) res.status(403).json(error);

        res.json(event)
    })
};
