import * as dispatchTypes from '../constants';
let initialState = {
    quotationId: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.QUOTATION_ID:
            return { ...state, quotationId: action.payload };
        default:
            return state;
    }
}