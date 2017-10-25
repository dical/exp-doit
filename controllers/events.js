var Event = require('../models/event.js');

exports.create = function(req, res) {
    new Event(req.body).save(function(error, event) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(event)
    })
};

exports.edit = function(req, res) {
    console.log(req.body);

    Event.findByIdAndUpdate(req.params.id, { $set: req.body }, function (error, event) {
        if (error) return res.status(403).json(error);

        console.log(event.participants);

        return res.status(200).json(event)
    })
};

exports.list = function (req, res) {
    Event.find({}).sort({ start : 'desc' }).exec(function (error, events) {
        if (error) return res.status(403).json(error);

        return res.json(events)
    })
};

exports.search = function (req, res) {
    Event.findById(req.params.id).populate('own').exec(function (error, event) {
        if (error) return res.status(403).json(error);

        return res.status(200).json(event)
    })
};
