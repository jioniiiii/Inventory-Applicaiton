const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Genre = require('../models/Genre');
const Label = require('../models/Label');

//for all labels
exports.getAllLabels = async (req, res) => {
    try {
      const labels = await Label.find()
      res.render('./label/labels', { labels });
    } catch (error) {
      console.error('Error fetching labels:', error);
      res.status(500).send('Internal Server Error');
    }
};

//for albums created with labels
exports.getLabelsAlbums = async (req, res) => {
    try {
      const label = await Label.findById(req.params.id);

      const albums = await Album.find({ label: label._id })
        .populate('artist', 'first_name last_name')
        .populate('genre', 'name');
  
        res.render('./label/label', { label, albums });
    } catch (error) {
      console.error('Error fetching labels albums:', error);
      res.status(500).send('Internal Server Error');
    }
};

//for admmin
exports.renderAdmin = async (req, res) => {
  try {
    const labels = await Label.find();
    res.render('./label/label-admin', { labels });
  } catch (error) {
    console.error('Error retrieving labels:', error);
    res.status(500).send('Internal Server Error');
  }
};

//create
exports.createLabel = async (req, res) => {
  const { name, founded, image } = req.body; 

  try {
    if (!name || !founded || !image) {
      return res.status(400).send('Fill out all the fields');
    }

    await Label.create({ name, founded, image });
    res.redirect('label-admin');
  } catch (error) {
    console.error('Error creating label:', error);
    res.status(500).send('Internal Server Error');
  }
};

//delete
exports.deleteLabel = async (req, res) => {
  const { id } = req.body; 
  
  try {
    const result = await Label.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).send('Label not found');
    }
    
    res.redirect('label-admin');
  } catch (error) {
    console.error('Error deleting label:', error);
    res.status(500).send('Internal Server Error');
  }
};

//edit
exports.editLabel = async (req, res) => {
  const { id, name, founded, image } = req.body; 

  try {
    if (!id) {
      return res.status(400).send('Label ID is required');
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (founded) updatedFields.founded = founded;
    if (image) updatedFields.image = image;

    const result = await Label.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!result) {
      return res.status(404).send('Label not found');
    }

    res.redirect('label-admin'); 
  } catch (error) {
    console.error('Error editing label:', error);
    res.status(500).send('Internal Server Error');
  }
};