const db = require('./../scripts/modules/database');

exports.getHome = async (req, res) => {
    res.send(await db.sessionCollections());
}

exports.getSessionTimes = async (req, res) => {
    res.send(await db.timesCollection(req.params.id));
}

exports.postLogin = async (req, res) => {
    res.send(await db.checkLogin(req.body));
}

exports.getTimetable = async (req, res) => {
    res.send(await db.allTimes());
}

exports.deleteTime = async (req, res) => {
    res.send(await db.deleteTime(req.params.id));
}