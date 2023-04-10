import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Vibration ,Alert,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDetails, unAssignFcmToken, userCheckIn, userCheckOut } from '../api';
import { androidPermission } from '../appPermission/permissions';
import { colors } from '../assects/colors';
import { iosOpacity, routesToExcluedNavBar, width } from '../assects/strings';
import { LoaderComponet, ShowErrorMessage } from '../component';
import constants from '../redux/constants';
import CheckInConfirmModal from '../screens/CheckInCheckOut/Modals/CheckInConfirmModal';
import CheckInModal from '../screens/CheckInCheckOut/Modals/CheckInModal';
import CheckOutModal from '../screens/CheckInCheckOut/Modals/CheckOutModal';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import routes from './routes';
import { saveLocationName, saveUserCurrentRegion, saveUserLatLng } from '../redux/actions/userLocation';
import { GetLocationApi } from '../component/GetLocation';
import { setHomeData } from '../redux/actions/Home';
import { setLogOut } from '../redux/actions/users';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Geocoder from 'react-native-geocoding';
import { showMessage } from 'react-native-flash-message';
import fonts from '../assects/fonts';

const CustomTabBar = ({ state, descriptors, navigation, isGuest,taskTab }) => {
    const dispatch = useDispatch();
    const [checkInModal, setCheckInModal] = useState(false);
    const { userLatLng, userCurrentRegion, locationName } = useSelector(state => state.userLocation);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const [showLoader, setShowLoader] = useState(false);

    const [confirmatinModal, setConfirmationModal] = useState(false);
    let activeStackState = state.routes[state.index].state;

    const tabBarVisible = activeStackState?.routes[activeStackState.index]?.name == undefined ? routesToExcluedNavBar.includes(state.routes[state.index].name) : routesToExcluedNavBar.includes(activeStackState?.routes[activeStackState.index]?.name);

    async function getLocationPermisson(isFocused,event,navigation,route) {
        if (Platform.OS == "android") {
            await androidPermission().then((res) => {
                if (res) {
                    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                        interval: 10000,
                        fastInterval: 5000,
                    }).then(async (data) => {
                        if (data == "already-enabled" || data == "enabled") {
                            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);

                            // await GetLocationApi().then((res) => {
                            //     let currentRegion = {
                            //         latitude: res.coords.latitude,
                            //         longitude: res.coords.longitude,
                            //         latitudeDelta: 0.001,
                            //         longitudeDelta: 0.001,
                            //     };
                            //     console.log("SJIJHD",res)
                            //     Geocoder.from(res.coords.latitude, res.coords.longitude).then(json => {
                            //         var addressComponent = json.results[1].formatted_address;
                            //         dispatch(saveLocationName(addressComponent))
                            //     })
                            //         .catch((err) => {console.log("Geocoding error", err),
                            //         showMessage({
                            //             message:"Fetching your current location please wait ",
                            //             type:"info"
                            //         })})
                            //     dispatch(saveUserCurrentRegion(currentRegion))
                            //     dispatch(saveUserLatLng({ latitude: res.coords.latitude, longitude: res.coords.longitude }))
                            //     if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                            // })
                        }
                    }).catch((err) => {

                        console.log("err", err)
                    });
                }
            })
        }
        else {
            await GetLocationApi().then((res) => {
               
                let currentRegion = {
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                };
                // Geocoder.from(res.coords.latitude, res.coords.longitude).then(json => {
                //     var addressComponent = json.results[1].formatted_address;
                //     dispatch(saveLocationName(addressComponent))
                //     console.log("Ios Location name", addressComponent)
                // })
                dispatch(saveUserCurrentRegion(currentRegion))
                dispatch(saveUserLatLng({ latitude: res.coords.latitude, longitude: res.coords.longitude }))
                if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);

            }).catch(()=>{
                showMessage({
                    message:"Fetching your current location please wait ",
                    type:"info"
                })
            })
        }
    }


    const Logout = async() => {
        dispatch(setLogOut())
        UnAssignFcmToken()
    }

    const UnAssignFcmToken = async () => {
        let fcmtoken = await AsyncStorage.getItem("fcmtoken")

        let data = {
            fcm_token: fcmtoken,
            device_type:Platform.OS
        }
        unAssignFcmToken(data).then((res) => {
            console.log(res?.data);
            console.log("FCM Token Removed");
        }).catch(err => { return err; });

    }


    return !tabBarVisible ? (
        <View style={[{ width: width, height: width / 5, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, elevation: 5 },iosOpacity]}  >
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, });
                    if(index == 2){
                        getLocationPermisson(isFocused,event,navigation,route);
                        // if(userLatLng){
                        //     // showMessage({
                        //     //     message:"Locatio",
                        //     //     type:"info"
                        //     // })
                        //     if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                        // }
                        // else{
                        //     getLocationPermisson();
                           
                        // }
                    }
                    else if (index == 4) {
                        // navigation.navigate(routes.checkIncheckout)
                        Alert.alert("Logout", "Are you sure want to logout", [{ text: "No", style: "cancel" }, { text: "Yes", onPress: () => Logout() }])
                    }
                    else {
                        if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{alignItems:"center"}}
                    >
                        <View style={{ width: index == 2 && !taskTab ? width / 7 : width / 14, height: index == 2 && !taskTab ? width / 7 : width / 14, alignItems: "center" }}  >
                            {options.tabBarIcon({ options })}
                        </View>
                        {taskTab ?<Text style={{color:isFocused?colors.cFEB23F:colors.C808089,fontFamily:fonts.PoppinsRegular,marginTop:5, fontSize: 10 }} >{options.title}</Text>: null}
                    </TouchableOpacity>
                );
            })}
        </View>
    ) : null
}

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 20, backgroundColor: "red", flexDirection: 'row', width: width, height: 45, borderRadius: 50, justifyContent: "center", alignItems: "center", alignSelf: 'center' }
})

export default CustomTabBar