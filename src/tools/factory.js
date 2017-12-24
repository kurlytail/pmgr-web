import _ from 'lodash';

var factory = {};
function register(name, toolClass) {
    factory[name] = toolClass;
}

function newTool(name) {
    if (!factory[name]) {
        return null;
    }
    return new factory[name]();
}


function getAllTools() {
    return _.keys(factory);
}

export { register, newTool, getAllTools };
