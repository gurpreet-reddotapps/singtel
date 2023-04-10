import * as dispatchTypes from "../constants"





export const setStepOneDataInRedux = dataPageOne => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_ONE_DATA,
        payload: dataPageOne,
    });
    console.log(dataPageOne,"Page ONE DATA")
};

export const setStepTwoDataInRedux = dataPageTwo => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_TWO_DATA,
        payload: dataPageTwo,
    });
    console.log(dataPageTwo,"Page TWO DATA")
};

export const setStepThreeDataInRedux = dataPageThree => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_THREE_DATA,
        payload: dataPageThree,
    });
    console.log(dataPageThree,"Page Three DATA")
};

export const setStepFourDataInRedux = dataPageFour => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_FOUR_DATA,
        payload: dataPageFour,
    });
    console.log(dataPageFour,"Page Four DATA")
};
