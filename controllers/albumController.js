const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');
const Format = require('../models/Format');

//all ablums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
            .populate('artist', 'first_name last_name')
            .populate('label', 'name')  
            .populate('genre', 'name'); 
        
    res.render('./album/albums', { albums });
  } catch (error) {
    console.error('Error retrieving albums:', error);
    res.status(500).send('Error retrieving albums');
  }
};

//for some albums
exports.getFeaturedAlbums = async (req, res) => {//put some albums not all mabe new releases
  try {
      const featuredAlbums = await Album.find()
        .populate('artist', 'first_name last_name')
        .populate('genre', 'name')
        .populate('label', 'name')
        
      res.render('index', { featuredAlbums });
  } catch (error) {
    console.error('Error fetching featured albums:', error);
    res.status(500).send('Internal Server Error');
  }
};

//for one album with its format
exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findOne({ title: req.params.title })
      .populate('artist', 'first_name last_name')
      .populate('genre', 'name')
      .populate('label', 'name')

    if(!album) {
      return res.status(404).send('Album nto found');
    }

    const formats = await Format.find({ album });//for format

    res.render('./album/album', { album, formats });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).send('Internal Server Error');
  }
};

//for admin
exports.renderAdmin = async (req, res) => {
  try {
    const albums = await Album.find()
      .populate('artist', 'first_name last_name')
      .populate('label', 'name')  
      .populate('genre', 'name');  
    const artists = await Artist.find();
    const labels = await Label.find();
    const genres = await Genre.find();
    res.render('./album/album-admin', { albums, artists, labels, genres });
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).send('Internal Server Error');
  }
};

//create
exports.createAlbum = async (req, res) => {
  const { title, release_date, artist, label, genre, image } = req.body;

  try {
    if (!title || !release_date || !artist || !label || !genre) {
      return res.status(400).send('Please fill out all required fields.');
    }

    const newAlbum = new Album({
      title,
      release_date,
      artist,
      label,
      genre,
      image
    });

    await newAlbum.save();
    res.redirect('album-admin');
  } catch (error) {
    console.error('Error creating album:', error);
    res.status(500).send('Internal Server Error');
  }
};

//edit
exports.editAlbum = async (req, res) => {
  const { id, title, release_date, artist, label, genre, image } = req.body;

  try {
    if (!id) {
      return res.status(400).send('Album ID is required');
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (release_date) updatedFields.release_date = release_date;
    if (artist) updatedFields.artist = artist;
    if (label) updatedFields.label = label;
    if (genre) updatedFields.genre = genre;
    if (image) updatedFields.image = image;

    const result = await Album.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!result) {
      return res.status(404).send('Album not found');
    }

    res.redirect('album-admin');
  } catch (error) {
    console.error('Error editing album:', error);
    res.status(500).send('Internal Server Error');
  }
};

//delete
exports.deleteAlbum = async (req, res) => {
  const { id } = req.body;

  try {
    const result = await Album.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send('Album not found');
    }
    console.log(result);
    res.redirect('album-admin');
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).send('Internal Server Error');
  }
};