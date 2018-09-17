import jsonSchema from './schema.json';
import Builder from './builder';

class Tool {
    static getObject(name) {
        Tool.tools = Tool.tools || {};

        name = name.replace(/^tool_/, '');

        if (!Tool.tools[name]) {
            Tool.tools[name] = new Tool(name);
            Tool.tools[name].buildObject();
        }

        return Tool.tools[name];
    }

    constructor(name) {
        Object.assign(this, {});
        this.name = name;
    }

    buildObject() {
        const activities = Object.entries(jsonSchema).filter(([, activity]) => activity.tools.includes(`tool_${this.name}`));

        const inputs = activities.reduce((inputs, [, activity]) => new Set([...inputs, ...activity.inputs]), new Set());
        const outputs = activities.reduce(
            (outputs, [, activity]) => new Set([...outputs, ...activity.outputs]),
            new Set()
        );
        const processes = activities.reduce(
            (processes, [, activity]) => new Set([...processes, activity.process]),
            new Set()
        );
        const processGroups = activities.reduce(
            (processGroups, [, activity]) => new Set([...processGroups, activity.processGroup]),
            new Set()
        );

        Object.assign(this, {
            inputs: {}, outputs: {}, processes: {}, processGroups: {}, activities: {}
        });

        inputs.forEach(input => (this.inputs[input] = Builder.getObject('Document', input)));
        outputs.forEach(output => (this.outputs[output] = Builder.getObject('Document', output)));
        processes.forEach(process => (this.processes[process] = Builder.getObject('Process', process)));
        processGroups.forEach(
            processGroup => (this.processGroups[processGroup] = Builder.getObject('ProcessGroup', processGroup))
        );
        activities.forEach(
            ([activityName]) => (this.activities[activityName] = Builder.getObject('Activity', activityName))
        );
    }
}

Builder.register('Tool', Tool);

export default Tool;
