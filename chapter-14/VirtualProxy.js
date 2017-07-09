const privateSymbol = {
    initialize: Symbol('initialize'),
    checkInitialize: Symbol('checkInitialize'),
    isInitialized: Symbol('isInitialized')
};

class DynamicProxy {
    constructor(...args) {
        this.args = args;
        this.initialized = false;
    }

    [privateSymbol.initialize]() {
        this.subject = {};
        this.constructor(this.subject, this.args);
        this.subject.__proto__ = this.prototype;
        this.interval = setInterval(() => this[privateSymbol.checkInitialize](), 100);
    }

    [privateSymbol.checkInitialize]() {
        if (this[privateSymbol.isInitialized]()) {
            clearInterval(this.interval);
            this.initialized = true;
        }
    }

    [privateSymbol.isInitialized]() {
        throw new Error('Un supported operation on an abstract class. ');
    }

}