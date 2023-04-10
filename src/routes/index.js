import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../assects/colors';
import AppNavigation from './app-routes';
import AuthNavigation from './auth-routes';
import { API } from '../api';
import messaging from '@react-native-firebase/messaging';
import { NotificationPermisionStatus } from '../redux/actions/Notifications';

const Routes = () => {
    const { user } = useSelector(state => state.userDetails );
    const dispatch = useDispatch();

    useEffect(()=>{
        CheckNotificationStatus()
    },[])

    async function CheckNotificationStatus(){
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        console.log("authStatus",enabled)
        dispatch(NotificationPermisionStatus(enabled))
    }


    return (
        <NavigationContainer  >
            {user ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    )
}
export default Routes;      