function setStyle(elementIds, prop, val) {
    "use strict";
    elementIds.forEach((elemId) => {
        document.getElementById(elemId).style[prop] = val;
    });
}

function setCSS(el, styles) {
    "use strict";
    for(const prop in styles) {
        if (!styles.hasOwnProperty(prop)) return;
        setStyle(el, prop, styles[prop]);
    }
}