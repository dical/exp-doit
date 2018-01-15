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
        if (error) return res.status(403).json(error);
        if (!user) return res.status(403).json({ errors: { data: { message: 'Datos incorrectos' } } });

        if (user.hasOwnProperty("state") && user.state.toString() === "disabled") {
            return res.status(403).json({ errors: { data: { message: "Usuario deshabilitado" } } });
        }

        return res.status(201).json(user)
    });
};
