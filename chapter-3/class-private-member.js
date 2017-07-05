const Book = require('./book').Book;

function main() {
    "use strict";
    console.log('using ES6 way: ');
    console.log('can not call private method cause it is wrap in another scope. ');
    const book = new Book('123456');
    console.log('call public method: ');
    book.display(23456);
}
main();