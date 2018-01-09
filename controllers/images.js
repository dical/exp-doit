var imgur = require('imgur'),
    fs = require('fs');

imgur.setClientId('a5fe6779f783810');

exports.upload = function(req, res) {
    if (!req.files) return res.status(500).send({ error: 'sin archivos' });

    var image = req.files.image;
    var path = __dirname.split('\\');

    console.log(path);

    path.pop();

    if (!path) {
        path = ['', 'opt', 'exp-doit']
    }

    console.log(path);

    path = path.join('/');

    image.mv(path + '/images/' + image.name, function(err) {
        if (err) return res.status(500).send(err);

        var imagePath = path + '/images/' + image.name;

        imgur.uploadFile(imagePath)
            .then(function (json) {
                fs.unlinkSync(imagePath);
                return res.send({ image: json.data.link });
            })
            .catch(function (err) {
                fs.unlinkSync(imagePath);
                return res.status(500).send({ error: err.message });
            })
    })
};
