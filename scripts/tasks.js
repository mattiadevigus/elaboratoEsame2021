const results = require('./modules/results')
const time = require('./modules/time');

exports.startup = () => {
    let arr = results.getAllJsonFiles("C:\\Users\\matti\\Desktop\\Scottish Gaming League Server\\results");
    console.log(results.getAllLapsFromDriver(arr, 1001));
}