const ensureImplements = require('interface').ensureImplements;

class TesterAction {
    constructor() {
    }

    checkBug() {
    };

    writeIssue() {
    };

    askDeveloper() {
    };
}

class CorrectTester {
    constructor(name, age) {
        this._name = name;
        this.age = age;
        console.log('call ensure implements', TesterAction);
        ensureImplements(TesterAction, CorrectTester);
    }

    checkBug() {
        console.log('implementation of checkBug');
    }

    writeIssue() {
        console.log('implementation of writeIssue');
    }

    askDeveloper() {
        console.log('implementation of askDeveloper');
    }
}

const tester1 = new CorrectTester('jferroal', 21);

class WrongTester {
    constructor(name, age) {
        this._name = name;
        this.age = age;
        ensureImplements(TesterAction, WrongTester);
    }

    checkBug() {
        console.log('implementation of checkBug');
    }

    writeIssue() {
        console.log('implementation of writeIssue');
    }
}

const tester2 = new WrongTester('bugger', 9999);
