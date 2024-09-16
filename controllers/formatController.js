const Format = require('../models/Format');
const Album = require('../models/Album');

//admin
exports.renderAdmin = async (req, res) => {
    const { albumId } = req.params;
  try {
    const formats = await Format.find({album: albumId});
    const album = await Album.findById(albumId);

    res.render('./album/format-admin', { formats, album });
  } catch (error) {
    console.error('Error fetching formats:', error);
    res.status(500).send('Internal Server Error');
  }
};

//create
exports.createFormat = async (req, res) => {
  const { album, format, price, stock, barcode, image } = req.body;

  try {
    if (!album || !format || !price || !stock || !barcode) {
      return res.status(400).send('All fields are required');
    }

    const newFormat = new Format({
      album,
      format,
      price,
      stock,
      barcode,
      image
    });

    await newFormat.save();
    res.redirect(`/album/format-admin/${album}`);
  } catch (error) {
    console.error('Error creating format:', error);
    res.status(500).send('Internal Server Error');
  }
};

//edit
exports.editFormat = async (req, res) => {
  const { id, format, price, stock, barcode, image } = req.body;

  try {
    const updatedFields = {};
    if (format) updatedFields.format = format;
    if (price) updatedFields.price = price;
    if (stock) updatedFields.stock = stock;
    if (barcode) updatedFields.barcode = barcode;
    if (image) updatedFields.image = image;

    const result = await Format.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!result) {
      return res.status(404).send('Format not found');
    }

    res.redirect(`/album/format-admin/${result.album}`);
  } catch (error) {
    console.error('Error editing format:', error);
    res.status(500).send('Internal Server Error');
  }
};

//delete find better way to redirect sto it doesnt cuase any problem
exports.deleteFormat = async (req, res) => {
  const { formatId, albumId } = req.body;

  try {
    const result = await Format.findByIdAndDelete(formatId);

    if (!result) {
      return res.status(404).send('Format not found'); 
    }

    res.redirect(`/album/format-admin/${albumId}`);
  } catch (error) {
    console.log(result);
    console.error('Error deleting format:', error);
    res.status(500).send('Internal Server Error');
  }
};