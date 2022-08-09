const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    playlists: [{ type: Schema.Types.ObjectId, ref:"playlists"}]

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('users', schema);