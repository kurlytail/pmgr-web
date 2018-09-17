import jsonSchema from './schema.json';
import Builder from './builder';

class Activity {
    static getObject(name) {
        Activity.activities = Activity.activities || {};

        if (!Activity.activities[name]) {
            Activity.activities[name] = new Activity(name);
            Activity.activities[name].buildObject();
        }

        return Activity.activities[name];
    }

    constructor(name) {
        Object.assign(this, {
            inputProcesses: {},
            outputProcesses: {},
            tools: {},
            inputActivities: {},
            outputActivities: {}
        });

        this.name = name;
    }

    buildObject() {
        const json = jsonSchema[name];

        this.process = Builder.getObject('Process', json.process);
        this.processGroup = Builder.getObject('ProcessGroup', json.processGroup);
        this.inputs = json.inputs.reduce((inputs, inputName) =>
            Object.assign({}, {
                [inputName]: Builder.getObject('Document', inputName)
            }), {}
        );
        this.outputs = json.outputs.reduce((outputs, outputName) =>
            Object.assign({}, {
                [outputName]: Builder.getObject('Document', outputName)
            }), {}
        );
        this.tools = json.tools.reduce((tools, toolName) =>
            Object.assign({}, {
                [toolName]: Builder.getObject('Tool', toolName)
            }), {}
        );
    }
}

Builder.register('Activity', Activity);

export default Activity;
