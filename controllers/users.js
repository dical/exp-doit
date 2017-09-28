var User = required('../models/user.js');

exports.create = function(req) {
    new User({title: req.body.title, author: req.body.author}).save();
};
