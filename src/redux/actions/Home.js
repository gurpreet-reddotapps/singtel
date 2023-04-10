import dispatchType from '../constants';
import * as dispatchTypes from "../constants"



export const setHomeData = data => dispatch => {
    dispatch({
        type: dispatchTypes.STORE_HOMEDETAILS,
        payload: data,
    });
};

export const setUserCheckInStatus = data => dispatch => {
    dispatch({
        type: dispatchType.setUserCheckInStatus,
        payload: data,
    });
};


