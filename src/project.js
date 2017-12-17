import Elaborate from './elaborate';


const initReducer = (state, action) => {
    /* Determine all documents with no sources */
    /* Force definition of some extra documents */
    return {};
}

const finalizeReducer = (state, action) => {
    return {};
}

const projectReducer = (state, action) => {
    switch(action.type) {
        case 'PROJECT_INIT' : return initReducer(state, action);
        case 'PROJECT_FINALIZE' : return finalizeReducer(state, action);
        default: return state;
    }
};

export default projectReducer;
