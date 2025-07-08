const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    noteimage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPN3EXan7dPuXfVnt5xJMhxGfrXbF-RewbLQ&s"
    },
    userId: { type: String, required: true }

}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
