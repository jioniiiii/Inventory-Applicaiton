const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

exports.getAllGenres = async (req, res) => {
    try {
      const genres = await Genre.find()
      res.render('./genre/genres', { genres });
    } catch (error) {
      console.error('Error retrieving albums:', error);
      res.status(500).send('Internal Server Error');
    }
};

exports.getGenreAlbums = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    const albums = await Album.find({ genre: genre._id })
      .populate('artist', 'first_name last_name')
      .populate('genre', 'name');

      res.render('./genre/genre', { genre, albums });
  } catch (error) {
    console.error('Error fetching genres albums:', error);
    res.status(500).send('Internal Server Error');
  }
}