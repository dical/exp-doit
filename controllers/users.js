var User = require('../models/user.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    if (req.body.hasOwnProperty('born') && !req.body.hasOwnProperty('business') && min_born(req.body.born)) {
        return res.status(403).json({ errors: { born: { kind: 'required', 'message': 'La edad del usuario debe ser mayor a 18 años.' } } });
    }

    new User(req.body).save(function(error, user) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(user)
    })
};

exports.search = function (req, res) {
    User.findById(req.params.id, function (error, user) {
        if (error) return res.status(403).json(error);

        return res.json(user)
    })
};

exports.searchMany = function (req, res) {
    var ids = req.query.ids.split(',').map(function (e) {
        return mongoose.Types.ObjectId(e)
    });

    User.find({
        '_id': {
            $in: ids
        }
    }, function (error, users) {
        if (error) return res.status(403).json(error);

        return res.json(users)
    })
};

exports.edit = function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (error, user) {
        if (error) return res.status(403).json(error);

        return res.status(202).json(user)
    })
};

var min_born = function(str_date) {
    var now = new Date(Date.now()), dat = new Date(str_date), dif = now.getFullYear() - dat.getFullYear();

    return dif < 18 || (dif === 18 && now.getMonth() < dat.getMonth()) || (dif === 18 && now.getMonth() === dat.getMonth() && now.getDate() < dat.getDate())
};
