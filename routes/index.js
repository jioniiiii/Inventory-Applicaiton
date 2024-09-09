const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const labelController = require('../controllers/labelController');
const genreController = require('../controllers/genreController');
const artistController = require('../controllers/artistController');

//for nav 
router.get('/', albumController.getFeturedAlbums);
router.get('/albums', albumController.getAllAlbums);
router.get('/genres', genreController.getAllGenres);
router.get('/labels', labelController.getAllLabels);
router.get('/artists', artistController.getAllArtists);

//for linking every title and card to the album 
router.get('/album/:title', albumController.getAlbum);
router.get('/label/:id', labelController.getLabelsAlbums);
router.get('/genre/:id', genreController.getGenreAlbums);
router.get('/artist/:id', artistController.getArtistAlbums);

module.exports = router;