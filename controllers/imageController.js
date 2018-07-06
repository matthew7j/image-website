var Image = require('../models/image');
var async = require('async');
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

AWS.config.update({ region: 'us-east-1', accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

exports.index = function(req, res) {
    async.parallel({
        image_count: function(callback) {
            Image.count({}, callback);
        },
    }, function(err, results) {
        res.render('photography', { error: err, data: results });
    });
};

// Display list of all Images.
exports.image_list = function(req, res) {
    Image.find({}, 'imageUrl')
        .exec(function(err, list_images) {
            if (err) {
                return next(err);
            }

            list_images.forEach(function(image) {
                var params = { Bucket: 'dash-data-matt', Key: image.imageUrl.substring(image.imageUrl.lastIndexOf("/") + 1) };
                var signedUrl = s3.getSignedUrl('getObject', params);

                image.signedUrl = signedUrl;
            });
            res.render('image_list', { title: 'Image List', image_list: list_images });
        });
};

// Display detail page for a specific Image.
exports.image_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Image detail: ' + req.params.id);
};

// Display Image create form on GET.
exports.image_create_get = function(req, res) {
    res.render('image_create');
};

// Handle Image create on POST.
exports.image_create_post = function(req, res, next) {
    var image = new Image({ imageUrl: req.file.location });

    image.save(function(err) {
        if (err) {
            console.log(err);
        }
        res.render('index');
    });
};

// Display Image delete form on GET.
exports.image_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Image delete GET');
};

// Handle Image delete on POST.
exports.image_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Image delete POST');
};

// Display Image update form on GET.
exports.image_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Image update GET');
};

// Handle Image update on POST.
exports.image_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Image update POST');
};