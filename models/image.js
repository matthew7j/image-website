var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageUrl: { type: String, required: true, max: 250 }
});

module.exports = mongoose.model('Image', ImageSchema);