import { error } from 'console';
import fs from 'fs';

export default class NotesHandler {
  init(title, content) { // Creates a json file.
    const notes = [{ title, content }];
    const json = JSON.stringify(notes);
    fs.writeFile("notes.json", json, (error) => {
      if (error) return console.error(error.message);

      console.log("Note created");
    })
  }

  create(title, content) {  // Creates a new note in json file.
    if (fs.existsSync("notes.json")) {
      fs.readFile("notes.json", (error, data) => {
        if (error) return console.error(error.message);

        const notes = JSON.parse(data);
        notes.push({ title, content });
        const json = JSON.stringify(notes);

        fs.writeFile("notes.json", json, (error) => {
          if (error) return console.error(error.message);

          console.log("Note created");
        })
      });
    } else {
      this.init(title, content);
    }
  }

  list() { // Outputs an array of titles of notes.
    fs.readFile("notes.json", (error, data) => {
      if (error) return console.error(error.message);

      const notes = JSON.parse(data);
      notes.forEach((note, index) => console.log(`${index + 1} ${note.title}`));
    })
  }

  view(title) { // Outputs data from specified note.
    fs.readFile("notes.json", (error, data) => {
      if (error) console.error(error.message);

      const notes = JSON.parse(data);
      const note = notes.find((note) => note.title === title);

      if (note) {
        console.log(note.content);
      } else {
        console.log("Note not found");
      }
    })
  }

  remove(title) { // Removes the note from array.
    fs.readFile("notes.json", (error, data) => {
      if (error) console.error(error.message);

      const notes = JSON.parse(data);
      const json = JSON.stringify(
        notes.filter((note) => note.title !== title)
      );

      fs.writeFile("notes.json", json, (error) => {
        if (error) console.error(error.message);

        console.log("Note deleted");
      })
    })
  }
}