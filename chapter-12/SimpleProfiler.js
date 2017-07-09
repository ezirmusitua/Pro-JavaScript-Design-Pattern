function testable(isTestable) {
    return function (target) {
        target.prototype.isTestable = isTestable;
        target.isTestable = isTestable;
        return target;
    }
}

function simpleProfiler(target) {
    if (target.isTestable && target.prototype.isTestable) {
        target.prototype.buildList = function () {
            const startTime = new Date();
            target.buildList();
            const elapsedTime = (new Date()).getTime() - startTime.getTime();
            console.log('buildList: ', elapsedTime + ' ms');
        }
    }
    return target;
}

@testable(true)
@simpleProfiler
class ListBuilder {
    constructor(parentId, listLength) {
        this.parentEl = document.getElementById(parentId);
        this.listLength = listLength;
    }

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
