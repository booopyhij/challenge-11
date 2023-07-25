const router = require('express').Router();
const store = require('../db/store');
// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// posts the stored data to the notes.htmls
router.post('/notes', (req, res) => {
    store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

// removes the notes by id from the db.json
router.delete("/notes/:id", (req, res) => {
    store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => console.log(err));
});

module.exports = router;