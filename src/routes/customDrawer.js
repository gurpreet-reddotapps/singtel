import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, Pressable,Image, StyleSheet, Text, View, Platform, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../assects/colors';
import fonts from '../assects/fonts';
import { ArrowForwardIcon, BigfootLogoIcon, NotificationBellIcon, SingtelLogoIcon } from '../assects/Icons';
import { DrawerFreightIcon, DrawerHrmsIcon, DrawerLogisticIcon, DrawerLogoutIcon, DrawerMedicareIcon, DrawerPsaIcon, DrawerTruckIcon } from '../assects/Icons/DrawerIcons';
import { height, width } from '../assects/strings';
import { setLogOut } from '../redux/actions/users';
import routes from './routes';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { assignFcmToken, unAssignFcmToken } from '../api';
import { NotificationActiveIcon } from '../assects/Icons/TabIcons';
import { ShowErrorMessage, ShowInfoMessage, SwitchBar } from '../component';
import { NotificationPermisionStatus } from '../redux/actions/Notifications';
import { requestUserPermission } from '../utils/pushNnotification_helper';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportSVG } from '../screens/Vmo/assets/Icons';
import Images from '../assects/Images';

const CustomDrawer = ({ navigation }) => {
    // const navigation = useNavigation();
    const dispatch = useDispatch();
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const { userAcessData } = useSelector(state => state.userAccessDetails);

    console.log("userAcessData",userAcessData)
    const { notificationPermisson } = useSelector(state => state.notificationDetail);

    console.log(" homeData?.is_vmo_user", user)
    const data = [{
        data:null,isEnable: true, icon: DrawerHrmsIcon, title: "HRMS", onPress: () => {
            navigation.reset({
                index: 0,
                routes: [{ name: routes.profile }],
            }), navigation.closeDrawer()
        }
    },
    { data:null,isEnable: homeData?.is_vmo_user, icon: DrawerTruckIcon, title: "VMO", onPress: () => navigation.navigate(routes.vmoStack) },
    // { icon: DrawerPsaIcon, title: "PSA", onPress: () => alert("In Developemt") },
    // { icon: DrawerFreightIcon, title: "Freight", onPress: () => alert("In Developemt") },
    // { icon: DrawerLogisticIcon, title: "Logistics", onPress: () => alert("In Developemt") },
    // { icon: DrawerMedicareIcon, title: "Medicare", onPress: () => alert("In Developemt") },
    { data:null,isEnable: true, icon: DrawerLogoutIcon, title: "Logout", onPress: () => Alert.alert("Logout", "Are you sure want to logout", [{ text: "No", style: "cancel" }, { text: "Yes", onPress: () => Logout() }]) },
    { data:null,isEnable: true, icon: NotificationActiveIcon, title: "Notification", onPress: () => ChangeNotificationStaus() },
    { data:homeData?.unread_message,isEnable: true, icon: SupportSVG, title: "Chat Support", onPress: () => navigation.navigate(routes.chatSupportStack) },

    ]

    async function ChangeNotificationStaus() {
        if (notificationPermisson) {
            UnAssignFcmToken()
        }
        else {
            AssignFcmToken()
        }

    }

    async function AssignFcmToken() {

        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            try {
                let fcmtoken = await messaging().getToken()
                if (fcmtoken) {
                    console.log(fcmtoken, "NEW FCM TOKEN");
                    await AsyncStorage.setItem("fcmtoken", fcmtoken)
                    let data = {
                        fcm_token: fcmtoken,
                        device_type: Platform.OS,
                        app_version: DeviceInfo.getVersion()
                    }
                    assignFcmToken(data).then((res) => {
                        console.log(res?.data);
                        console.log("FCM Token Saved");
                        dispatch(NotificationPermisionStatus(true))
                        ShowInfoMessage("Notification Enabled")
                    }).catch(err => { return err; });
                }
            } catch (error) {
                console.log(error, "ERROR IN GETTING THE FCM TOKEN");
            }

        }
        else {
            if (Platform.OS == "ios") {
                Linking.canOpenURL('app-settings:')
                    .then(supported => {
                        Linking.openURL('app-settings:');
                    })
                    .catch(error => { });
            }
            dispatch(NotificationPermisionStatus(false))
        }
    }

    const UnAssignFcmToken = async () => {

        let fcmtoken = await AsyncStorage.getItem("fcmtoken")

        let data = {
            fcm_token: fcmtoken,
            device_type: Platform.OS
        }
        unAssignFcmToken(data).then((res) => {
            console.log(res?.data);
            console.log("FCM Token Removed");
            dispatch(NotificationPermisionStatus(false))
            ShowInfoMessage("Notification Disabled")

        }).catch(err => { return err; });

    }


    const Logout = async () => {
        dispatch(setLogOut());
        UnAssignFcmToken();
        // await AsyncStorage.removeItem("fcmtoken")
    }




    function renderItem({ item, index }) {
        return (
            <Pressable onPress={item.onPress} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.60, paddingTop: 20, paddingBottom: 5, paddingRight: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.3 }} >
                <View style={{ flexDirection: "row", paddingLeft: 15 }} >
                    <item.icon width={width / 15} height={width / 15} />
                    <Text style={{ fontSize: 16, fontFamily: fonts.PoppinsRegular, color: colors.black, paddingHorizontal: 10 }} >{item.title}</Text>
                </View>
                {item.title == "Notification" ? <SwitchBar onPress={() => ChangeNotificationStaus()} status={notificationPermisson} size={25} /> :
                item?.data ? <Text style={{color:colors.lightGreen,fontFamily:fonts.PoppinsMedium}} >{item?.data}</Text> :<ArrowForwardIcon width={width / 20} height={width / 30} /> }
            </Pressable>
        )
    }

    return (
        <View style={styles.container} >
            <View style={{ marginTop: width / 15 }} >
            {/* <Image style={{width:width/3,height:width/3,resizeMode:"contain"}} source={Images.logo} /> */}

                <SingtelLogoIcon width={width / 2.50} height={width / 3} />
            </View>
            <View style={{minHeight:height/2,maxHeight:height/1.50}} >
                <FlatList
                    style={{ marginTop: width / 15}}
                    data={data.filter((data) => data.isEnable == true)}
                    keyExtractor={item => item.title}
                    renderItem={renderItem} />
            </View>

            <View style={{ width: width / 1.60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }} >
                <Text style={{ color: colors.gray, fontFamily: fonts.PoppinsRegular, fontSize: 11 }} >Version {DeviceInfo.getVersion()} ({DeviceInfo.getBuildNumber()})</Text>
                <View>
                    {/* <Text style={{ color: colors.gray, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Last updated at</Text> */}
                    {/* <Text style={{ color: colors.gray, fontFamily: fonts.PoppinsRegular, fontSize: 11 }} >{moment.utc(homeData?.user?.last_login).local().s tartOf('seconds').fromNow()}</Text> */}
                </View>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width / 1.60, height: height, paddingBottom: 50, alignItems: "center"
    },
    imgContainer: { marginVertical: 50 },
    titleContainer: { width: width / 1.30, height: height / 19, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomColor: colors.lightWhite, borderBottomWidth: 1 },
    titleText: { color: colors.textColor }

})
export default CustomDrawer;      