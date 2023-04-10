import dispatchType from '../constants';

export const storeUserAccessData = data => dispatch => {
    dispatch({ 
        type: dispatchType.storeUserAccessData, 
        payload: data 
    })
}



