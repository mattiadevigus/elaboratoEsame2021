const sqlite3 = require('sqlite3').verbose();
const pathDb = "./public/tracker.db";

exports.createSession = () => {
    let db = new sqlite3.Database()
}