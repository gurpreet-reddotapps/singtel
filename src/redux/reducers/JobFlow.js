import * as dispatchTypes from '../constants';

let initialState = {
    isJobStarted: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.IS_JOB_STARTED:
            return { ...state, isJobStarted: action.payload };
        default:
            return state;
    }
}