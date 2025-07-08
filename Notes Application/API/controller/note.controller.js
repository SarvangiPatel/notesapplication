const Note = require("../models/note.models");
const mongoose = require("mongoose");

const notecontroller = {
    test: (req, res) => {
        res.status(200).json({
            message: "Note controller is working"
        });
    },
    create: async (req, res) => {
        try {
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).json({
                    message: "Title and content are required"
                });
            }

            const createnote = await Note.create({
                title,
                content,
                userId: req.user._id
            });

            if (!createnote) {
                return res.status(500).json({
                    message: "Failed to create note"
                });
            }

            res.status(201).json({
                message: "Note created successfully",
                note: createnote
            });

        } catch (error) {
            res.status(500).json({
                message: "Error creating note",
                error: error.message
            });
        }
    },
    GETALL: async (req, res) => {

        console.log("Fetching all notes for user:", req.user._id);
        try {
            const notes = await Note.find({ userId: req.user._id });

            if (!notes) {
                return res.status(404).json({
                    message: "No notes found"
                });
            }

            res.status(200).json({
                message: "Notes retrieved successfully",
                notes: notes
            });

        } catch (error) {
            console.error("Error fetching notes:", error);
            res.status(500).json({
                message: "Error retrieving notes",
                error: error.message
            });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { title, content } = req.body;

        console.log("📝 Updating note with ID:", id);
        console.log("📦 Request body:", req.body);
        console.log("🔐 Authenticated user:", req.user);

        if (!id) {
            return res.status(400).json({
                message: "Invalid note ID"
            });
        }

        try {
            const updatedNote = await Note.findOneAndUpdate(
                { _id: id, userId: req.user._id.toString() }, // ✅ correct check
                { title, content },
                { new: true, runValidators: true }
            );

            console.log("✅ Updated note:", updatedNote);

            if (!updatedNote) {
                return res.status(404).json({
                    message: "Note not found or you do not have permission to update it"
                });
            }

            res.status(200).json({
                message: "Note updated successfully",
                note: updatedNote
            });

        } catch (error) {
            console.error("❌ Error updating note:", error);
            res.status(500).json({
                message: "Error updating note",
                error: error.message
            });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Invalid note ID"
            });
        }
        try {
            const deletedNote = await Note.findOneAndDelete({ _id: id, userId: req.user._id });

            if (!deletedNote) {
                return res.status(404).json({
                    message: "Note not found or you do not have permission to delete it"
                });
            }

            res.status(200).json({
                message: "Note deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                message: "Error deleting note",
                error: error.message
            });
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        const userId = req.user._id;

        try {
            const note = await Note.findOne({ _id: id, userId });
            console.log(note)
            if (!note) {
                return res.status(404).json({ message: "Note not found" });
            }

            res.status(200).json({ note });
        } catch (error) {
            res.status(500).json({ message: "Error fetching note", error: error.message });
        }
    }

}

module.exports = notecontroller;