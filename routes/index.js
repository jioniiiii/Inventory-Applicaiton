const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const labelController = require('../controllers/labelController');
const genreController = require('../controllers/genreController');
const artistController = require('../controllers/artistController');
const formatController = require('../controllers/formatController');
const adminAuth = require('../middleware/adminAuth');
const searchController = require('../controllers/searchController');

//public routes
router.get('/', albumController.getFeaturedAlbums);
router.get('/albums', albumController.getAllAlbums);
router.get('/genres', genreController.getAllGenres);
router.get('/labels', labelController.getAllLabels);
router.get('/artists', artistController.getAllArtists);
router.get('/search', searchController.search);

//admin routes
const adminRoutes = [
    { path: '/genre/genre-admin', controller: genreController.renderAdmin },
    { path: '/label/label-admin', controller: labelController.renderAdmin },
    { path: '/artist/artist-admin', controller: artistController.renderAdmin },
    { path: '/album/album-admin', controller: albumController.renderAdmin },
];

adminRoutes.forEach(route => {
    router.get(route.path, adminAuth, route.controller);
    router.post(route.path, adminAuth, route.controller);
});

//crud routes
const crudRoutes = [
    { path: '/genre/add', controller: genreController.createGenre },
    { path: '/genre/delete', controller: genreController.deleteGenre },
    { path: '/genre/edit', controller: genreController.editGenre },
    { path: '/label/add', controller: labelController.createLabel },
    { path: '/label/delete', controller: labelController.deleteLabel },
    { path: '/label/edit', controller: labelController.editLabel },
    { path: '/artist/add', controller: artistController.createArtist },
    { path: '/artist/delete', controller: artistController.deleteArtist },
    { path: '/artist/edit', controller: artistController.editArtist },
    { path: '/album/add', controller: albumController.createAlbum },
    { path: '/album/delete', controller: albumController.deleteAlbum },
    { path: '/album/edit', controller: albumController.editAlbum },
    { path: '/format/add', controller: formatController.createFormat },
    { path: '/format/edit', controller: formatController.editFormat },
    { path: '/format/delete', controller: formatController.deleteFormat },
];

crudRoutes.forEach(route => {
    router.post(route.path, route.controller);
});

//linking to specific item
router.get('/album/:title', albumController.getAlbum);
router.get('/label/:id', labelController.getLabelsAlbums);
router.get('/genre/:id', genreController.getGenreAlbums);
router.get('/artist/:id', artistController.getArtistAlbums);
router.get('/album/format-admin/:albumId', formatController.renderAdmin);

module.exports = router;