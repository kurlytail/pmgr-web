import _ from 'lodash';

class Factory {
    constructor() {
        this.factory = {};
    }
    register(name, managerClass) {
        this.factory[name] = managerClass;
    }

    newManager(name) {
        if (!this.factory[name]) {
            return null;
        }
        return new this.factory[name]();
    }

    getAllManagers() {
        return _.keys(this.factory);
    }
}

export default new Factory();
