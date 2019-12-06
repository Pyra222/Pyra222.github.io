class Complex {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Printing
    log() {
        console.log(this.toString());
    }
    // Arithmetics
    get con() {
        return new Complex(this.x, -this.y);
    }
    get re() {
        return this.x;
    }
    get im() {
        return this.y;
    }
    compare(c) {
        return this.x == c.x && this.y == c.y;
    }
    add(c) {
        return new Complex(this.x + c.x, this.y + c.y);
    }
    sub(c) {
        return new Complex(this.x - c.x, this.y - c.y);
    }
    mul(c) {
        return new Complex(this.x * c.x - this.y * c.y, this.x * c.y + this.y * c.x);
    }
    get inv() {
        return new Complex(this.x / (this.x * this.x + this.y * this.y), -(this.y / (this.x * this.x + this.y * this.y)));
    }
    div(c) {
        return this.mul(c.inv);
    }
    get mod() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    sqrt() {
        var a = Math.sqrt((this.x + this.mod) / 2);
        var b = Math.sign(this.y) * Math.sqrt((-this.x + this.mod) / 2);
        return [new Complex(a, b), new Complex(-a, -b)];
    }
    pow(a) {
        if (a == 1) return this;
        else {
            return this.mul(this.pow(a - 1));
        }
    }
}

// Overriding toString() method
Complex.prototype.toString = function () {
    var rep = '';
    if (this.y > 0) {
        rep = '( ' + this.x + ' + ' + this.y + 'i )';
    } else {
        rep = '( ' + this.x + ' - ' + -this.y + 'i )';
    }
    return rep;
}