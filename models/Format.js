const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatSchema = new Schema({
    album: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
    format: {
        type: String,
        required: true,
        enum: ['CD', 'Vinyl', 'Cassette', 'Digital'],
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    barcode: { type: String, required: true },
    image: { type: String },
});

formatSchema.virtual('price_formatted').get(function () {
    return (this.price / 100).toFixed(2);
})

formatSchema.virtual('url').get(function () {
    return `/release/${this._id}`;
});

module.exports = mongoose.model('Format', formatSchema);