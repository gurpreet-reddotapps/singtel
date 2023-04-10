import * as dispatchTypes from '../constants';
let initialState = {
    checkInDataArray: [],
    ShowCheckInData: false,
    reduxLoading: true,
    pageOneArrayForCheckIn: [],
    pageTwoArrayForCheckIn: [],
    orderImageArray: [],
    pageOtherItemArrayForCheckIn: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.STORE_CHECK_IN_DATA:
            return { ...state, checkInDataArray: action.payload, ShowCheckInData: true };
        case dispatchTypes.CHECKIN_PAGE_ONE_DATA:
            return { ...state, pageOneArrayForCheckIn: action.payload };
        case dispatchTypes.CHECKIN_PAGE_TWO_DATA:
            return { ...state, pageTwoArrayForCheckIn: action.payload };
        case dispatchTypes.CHECKIN_PAGE_OTHER_ITEM_DATA:
            return { ...state, pageOtherItemArrayForCheckIn: action.payload, reduxLoading: false };
        case dispatchTypes.ORDER_IMAGE_ARRAY:
            return { ...state, orderImageArray: [...state.orderImageArray, action.payload] };
        default:
            return state;
    }
}