const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    year: { type: Number, required: true },
    songs: [{ type: String, required: true }],
    artists: [{ type: Schema.Types.ObjectId, ref:"artists"}]
   
   
   

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('albums', schema);