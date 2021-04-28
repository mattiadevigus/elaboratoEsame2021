const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const Sqlite = require('better-sqlite3');

exports.createSession = ((serverName, trackName, weatherValue, sessionType) => {
    const db = new Sqlite(pathDb, { verbose: console.log });

    let stmt = db.prepare(`INSERT INTO Sessions VALUES(NULL, ?, ?, ?, ?)`);
    stmt.run(serverName, trackName, weatherValue, sessionType);

    stmt = db.prepare(`SELECT ses_id FROM Sessions ORDER BY ses_id DESC LIMIT 1`);
    let lastId = stmt.get();

    db.close();
    return lastId["ses_id"];
});

exports.insertTime = ((driverName, carModel, time, lastId) => {
    const db = new Sqlite(pathDb, {verbose: console.log});

    let stmt = db.prepare(`INSERT INTO Times VALUES(NULL, ?, ?, ?, ?, ?, ?)`);
    stmt.run(driverName, carModel, timeParse.getSeconds(time[0]) , timeParse.getSeconds(time[1]), timeParse.getSeconds(time[2]), lastId);

    db.close();
});