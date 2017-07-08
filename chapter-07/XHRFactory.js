const ensureImplements = require('../chapter-02/interface').ensureImplements;

let XhrManagerInstance = null;
class XhrManager {
    constructor() {
        if (!XhrManagerInstance) {
            this.xhrHandler = new SimpleHandler();
            this.ping();
            XhrManagerInstance = this;
        }
    }

    get isOffline() {
        return XhrManagerInstance.ping().isOffline;
    }

    set isOffline(val) {
        XhrManagerInstance.isOffline = val;
    }

    get isHighLatency() {
        return XhrManagerInstance.ping().isHighLatency;
    }

    set isHighLatency(val) {
        XhrManagerInstance.isHighLatency = val;
    }

    createXhrHandler() {
        if (XhrManagerInstance.isOffline) {
            return new OfflineHandler();
        } else if (XhrManagerInstance.isHighLatency) {
            return new QueueHandler();
        } else {
            return new SimpleHandler();
        }
    }
    ping() {
        XhrManagerInstance.isOffline = true;
        XhrManagerInstance.isHighLatency = false;
        return XhrManagerInstance;
    }
}

new XhrManager;

// Interface Class
class AjaxHandler {
    request() {
    }

    createXHRObject() {
    }
}
const XHRCreator = [
    () => new XMLHttpRequest(),
    () => new ActiveXObject('Msxml2.XMLHTTP')
];
class SimpleHandler {
    constructor() {
        ensureImplements(AjaxHandler, SimpleHandler);
    }

    request(method, url, cb, postVars) {
        const xhr = this.createXhrObject();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            xhr.status === 200 ? cb.success(xhr.responseText, xhr.responseXML) : cb.failure(xhr.status)
        };
        xhr.open(method, url, true);
        if (method !== 'POST') {
            postVars = null;
        }
        xhr.send(postVars);
    }

    createXhrObject() {
        for (const idx in XHRCreator) {
            const creator = XHRCreator[idx];
            try {
                creator();
            } catch (e) {
                continue;
            }
            // memoizing
            this.createXhrObject = creator();
            return creator;
        }
        throw new Error('SimpleHandler: Can not create XHR object. ');
    }
}

class QueueHandler extends SimpleHandler {
    constructor() {
        super();
        this.queue = [];
        this.requestInProgress = false;
        this.retryDelay = 5;
    }

    request(method, url, cb, postVars, override) {
        if (this.requestInProgress && !override) {
            this.queue.push({method, url, cb, postVars});
            return;
        }
        this.requestInProgress = true;
        const xhr = this.createXhrObject();
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                cb.success(xhr.responseText, xhr.responseXML);
                this.advanceQueue();
            } else {
                cb.failure(xhr.status);
                setTimeout(() => this.request(method, url, cb, postVars, true), this.retryDelay * 1000);
            }
        };
        xhr.open(method, url, true);
        if (method !== 'POST') {
            postVars = null;
        }
        xhr.send(postVars);
    }

    advanceQueue() {
        if (!this.queue.length) {
            this.requestInProgress = false;
            return;
        }
        const req = this.queue.shift();
        this.request(req.method, req.url, req.cb, req.postVars, true);
    }
}

class OfflineHandler extends SimpleHandler {
    constructor() {
        super();
        this.storedRequests = [];
    }

    request(method, url, cb, postVars) {
        if ((new XhrManager).ping().isOffline) {
            this.storedRequests.push({
                method: method,
                url: url,
                cb: cb,
                postVars: postVars
            });
        }
        this.flushStoredRequests();
        super.request(method, url, cb, postVars);
    }

    flushStoredRequests() {
        for (const idx in this.storedRequests) {
            const req = this.storedRequests[idx];
            super.request(req.method, req.url, req.cb, req.postVars);
        }
    }
}

function test() {
    "use strict";
    const xhrHandler = (new XhrManager).createXhrHandler();
    const cb = {
        success: () => alert('Success'),
        failure: () => alert('Failed')
    }
    xhrHandler.request('GET', 'https://baidu.com', cb)
}

test();