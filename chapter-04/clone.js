function clone(obj) {
    "use strict";
    let result = {};
    if (typeof obj !== 'object') return obj;
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            result[attr] = obj[attr];
        }
    }
    return result;
}

function cloneDeep(obj) {
    "use strict";
    const result = {};
    if (typeof obj !== 'object') return obj;
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            result[attr] = cloneDeep(obj[attr]);
        }
    }
    return result;
}


export default function whyNeedClone() {
    "use strict";
    const obj = {
        name: 'tester',
        age: 11,
        liveNow: {
            country: 'China',
            state: 'Shanghai',
            city: 'Shanghai'
        }
    };
    console.log('origin obj: \n', obj);
    const assignCopyObj = obj;
    console.log('assign to another obj');
    console.log('is 2 the same: ', obj === assignCopyObj);
    assignCopyObj.name = 'tester assign copy';
    console.log('change obj copy\'s name: ', assignCopyObj.name);
    console.log('also change the origin obj\'s name: ', obj.name);
    console.log('= = = = = = = = = = = =');
    const cloneCopyObj = clone(obj);
    console.log('use clone to get copy');
    console.log('is 2 the same: ', obj === cloneCopyObj);
    cloneCopyObj.name = 'tester clone copy';
    console.log('change obj copy\'s name: ', cloneCopyObj.name);
    console.log('won\'t change the origin obj\'s name: ', obj.name);
    console.log('= = = = = = = = = = = =');
    console.log('but why we need clone deep?');
    console.log('if the attributes in origin obj is an object, the clone work incorrectly!');
    cloneCopyObj.liveNow.country = 'US';
    console.log('we change the liveNow in clone copy obj, the origin will also changed: \n', obj);
    console.log('we need clone deep to copy the attributes in the prototype chain. ');
    const deepCloneCopyObj = cloneDeep(obj);
    deepCloneCopyObj.liveNow.country = 'China';
    console.log('we change the liveNow in clone deep copy obj: \n', deepCloneCopyObj);
    console.log('the origin won\'t  changed: \n', obj);
}
