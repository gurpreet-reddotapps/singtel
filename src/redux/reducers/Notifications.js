import dispatchTypes from '../constants';
let initialState = {
    notification: [],
    notificationPermisson:false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.setNotifications:
            return { ...state, notification: action.payload };
        case dispatchTypes.notificationPermissionStatus:
            return { ...state, notificationPermisson: action.payload };
        default:
            return state;
    }
}