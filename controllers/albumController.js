const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');


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