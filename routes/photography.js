var express = require('express');
var router = express.Router();

var upload = require('../middleware/uploadToS3.js');
// var addToDb = require('./middleware/addToDatabase.js');

var image_controller = require('../controllers/imageController');


// GET image home page.
router.get('/', image_controller.index);

// GET request for creating an Image. NOTE This must come before routes that display the Image (uses id).
router.get('/image/create', image_controller.image_create_get);

// POST request for creating an Image.
router.post('/image/create', upload.single('fileName'), image_controller.image_create_post);

// GET request to delete an Image.
router.get('/image/:id/delete', image_controller.image_delete_get);

// POST request to delete an Image.
router.post('/image/:id/delete', image_controller.image_delete_post);

// GET request to update an Image.
router.get('/image/:id/update', image_controller.image_update_get);

// POST request to update an Image.
router.post('/image/:id/update', image_controller.image_update_post);

// GET request for one an Image.
router.get('/image/:id', image_controller.image_detail);

// GET request for list of all Image items.
router.get('/images', image_controller.image_list);

router.get('/gear', function(req, res, next) {
    console.log('in here');
    res.render('gear');
});

module.exports = router;