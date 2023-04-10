import * as dispatchTypes from '../constants';
let initialState = {
    pageOneDataValueAccidental: [],
    pageTwoDataValueAccidental: [],
    pageThreeDataValueAccidental: [],
    pageFourDataValueAccidental: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.STEP_ONE_DATA_ACCIDENTAL:
            return { ...state, pageOneDataValueAccidental: action.payload };
        case dispatchTypes.STEP_TWO_DATA_ACCIDENTAL:
            return { ...state, pageTwoDataValueAccidental: action.payload };
        case dispatchTypes.STEP_THREE_DATA_ACCIDENTAL:
            return { ...state, pageThreeDataValueAccidental: action.payload };
        case dispatchTypes.STEP_FOUR_DATA_ACCIDENTAL:
            return { ...state, pageFourDataValueAccidental: action.payload };
        default:
            return state;
    }
}