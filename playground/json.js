const fs = require("fs");


var originalNoteString = '{"title":"Doggy Run"}';

fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);