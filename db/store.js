// all the required pieces to link things together

const util = require('util');
const fs = require('fs');
// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//class to store get and remove notes as needed
class Store {
    //function to read the file
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }
  //function to write the note file
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
  // function to grab the notes from the db.json
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      // if there is no notes in the array a new array will be made
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  // function to add the notes and to give them a new id
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
  // function to delete notes by id only
  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

// exporting the file so other files can pull from this code.
module.exports = new Store();