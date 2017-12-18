import { DocumentReducer } from 'index';

describe('Document DocumentReducer', () => {
    it('Document init', () => {
        var state = DocumentReducer({}, { type: 'DOCUMENT_INIT' });
        expect(state.percentComplete).toBe(0);
    });

    it('Document partial complete', () => {
        var state = DocumentReducer({}, { type: 'DOCUMENT_SET_COMPLETE', percentComplete: 50 });
        expect(state.percentComplete).toBe(50);
    });

    it('Document unrecognized state', () => {
        var state = DocumentReducer('some state', { type: 'some action', percentComplete: 50 });
        expect(state).toBe('some state');
    });
});
