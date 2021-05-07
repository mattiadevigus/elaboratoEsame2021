const express = require('express');
const router = express.Router();
const controllerBasics = require('./../controllers/controllerBasics');

router
    .get("/", controllerBasics.getHome);

router
    .get("/timing/:id", controllerBasics.getSessionTimes);

router
    .post("/login", controllerBasics.postLogin)

module.exports = router;