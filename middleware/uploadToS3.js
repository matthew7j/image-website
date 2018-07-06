var multer = require('multer');
var multerS3 = require('multer-s3')
var AWS = require('aws-sdk');
var s3 = new AWS.S3({ apiVersion: '2006-03-01' });

AWS.config.update({ region: 'us-east-1', accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dash-data-matt',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;