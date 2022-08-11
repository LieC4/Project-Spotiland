const Song = require("./song.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()//.sort({ createAt: 'desc' });
    return res.status(200).json({
      message: 'All Songs',
      songs
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all song'));
  }
}

const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await (await Song.findById(id));
    if (!song) return next(setError(404, error.message | 'Song not found'));
    return res.status(200).json({
      message: 'Song by Id',
      song
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed song id'));
  }
}

const createSong = async (req, res, next) => {
  try {
    const song = new Song(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) song.image = req.file.path;
    const songInDb = await song.save();

    return res.status(201).json({
      message: 'Created new Song',
      songInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create song'));
  }
}

const updateSong= async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = new Song(req.body);
    song._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    const updatedSong = await Song.findByIdAndUpdate(id, song);
    if (req.file) song.image = req.file.path;
    if (!updatedSong) return next(setError(404, 'Song not found'));
    return res.status(201).json({
      message: 'Updated Song',
      updatedSong
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated song'));
  }
}

const removeSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedSong = await Song.findByIdAndDelete(id);
    if (deletedSong.image) deleteFile(deletedSong.image);
    if (!deletedSong) return next(setError(404, 'Song not found'));
    return res.status(200).json({
      message: 'Delete Song',
      deletedSong
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted song'));
  }
}

module.exports = { getAllSongs, getSongById, createSong, updateSong, removeSong };





/*

const getAll = async (req, res, next) => {         //cambiar req si da error y set arriba
    try {
        const songs = await Song.find()
        return res.json({
            status: 200,
            message: 'Recovered all songs',
            data: { songs }
        });
    } catch (error) {
        return next(setError(500, 'Failed recover all songs'));
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const song = await Song.findById(id);
        if (!song) return next(setError(404, 'Song not found'))
        return res.json({
            status: 200,
            message: 'Recovered song by id',
            data: { song }
        });
    } catch (error) {
        return next(setError(500, 'Failed song by id'));
    }
};

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const song = await Song.find({name:name});
        if (!song) return next(setError(404, 'Song not found by name'));
        return res.json({
            status: 200,
            message: 'Recovered song by name',
            data: { song }
        });
    } catch (error) {
        return next(setError(500, 'Failed recover song by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const SongToSave = new Song(req.body)
        const songInDb = await SongToSave.save()
        return res.json({
            status: 201,
            message: 'Created new song',
            data: { songInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed to create song'));
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const updateSong = await Song.findByIdAndUpdate(id, course)
        if (!updateSong) return next(setError(404, 'Song not found'))
        return res.json({
            status: 201,
            message: 'Updated song by id',
            data: { updateSong }
        });
    } catch (error) {
        return next(setError(500, 'Failed update song by id'));
    }
};

const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteSong = await Song.findByIdAndDelete(id)
        if (!deleteSong) return next(setError(404, 'Song not found'))
        return res.json({
            status: 200,
            message: 'Deleted song by id'
        })
    } catch (error) {
        return next(setError(500, 'Failed delete song by id'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteSong,
    getByName
}*/