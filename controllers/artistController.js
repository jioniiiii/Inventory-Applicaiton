const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

exports.getAllArtists = async (req, res) => {
    try {
      const artists = await Artist.find()
      res.render('./artist/artists', { artists });
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

      res.render('./artist/artist', { artist, albums });
  } catch (error) {
    console.error('Error fetching artists albums:', error);
    res.status(500).send('Internal Server Error');
  }
};

//for admin
exports.renderAdmin = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.render('./artist/artist-admin', { artists });
  } catch (error) {
    console.error('Error retrieving artist:', error);
    res.status(500).send('Internal Server Error');
  }
};

//create
exports.createArtist = async (req, res) => {
  const { first_name, last_name, birth_date, death_date, country, image } = req.body;

  try {
    if (!first_name || !country) {
      return res.status(400).send('First name and country are required fields');
    }

    await Artist.create({ first_name, last_name, birth_date, death_date, country, image });
    res.redirect('artist-admin');
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).send('Internal Server Error');
  }
};

//delete
exports.deleteArtist = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await Artist.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send('Artist not found');
    }

    res.redirect('artist-admin');
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).send('Internal Server Error');
  }
};

//edit
exports.editArtist = async (req, res) => {
  const { id, first_name, last_name, birth_date, death_date, country, image } = req.body;

  try {
    if (!id) {
      return res.status(400).send('Artist ID is required');
    }

    const updatedFields = {};
    if (first_name) updatedFields.first_name = first_name;
    if (last_name) updatedFields.last_name = last_name;
    if (birth_date) updatedFields.birth_date = birth_date;
    if (death_date) updatedFields.death_date = death_date;
    if (country) updatedFields.country = country;
    if (image) updatedFields.image = image;

    const result = await Artist.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!result) {
      return res.status(404).send('Artist not found');
    }

    res.redirect('artist-admin');
  } catch (error) {
    console.error('Error editing artist:', error);
    res.status(500).send('Internal Server Error');
  }
};