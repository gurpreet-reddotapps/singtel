import dispatchTypes from '../constants';
let initialState = {
    isStudent: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.appType:
            return { ...state, isStudent: action.payload };
      
        default:
            return state;
    }
}