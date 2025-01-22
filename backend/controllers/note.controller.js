const Note = require("../models/note.model");

/**
 * Create a new note
 */
const createNote = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id; 

  try {
    const noteAdded = await Note.create({ title, description, userId });
    res.status(201).json({ message: "Note created successfully", data: noteAdded });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get all notes for the logged-in user
 */
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id; 

    const userNotes = await Note.find({ userId }); 

    res.status(200).json({ data: userNotes });
  } catch (error) {
    console.error("Error fetching note list:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Get note details by ID
 */
const getNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const noteData = await Note.findById(id);
    if (!noteData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ data: noteData });
  } catch (error) {
    console.error("Error fetching note details:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Delete note by ID
 */
const deleteNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const noteData = await Note.findByIdAndDelete(id);
    if (!noteData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", data: noteData });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Update note details by ID
 */
const updateNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ message: "Note updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  deleteNoteById,
  updateNoteById,
};