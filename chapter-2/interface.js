const FilterName = ['__proto__', 'constructor'];

export function ensureImplements(_I, _C) {
    if (!_C || !_I) throw new Error('Interface must implemented by a class. ');
    const interfaceProto = Object.getOwnPropertyNames(_I.prototype);
    for (let i = 0; i < interfaceProto.length; i++) {
        const methodName = interfaceProto[i];
        if (FilterName.indexOf(methodName) > -1) continue;
        if (!_C.prototype[methodName] || typeof _C.prototype[methodName] !== 'function') {
            throw new Error(`Must implement ${methodName}`);
        }
    }
}