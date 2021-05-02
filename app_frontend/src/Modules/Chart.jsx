import cjs from 'chart.js';

class Chart {
    lineChart = (id) => {
        let ctx = document.getElementById(id).getContext('2d');
        new cjs(ctx, {
            type: 'line',
            data: {
                labels: ['Start', 'S1', 'S2', 'S3'],
                datasets: [
                    {
                        data: [15, 23, 21, 20],
                        lineTension: 0,
                        backgroundColor: [
                            'rgba(255, 255, 255, 0)',
                        ],
                        borderColor: [
                            'rgba(255, 255, 255, 1)',
                        ],
                        borderWidth: 3
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                }
            }
        })
        console.log("ciao");
    }
    
}


export default new Chart();