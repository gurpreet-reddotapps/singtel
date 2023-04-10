import * as dispatchTypes from "../constants"



export const newInsuranceCreated = bool => dispatch => {
    dispatch({
        type: dispatchTypes.NEW_INSURANCE_CREATED,
        payload: bool,
    });
};

export const newSurveyorCreated = bool => dispatch => {
    dispatch({
        type: dispatchTypes.NEW_SURVEYOR_CREATED,
        payload: bool,
    });
};
