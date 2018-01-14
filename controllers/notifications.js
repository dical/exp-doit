var Notification = require('../models/notification.js'),
    mongoose     = require("mongoose");

exports.list = function (req, res) {
    if (!req.query.hasOwnProperty("event") && !req.query.hasOwnProperty("user")) {
        return res.status(200).json([])
    }

    Notification.find(req.query).populate('event').exec(function (error, notifications) {
        if (error) return res.status(403).json(error);

        if (req.query.hasOwnProperty("user")) {
            notifications = notifications.filter(function(notification) {
                return notification.event.own === req.query.user
            })
        }

        return res.status(200).json(notifications)
    })
};
