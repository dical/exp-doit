var Notification = require('../models/notification.js');

exports.list = function (req, res) {
    Notification.find(req.query).populate('event').exec(function (error, notifications) {
        if (error) return res.status(403).json(error);

        return res.status(200).json(notifications)
    })
};
