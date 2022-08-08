const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    songs: [{ type: String, required: true }],
    topics: [{ type: String, required: true }],
    artists: [{ type: Schema.Types.ObjectId, ref:"artists"}],
    users: [{ type: Schema.Types.ObjectId, ref:"users"}],
     

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('playlists', schema);