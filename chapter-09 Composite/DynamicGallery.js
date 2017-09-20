const ensureImplements = require('../chapter-02/interface');

class Composite {
    add() {
    }

    remove() {
    }

    getChild() {
    }

}

class GalleryItem {
    hide() {
    }

    show() {
    }
}

class DynamicGallery {
    constructor() {
        ensureImplements(Composite, DynamicGallery);
        this.children = [];
        this.element = document.createElement('div');
        this.element.id = id;
        this.element.className = 'dynamic-gallery';
    }

    add(child) {
        this.children.push(child);
        this.element.appendChild(child.getElement());
    }

    remove(child) {
        this.children = this.children.filter((el) => el !== child);
        this.element.removeChild(child);
    }

    getChild(i) {
        return this.children[i];
    }

    hide() {
        this._forChild('hide');
        this.element.style.display = 'none';
    }

    show() {
        this._forChild('show');
        this.element.style.display = 'block';
    }

    getElement() {
        return this.element;
    }

    _forChild(cbName) {
        for (const idx in this.children) {
            if (this.children.hasOwnProperty(idx)) {
                this.children[idx][cbName];
            }
        }
    }
}

class GalleryImage {
    constructor(src) {
        this.element = document.createElement('img');
        this.element.className = 'gallery-img';
        this.element.src = src;
    }

    add() {
    }

    remove() {
    }

    getChild() {
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = '';
    }

    getElement() {
        return this.element;
    }
}