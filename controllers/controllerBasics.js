const pathDb = "./public/tracker.db";
const sqlite = require('better-sqlite3');

exports.getHome = (req, res) => {
    let db = new sqlite(pathDb);
    let stmt = db.prepare("SELECT * FROM Sessions INNER JOIN Tracks ON ses_track = tra_nameCode");
    res.send(stmt.all());
    db.close();
}