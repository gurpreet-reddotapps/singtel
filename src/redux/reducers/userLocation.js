import dispatchTypes from '../constants';
let initialState = {
    userLatLng: null,
    userCurrentRegion: null,
    locationName:""
}
export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.saveUserLatLng:
            return { ...state, userLatLng: action.payload };
        case dispatchTypes.saveUserCurrentRegion:
            return { ...state, userCurrentRegion: action.payload };
        case dispatchTypes.saveUserLocationName:
            return { ...state, locationName: action.payload };
        default:
            return state;
    }
}