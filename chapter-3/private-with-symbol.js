// Symbol 是一个唯一且不可变的 Javascript 基本类型, 可以作为对象属性的标识

const _bookBCheckIsIsbnSymbol = Symbol('checkIsIsbn');
const _bookBIsbnSymbol = Symbol('isbn');

export class BookB {
    constructor (isbn) {
        if (!isbn) throw new Error('This is check isbn error');
        this[_bookBIsbnSymbol] = isbn;
    }

    set isbn(inIsbn) {
        if (!this[_bookBCheckIsIsbnSymbol](inIsbn)) throw new Error('This is check isbn error');
        this[_bookBCheckIsIsbnSymbol] = inIsbn;
    }

    get isbn() {
        return this[_bookBIsbnSymbol];
    }

    [_bookBCheckIsIsbnSymbol] (isbn) {
        console.log('previous isbn is: ', this[_bookBIsbnSymbol]);
        console.log('checking: ', isbn);
        return true;
    }

    display (inIsbn) {
        this[_bookBCheckIsIsbnSymbol](inIsbn);
    }
}