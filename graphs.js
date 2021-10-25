//This script makes use of the charts.js library
Chart.defaults.global.defaultFontColor = 'white';
let ctxS = document.getElementById('graphS');

let sChart = new Chart(ctxS, {
    type: 'horizontalBar',
    data: {
        labels: ["MontyHall"],
        datasets: [{
            label: 'Vitórias mantendo a primeira escolha (%)',
            data: [0],
            backgroundColor: [
                'rgba(75, 192, 192)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }, 
        {
            label: 'Vitórias mudando de escolha (%)',
            data: [0],
            backgroundColor: [
                '#36a2eb'
            ],
            borderColor: [
                '#36a2eb'
            ],
            borderWidth: 1
        }
    
    ]
    },
    options: {
        scales: {
            xAxes: [{
                stacked: true,
                gridLines:{
                    color:'white'
                },
                ticks: {
                    max: 100
                }
            }],
            yAxes: [{
                stacked: true,
                gridLines:{
                    color:'white'
                }
            }]
        },
        tooltips:{
            mode:'nearest'
        }
    }
});

