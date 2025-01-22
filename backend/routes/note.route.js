// userRoutes.js
const express = require("express");
const { createNote, getAllNotes, getNoteById, deleteNoteById, updateNoteById } = require("../controllers/note.controller");
const  { authMiddleware }  = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/createNote", authMiddleware, createNote);
router.get("/noteList", authMiddleware, getAllNotes);
router.get("/noteDetails/:id",authMiddleware, getNoteById);
router.delete("/deleteNote/:id", authMiddleware, deleteNoteById);
router.patch("/updateNote/:id", authMiddleware, updateNoteById);

module.exports = router;