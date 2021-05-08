const pathDb = "./public/tracker.db";
const timeParse = require('./time');
const mysql = require('mysql2');

exports.sessionCollections = async () => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tracker' });

    const sessions = await db.promise().query(`SELECT tim_sessionDate FROM Times GROUP BY tim_sessionDate`);

    db.destroy();
    return JSON.stringify(sessions[0]);
}

exports.timesCollection = async (sessionDate) => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tracker' });

    const times = await db.promise().query(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times WHERE tim_sessionDate = "${sessionDate}" GROUP BY tim_id) t;`);
    const bestSectors = await db.promise().query(`SELECT min(tim_sectorOne) as bestSectorOne, min(tim_sectorTwo) as bestSectorTwo, min(tim_sectorTree) as bestSectorTree FROM Times WHERE tim_sessionDate = "${sessionDate}";`);
    const bestTime = await db.promise().query(`SELECT * FROM(SELECT sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times WHERE tim_sessionDate = "${sessionDate}" GROUP BY tim_id ORDER BY tim_totalTime ASC LIMIT 1 ) t;`);
    const lapCount = await db.promise().query(`SELECT count(tim_id) as tim_totalLaps FROM Times WHERE tim_sessionDate = "${sessionDate}";`);

    db.destroy();
    return [JSON.parse(JSON.stringify(times[0])), JSON.parse(JSON.stringify(bestSectors[0])), JSON.parse(JSON.stringify(bestTime[0])), JSON.parse(JSON.stringify(lapCount[0]))];
}

exports.allTimes = async () => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tracker' });

    const times = await db.promise().query(`SELECT * FROM (SELECT *, sum(tim_sectorOne + tim_sectorTwo + tim_sectorTree) as tim_totalTime FROM Times GROUP BY tim_id ORDER BY tim_sessionDate ASC) t`);

    db.destroy();
    return (JSON.parse(JSON.stringify(times[0])));
}

exports.checkLogin = async (credentials) => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tracker' });

    const check = await db.promise().query(`SELECT count(usr_email) as usr_check FROM Users WHERE usr_email = "${credentials.email}" AND usr_password = "${credentials.password}";`);

    db.destroy();
    return JSON.parse(JSON.stringify(check[0]));
}

exports.deleteTime = async (id) => {
    const db = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'tracker' });

    await db.promise().query(`DELETE FROM Times WHERE tim_id = ${id}`);

    db.destroy();
    return true;
}