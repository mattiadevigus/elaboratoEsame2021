const express = require('express');
const cors = require('cors');
const routerBasics = require('./routes/routerBasics');
const routerDB = require('./routes/routerDB');
const tasks = require('./scripts/tasks');

const app = express();

app.use(cors());
app.use("/", routerBasics);
app.use("/db", routerDB);

tasks.startup();

module.exports = app;