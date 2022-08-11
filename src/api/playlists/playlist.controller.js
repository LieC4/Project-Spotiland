

const Playlist = require("./playlist.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");

const getAllPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find().populate("users songs");/*.sort({ createAt: 'desc' })*/
    return res.status(200).json({
      message: 'All Playlists',
      playlists
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all playlists'));
  }
}

const getPlaylistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playlist = await (await Playlist.findById(id)).populate("users songs");
    if (!playlist) return next(setError(404, error.message | 'Playlist not found'));
    return res.status(200).json({
      message: 'Playlist by Id',
      playlist
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed playlist id'));
  }
}

const createPlaylist = async (req, res, next) => {
  try {
    const playlist = new Playlist(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) playlist.image = req.file.path;
    const playlistInDb = await playlist.save();

    return res.status(201).json({
      message: 'Created new Playlist',
      playlistInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create playlist'));
  }
}

const updatePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playlist = new Playlist(req.body);
    playlist._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    if (req.file) playlist.image = req.file.path;
    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, playlist);
    if (!updatedPlaylist) return next(setError(404, 'Playlist not found'));
    return res.status(201).json({
      message: 'Updated Playlist',
      updatedPlaylist
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated playlist'));
  }
}

const removePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPlaylist = await Playlist.findByIdAndDelete(id);
    if (deletedPlaylist.image) deleteFile(deletedPlaylist.image);
    if (!deletedPlaylist) return next(setError(404, 'Playlist not found'));
    return res.status(200).json({
      message: 'Delete Playlist',
      deletedPlaylist
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted playlist'));
  }
}

module.exports = { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, removePlaylist };

/*

const getAll = async (req, res, next) => {
    try {
        const playlists = await Playlist.find()
        return res.json({
            status: 200,
            message: 'Recovered all playlists',
            data: { playlists }
        });
    } catch (error) {
        return next(setError(500, 'Failed recover all playlists'));
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const playlist = await Playlist.findById(id);
        if (!playlist) return next(setError(404, 'Playlist not found'))
        return res.json({
            status: 200,
            message: 'Recovered playlist by id',
            data: { playlist }
        });
    } catch (error) {
        return next(setError(500, 'Failed playlist by id'));
    }
};

const getByName = async (req, res, next) => {
    try {
        const {name} = req.params;
        const playlist = await Playlist.find({name:name});
        if (!playlist) return next(setError(404, 'Playlist not found by name'));
        return res.json({
            status: 200,
            message: 'Recovered playlist by name',
            data: { playlist }
        });
    } catch (error) {
        return next(setError(500, 'Fai;ed recover playlist by name'))
    }
}

const create = async (req, res, next) => {
    try {
        const PlaylistToSave = new Playlist(req.body)
        const playlistInDb = await PlaylistToSave.save()
        return res.json({
            status: 201,
            message: 'Created new playlist',
            data: { playlistInDb }
        });
    } catch (error) {
        return next(setError(500, 'Failed to create playlist'));
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const updatePlaylist = await Playlist.findByIdAndUpdate(id, course)
        if (!updatePlaylist) return next(setError(404, 'Playlist not found'))
        return res.json({
            status: 201,
            message: 'Updated playlist by id',
            data: { updatePlaylist }
        });
    } catch (error) {
        return next(setError(500, 'Failed update playlist by id'));
    }
};

const deletePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletePlaylist = await Playlist.findByIdAndDelete(id)
        if (!deletePlaylist) return next(setError(404, 'Playlist not found'))
        return res.json({
            status: 200,
            message: 'Deleted playlist by id'
        })
    } catch (error) {
        return next(setError(500, 'Failed delete playlist by id'));
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deletePlaylist,
    getByName
}*/