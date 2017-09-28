
let Mixin1 = (superClass) => class extends superClass {
    foo() {
        console.log('foo from MixIn');
        if (super.foo) super.foo()
    }
};

let Mixin2 = (superClass) => class extends superClass {
    bar() {
        console.log('bar from MixIn');
    }
};

class MyBaseClass {
    foo() {
        console.log('foo from base class');
    }
}

class MyClass1 extends Mixin1(MyBaseClass) {}
class MyClass2 extends Mixin2(MyBaseClass) {}