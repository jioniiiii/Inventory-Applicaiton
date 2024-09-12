const Format = require('../models/Format');

exports.getAllFormatsForAlbum = async (albumId) => {
    return Format.find({ album: albumId });
};