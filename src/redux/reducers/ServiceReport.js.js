import * as dispatchTypes from '../constants';
let initialState = {
    pageOneDataValue: [],
    pageTwoDataValue: [],
    pageThreeDataValue: [],
    pageFourDataValue: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.STEP_ONE_DATA:
            return { ...state, pageOneDataValue: action.payload };
        case dispatchTypes.STEP_TWO_DATA:
            return { ...state, pageTwoDataValue: action.payload };
        case dispatchTypes.STEP_THREE_DATA:
            return { ...state, pageThreeDataValue: action.payload };
        case dispatchTypes.STEP_FOUR_DATA:
            return { ...state, pageFourDataValue: action.payload };
        default:
            return state;
    }
}