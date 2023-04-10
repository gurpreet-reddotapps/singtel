import * as dispatchTypes from "../constants"


// 

export const setJobId = jobId => dispatch => {
    dispatch({
        type: dispatchTypes.JOB_ID,
        payload: jobId,
    });
};

// 

export const saveJobDetail = (object, showOrNot) => dispatch => {
    dispatch({
        type: dispatchTypes.SHOW_JOB_DETAIL,
        payload: object,
        payloadShow: showOrNot,
    });
};

//Seting the Order ID for Material Page
export const setOrderId = orderId => dispatch => {
    dispatch({
        type: dispatchTypes.ORDER_ID,
        payload: orderId,
    });
};

export const setOrderStatus = status => dispatch => {
    dispatch({
        type: dispatchTypes.ORDER_STATUS,
        payload: status,
    });
};

export const setQuoteCreation = value => dispatch => {
    dispatch({
        type: dispatchTypes.QUOTE_CREATED,
        payload: value,
    });
    console.log(value, "HERE IS THE Quote Created");
};

export const setQuoteApprove = value => dispatch => {
    dispatch({
        type: dispatchTypes.QUOTE_APPROVED,
        payload: value,
    });
    console.log(value, "HERE IS THE Quote Approved");
};

export const setJobClose = value => dispatch => {
    dispatch({
        type: dispatchTypes.JOB_CLOSED,
        payload: value,
    });
    console.log(value, "JOB CLOSED");
};