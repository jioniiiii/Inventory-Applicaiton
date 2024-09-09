const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

//for all labels
exports.getAllLabels = async (req, res) => {
    try {
      const labels = await Label.find()
      res.render('labels', { labels });
    } catch (error) {
      console.error('Error fetching labels:', error);
      res.status(500).send('Internal Server Error');
    }
}

//for albums created with labels
exports.getLabelsAlbums = async (req, res) => {
    try {
      const label = await Label.findById(req.params.id);

      const albums = await Album.find({ label: label._id })
        .populate('artist', 'first_name last_name')
        .populate('genre', 'name');
  
        res.render('label', { label, albums });
    } catch (error) {
      console.error('Error fetching labels albums:', error);
      res.status(500).send('Internal Server Error');
    }
}
