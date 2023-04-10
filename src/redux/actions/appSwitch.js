import dispatchType from '../constants';

export const setAppType = data => dispatch => {
    dispatch({ 
        type: dispatchType.appType, 
        payload: data 
    })
}
