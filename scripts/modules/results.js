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

exports.getTrackName = (arr) => {
    let tracks = [];
    arr.forEach(obj => {
        tracks.push(obj["trackName"]);
    })
    return tracks;
}

exports.getBestLap = (arr) => {
    let sectors = [];
    arr.forEach(obj => {
        sectors.push(obj["sessionResult"].bestSplits);
    })
    return sectors;
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
            if(obj.laps[i].carId === id) times.push(obj.laps[i]);
            i++;
        }
    })

    return times;
}


exports.removeEscape = (string) => {
    string = string.replace(/[\u0000-\u0019]+/g, "");
    return JSON.parse(string);
}

