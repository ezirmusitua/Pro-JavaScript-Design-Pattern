const privateMethod = {
    standardXHR: Symbol('standardXHR'),
    activeXNew: Symbol('activeXNew'),
    activeXOld: Symbol('activeXOld')
};

class SimpleXHRFactory {
    constructor() {
        try {
            SimpleXHRFactory[privateMethod.standardXHR]().create();
            this.creator = SimpleXHRFactory[privateMethod.standardXHR]();
        } catch (e) {
            try {
                SimpleXHRFactory[privateMethod.activeXNew]().create();
                this.creator = SimpleXHRFactory[privateMethod.activeXNew]();
            } catch(e) {
                try {
                    SimpleXHRFactory[privateMethod.activeXOld]().create();
                    this.creator = SimpleXHRFactory[privateMethod.activeXOld]();
                } catch (e) {
                    throw new Error('XHR not found. ')
                }
            }
        }
    }
    create() {
        return this.creator.create();
    }
    static [privateMethod.standardXHR]() {
        return {create: () => new XMLHttpRequest()}
    }
    static [privateMethod.activeXNew]() {
        return {create: () => new ActiveXObject('Msxml2.XMLHTTP')}
    }
    static [privateMethod.activeXOld]() {
        return {create: () => new ActiveXObject('Microsoft.XMLHTTP')}
    }
}
