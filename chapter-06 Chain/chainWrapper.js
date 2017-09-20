const privateSymbol = {
    value: Symbol('chainWrapperValue')
};

class ChainWrapper {
    constructor (initVal) {
        this[privateSymbol.value] = initVal;
    }
    register(cb, isOverlay) {
        if (!cb) return;
        const propertyNames = Object.getOwnPropertyNames(this);
        if (!isOverlay && cb.name in propertyNames) return;
        this[cb.name] = (...params) => {
            this[privateSymbol.value] = cb(this[privateSymbol.value], ...params);
            return this;
        };
        return this;
    }
    end() {
        return this[privateSymbol.value];
    }
}

exports.test = function test() {
    "use strict";
    const tmp = new ChainWrapper(0);
    tmp.register(function add1(a) {
        return a + 1;
    }).register(function addB(a, b) {
        return a + b;
    });
    console.log('0 + 1 + 2 = 3: ', tmp.add1().addB(2).end() === 3 && 'bingo!')
};