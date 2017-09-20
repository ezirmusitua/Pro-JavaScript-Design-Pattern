const ensureImplements = require('../chapter-02/interface');

class Composite {
    add() {
    }

    remove() {
    }

    getChild() {
    }

    getAllLeaves() {
    }

}

class GalleryItem {
    hide() {
    }

    show() {
    }

    addTag() {
    }

    getPhotosWithTag() {
    }
}

class DynamicGallery {
    constructor() {
        ensureImplements(Composite, DynamicGallery);
        this.children = [];
        this.tags = [];
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
        this.element.style.display = 'none';
    }

    show() {
        this._forChild('show');
        this.element.style.display = 'block';
    }

    getElement() {
        return this.element;
    }

    addTag(tag) {
        this.tags.push(tag);
        for (let node, i = 0; node = this.getChild(i); i += 1) {
            node.addTag(tag);
        }
    }

    getAllLeaves() {
        let leaves = [];
        for (let node, i = 0; node = this.getChild(i); i += 1) {
            leaves = leaves.concat(node.getAllLeaves());
        }
        return leaves;
    }

    getPhotosWithTag(tag) {
        this.tags.forEach((v) => {
            if (tag === v) return this.getAllLeaves();
        });
        let results = [];
        for (let node, i = 0; node = this.getChild(i); i += 1) {
            results = results.concat(node.getPhotosWithTag(tag));
        }
        return results;
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
        this.tags = [];
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

    addTag(tag) {
        this.tags.push(tag);
    }

    getAllLeaves() {
        return [this];
    }

    getPhotosWithTag(tag) {
        this.tags.forEach((v) => {
            if (tag === v) return this.getAllLeaves();
        });
        return [];
    }
}
