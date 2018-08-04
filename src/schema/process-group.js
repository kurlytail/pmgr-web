import jsonSchema from './schema.json';
import Builder from './builder';

class ProcessGroup {
    static getObject(name) {
        ProcessGroup.processGroups = ProcessGroup.processGroups || {};

        if (!ProcessGroup.processGroups[name]) {
            ProcessGroup.processGroups[name] = new ProcessGroup(name);
            ProcessGroup.processGroups[name].buildObject();
        }

        return ProcessGroup.processGroups[name];
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
        const processes = activities.reduce(
            (processes, [, activity]) => new Set([...processes, activity.process]),
            new Set()
        );
        const tools = activities.reduce((tools, [, activity]) => new Set([...tools, activity.tools]), new Set());

        Object.assign(this, { inputs: {}, outputs: {}, processes: {}, tools: {}, activities: {} });

        inputs.forEach(input => (this.inputs[input] = Builder.getObject('Document', input)));
        outputs.forEach(output => (this.outputs[output] = Builder.getObject('Document', output)));
        processes.forEach(process => (this.processes[process] = Builder.getObject('Process', process)));
        tools.forEach(tool => (this.tools[tool.replace(/^tool_/, '')] = Builder.getObject('Tool', tool)));
        activities.forEach(
            ([activityName]) => (this.activities[activityName] = Builder.getObject('Activity', activityName))
        );
    }
}

Builder.register('ProcessGroup', ProcessGroup);

export default ProcessGroup;
