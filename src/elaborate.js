import { swarm_design } from './design';
import _ from 'lodash';

class Elaborate {
    constructor() {
        this.activities = _.filter(swarm_design.MasterCell, value =>
            _.head(_.filter(swarm_design.Flow, { name: value.name }))
        );
        let documentsAndTools = _.filter(
            swarm_design.MasterCell,
            value => _.filter(swarm_design.Flow, { name: value.name }).length === 0
        );

        this.documents = _.filter(documentsAndTools, value => value.name.indexOf('tool_') !== 0);
        this.tools = _.filter(documentsAndTools, value => value.name.indexOf('tool_') === 0);

        this.processGroups = _.filter(swarm_design.Parameter, { name: 'ProcessGroup' });
        this.processes = _.filter(swarm_design.Parameter, { name: 'Process' });
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
}

let _elaborate = new Elaborate();
export default _elaborate;
