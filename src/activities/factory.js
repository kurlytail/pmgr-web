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

export { register, newActivity };
