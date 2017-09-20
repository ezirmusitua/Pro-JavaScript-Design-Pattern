const BookA = require('./private-in-es6').BookA;
const BookB = require('./private-with-symbol').BookB;

function main() {
    "use strict";
    console.log('using ES6 way: ');
    console.log('can not call private method cause it is wrap in another scope. ');
    const bookA = new BookA('A123456');
    console.log('call public method: ');
    bookA.display(23456);
    console.log('= = = = = = = = = = = = = = ');
    console.log('using Symbol: ');
    console.log('can not call private method cause it is unique symbol and symbol did not expose. ');
    const bookB = new BookB('B123456');
    console.log('call public method: ');
    bookB.display(23456);
}
main();
