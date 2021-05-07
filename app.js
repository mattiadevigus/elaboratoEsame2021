const express = require('express');
const cors = require('cors');
const routerBasics = require('./routes/routerBasics');
const tasks = require('./scripts/tasks');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", routerBasics);

tasks.startup();

module.exports = app;