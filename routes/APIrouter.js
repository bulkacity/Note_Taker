const apiRoute = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend} = require('../helpers/fsUtils');

apiRoute.get('/notes', (req, res) => {
    
    console.log(`${req.method} received`);
    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)));
});

apiRoute.post('/notes', (req, res) => {
    console.log(`${req.method} request received`);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            note_id: uuidv4(),
            title,
            text,
        }

        readAndAppend(newNote, './db/db.json');

        res.json('Note Added!');
    } else {
        res.error('Error adding note!');
    }
});

module.exports = apiRoute;