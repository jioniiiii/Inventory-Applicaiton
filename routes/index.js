const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const albumController = require('../controllers/albumController');


router.get('/', albumController.getAllAlbums);

module.exports = router;