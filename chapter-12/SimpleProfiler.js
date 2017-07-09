function testable(isTestable) {
    return function (target) {
        target.prototype.isTestable = isTestable;
        target.isTestable = isTestable;
        return target;
    }
}

function simpleProfiler(target, name, descriptor) {
    if (target.isTestable) {
        const oldVal = descriptor.value;
        target.prototype.buildList = function () {
            const startTime = new Date();
            oldVal.apply(null, arguments);
            const elapsedTime = (new Date()).getTime() - startTime.getTime();
            console.log(name + 'running : ', elapsedTime + ' ms');
        }
    }
    return descriptor;
}

@testable(true)
class ListBuilder {
    constructor(parentId, listLength) {
        this.parentEl = document.getElementById(parentId);
        this.listLength = listLength;
    }
    @simpleProfiler
    buildList() {
        const list = document.createElement('ol');
        this.parentEl.appendChild(list);
        for (let i = 0; i < this.listLength; i += 1) {
            list.appendChild(document.createElement('li'));
        }
    }
}

const list = new ListBuilder('list-container', 5000);
list.buildList();
