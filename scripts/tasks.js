const colors = require('colors/safe');
const results = require('./modules/results');
const time = require('./modules/time');
const database = require('./modules/database');

exports.startup = () => {
    let arr = results.getAllJsonFiles("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    let sessions = results.getFullLeaderBoard(arr);

    let j= 0;
    for (let session of sessions) {
        let i = 0;
        
        let serverName = results.getServerName(arr);
        let trackName = results.getTrackName(arr);
        let sessionType = results.getSessionType(arr);
        let weatherValue = results.getWeather(arr);
        let bestTime = results.getBestLap(arr);

        /* console.log(colors.red("----------------------------------------------------------------------"));
        console.log("Session type: " + sessionType[j]);
        console.log("Track: "  + (trackName[j]+1));
        console.log("Session: " + (j+1));
        console.log("Weather quantity: " + (weatherValue) + "/1");
        console.log("Best time: " + colors.magenta(bestTime[j])); */

        let idSession = database.createSession(serverName[j], trackName[j], weatherValue[j], sessionType[j]);
        console.log(idSession);
        
        while (session[i] != undefined) {
            let fullName = session[i].currentDriver["firstName"] + " " + session[i].currentDriver["lastName"];
            /* console.log(fullName + ":"); */

            let idCar = session[i].car["carId"];
            let times = results.getAllLapsFromDriver(arr, idCar);

            let timeDriver = [];
            for (let time of times) {
                timeDriver.push(time.splits);
            } 
            /* console.log(timeDriver); */
            i++;
        }
        
        j++;
    }
}
