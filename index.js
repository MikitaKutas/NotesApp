const [command, title, content] = process.argv.slice(2);

import NotesHandler from './notesHandler.js';
const notes = new NotesHandler();

switch (command) {
  case 'create':
    notes.create(title, content);
    break;
  case 'list':
    notes.list();
    break;
  case 'view':
    notes.view(title);
    break;
  case 'remove':
    notes.remove(title);
    break;
}