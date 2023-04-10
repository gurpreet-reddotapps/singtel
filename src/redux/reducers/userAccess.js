import dispatchTypes from '../constants';
let initialState = {
    userAcessData: {},
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.storeUserAccessData:
            return { ...state, userAcessData: action.payload };
        default:
            return state;
    }
}