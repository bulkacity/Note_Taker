const htmlRouter  = require('express').htmlRouter ();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const path = require('path');


htmlRouter .get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

htmlRouter .get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = htmlRouter ;