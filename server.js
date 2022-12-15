const express = require('express');

const PORT = 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const htmlRoutes = require("./Develop/routes/HTMLrouter");
app.use(htmlRoutes);
const apiRoutes = require("./Develop/routes/APIrouter");
app.use(apiRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
