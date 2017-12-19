import { ProjectReducer } from 'index';
import _ from 'lodash';

describe('Project Reducer', () => {
    it('Project Init', () => {
        var state = ProjectReducer({}, { type: 'PROJECT_INIT', name: 'test' });
        expect(state.name).toBe('test');
    });

    it('Project Finalize', () => {
        var state = ProjectReducer({}, { type: 'PROJECT_INIT' });

        state.documents = {
            test1: { percentComplete: 10 },
            test2: { percentComplete: 20 }
        };
        state = ProjectReducer(state, { type: 'PROJECT_FINALIZE' });
        expect(state.documents.test1.percentComplete).toBe(100);
        expect(state.documents.test2.percentComplete).toBe(100);
    });

    it('Project unrecognized state', () => {
        var state = ProjectReducer('some state', { type: 'some action', percentComplete: 50 });
        expect(state).toBe('some state');
    });
});
