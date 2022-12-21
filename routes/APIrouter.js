const express = require("express");
const apiRouter = express.Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  
  writeToFile,
  readAndAppend,
} = require("../helpers/fsUtils");
const fs = require("fs");
const fsp = require("fs").promises;

// GET Route for retrieving diagnostic information
apiRouter.get("/api/notes", async (req, res) => {
  // console.info("requesting /api/notes GET", req);
  // console.info("response for api/notes GET", res);
  try {
    const notes = await fsp.readFile("Develop/db/db.json","utf-8");
    console.table(JSON.parse(notes));
    if (!notes) {
      res.status(400).json({ message: "No notes found." });
    }
    // res.status(200).json(JSON.parse(notes));
    res.json(JSON.parse(notes));
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST Route for a error logging
apiRouter.post("/api/notes", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { title, text } = req.body;
  console.log(title, text);
  // Variable for the object we will save
  if (title && text) {
    const newNote = {
      note_id: uuidv4(),
      title,
      text
    };
  
    readAndAppend(newNote, "./Develop/db/db.json");

    console.log("body exist");
    res.json(newNote);
  } else {
    console.log("body not exist");
  }
  
});

module.exports = apiRouter;
