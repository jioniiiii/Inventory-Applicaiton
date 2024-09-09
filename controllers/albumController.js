const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

//all ablums
exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find()
            .populate('artist', 'first_name last_name')
            .populate('label', 'name')  
            .populate('genre', 'name'); 
        
    res.render('albums', { albums });
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

//for one album 
exports.getAlbum = async (req, res) => {
  try {
    const singleAlbum = await Album.findOne({ title: req.params.title })
      .populate('artist', 'first_name last_name')
      .populate('genre', 'name')
      .populate('label', 'name')

    if(!singleAlbum) {
      return res.status(404).send('Album nto found');
    }

    res.render('album', { album: singleAlbum });
  } catch (error) {
    console.error('Error fetching album:', error);
    res.status(500).send('Internal Server Error');
  }
}