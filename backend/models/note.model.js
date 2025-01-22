const mongoose = require('mongoose');

// Create Schema
const noteSchema = new mongoose.Schema({
  title: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true, 
  },
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
