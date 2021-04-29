const pathDb = "./public/tracker.db";
const sqlite = require('better-sqlite3');

exports.getHome = (req, res) => {
    let db = new sqlite(pathDb);
    let stmt = db.prepare("SELECT * FROM Sessions");
    res.send(stmt.all());
    db.close();
}