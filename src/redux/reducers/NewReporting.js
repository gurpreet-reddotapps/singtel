import * as dispatchTypes from '../constants';
let initialState = {
    pageOneDataValueReporting: [],
    pageTwoDataValueReporting: [],
    pageThreeDataValueReporting: [],
    pageFourDataValueReporting: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.STEP_ONE_DATA_REPORTING:
            return { ...state, pageOneDataValueReporting: action.payload };
        case dispatchTypes.STEP_TWO_DATA_REPORTING:
            return { ...state, pageTwoDataValueReporting: action.payload };
        case dispatchTypes.STEP_THREE_DATA_REPORTING:
            return { ...state, pageThreeDataValueReporting: action.payload };
        case dispatchTypes.STEP_FOUR_DATA_REPORTING:
            return { ...state, pageFourDataValueReporting: action.payload };
        default:
            return state;
    }
}