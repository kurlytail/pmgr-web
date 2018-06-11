import { swarm_design } from './design';
import _ from 'lodash';

class Elaborate {
    _reduceFlows(reducedFlows, newFlows) {
        return newFlows.reduce((reducedFlows, flow) => {
            if (flow && !reducedFlows.find(rFlow => rFlow.name === flow.name)) {
                reducedFlows.push(flow);
            }
            return reducedFlows;
        }, reducedFlows);
    }

    constructor() {
        this.activities = swarm_design.MasterCell.filter(value =>
            _.head(_.filter(swarm_design.Flow, { name: value.name }))
        );
        let documentsAndTools = swarm_design.MasterCell.filter(
            value => _.filter(swarm_design.Flow, { name: value.name }).length === 0
        );

        this.documents = _.filter(documentsAndTools, value => value.name.indexOf('tool_') !== 0);
        this.tools = _.filter(documentsAndTools, value => value.name.indexOf('tool_') === 0);

        this.processGroups = Object.values(
            swarm_design.Parameter.filter(parameter => parameter.name === 'ProcessGroup').reduce(
                (reducedGroups, processGroup) => {
                    if (reducedGroups[processGroup.value]) {
                        reducedGroups[processGroup.value].object = this._reduceFlows(
                            reducedGroups[processGroup.value].object,
                            processGroup.object
                        );
                    } else {
                        reducedGroups[processGroup.value] = processGroup;
                    }
                    return reducedGroups;
                },
                {}
            )
        );
        this.processes = Object.values(
            swarm_design.Parameter.filter(parameter => parameter.name === 'Process').reduce(
                (reducedProcesses, process) => {
                    if (reducedProcesses[process.value]) {
                        reducedProcesses[process.value].object = this._reduceFlows(
                            reducedProcesses[process.value].object,
                            process.object
                        );
                    } else {
                        reducedProcesses[process.value] = process;
                        process.object = this._reduceFlows([], process.object);
                    }
                    return reducedProcesses;
                },
                {}
            )
        );
    }

    get Documents() {
        return this.documents;
    }

    get Tools() {
        return this.tools;
    }

    get Activities() {
        return this.activities;
    }

    get Processes() {
        return this.processes;
    }

    get ProcessGroups() {
        return this.processGroups;
    }

    getToolsModifyingDocument(documentName) {
        const tools = this.Tools.reduce((tools, tool) => {
            const activities = _.map(tool.output, 'to');
            const documents = _.map(_.map(_.flatten(_.map(activities, 'output')), 'to'), 'name');
            if (documents.includes(documentName)) {
                return [tool.name, ...tools];
            }
            return tools;
        }, []);

        return tools;
    }

    getToolsUsingDocument(documentName) {
        const tools = this.Tools.reduce((tools, tool) => {
            const activities = _.map(tool.output, 'to');
            const documents = _.map(_.map(_.flatten(_.map(activities, 'input')), 'from'), 'name');
            if (documents.includes(documentName)) {
                return [tool.name, ...tools];
            }
            return tools;
        }, []);

        return tools;
    }

    getActivitiesModifyingDocument(documentName) {
        const activities = this.Activities.reduce((activities, activity) => {
            const documents = _.map(_.map(activity.output, 'to'), 'name');
            if (documents.includes(documentName)) {
                return [activity.name, ...activities];
            }
            return activities;
        }, []);

        return activities;
    }

    getActivitiesUsingDocument(documentName) {
        const activities = this.Activities.reduce((activities, activity) => {
            const documents = _.map(_.map(activity.input, 'from'), 'name');
            if (documents.includes(documentName)) {
                return [activity.name, ...activities];
            }
            return activities;
        }, []);

        return activities;
    }
}

let _elaborate = new Elaborate();
export default _elaborate;
