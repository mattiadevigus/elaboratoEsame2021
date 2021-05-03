import cjs from 'chart.js';

class Chart {
    lineChart = (id) => {
        let ctx = document.getElementById(id).getContext('2d');
        new cjs(ctx, {
            type: 'line',
            data: {
                labels: ['Lap n', 'Lap n', 'Lap n', 'Lap n', 'Lap n', 'Lap n', 'Lap n'],
                datasets: [
                    {
                        data: [15, 16, 15, 14, 15, 12, 15],
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
                },
                scales: {
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
        console.log("ciao");
    }
    
}


export default new Chart();