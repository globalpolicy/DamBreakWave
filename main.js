//s0ft
//Dam break simulation - Advanced Hydraulics
//MSc Water Resource Engineering
//June 8th, 2019
//12:17AM

let chart, worker;

function drawChart(output, y0) {
    var ctx = document.getElementById('chart').getContext('2d');
    if (chart != undefined) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: output.x,
            datasets: [{
                label: 'Depth (m)',
                data: output.y,
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1,
                fill: false,
                pointRadius: 1
            }]
        },
        options: {
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: y0
                    },
                    scaleLabel:{
                        display:true,
                        labelString:'Depth y (m)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'x (m)'
                    }
                }]
            },
            title: {
                display: true,
                text: output.t + " s"
            },
            maintainAspectRatio: false,
            responsive: true
        }
    });
}

function updateGraph(e) {
    if (worker != undefined) {
        worker.terminate();
    }
    var delT = document.getElementById("delT").valueAsNumber;
    var delX = document.getElementById("delX").valueAsNumber;
    var xRange = document.getElementById("xRange").valueAsNumber;
    var maxT = document.getElementById("maxT").valueAsNumber;
    var y0 = document.getElementById("y0").valueAsNumber;
    var delayMs = document.getElementById("delayMs").valueAsNumber;

    if(2*xRange/delX>100){
        alert("Please increase delX. Current value gives too many data points.\nKeep delX ~ 1/50 of xRange");
        return;
    }

    worker = new Worker("worker.js");
    worker.postMessage({
        y0,
        delT,
        delX,
        xRange,
        maxT,
        delayMs
    });
    worker.onmessage = (event) => {
        var data = event.data;
        drawChart(data, y0);
    }


}

updateGraph();