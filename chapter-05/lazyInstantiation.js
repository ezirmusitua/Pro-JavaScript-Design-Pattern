let singletonInstance = null;
class Singleton {
    constructor() {
        if (!singletonInstance) {
            singletonInstance = this;
        }
        return singletonInstance;
    }
}

exports.test = function test() {
    "use strict";
    console.log('is singleton instance the same: ', new Singleton() === new Singleton());
}
