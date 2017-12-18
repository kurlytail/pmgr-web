import { ProjectReducer } from 'index';
import _ from 'lodash';

describe('Project Reducer', () => {
    it('Project Init', () => {
        var state = ProjectReducer({}, { type: 'PROJECT_INIT' });
        expect(state.documents['project_statement_of_work']).toBeDefined();
        expect(state.documents['contract']).toBeDefined();
        expect(state.documents['enterprise_environmental_factors']).toBeDefined();
        expect(state.documents['project_management_processes']).toBeDefined();
    });

    it('Project Finalize', () => {
        var state = ProjectReducer({}, { type: 'PROJECT_INIT' });
        state = ProjectReducer(state, { type: 'PROJECT_FINALIZE' });
        _.forEach(state.documents, document => {
            expect(document.percentComplete).toBe(100);
        });
    });

    it('Project unrecognized state', () => {
        var state = ProjectReducer('some state', { type: 'some action', percentComplete: 50 });
        expect(state).toBe('some state');
    });
});
