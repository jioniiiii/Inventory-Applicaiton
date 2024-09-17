const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');
const Format = require('../models/Format');
exports.search = async (req, res, next) => {
    try {
        const search = req.query.search.replace(/\\/g, "\\\\");
        
        // Find artists matching the search term
        const artists = await Artist.find(
            {
                $or: [
                    { "first_name": { $regex: search, "$options": "i" } },
                    { "last_name": { $regex: search, "$options": "i" } }
                ]
            }).exec();
        
        // Find albums matching the search term
        const albums = await Album.find(
            {
                $or: [
                    { "title": { $regex: search, "$options": "i" } },
                    { "artist": { $in: artists.map(artist => artist._id) } }
                ]
            }).populate('artist').populate('genre').populate('label').exec();
        
        // Find formats for the matching albums
        const formats = await Format.find({ album: { $in: albums.map(album => album._id) } }).populate({
            path: 'album',
            select: 'title',
            populate: {
                path: 'artist',
                model: 'Artist'
            }
        }).exec();

        // Render the EJS template with the search results
        res.render('album/album', {
            title: `${search} - Search`,
            album: albums[0], // Assuming you want to display details for the first album found
            formats: formats
        });
    } catch (err) {
        next(err);
    }
};