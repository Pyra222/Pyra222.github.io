class Person {
    constructor(name) {
        console.log('PURSON')
        this.name = name;
    }
    sayName() {
        console.log(this.name);
    }
}

class Oldman extends Person {
    constructor(name, age) {
        console.log('OLDMON')
        // super(name);
        // this.age = age;
    }
}

var p = new Person('Jill');
var o = new Oldman('Jack', 42);
