import dispatchType from '../constants';


let initialState = {
    homeData: null , is_checked_in:false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchType.STORE_HOMEDETAILS:
            return {...state, homeData: action.payload };
        case dispatchType.setUserCheckInStatus:
            return {...AbortSignalstate, is_checked_in: action.payload };
        default:
            return state;
    }
}