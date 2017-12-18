import Elaborate from './elaborate';

const initReducer = (state, action) => {
    return Object.assign({}, state, { percentComplete: 0 });
};

const setCompleteReducer = (state, action) => {
    return Object.assign({}, state, { percentComplete: action.percentComplete });
};

const activityReducer = (state, action) => {
    switch (action.type) {
        case 'ACTIVITY_INIT':
            return initReducer(state, action);
        default:
            return state;
    }
};

export default documentReducer;
