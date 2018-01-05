var Rank = require('../models/rank.js');

exports.create = function(req, res) {
    new Rank(req.body).save(function(error, rank) {
        if (error) return res.status(403).json(error);

        return res.status(201).json(rank)
    })
};

exports.list = function (req, res) {
    if (req.query.hasOwnProperty('type') && req.query.type === 'resume') {
        Rank.aggregate({ $group: { _id: req.query.user, average: { $avg: '$value'} } }, function (error, result) {
            if (error) return res.status(403).json(error);

            return res.json(result.pop())
        })
    } else {
        Rank.find(req.query).populate('user ranker').exec(function (error, ranks) {
            if (error) return res.status(403).json(error);

            return res.json(ranks)
        })
    }
};

exports.edit = function(req, res) {
    Rank.findByIdAndUpdate(req.params, req.body, { new: true },function (error, rank) {
        if (error) return res.status(403).json(error);

        return res.status(200).json(rank)
    })
};
