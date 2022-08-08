const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    genre: { type: String, required: true },
    albums: [{ type: Schema.Types.ObjectId, ref:"albums"}],
    playlists: [{ type: Schema.Types.ObjectId, ref:"playlists"}]
   

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('artists', schema);