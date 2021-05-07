import cjs from 'chart.js';
import Base from './Base';

class Chart {
    lineChart = (id, times) => {
        let arrTimes = [];
        let arrTimesFormatted = [];
        for(let time of times) {
            arrTimes.push(time.tim_totalTime);
            arrTimesFormatted.push(Base.getFullTime(time.tim_totalTime*1000));
        } 
        let ctx = document.getElementById(id).getContext('2d');
        new cjs(ctx, {
            type: 'line',
            data: {
                labels: arrTimesFormatted,
                datasets: [
                    {   
                        label: "Laps",
                        data: arrTimes,
                        backgroundColor: "rgba(139, 0, 0, .3)",
                        borderColor: "rgba(139, 0, 0, 1)",
                        fillColor: "rgba(210,27,71,0)",
                        borderWidth: 3
                    },
                    {   
                        data: this.calculateAvgArray(times),
                        backgroundColor: "rgba(139, 0, 0, 0)",
                        borderColor: "#fff",
                        fillColor: "rgba(210,27,71,0)",
                        borderWidth: 1
                    },
                ],

            },
            options: {
                responsive:true,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: 'transparent'
                        },
                        ticks: {
                            beginAtZero:false,
                            display: false
                        },
                        
                    }],
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(139, 0, 0, .3)'
                        },

                    }],
                }
            }
        })
    }

    calculateAvgArray = (times) => {
        let avg = [];
        let sum = 0;
        let i = 1;

        for(let time of times) {
            avg.push(((sum+time.tim_totalTime) / i));
            sum = sum + time.tim_totalTime;
            i++;
        } 

        return avg;
    }


}


export default new Chart();