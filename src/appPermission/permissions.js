import { PermissionsAndroid, Platform } from 'react-native';
import { ShowErrorMessage } from '../component';

export const androidPermission = () => new Promise(async (resolve, reject) => {
    try {
        if (Platform.OS === 'android' && Platform.Version > 22) {
            const granted = await PermissionsAndroid.requestMultiple([

                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,



            ]);
            console.log(granted, 'granted response')
            if (

                granted['android.permission.ACCESS_FINE_LOCATION'] !== 'granted'
            ) {
                ShowErrorMessage("Don't have required permission.Please allow permissions")
                return resolve(false);
            }
            return resolve(true);
        }

        return resolve(true);
    } catch (error) {
        return resolve(false);
    }
});



