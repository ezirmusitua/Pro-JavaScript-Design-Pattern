function isEmptyArray(arr) {
    "use strict";
    if (!Array.isArray(arr)) return true;
    return !arr || !arr.length;
}
function augment(fromClass, toClass, isOverlay, ...methodNames) {
    const onlySpecific = !isEmptyArray(methodNames);
    const fromClassProperty = Object.getOwnPropertyNames(fromClass.prototype).slice(1);
    const toClassProperty = Object.getOwnPropertyNames(toClass.prototype).slice(1);
    for (const idx in fromClassProperty) {
        const prop = fromClassProperty[idx];
        if (onlySpecific && !(prop in methodNames)) continue;
        if (onlySpecific && !isOverlay && prop in toClassProperty) continue;
        toClass.prototype[prop] = fromClass.prototype[prop];
    }
}


exports.test =  function test() {
    "use strict";
    class A {
        method1() {
            console.log('A.method1')
        }
        method2() {
            console.log('A.method2')
        }
    }
    console.log('origin Class A: \n', A);
    class B {
        method2() {
            console.log('B.method2')
        }
        method3() {
            console.log('B.method3')
        }
    }
    console.log('origin Class B: \n', B);
    class C {
        method2() {
            console.log('C.method2')
        }
    }
    console.log('origin Class C: \n', C);
    class D {
        method4() {
            console.log('D.method4')
        }
        method5() {
            console.log('D.method5')
        }
    }
    console.log('origin Class D: \n', D);
    console.log(' = = = = = = ');
    console.log('Normal usage: ');
    augment(B, A);
    console.log('augment B to A: \n', A);
    console.log(' = = = = = = ');
    console.log('overlay: ');
    augment(C, A, true);
    console.log('overlay method2 in A with C.method2: \n', A);
    console.log(' = = = = = = ');
    console.log('with specific method: ');
    augment(D, A, false, ['method5']);
    console.log('only mix D.method5 to A: \n', A);
}