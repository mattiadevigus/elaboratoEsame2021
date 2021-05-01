const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const sqlite = require('better-sqlite3');

exports.createSession = (serverName, trackName, weatherValue, sessionType, dataCreation) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`INSERT OR IGNORE INTO Sessions VALUES(NULL, ?, ?, ?, ?, ?)`);
    stmt.run(serverName, trackName, weatherValue, sessionType, dataCreation.toString());

    stmt = db.prepare(`SELECT ses_id FROM Sessions WHERE ses_creation = ?`);
    let lastId = stmt.get(dataCreation.toString());

    db.close();

    return lastId["ses_id"];
};

exports.insertTime = (driverName, carModel, time, lastId) => {
    const db = new sqlite(pathDb);

    stmt = db.prepare(`INSERT OR IGNORE INTO Times VALUES(NULL, ?, ?, ?, ?, ?, ?)`);
    stmt.run(driverName, carModel, timeParse.getSeconds(time[0]), timeParse.getSeconds(time[1]), timeParse.getSeconds(time[2]), lastId);

    db.close();
};

exports.sessionCollections = () => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM Sessions INNER JOIN Tracks ON ses_track = tra_nameCode`);
    let sessions = stmt.all();

    db.close();
    return sessions;
}

exports.timesCollection = (sessionId) => {
    const db = new sqlite(pathDb);
    let stmt = db.prepare(`SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times INNER JOIN Sessions ON ses_id = tim_sessionId WHERE ses_id = ${sessionId} GROUP BY tim_driverName ORDER BY tim_totalTime ASC;`);
    let times = stmt.all();

    db.close();
    return times;
}