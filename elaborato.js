const i2c = require('i2c-bus');
const ADS1115 = require('ads1115');
const mysql2 = require('mysql2');

i2c.openPromisified(1)
	.then(async (bus) => { 
		const ads1115 = await ADS1115(bus);
		ads1115.gain = 1;
		const currentDate = new Date();
		const stringDate = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
		let startDate = Date.now();
		let sectorOne = 0;
		let sectorTwo = 0;
		let sectorTree = 0;
		let fullLap;

		console.log("Session: " + stringDate);
		 while(1) {
    			let sensorOne = await ads1115.measure('0+GND'); 
			let sensorTwo = await ads1115.measure('1+GND'); 
			let sensorTree = await ads1115.measure('2+GND'); 
			if(sensorOne > 18000) {
				console.log("Macchina sta passando sopra il T1"); 
				sectorOne = Date.now() - startDate; 
				console.log("First sector:" + sectorOne);
			}
			if (sensorTwo > 18000) {
				console.log("Macchina sta passando sopra al T2"); 
				sectorTwo = (Date.now()-startDate) - sectorOne;
				console.log("Second sector:" + sectorTwo);
			}
			if (sensorTree > 18000) {
				if(sectorOne === 0 || sectorTwo === 0) {
					console.log("...");
				} else {
					console.log("Macchina ha finito il giro");
					sectorTree = (Date.now() - startDate) - (sectorOne + sectorTwo);
					console.log("Third sector:" + sectorTree);
					fullLap = sectorOne + sectorTwo + sectorTree;
					console.log("Lap:" + fullLap);
					const db = mysql2.createConnection({host: '192.168.137.1', user: 'mattiadevigus', password: 'elaborato', database:'tracker'});
					db.query(`INSERT INTO Times VALUES(NULL, ${sectorOne}/1000, ${sectorTwo}/1000, ${sectorTree}/1000, "${stringDate}");`);
					startDate = Date.now();
					sectorOne = 0;
					sectorTwo = 0;
				}
    			}
		 }
	})

