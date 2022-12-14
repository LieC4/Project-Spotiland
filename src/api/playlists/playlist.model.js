const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { TOPICS } = require("../../helpers/constants/topics");


const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    topics: [{ type: String, enum: TOPICS, required: true }],
    songs: [{ type: Schema.Types.ObjectId, ref:"songs"}],
    users: [{ type: Schema.Types.ObjectId, ref:"users"}]

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('playlists', schema);