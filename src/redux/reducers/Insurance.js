import * as dispatchTypes from "../constants"


let initialState = {
    isNewInsuranceCompany: false,
    isNewSurveyorCompany: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.NEW_INSURANCE_CREATED:
            return { ...state, isNewInsuranceCompany: action.payload };
        case dispatchTypes.NEW_SURVEYOR_CREATED:
            return { ...state, isNewSurveyorCompany: action.payload };
        default:
            return state;
    }
}