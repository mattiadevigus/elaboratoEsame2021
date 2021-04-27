const express = require('express');
const routerBasics = require('./routes/routerBasics');
const routerDB = require('./routes/routerDB');
const tasks = require('./scripts/tasks');

const app = express();

app.use("/", routerBasics);
app.use("/db", routerDB);

tasks.startup();

module.exports = app;