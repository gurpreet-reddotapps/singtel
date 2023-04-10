import dispatchType from '../constants';

export const storeUserDetails = data => dispatch => {
    dispatch({
        type: dispatchType.storeUserDetails,
        payload: data
    })
}

export const setLogOut = () => dispatch => {
    dispatch({
        type: dispatchType.LOGOUT_USER,
        payload: null,
    })
}



