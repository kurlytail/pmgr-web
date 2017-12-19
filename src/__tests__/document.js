import DocumentReducer from 'document';

describe('Document DocumentReducer', () => {
    it('Document init', () => {
        var state = DocumentReducer({}, { type: 'DOCUMENT_INIT', name: 'test' });
        expect(state.documents['test'].percentComplete).toBe(0);
        state = DocumentReducer(state, { type: 'DOCUMENT_INIT', name: 'test' });
        expect(state.documents['test'].percentComplete).toBe(0);
    });

    it('Document partial complete', () => {
        var state = DocumentReducer({}, { type: 'DOCUMENT_UPDATE', name: 'test', percentComplete: 50 });
        expect(state.documents['test'].percentComplete).toBe(50);
    });

    it('Document unrecognized state', () => {
        var state = DocumentReducer('some state', { type: 'some action', percentComplete: 50 });
        expect(state).toBe('some state');
    });
});
