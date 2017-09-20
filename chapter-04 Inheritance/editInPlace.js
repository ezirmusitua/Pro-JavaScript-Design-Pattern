var addEvent = require('../scripts/Library').addEvent;

// EditInPlaceField Class
const privateSymbol = {
    createElements: Symbol('createElements'),
    attachEvents: Symbol('attachEvents'),
    createBtn: Symbol('createBtn'),
    convertToText: Symbol('convertToText'),
    convertToEditable: Symbol('convertToEditable'),
    save: Symbol('save'),
    cancel: Symbol('cancel')
};

class EditInPlaceField {
    constructor (value, parent) {
        this.value = value || 'default';
        this.parentElement = parent;
        this[privateSymbol.createElements]();
        this[privateSymbol.attachEvents]();
    }

    [privateSymbol.createElements]() {
        this.containerElement = document.createElement('div');
        this.parentElement.appendChild(this.containerElement);

        this.staticElement = document.createElement('span');
        this.containerElement.appendChild(this.staticElement);
        this.staticElement.innerHTML = this.value;

        this.fieldElement = document.createElement('input');
        this.fieldElement.type = 'text';
        this.fieldElement.value = this.value;
        this.containerElement.appendChild(this.fieldElement);

        this.saveButton = EditInPlaceField[privateSymbol.createBtn]('Save');
        this.containerElement.appendChild(this.saveButton);

        this.cancelButton = EditInPlaceField[privateSymbol.createBtn]('Cancel');
        this.containerElement.appendChild(this.cancelButton);

        this[privateSymbol.convertToText]();
    }

    [privateSymbol.attachEvents]() {
        this.staticElement && addEvent(this.staticElement, 'click', () => this[privateSymbol.convertToEditable]());
        this.saveButton && addEvent(this.saveButton, 'click', () => this[privateSymbol.save]());
        this.cancelButton && addEvent(this.cancelButton, 'click', () => this[privateSymbol.cancel]());
    }

    static [privateSymbol.createBtn](value) {
        const btn = document.createElement('input');
        btn.type = 'button';
        btn.value = value;
        return btn;
    }



    [privateSymbol.convertToText]() {
        this.staticElement.style.display = 'inline';
        this.fieldElement.style.display = 'none';
        this.saveButton.style.display = 'none';
        this.cancelButton.style.display = 'none';
    }

    [privateSymbol.convertToEditable]() {
        this.staticElement.style.display = 'none';
        this.fieldElement.style.display = 'inline';
        this.saveButton.style.display = 'inline';
        this.cancelButton.style.display = 'inline';
    }

    [privateSymbol.save]() {
        alert('Request sent');
    }

    [privateSymbol.cancel]() {
        alert('Canceled')
    }
}
