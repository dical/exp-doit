var User = require('../models/user.js');

exports.create = function(req, res) {
    new User(req.body).save(function(error, user) {
        if (error) res.status(403).json(extract(error));

        res.status(201).json(user)
    })
};

exports.search = function (req, res) {
    User.findOne(req.param.id, function (error, user) {
        if (error) res.status(403).json(error);

        res.json(user)
    })
};

var extract = function(error) {
    if (error.hasOwnProperty('code')) {
        return {
            errors: {
                username: {
                    message: "Nombre de usuario ya registrado"
                }
            }
        }
    }

    return error
};
