import jsonSchema from './schema.json';
import Builder from './builder';

class Document {
    static getObject(name) {
        Document.documents = Document.documents || {};

        if (!Document.documents[name]) {
            Document.documents[name] = new Document(name);
            Document.documents[name].buildObject();
        }

        return Document.documents[name];
    }

    constructor(name) {
        Object.assign(this, {});
        this.name = name;
    }

    buildObject() {}
}

Builder.register('Document', Document);

export default Document;
