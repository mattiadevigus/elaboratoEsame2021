const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');


router
    .get("/", controllerBasics.getHome);

module.exports = router;