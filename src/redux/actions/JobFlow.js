import * as dispatchTypes from "../constants"



export const setJobStart = bool => dispatch => {
    dispatch({
        type: dispatchTypes.IS_JOB_STARTED,
        payload: bool,
    });
};

