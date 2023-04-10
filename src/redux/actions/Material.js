import * as dispatchTypes from "../constants"


// 
export const setMaterialDetail = object => dispatch => {
    dispatch({
        type: dispatchTypes.SAVE_MATERIAL_DETAIL,
        payload: object,
    });
};



export const setMaterialStatus = status => dispatch => {
    dispatch({
        type: dispatchTypes.SET_MATERIAL_STATUS,
        payload: status,
    });
};
