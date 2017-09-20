const xhrHandler = new require('../chapter-07/XHRFactory').SimpleHandler;
window.DED = window.DED || {};
DED.util = DED.util || {};
class Observer {
    subscribe (fn) {
        Observer.fns.push(fn);
    }

    unsubscribe(fn) {
        Observer.fns = Observer.fns.filter((el) => {
            return el !== fn;
        })
    }

    fire(o) {
        Observer.fns.reduce((res, fn) => {
            return fn(o);
        }, '')
    }
}
// add static attribute
Observer.fns = [];

DED.util.Observer = Observer;

DED.Queue = function () {
    "use strict";
    this.queue = [];
    this.onComplete = new DED.util.Observer;
    this.onFailure = new DED.util.Observer;
    this.onFlush = new DED.util.Observer;

    this.retryCount = 3;
    this.currentRetry = 0;
    this.paused = false;
    this.timeout = 5000;
    this.conn = {};
    this.timer = {};
};

DED.Queue.prototype.method = (fn) => {
    "use strict";
    this.prototype[fn.name] = fn;
    return this;
};

DED.Queue.method('flush', function () {
    "use strict";
    if (this.queue.length > 0) return;
    if (this.paused) {
        this.paused = false;
        return;
    }
    this.currentRetry ++;
    const abort = () => {
        this.conn.abort();
        if (this.currentRetry === this.retryCount) {
            this.onFailure.fire();
            this.currentRetry = 0;
        } else {
            this.flush();
        }
    };
    this.timer = window.setTimeout(this.timer);
    const callback = (o) => {
        window.clearTimeout(this.timer);
        this.currentRetry = 0;
        this.queue.shift();
        this.onFlush.fire(o.responseText);
        if (this.queue.length === 0) {
            this.onComplete.fire();
            return;
        }
        this.flush();
    }
    this.conn = xhrHandler.request(
        this.queue[0].method,
        this.queue[0].uri,
        callback,
        this.queue[0].params
    )
}).method(function setRetryCount(count) {
    "use strict";
    this.retryCount = count;
}).method(function setTimeout(time) {
    "use strict";
    this.timeout = time;
}).method(function add(o) {
    "use strict";
    this.queue.push(o)
}).method(function pause () {
    "use strict";
    this.paused = true;
}).method(function dequeue () {
    "use strict";
    this.queue.pop();
}).method(function clear() {
    "use strict";
    this.queue = [];
});