import Elaborate from 'elaborate';

describe('Elaborator', () => {
    it('Check activities', () => {
        expect(Elaborate.Activities).toBeDefined();
    });
    it('Check documents', () => {
        expect(Elaborate.Documents).toBeDefined();
    });
    it('Check processes', () => {
        expect(Elaborate.Processes).toBeDefined();
    });
    it('Check process groups', () => {
        expect(Elaborate.ProcessGroups).toBeDefined();
    });
    it('Check tools', () => {
        expect(Elaborate.Tools).toBeDefined();
    });
});

