const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const labelController = require('../controllers/labelController');
const genreController = require('../controllers/genreController');
const artistController = require('../controllers/artistController');
const formatController = require('../controllers/formatController')

//for nav 
router.get('/', albumController.getFeturedAlbums);
router.get('/albums', albumController.getAllAlbums);
router.get('/genres', genreController.getAllGenres);
router.get('/labels', labelController.getAllLabels);
router.get('/artists', artistController.getAllArtists);

//for admin(crud) 
router.get('/genre/genre-admin', genreController.renderAdmin);
router.post('/genre/add', genreController.createGenre);
router.post('/genre/delete', genreController.deleteGenre);
router.post('/genre/edit', genreController.editGenre);

router.get('/label/label-admin', labelController.renderAdmin);
router.post('/label/add', labelController.createLabel);
router.post('/label/delete', labelController.deleteLabel);
router.post('/label/edit', labelController.editLabel);

router.get('/artist/artist-admin', artistController.renderAdmin);
router.post('/artist/add', artistController.createArtist);
router.post('/artist/delete', artistController.deleteArtist);
router.post('/artist/edit', artistController.editArtist);

router.get('/album/album-admin', albumController.renderAdmin);
router.post('/album/add', albumController.createAlbum);
router.post('/album/delete', albumController.deleteAlbum);
router.post('/album/edit', albumController.editAlbum);

router.get('/album/format-admin/:albumId', formatController.renderAdmin);
router.post('/format/add', formatController.createFormat);
router.post('/format/edit', formatController.editFormat);
router.post('/format/delete', formatController.deleteFormat);

//for linking every title and card to the album 
router.get('/album/:title', albumController.getAlbum);
router.get('/label/:id', labelController.getLabelsAlbums);
router.get('/genre/:id', genreController.getGenreAlbums);
router.get('/artist/:id', artistController.getArtistAlbums);

module.exports = router;