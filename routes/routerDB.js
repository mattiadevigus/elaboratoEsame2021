const express = require('express');
const controllerBasics = require('./../controllers/controllerDB');
const router = express.Router();

router
    .get("/", controllerBasics.getHome);

module.exports = router;