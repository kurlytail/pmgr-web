class Builder {
    register(typeName, type) {
        this.registry[typeName] = type;
    }

    getObject(typeName, name) {
        return this.registry[typeName].getObject(name);
    }
}

export default new Builder();
