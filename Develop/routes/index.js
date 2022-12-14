const express = require('express');

// Import our modular routers for /tips and /feedback
const apiRouter = require('./APIroute');
const htmlRouter = require('./HTMLroute');

const app = express();

app.use('/APIroute', apiRouter );
app.use('/HTMLroute', htmlRouter);

module.exports = app;
