var Inscription = require('../models/inscription.js'),
    mongoose = require('mongoose');

exports.create = function(req, res) {
    new Inscription(req.body).save(function(error, inscription) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(inscription)
    })
};

exports.list = function (req, res) {
    Inscription.find(req.query).populate('user event').exec(function (error, inscriptions) {
        if (error) return res.status(403).json(error);

        return res.json(inscriptions)
    })
};

exports.remove = function (req, res) {
    Inscription.remove(req.params, function (error, result) {
        if (error) return res.status(403).json(error);

        return res.status(200).json(result)
    })
};
