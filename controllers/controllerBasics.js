const db = require('./../scripts/modules/database');

exports.getHome = async (req, res) => {
    res.send(await db.sessionCollections());
}

exports.getSessionTimes = async(req, res) => {
    console.log(await db.timesCollection(req.params.id));
    res.send(await db.timesCollection(req.params.id));
}

exports.postLogin = (req, res) => {
    console.log(req.body);
}