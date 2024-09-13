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
};

//for admin
exports.renderAdmin = async (req, res) => {
  try {
    const genres = await Genre.find()
    res.render('./genre/genre-admin', { genres });
  } catch (error) {
    console.error('Error retrieving albums:', error);
    res.status(500).send('Internal Server Error');
  }
};

//create
exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;//for form

    if(!name) { 
      return res.status(400).send('Genre name is required');
    }

    await Genre.create({ name });

    res.redirect('genre-admin');
  } catch (error) {
    console.error('Error creating genres:', error);
    res.status(500).send('Internal Server Error');
  }
};

//delete
exports.deleteGenre = async (req, res) => {
  const { name } = req.body; 
  
  try {
    if (!name) {
      return res.status(400).send('Invalid genre name');
    }

    const result = await Genre.findOneAndDelete({ name });
    
    if (!result) {
      return res.status(404).send('Genre not found');
    }

    res.redirect('genre-admin');
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).send('Internal Server Error');
  }
};

//edit
exports.editGenre = async (req, res) => {
  const { oldName, newName } = req.body;

  try{
    if(!oldName || !newName) {
      return res.status(400).send('Both old and new genre names are required');
    }

    const result = await Genre.findOneAndUpdate(
      { name: oldName },
      { name: newName },
      { new: true }
    );
    if (!result) {
      return res.status(404).send('Genre not found');
    }

    res.redirect('genre-admin'); 
  } catch (error) {
    console.error('Error editing genre:', error);
    res.status(500).send('Internal Server Error');
  }
  
};