const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_date: { type: Date, required: true },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
    label: { type: Schema.Types.ObjectId, ref: 'Label', required: true },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    image: { type: String }
})

albumSchema.virtual('release_date_formatted').get(function () {
    const year = DateTime.fromJSDate(this.release_date).toObject();
    return year.year;
});

albumSchema.virtual('release_dd_mm_yyyy').get(function () {
    return DateTime.fromJSDate(this.release_date).toISODate();
});

albumSchema.virtual('url').get(function () {
    return `/album/${this._id}`;
});

module.exports = mongoose.model('Album', albumSchema)