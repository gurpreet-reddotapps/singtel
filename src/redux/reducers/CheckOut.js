import * as dispatchTypes from '../constants';
let initialState = {
    checkOutDataArray: [],
    ShowCheckOutData: false,
    reduxLoading: true,
    pageOneArrayForCheckOut: [],
    pageTwoArrayForCheckOut: [],
    orderImageArrayForCheckOut: [],
    pageOtherItemArrayForCheckOut: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.STORE_CHECK_OUT_DATA:
            return { ...state, checkOutDataArray: action.payload, ShowCheckOutData: true };
        case dispatchTypes.CHECKOUT_PAGE_ONE_DATA:
            return { ...state, pageOneArrayForCheckOut: action.payload };
        case dispatchTypes.CHECKOUT_PAGE_TWO_DATA:
            return { ...state, pageTwoArrayForCheckOut: action.payload };
        case dispatchTypes.CHECKOUT_ORDER_IMAGE_ARRAY:
            return { ...state, orderImageArrayForCheckOut: [...state.orderImageArrayForCheckOut, action.payload] };
        case dispatchTypes.CHECKOUT_PAGE_OTHER_ITEM_DATA:
            return { ...state, pageOtherItemArrayForCheckOut: action.payload , reduxLoading : false };
        default:
            return state;
    }
}