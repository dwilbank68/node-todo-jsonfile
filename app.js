const fs = require('fs');
const _ = require("lodash");
const yargs = require('yargs');

const notes = require("./notes.js");

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const argv = yargs
    .command('add','Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','list all notes')
    .command('read','read a note', {
        title: titleOptions
    })
    .command('remove','remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

//var command = process.argv[2];
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('duplicate note title - note not added');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s)`);
    allNotes.forEach( (note)=> notes.logNote(note) );
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('note not found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'note was removed' : 'note not found';
    console.log(message);
} else {
    console.log('command not recognized');
}
