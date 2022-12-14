const apiRouter = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
apiRouter.get('/api/notes', (req, res) => {
  // TODO: Logic for sending all the content of db
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
apiRouter.post('/api/notes', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const {id,title,text} = req.body;

  if (id && title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id : uuidv4(),
      };

      readAndAppend(newNote, '../db/db.json');
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    }else {
        res.json('Error in posting notes');
      }

});

module.exports = apiRouter;
