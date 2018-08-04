import jsonSchema from './schema.json';
import Builder from './builder';

class Process {
    static getObject(name) {
        Process.processes = Process.processes || {};

        if (!Process.processes[name]) {
            Process.processes[name] = new Process(name);
            Process.processes[name].buildObject();
        }

        return Process.processes[name];
    }

    constructor(name) {
        Object.assign(this, {});
        this.name = name;
    }

    buildObject() {
        const activities = Object.entries(jsonSchema).filter(([, activity]) => activity.processGroup === this.name);
        const inputs = activities.reduce((inputs, [, activity]) => new Set([...inputs, ...activity.inputs]), new Set());
        const outputs = activities.reduce(
            (outputs, [, activity]) => new Set([...outputs, ...activity.outputs]),
            new Set()
        );
        const processGroups = activities.reduce(
            (processGroups, [, activity]) => new Set([...processGroups, activity.processGroup]),
            new Set()
        );
        const tools = activities.reduce((tools, [, activity]) => new Set([...tools, activity.tools]), new Set());

        Object.assign(this, { inputs: {}, outputs: {}, processGroup: {}, tools: {}, activities: {} });

        inputs.forEach(input => (this.inputs[input] = Builder.getObject('Document', input)));
        outputs.forEach(output => (this.outputs[output] = Builder.getObject('Document', output)));
        processGroups.forEach(
            processGroup => (this.processGroups[processGroup] = Builder.getObject('processGroup', processGroup))
        );
        tools.forEach(tool => (this.tools[tool.replace(/^tool_/, '')] = Builder.getObject('Tool', tool)));
        activities.forEach(
            ([activityName]) => (this.activities[activityName] = Builder.getObject('Activity', activityName))
        );
    }
}

Builder.register('Process', Process);

export default Process;
