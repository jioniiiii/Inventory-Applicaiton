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
exports.getFeturedAlbums = async (req, res) => {//put some albums not all mabe new releases
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
}

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

    const formats = await Format.find({ album: album._id });//for format

    res.render('./album/album', { album, formats });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).send('Internal Server Error');
  }
}