import * as dispatchTypes from '../constants';

let initialState = {
    materialDetail: '',
    materialStatus: "To Collect",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.SAVE_MATERIAL_DETAIL:
            return { ...state, materialDetail: action.payload };
        case dispatchTypes.SET_MATERIAL_STATUS:
            return { ...state, materialStatus: action.payload };
        default:
            return state;
    }
}