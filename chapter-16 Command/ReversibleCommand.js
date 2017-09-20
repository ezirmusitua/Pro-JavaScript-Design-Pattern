const ensureImplements = require('../chapter-02/interface').ensureImplements;
const addEvent = require('../scripts/Library').addEvent;

function undoAfterPush(target) {
    if (!target.prototype.undoStack) {
        target.prototype.undoStack = [];
    }
    target.prototype.execute = function () {
        "use strict";
        this.undoStack.push(this);
        this.execute();
    }
}

class ReversibleCommand {
    execute() {
    }

    undo() {
    }
}

@undoAfterPush
class MoveUp {
    constructor(cursor) {
        this.cursor = cursor;
    }

    execute() {
        this.cursor.move(0, -10);
    }
}

undoAfterPush
class MoveDown {
    constructor(cursor) {
        this.cursor = cursor;
    }

    execute() {
        this.cursor.move(0, 10);
    }
}

@undoAfterPush
class MoveLeft {
    constructor(cursor) {
        this.cursor = cursor;
    }

    execute() {
        this.cursor.move(-10, 0);
    }
}

@undoAfterPush
class MoveRight {
    constructor(cursor) {
        this.cursor = cursor;
    }

    execute() {
        this.cursor.move(10, 0);
    }
}

class Cursor {
    constructor(width, height, parent) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
        parent.appendChild(this.canvas);
        this.position = {x: width, y: height};

        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = '#cc0000';

        this.commandStack = [];
        this.move(0, 0);
    }

    move(x, y) {
        this.position.x += x;
        this.position.y += y;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillRect(this.position.x, this.position.y, 3, 3);
    }

    lineTo(x, y) {
        this.position.x += x;
        this.position.y += y;
    }

    executeCommands() {
        this.position = {x: this.width / 2, y: this.height / 2};
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.position.x, this.position.y);
        this.commandStack.forEach((cmd) => {cmd()});
        this.ctx.stroke();
    }

    undo() {
        this.commandStack.pop();
        this.executeCommands();
    }
}


class CommandButton {
    constructor(label, command, parent) {
        ensureImplements(ReversibleCommand, CommandButton);
        this.element = document.createElement('button');
        this.element.innerHTML = label;
        parent.appendChild(this.element);
        addEvent(this.element, 'click', function () {
            command.execute()
        });
    }
}

class UndoButton {
    constructor(label, parent, cursor) {
        this.element = document.createElement('button');
        this.element.innerHTML = label;
        parent.appendChild(this.element);
        addEvent(this.element, 'click', function () {
            cursor.undo();
        });
    }
}