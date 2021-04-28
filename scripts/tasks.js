const colors = require('colors/safe');
const results = require('./modules/results');
const timeParse = require('./modules/time');
const database = require('./modules/database');

exports.startup = () => {
    let arr = results.getAllJsonFiles("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    let sessions = results.getFullLeaderBoard(arr);

    let j= 0;

    for (let session of sessions) {
        const serverName = results.getServerName(arr);
        const trackName = results.getTrackName(arr);
        const sessionType = results.getSessionType(arr);
        const weatherValue = results.getWeather(arr);
        const bestTime = results.getBestLap(arr);
        const idSession = database.createSession(serverName[j], trackName[j], weatherValue[j], sessionType[j]);

        let i = 0;

        while (session[i] != undefined) {
            let fullName = session[i].currentDriver["firstName"] + " " + session[i].currentDriver["lastName"];
            let carModel = session[i].car["carModel"];
            let idCar = session[i].car["carId"];
            let times = results.getAllLapsFromDriver(arr, idCar);
            let timeDriver = [];

            for (let time of times) {
                timeDriver.push(time.splits);
            } 

            for(let time of timeDriver) {
                database.insertTime(fullName, carModel, time, idSession);
            }

            i++;
        }

        j++;
    }
}
