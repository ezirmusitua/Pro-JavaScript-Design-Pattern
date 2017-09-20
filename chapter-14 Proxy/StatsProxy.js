const ensureImplements = require('../chapter-02/interface').ensureImplements;

class PageStats {
    getPageviews() {}
    getUniques() {}
    getBrowserShare() {}
    getTopSearchTerms() {}
    getMostVisitedPages() {}
}
const privateSymbol = {
    xhrHandler: Symbol('xhrHandler'),
    urls: Symbol('urls'),
    xhrFailure: Symbol('xhrFailure'),
    fetchData: Symbol('fetchData')
};
let StatsProxyInstance = null;
class StatsProxy {
    constructor() {
        if (!StatsProxyInstance) {
            StatsProxyInstance = this;
            ensureImplements(PageStats, StatsProxy);
        }
        return StatsProxyInstance;
    }

    getPageViews() {
        console.log('not implemented. ');
    }

    getUniques() {
        console.log('not implemented. ');
    }

    getBrowserShare() {
        console.log('not implemented. ');
    }

    getTopSearchTerms() {
        console.log('not implemented. ');
    }

    getMostVisitedPages() {
        console.log('not implemented. ');
    }
}