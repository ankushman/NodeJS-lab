// Node.js server for managing notes using a file (notes.txt)
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const NOTES_FILE = path.join(__dirname, 'notes.txt');

// Helper to ensure notes.txt exists
function ensureNotesFile() {
    if (!fs.existsSync(NOTES_FILE)) {
        fs.writeFileSync(NOTES_FILE, '');
    }
}

// 1. GET /add?note=YourNoteHere
app.get('/add', (req, res) => {
    const note = req.query.note;
    if (!note) {
        return res.status(400).send('400 Bad Request');
    }
    ensureNotesFile();
    fs.appendFile(NOTES_FILE, note + '\n', err => {
        if (err) return res.status(500).send('Internal Server Error');
        res.send('Note Added Successfully');
    });
});

// 2. GET /notes
app.get('/notes', (req, res) => {
    ensureNotesFile();
    fs.readFile(NOTES_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Internal Server Error');
        const notes = data.trim();
        if (!notes) {
            res.send('No Notes Found');
        } else {
            res.send(notes);
        }
    });
});

// 3. GET /clear
app.get('/clear', (req, res) => {
    ensureNotesFile();
    fs.writeFile(NOTES_FILE, '', err => {
        if (err) return res.status(500).send('Internal Server Error');
        res.send('All Notes Deleted');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
