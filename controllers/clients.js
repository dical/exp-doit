var Event = require('../models/user.js');

exports.create = function(req, res) {
    new Event(req.body).save(function(error, event) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(event)
    })
};

exports.search = function (req, res) {
    Event.findOne(req.param.id, function (error, event) {
        if (error) return res.status(403).json(error);

        return res.json(event)
    })
};
