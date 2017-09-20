const FilterName = ['__proto__', 'constructor'];
/**
 * 接口实现的一种方式
 * @param _I 接口类
 * @param _C 实现接口的类
 * 接口类中定义需要实现的方法, 只需要简单的给名称就行, 不用具体实现
 * 实现类实现接口, 同时在 constructor 中调用这个辅助方法
 * 简单来说就是判断接口类中定义的方法在实现类中是否有相应的方法
 **/
exports.ensureImplements = function ensureImplements(_I, _C) {
    if (!_C || !_I) throw new Error('Interface must implemented by a class. ');
    const interfaceProto = Object.getOwnPropertyNames(_I.prototype);
    for (let i = 0; i < interfaceProto.length; i++) {
        const methodName = interfaceProto[i];
        if (FilterName.indexOf(methodName) > -1) continue;
        if (!_C.prototype[methodName] || typeof _C.prototype[methodName] !== 'function') {
            throw new Error(`Must implement ${methodName}`);
        }
    }
};
/**
 * Example
 * class IClass1 {
 *   constructor() { }
 *   action1() {}
 * }
 * class I1Implementation1 {
 *   constructor(name) {
 *    this._name = name;
 *    ensureImplements(IClass1, I1Implementation);
 *   }
 *
 *   action1() {
 *     console.log('do action 1');
 *   }
 * }
 *
 * class I1Implementation2 {
 *   constructor(name) {
 *     this._name = name;
 *     ensureImplements(IClass1, I1Implementation);
 *   }
 * }
 * // This run correctly
 * const v1 = new I1Implementation1('1');
 * // This will throw error
 * const v2 = new I1Implementation1('2');
 **/