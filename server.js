const express = require('express');
const apiRoute = require('./routes/APIrouter');
const htmlRoute = require('./routes/HTMLrouter');

const PORT = process.env.PORT ;

const app = express();

app.use(express.urlencoded({ extended: true}));


app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});