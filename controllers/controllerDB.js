const pathDb = "./public/tracker.db";
const sqlite = require('better-sqlite3');

exports.getHome = (req, res) => {
    let db = new sqlite(pathDb);
}