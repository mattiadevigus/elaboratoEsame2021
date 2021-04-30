const pathDb = "./public/tracker.db";
const db = require('./../scripts/modules/database');

exports.getHome = (req, res) => {
    res.send(db.sessionCollections());
}

exports.getSessionTimes = (req, res) => {
    res.send(db.timesCollection(req.params.id));
}