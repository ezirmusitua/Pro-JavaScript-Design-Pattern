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
        this[cb.name] = () => {
            this[privateSymbol.value] = cb(this[privateSymbol.value], ...Array.from(arguments));
            return this;
        }
    }
    end() {
        return this[privateSymbol.value];
    }
}

function test() {
    "use strict";

}
