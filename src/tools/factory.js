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

export { register, newTool };
