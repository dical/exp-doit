var User = require('../models/user.js'),
    nodeMailer = require('nodemailer'),
    mongoose = require('mongoose');

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diecallejas@gmail.com',
        pass: 'hansen263'
    }
});

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

exports.recovery = function (req, res) {
    if (!req.body.hasOwnProperty('mail')) {
        return res.status(403).json();
    }

    User.find(req.body).select('password').exec(function (error, users) {
        if (error) return res.status(403).json(error);
        if (users.length < 1) return res.status(403).json({});

        var mailOptions = {
            from: 'diecallejas@gmail.com',
            to: req.body.mail,
            subject: 'Recuperar contraseña [DoitExp.com]',
            text: 'Su contraseña es: ' + users.pop().password
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) return res.status(403).json(error);

            return res.json(info)
        })
    })
};

var min_born = function(str_date) {
    var now = new Date(Date.now()), dat = new Date(str_date), dif = now.getFullYear() - dat.getFullYear();

    return dif < 18 || (dif === 18 && now.getMonth() < dat.getMonth()) || (dif === 18 && now.getMonth() === dat.getMonth() && now.getDate() < dat.getDate())
};
