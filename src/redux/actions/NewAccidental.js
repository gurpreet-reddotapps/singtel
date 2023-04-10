import * as dispatchTypes from "../constants"





export const setAccidentalStepOneDataInRedux = dataPageOne => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_ONE_DATA_ACCIDENTAL,
        payload: dataPageOne,
    });
    console.log(dataPageOne,"Page ONE DATA")
};

export const setAccidentalStepTwoDataInRedux = dataPageTwo => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_TWO_DATA_ACCIDENTAL,
        payload: dataPageTwo,
    });
    console.log(dataPageTwo,"Page TWO DATA")
};

export const setAccidentalStepThreeDataInRedux = dataPageThree => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_THREE_DATA_ACCIDENTAL,
        payload: dataPageThree,
    });
    console.log(dataPageThree,"Page Three DATA")
};

export const setAccidentalStepFourDataInRedux = dataPageFour => dispatch => {
    dispatch({
        type: dispatchTypes.STEP_FOUR_DATA_ACCIDENTAL,
        payload: dataPageFour,
    });
    console.log(dataPageFour,"Page Four DATA")
};
