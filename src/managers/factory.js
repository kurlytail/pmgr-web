import _ from 'lodash';

var factory = {};
function register(name, managerClass) {
    factory[name] = managerClass;
}

function newManager(name) {
    if (!factory[name]) {
        return null;
    }
    return new factory[name]();
}

function getAllManagers() {
    return _.keys(factory);
}

export { register, newManager, getAllManagers };
