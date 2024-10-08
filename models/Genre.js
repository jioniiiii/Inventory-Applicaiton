const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: { type: String, required: true },
});

genreSchema.virtual('url').get(function() {
    return `/genre/${this._id}`;
});

module.exports = mongoose.model('Genre', genreSchema);