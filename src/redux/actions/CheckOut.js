import * as dispatchTypes from "../constants"



export const storeCheckOutData = CheckOutDataArray => dispatch => {
    dispatch({
      type: dispatchTypes.STORE_CHECK_OUT_DATA,
      payload: CheckOutDataArray,
    });
    console.log(CheckOutDataArray, "CheckOutDataArray");
  };
  
  
  export const setCheckOutPageOneDataInRedux = pageCheckOutOneDataArray => dispatch => {
    dispatch({
      type: dispatchTypes.CHECKOUT_PAGE_ONE_DATA,
      payload: pageCheckOutOneDataArray,
    });
  };
  
  export const setPageCheckOutTwoDataInRedux = pageCheckOutTwoDataArray => dispatch => {
    dispatch({
      type: dispatchTypes.CHECKOUT_PAGE_TWO_DATA,
      payload: pageCheckOutTwoDataArray,
    });
  };
  
  
  export const setCheckOutUploadOrderImage = imageArrayCheckOut => dispatch => {
    dispatch({
      type: dispatchTypes.CHECKOUT_ORDER_IMAGE_ARRAY,
      payload: imageArrayCheckOut,
    });
  };
  
  export const setCheckOutPageOtherItemDataInRedux = pageCheckOutOtherItemDataArray => dispatch => {
    dispatch({
      type: dispatchTypes.CHECKOUT_PAGE_OTHER_ITEM_DATA,
      payload: pageCheckOutOtherItemDataArray,
    });
  };