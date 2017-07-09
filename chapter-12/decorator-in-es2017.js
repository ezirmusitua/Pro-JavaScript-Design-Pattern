function decorateClass() {
    // decorator
    function testable(target) {
        target.isTestable = true;
    }
    console.log(' = = = general usage = = = ');
    @testable
    class MyTestable0 {}
    console.log(MyTestable0.isTestable);
    console.log(' = = = use with parameter = = = ');
    function testable(isTestable) {
        return function (target) {
            target.isTestable = isTestable;
        }
    }
    @testable(false)
    class MyTestable1 {}
    console.log(MyTestable1.isTestable);
    console.log(' = = = decorate instance = = = ');
    function testable(isTestable) {
        return function (target) {
            target.prototype.isTestable = isTestable;
        }
    }
    @testable(false)
    class MyTestable2 {}
    console.log((new MyTestable2).isTestable);

    function mixin(...list) {
        return function (target) {
            Object.assign(target.prototype, ...list);
        }
    }
    console.log(' = = = Mixin decorator = = = ');
    const Mixin= {
        foo() {console.log('foo')}
    };
    @mixin(Mixin)
    class MyClass {}
    console.log(MyClass)
    console.log(' = = = Wrap method = = = ');
    function likeCat(target) {
        const prevGreet = target.prototype.greet;
        target.prototype.greet = function (name) {
            "use strict";
            return prevGreet() + 'i am a cat, my name is ' + name;
        }
    }
    @likeCat
    class Animal {
        greet() {
            return 'hello ';
        }
    }
    console.log((new Animal).greet());
}

function decorateMethodInClass() {

    function readonly(target, name, descriptor) {
        // descriptor = {
        //   value: specifiedFunction,
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        descriptor.writable = false;
        return descriptor;
    }

    function nonenumerable(target, name, descriptor) {
        descriptor.enumerable = false;
        return descriptor;
    }

    function log(target, name, descriptor) {
        const oldValue = descriptor.value;
        descriptor.value = function() {
            console.log(`Calling ${name} with`, arguments);
            return oldValue.apply(null, arguments);
        };
        return descriptor;
    }
    class Person {
        constructor(first, last) {
            this.first = first;
            this.last = last;
            this.kidCount = 0;
        }
        @log
        @readonly
        name() {return `${this.first} ${this.last}`}

        @nonenumerable
        get kidCount() {return this.children.length}
        set kidCount(count) {this.kidCount = count}
    }
}

function wonDecorateFunction() {
    console.log('因为函数提升, 修饰器不能用于函数')
}

exports.test = function test() {
    "use strict";
    decorateClass();
    decorateMethodInClass();
    wonDecorateFunction();
};
