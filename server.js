const express = require('express');
const api = require('./Develop/routes/APIrouter');
const htmlRoutes = require("./Develop/routes/HTMLrouter");

const app = express();

// Middleware for parsing JSON and urlencoded form data
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.use("/",htmlRoutes);
app.use('/api', api);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
test