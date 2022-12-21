const apiRoute = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend} = require('../helpers/fsUtils');

const notesArray = readFromFile('./db/db.json')
.then((data) => (JSON.parse(data)));

console.log(notesArray);

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
            
            title,
            text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json');

        res.json('Note Added!');
    } else {
        res.error('Error adding note!');
    }
});

// adding db instead of notes //
apiRoute.delete('/notes/:id',(req, res) => {
    console.log(`${req.method} request to delete a note`);
    //console.log(JSON.stringify(req.params));
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            // Look for the element in parsedData with the requested 'id'
            for (let [i, note] of parsedData.entries()) {
                if (note.id === req.params.id){
                    // Delete current element from parsedData
                    parsedData.splice(i,1);
                }
            }
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData deleted from db.json`)
          );
        }
    });
    const response = {
        status: 'Success',
    };
    res.status(201).json(response);
});
module.exports = apiRoute;