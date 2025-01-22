const mongoose = require('mongoose');

//create Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,

    },
}, { timestamps: true });

//create Model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;