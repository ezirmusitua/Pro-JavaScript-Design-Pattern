// private method is correctly, but private variable can not use this way
const privateMethods = {
    // this is private method for Book
    _checkIsIsbn (isbn) {
        console.log('previous isbn is: ', this._isbn);
        console.log('checking: ', isbn);
        return true;
    }
};

class Book {
    constructor (isbn) {
        if (!privateMethods._checkIsIsbn(isbn)) throw new Error('This is check isbn error');
        this._isbn = isbn;
    }

    set isbn(inIsbn) {
        if (!privateMethods._checkIsIsbn(inIsbn)) throw new Error('This is check isbn error');
        this._isbn = inIsbn;
    }

    get isbn() {
        return this._isbn;
    }

    display (inIsbn) {
        privateMethods._checkIsIsbn.call(this, inIsbn);
    }
}
