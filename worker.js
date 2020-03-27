//s0ft
//Dam break simulation - Advanced Hydraulics
//MSc Water Resource Engineering
//June 8th, 2019
//12:17AM

let t;

function calculateSurfaceProfile(y0, delT, delX, xRange, maxT, delayMs) {
    if (t == undefined) {
        t = 0.00001;
    }
    if (t > maxT) {
        return;
    }
    var X = [];
    var Y = [];
    for (var x = -xRange; x <= xRange; x += delX) {
        X.push(x);
        var c0 = Math.pow((9.81 * y0), 0.5);
        if (x <= 0) {
            if (Math.abs(x) <= c0 * t) {
                Y.push(Math.pow((2 * c0 - x / t), 2) / (9 * 9.81));
            } else {
                Y.push(y0);
            }
        } else {
            if (x < 2 * c0 * t) {
                Y.push(Math.pow((2 * c0 - x / t), 2) / (9 * 9.81));
            } else {
                Y.push(0);
            }
        }
    }
    postMessage({
        x: X,
        y: Y,
        t: t
    });
    t += delT;
    setTimeout(() => {
        calculateSurfaceProfile(y0, delT, delX, xRange, maxT, delayMs);
    }, delayMs);
}


onmessage = function (ev) {
    var y0 = ev.data.y0;
    var delT = ev.data.delT;
    var delX = ev.data.delX;
    var xRange = ev.data.xRange;
    var maxT = ev.data.maxT;
    var delayMs = ev.data.delayMs;
    calculateSurfaceProfile(y0, delT, delX, xRange, maxT, delayMs);
}

onerror = function (error) {
    var error = error.message;
}