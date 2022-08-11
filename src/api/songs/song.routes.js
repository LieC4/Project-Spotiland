

const SongRoutes = require('express').Router();
const { authorize } = require("../../middleware/auth");
const {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    removeSong,
} = require('./song.controller')

const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

const songCreateRateLimit = rateLimit({
        windowMs: 1 * 60 * 1000, 
        max: 2,
        standardHeaders: true,
        legacyHeaders: false,
});

SongRoutes.get('/getAll',[authorize], getAllSongs)
SongRoutes.get('/:id',[authorize], getSongById)
SongRoutes.post('/create', [authorize, songCreateRateLimit], upload.single("image"), createSong)
SongRoutes.patch('/update/:id', [authorize], updateSong)
SongRoutes.delete('/delete/:id', [authorize], upload.single("image"), removeSong)



module.exports = SongRoutes;




/*const SongRoutes = require('express').Router();
const {
    getAll,
    getById,
    create,
    update,
    deleteSong,
    getByName } = require('./song.controller')

SongRoutes.get('/getAll', getAll)
SongRoutes.get('/:id', getById)
SongRoutes.get('/name/:name', getByName)
SongRoutes.post('/create', create)
SongRoutes.patch('/update/:id', update)
SongRoutes.delete('/delete/:id', deleteSong)

module.exports = SongRoutes;*/