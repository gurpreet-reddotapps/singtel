import * as dispatchTypes from "../constants"



export const storeCheckInData = CheckInDataArray => dispatch => {
    dispatch({
        type: dispatchTypes.STORE_CHECK_IN_DATA,
        payload: CheckInDataArray,
    });
};

export const setPageOneDataInRedux = pageOneDataArray => dispatch => {
    dispatch({
        type: dispatchTypes.CHECKIN_PAGE_ONE_DATA,
        payload: pageOneDataArray,
    });
    console.log(pageOneDataArray,"Page ONE DATA")
};

export const setPageTwoDataInRedux = pageTwoDataArray => dispatch => {
    dispatch({
        type: dispatchTypes.CHECKIN_PAGE_TWO_DATA,
        payload: pageTwoDataArray,
    });
    console.log(pageTwoDataArray,"Page TWO DATA")
};


export const setUploadOrderImage = imageArray => dispatch => {
    dispatch({
        type: dispatchTypes.ORDER_IMAGE_ARRAY,
        payload: imageArray,
    });
    console.log(imageArray,"Page Three DATA")
};

export const setPageOtherItemDataInRedux = pageOtherItemDataArray => dispatch => {
    dispatch({
        type: dispatchTypes.CHECKIN_PAGE_OTHER_ITEM_DATA,
        payload: pageOtherItemDataArray,
    });
    console.log(pageOtherItemDataArray,"Page Four DATA")
};
