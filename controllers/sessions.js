var User = require('../models/user.js');

exports.create = function(req, res) {
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('password')) {
        return res.status(403).json({
            type: 'message',
            data: {
                text: 'Datos incorrectos'
            }
        });
    }

    User.findOne(req.body, function(error, user) {
        if (error) res.status(403).json(error);

        res.status(201).json(user)
    });
};
