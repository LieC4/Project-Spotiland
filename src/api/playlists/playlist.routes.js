const PlaylistRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    updatePlaylist,
    removePlaylist,
} = require('./playlist.controller')

const upload  = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const playlistCreateRateLimit = rateLimit({
        windowMs: 1 * 60 * 1000, 
        max: 2,
        standardHeaders: true,
        legacyHeaders: false,
});

PlaylistRoutes.get('/getAll',[authorize], getAllPlaylists)
PlaylistRoutes.get('/:id',[authorize], getPlaylistById)
PlaylistRoutes.post('/create', [authorize, playlistCreateRateLimit], upload.single("image"), createPlaylist)
PlaylistRoutes.patch('/update/:id', [authorize], updatePlaylist)
PlaylistRoutes.delete('/delete/:id', [authorize], upload.single("image"), removePlaylist)



module.exports = PlaylistRoutes;