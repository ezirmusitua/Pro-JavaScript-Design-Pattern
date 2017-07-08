const cloneTest = require('./clone').test;
const mixInTest = require('./mixin').test;
function main() {
    "use strict";
    console.log(' = = = Clone = = =');
    cloneTest();
    console.log(' = = = MixIn = = =');
    mixInTest();
}
main();