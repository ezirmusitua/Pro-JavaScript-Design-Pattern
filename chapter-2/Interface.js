// Constructor.

function isEmpty(arr) {
    return arr && arr.length;
}

class Interface {
    constructor(name, methods) {
        if (!name || !methods || isEmpty(methods)) throw new Error('Interface constructor should ' +
            'called with 2 arguments.');
        this.name = name;
        this.methods = [];
        for (let i = 0, len = methods.length; i < len; i++) {
            if (typeof methods[i] !== 'string') {
                throw new Error('Interface constructor expects method names to ' +
                    'be passed in as a string.');
            }
            this.methods.push(methods[i]);
        }
    }

    ensureImplements(...params) {
        if (params.length < 2) throw new Error('Function Interface.ensureImplements expected called ' +
            'with at least 2 arguments.');

        for (let i = 1, len = arguments.length; i < len; i++) {
            let iInstance = params[i];
            if (iInstance.constructor !== Interface) {
                throw new Error('Function Interface.ensureImplements expects arguments '
                    + 'two and above to be instances of Interface.');
            }

            for (let j = 0, methodsLen = iInstance.methods.length; j < methodsLen; j++) {
                const method = iInstance.methods[j];
                if (!object[method] || typeof object[method] !== 'function') {
                    throw new Error('Function Interface.ensureImplements: object '
                        + 'does not implement the ' + iInstance.name
                        + ' iInstance. Method ' + method + ' was not found.');
                }
            }
        }
    }
}

