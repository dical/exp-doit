var Notify = require('../models/notify.js'),
    mongoose = require('mongoose');

exports.list = function (req, res) {
    var sort = { start: 'desc' },
        find = { };

    if (req.query.hasOwnProperty('sort')) {
        // sin terminar
    }

    if (req.query.hasOwnProperty('user')) {
        find = { user: mongoose.Types.ObjectId(req.query.user) };
    }

    Notify.find(find).sort(sort).populate('event').exec(function (error, notifications) {
        if (error) return res.status(403).json(error);

        return res.json(notifications)
    })
};