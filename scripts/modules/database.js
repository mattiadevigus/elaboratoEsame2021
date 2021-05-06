const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const sqlite = require('better-sqlite3');

exports.sessionCollections = () => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT tim_sessionDate FROM Times GROUP BY tim_sessionDate`);
    let session = stmt.all();

    db.close();
    return session;
}

exports.timesCollection = (sessionDate) => {
    const db = new sqlite(pathDb);

    let stmt = db.prepare(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times WHERE tim_sessionDate = ? GROUP BY tim_id)`);
    let times = stmt.all(sessionDate);

    stmt = db.prepare(`SELECT min(tim_sectorOne) as bestSectorOne, min(tim_sectorTwo) as bestSectorTwo, min(tim_sectorTree) as bestSectorTree FROM Times WHERE tim_sessionDate = ?;`);
    let bestSectors = stmt.all(sessionDate);

    stmt = db.prepare(`SELECT * FROM(SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times WHERE tim_sessionDate = ? GROUP BY tim_id);`);
    let bestTime = stmt.get(sessionDate);

    stmt = db.prepare(`SELECT count(tim_id) as tim_totalLaps FROM Times WHERE tim_sessionDate = ?`);
    let lapCount = stmt.get(sessionDate);

    db.close();
    return [times, bestSectors, bestTime, lapCount];
}