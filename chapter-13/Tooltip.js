const addEvent = require('../scripts/Library').addEvent;


class Tooltip {
    constructor() {
        this.delayTimeout = null;
        this.delay = 1500;

        this.element = document.createElement('div');
        this.element.style.display = 'none';
        this.element.style.position = 'absolute';
        this.element.className = 'tooltip';
        document.getElementsByTagName('body')[0].appendChild(this.element);
    }

    startDelay(e, text) {
        if (!this.delayTimeout) return;
        const [x, y] = [e.clientX, e.clientY];
        this.delayTimeout = setTimeout(() => {
            this.show(x, y, text);
        }, this.delay);
    }

    show(x, y, text) {
        clearTimeout(this.delayTimeout);
        this.delayTimeout = null;
        this.element.innerHTML = text;
        this.element.style.left = x + 'px';
        this.element.style.top = (y + 20) + 'px';
        this.element.style.display = 'block';
    }

    hide() {
        clearTimeout(this.delayTimeout);
        this.delayTimeout = null;
        this.element.style.display = 'none';
    }
}

let TooltipManagerInstance = null;
class TooltipManager {
    constructor() {
        if (!TooltipManagerInstance) {
            TooltipManagerInstance = this;
        }
    }
    addTooltip(target, text) {
        const tt = this.getToolTip();
        addEvent(target, 'mouseover', (e) => tt.startDelay(e, text));
        addEvent(target, 'mouseout', (e) => tt.hide());
    }

    getTooltip() {
        return TooltipInstance;
    }
}
TooltipManager.TooltipInstance = new Tooltip;