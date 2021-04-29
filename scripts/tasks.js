const colors = require('colors/safe');
const results = require('./modules/results');
const timeParse = require('./modules/time');
const database = require('./modules/database');

exports.startup = () => {
    // retrieve data from json
    const arr = results.getAllJsonFiles("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    const arrDates = results.getAllJsonDataCreation("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    const sessions = results.getFullLeaderBoard(arr);
    let j= 0;

    // for each sessions
    for (let session of sessions) {
        // retrieve data from single session and create session into db
        const serverName = results.getServerName(arr);
        const trackName = results.getTrackName(arr);
        const sessionType = results.getSessionType(arr);
        const weatherValue = results.getWeather(arr);
        const idSession = database.createSession(serverName[j], trackName[j], weatherValue[j], sessionType[j], arrDates[j]);

        let i = 0;
        
        // retrieve data from single driver and insert time into db
        while (session[i] != undefined) {
            let fullName = session[i].currentDriver["firstName"] + " " + session[i].currentDriver["lastName"];
            let carModel = session[i].car["carModel"];
            let idCar = session[i].car["carId"];
            let times = results.getAllLapsFromDriver(arr, idCar);
            let timeDriver = [];

            for (let time of times) timeDriver.push(time.splits);

            for(let time of timeDriver) database.insertTime(fullName, carModel, time, idSession);

            i++;
        }

        j++;
    }
}
