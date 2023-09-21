// importing express package with using router. and importing the data base.

const router = require('express').Router();
const store = require('../db/store');
// GET "/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  store
  //pulls pull function from index.js
  //Makes a get fetch request for the notes
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

// posts the stored data to the notes.htmls
router.post('/notes', (req, res) => {
    store
    //function from the index.js. 
    // Creates new note. Part of the CRUD process
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => console.log(err));
});

// removes the notes by id from the db.json
router.delete("/notes/:id", (req, res) => {
    store
    //pull the function from index.js. built to delete
    // a note. part of the CRUD process
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => console.log(err));
});

module.exports = router;