const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

exports.getAllArtists = async (req, res) => {
    try {
      const artists = await Artist.find()
      res.render('artists', { artists });
    } catch (error) {
      console.error('Error retrieving artists:', error);
      res.status(500).send('Internal Server Error');
    }
};

exports.getArtistAlbums = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    const albums = await Album.find({ artist: artist._id })
    .populate('artist', 'first_name last_name')
    .populate('genre', 'name')
    .populate('label', 'name')

      res.render('artist', { artist, albums });
  } catch (error) {
    console.error('Error fetching artists albums:', error);
    res.status(500).send('Internal Server Error');
  }
}