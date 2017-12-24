import _ from 'lodash';

var factory = {};
function register(name, activityClass) {
    factory[name] = activityClass;
}

function newActivity(name) {
    if (!factory[name]) {
        return null;
    }
    return new factory[name]();
}

function getAllActivities() {
    return _.keys(factory);
}

export { register, newActivity, getAllActivities };
