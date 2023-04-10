import * as dispatchTypes from "../constants"





export const setReportingStepOneDataInRedux = dataPageOne => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_ONE_DATA_REPORTING,
        payload: dataPageOne,
    });
    console.log(dataPageOne, "PAGE ONE REPORTING")
};

export const setReportingStepTwoDataInRedux = dataPageTwo => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_TWO_DATA_REPORTING,
        payload: dataPageTwo,
    });
    console.log(dataPageTwo, "Page TWO DATA")
};

export const setReportingStepThreeDataInRedux = dataPageThree => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_THREE_DATA_REPORTING,
        payload: dataPageThree,
    });
    console.log(dataPageThree, "Page Three DATA")
};

export const setReportingStepFourDataInRedux = dataPageFour => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_FOUR_DATA_REPORTING,
        payload: dataPageFour,
    });
    console.log(dataPageFour, "Page Four DATA")
};
