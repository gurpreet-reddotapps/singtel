import dispatchType from '../constants';

export const saveUserLatLng = data => dispatch => {
    dispatch({ 
        type: dispatchType.saveUserLatLng, 
        payload: data 
    })
}
export const saveUserCurrentRegion = data => dispatch => {
    dispatch({ 
        type: dispatchType.saveUserCurrentRegion, 
        payload: data 
    })
}


export const saveLocationName = data => dispatch => {
    dispatch({ 
        type: dispatchType.saveUserLocationName, 
        payload: data 
    })
}




