import dispatchType from '../constants';

export const setNotifications = data => dispatch => {
    dispatch({
        type: dispatchType.setNotifications,
        payload: data
    })
}


export const NotificationPermisionStatus = data => dispatch => {
    dispatch({
        type: dispatchType.notificationPermissionStatus,
        payload: data
    })
}





