import reducer from 'document';

describe('Document Reducer', () => {
    it('Document init', () => {
        var state = reducer({}, { type: 'DOCUMENT_INIT' });
        expect(state.percentComplete).toBe(0);
    });

    it('Document partial complete', () => {
        var state = reducer({}, { type: 'DOCUMENT_SET_COMPLETE', percentComplete: 50 });
        expect(state.percentComplete).toBe(50);
    });

    it('Document unrecognized state', () => {
        var state = reducer('some state', { type: 'some action', percentComplete: 50 });
        expect(state).toBe('some state');
    });
});
