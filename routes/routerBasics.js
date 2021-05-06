const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');

router
    .get("/", controllerBasics.getHome);

router
    .get("/timing/:id", controllerBasics.getSessionTimes);

module.exports = router;