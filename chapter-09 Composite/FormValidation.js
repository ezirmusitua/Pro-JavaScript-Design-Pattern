const ensureImplements = require('../chapter-02/interface').ensureImplements;

class Composite {
    add() {
    }

    remove() {
    }

    getChild() {
    }
}

class FormItem {
    save() {
    }
    restore() {}
}

class CompositeForm {
    constructor(id, method, action) {
        ensureImplements(Composite, CompositeForm);
        this.formComponents = [];

        this.element = document.createElement('form');
        this.element.id = id;
        this.element.method = method || 'POST';
        this.element.action = action || '#';
    }

    add(child) {
        this.formComponents.push(child);
        this.element.appendChild(child.getElement());
    }

    remove(child) {
        this.formComponents = this.formComponents.filter((el) => {
            return el !== child;
        })
    }

    save() {
        console.log(`save ${this.id} in somewhere`);
    }

    restore() {
        console.log(`restore ${this.id} somewhere`);
    }

    getChild(i) {
        return this.formComponents[i];
    }

    getElement() {
        return this.element;
    }
}

class CompositeFieldSet {
    constructor(id, legendText) {
        ensureImplements(Composite, CompositeForm);
        this.components = {};
        this.element = document.createElement('fieldset');
        this.element.id = id;

        if (legendText) {
            this.legend = document.createElement('legend');
            this.legend.appendChild(document.createTextNode(legendText));
            this.element.appendChild(this.legend);
        }
    }
    add(child) {
        this.components[child.getElement().id] = child;
        this.element.appendChild(child.getElement());
    }

    remove(child) {
        delete this.components[child.getElement().id];
    }

    restore() {
        console.log('restore fieldset somewhere');
    }

    save() {
        for (const id in this.components) {
            if (!this.components.hasOwnProperty(id)) return;
            this.components[id].save();
        }
    }

    getChild(i) {
        return !!this.components[id] ? this.components[id] : null;
    }

    getElement() {
        return this.element;
    }

}

class Filed {
    constructor(id) {
        this.id = id;
        this.element = null;
    }

    add() {
    }

    remove() {
    }

    getChild() {
    }

    save() {
        // setCookie(this.id, this.getValue());
        console.log(`save to ${this.id} somewhere`);
    }

    restore() {
        console.log(`restore ${this.id} somewhere`);
    }

    getElement() {
        return this.element;
    }

    getValue() {
        throw new Error('Unsupported !');
    }
}

class InpuField extends Field {
    constructor(id, label) {
        super(id);
        this.input = document.createElement('input');
        this.input.id = id;
        this.label = document.createElement('label');
        const labelTextNode = document.createTextNode(label);
        this.label.appendChild(labelTextNode);
        this.element = document.createElement('div');
        this.element.className = 'input-field';
        this.element.appendChild(this.label);
        this.element.appendChild(this.input);
    }

    getValue() {
        return this.input.value;
    }
}

class TextareaField extends Field {
    constructor(id, label) {
        super(id);
        this.textarea = document.createElement('textarea');
        this.textarea.id = id;
        this.label = document.createElement('label');
        const labelTextNode = document.createTextNode(label);
        this.label.appendChild(labelTextNode);
        this.element = document.createElement('div');
        this.element.className = 'input-field';
        this.element.appendChild(this.label);
        this.element.appendChild(this.textarea);
    }

    getValue() {
        return this.textarea.value;
    }
}

class SelectField extends Field {
    constructor(id, label) {
        super(id);
        this.select = document.createElement('select');
        this.select.id = id;
        this.label = document.createElement('label');
        const labelTextNode = document.createTextNode(label);
        this.label.appendChild(labelTextNode);
        this.element = document.createElement('div');
        this.element.className = 'input-field';
        this.element.appendChild(this.label);
        this.element.appendChild(this.select);
    }

    getValue() {
        return this.select.options[this.select.selectedIndex].value;
    }
}