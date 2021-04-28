const fs = require('fs');

exports.getAllJsonFiles = (filespath) => {
    let arr = [];
    let files = fs.readdirSync(filespath);
    files.forEach(file => {
        arr.push(this.getJsonFile(filespath + "\\"+ file));
    })

    return arr;
}

exports.getJsonFile = (filename) => {
    let data = fs.readFileSync(filename).toString();
    data = this.removeEscape(data);
    return data;
}

exports.getDataFile = (filespath) => {
    let data = fs.stat(filespath, (err, stat) => {
        return stat.birthtime;
    })
    return data;
}

exports.getTrackName = (arr) => {
    let tracks = [];
    arr.forEach(obj => {
        tracks.push(obj["trackName"]);
    })

    return tracks;
}

exports.getBestLap = (arr) => {
    let best = [];
    arr.forEach(obj => {
        best.push(obj["sessionResult"].bestlap);
        console.log(obj)
    })

    return best;
} 

exports.getWeather = (arr) => {
    let weather = [];
    arr.forEach(obj => {
        weather.push(obj["sessionResult"].isWetSession);
    })

    return weather;
}

exports.getFullLeaderBoard = (arr) => {
    let leaderboard = [];
    arr.forEach(obj => {
        leaderboard.push(obj["sessionResult"].leaderBoardLines);
    })

    return leaderboard;
}

exports.getAllLapsFromDriver = (arr, id) => {
    let times = [];
    let i = 0;
    arr.forEach((obj, index) => {
        while(obj.laps[i] != undefined) {
            if(obj.laps[i].carId === id && obj.laps[i].isValidForBest === true) times.push(obj.laps[i]);
            i++;
        }
    })

    return times;
}

exports.removeEscape = (string) => {
    string = string.replace(/[\u0000-\u0019]+/g, "");
    return JSON.parse(string);
}



