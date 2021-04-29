const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const sqlite = require('better-sqlite3');

exports.createSession = ((serverName, trackName, weatherValue, sessionType, dataCreation) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`INSERT OR IGNORE INTO Sessions VALUES(NULL, ?, ?, ?, ?, ?)`);
    stmt.run(serverName, trackName, weatherValue, sessionType, dataCreation.toString());

    stmt = db.prepare(`SELECT ses_id FROM Sessions ORDER BY ses_id DESC LIMIT 1`);
    let lastId = stmt.get();

    db.close();
    return lastId["ses_id"];
});

exports.insertTime = ((driverName, carModel, time, lastId) => {
    const db = new sqlite(pathDb);

    stmt = db.prepare(`INSERT OR IGNORE INTO Times VALUES(NULL, ?, ?, ?, ?, ?, ?)`);
    stmt.run(driverName, carModel, timeParse.getSeconds(time[0]), timeParse.getSeconds(time[1]), timeParse.getSeconds(time[2]), lastId);

    db.close();
});