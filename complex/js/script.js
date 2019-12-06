
function checkBound(c, limit, iterations) {
    var z = new Complex(0.0, 0.0);
    var n = 0;
    while (z.mod <= limit && n < iterations) {
        z = z.mul(z).add(c);
        n++;
    }
    return n;
}

var screen_x = 600;
var screen_y = 600;
var iterations = 1000;
var limit = 2;
var screen = [];
var pixelSize = 600 / screen_x;

var canvas = document.getElementById('mandel');
var ctx = canvas.getContext('2d');

for (var x = -screen_x / 2; x <= screen_x / 2; x += pixelSize) {
    for (var y = -screen_y / 2; y <= screen_y / 2; y += pixelSize) {
        var c = new Complex(2 * x / screen_x - 0.5, 2 * y / screen_y);
        var N = checkBound(c, limit, iterations);
        if (N < iterations) {
            ctx.fillStyle = "rgb(" + (N * 10) * 255 / iterations + "," + (N * 30) * 255 / iterations + "," + (N * 10) * 255 / iterations + ")";
        }
        else {
            ctx.fillStyle = "rgb(0,0,0)";
        }
        ctx.fillRect(x + screen_x / 2, y + screen_y / 2, pixelSize, pixelSize);
    }
}

