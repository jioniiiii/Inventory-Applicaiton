const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
    name: { type: String, required: true, maxLength: 100 },
    founded: { type: Number },
    image: { type: String },
});

labelSchema.virtual('url').get(function () {
    return `/label/${this._id}`;
});

module.exports = mongoose.model('Label', labelSchema);