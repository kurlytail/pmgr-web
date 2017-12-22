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

export { register, newManager };
