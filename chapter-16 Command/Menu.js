const ensureImplements = require('../chapter-02/interface').ensureImplements;
const addEvent = require('../scripts/Library').addEvent;

class Command {
    execute() {}
}

class Composite {
    add() {}
    remove() {}
    getChild() {}
    getElement() {}
}

class MenuObject {
    show() {};
}

class MenuBar {
    constructor() {
        ensureImplements(MenuObject, MenuBar);
        this.menus = {};
        this.element = document.createElement('ul');
        this.element.style.display = 'none';
    }

    add(menuObject) {
        this.menus[menuObject.name] = menuObject;
        this.element.appendChild(this.menus[menuObject.name].getElement());
    }
    remove(name) {
        delete this.menus[name];
    }
    getChild(name) {
        return this.menus[name];
    }
    getElement() {
        return this.element;
    }
    show() {
        this.element.style.display = 'block';
        this.menus.forEach((mo) => {
            mo.show();
        });
    }
}

class Menu {
    constructor(name) {
        this.name = name;
        this.items = {};
        this.element = document.createElement('li');
        this.element.innerHTML = this.name;
        this.element.style.display = 'none';
        this.container = document.createElement('ul');
        this.element.appendChild(this.container);
        ensureImplements(Composite, Menu);
        ensureImplements(MenuObject, Menu);
    }
    add(menuItemObj) {
        this.items[menuItemObj.name] = menuItemObj;
        this.container.appendChild(this.items[menuItemObj.name].getElement());
    }
    remove(name) {
        delete this.items[name];
    }
    getElement() {
        return this.element;
    }
    show() {
        this.element.style.display = 'block';
        this.items.forEach((mio) => {
            mio.show();
        });
    }
}

class MenuItem {
    constructor(name, command) {
        this.name = name;
        this.element = document.createElement('li');
        this.element.style.display = 'none';
        this.anchor = document.createElement('a');
        this.anchor.href = '#';
        this.element.appendChild('this.anchor');
        this.anchor.innerHTML = name;

        addEvent(this.anchor, 'click', (e) => {
            e.preventDefault();
            command.execute();
        });
    }

    add() {}
    remove() {}
    getChild() {}
    getElement() {return this.element;}
    show() {
        this.element.style.display = 'block';
    }
}

class MenuCommand {
    constructor(action) {
        this.action = action;
    }
    execute() {
        this.action();
    }
}

// Receiver
class FileActions {}
class EditActions {}

// usage
const fileActions = new FileActions;
const appMenuBar = new MenuBar;
const fileMenu = new Menu('file');
const openCommand = new MenuCommand(fileActions.open);
const saveCommand = new MenuCommand(fileActions.save);
fileMenu.add(new MenuItem('Open', openCommand));
fileMenu.add(new MenuItem('Save', saveCommand));
appMenuBar.add(fileMenu);

