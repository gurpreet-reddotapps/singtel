import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, Pressable, SafeAreaView, Modal, ScrollView, Platform, NativeModules } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { assignFcmToken, getHomeDetails, login } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { BigfootLogoIcon, EmailIcon, LockIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage, ShowInfoMessage, ShowSuccessMessage } from '../../component';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomTextInput';
import { setHomeData, setUserCheckInStatus } from '../../redux/actions/Home';
import { storeUserDetails } from '../../redux/actions/users';
import DeviceInfo from 'react-native-device-info';
import routes from '../../routes/routes';
import Images from '../../assects/Images';
import { setAppType } from '../../redux/actions/appSwitch';

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
   

    const { isStudent } = useSelector(state => state.appSwitch);
    console.log("SDSD", isStudent)

    const dispatch = useDispatch();

    const Login = () => {
        if (email && password) {
            setLoading(true)
            let formdata = JSON.stringify({
                email: email,
                password: password,
                cristophori: true
            })
            console.log("KDJKLADJKD", formdata)

            login(formdata).then(async (res) => {
                console.log("SNHASJKHKJA", res.data)
                if (res.data?.token) {
                    ShowSuccessMessage("Login Success")
                    await AsyncStorage.setItem('userToken', res.data.token.token).then((response) => {
                        dispatch(storeUserDetails(res.data))
                        getHomeDetails().then((res) => dispatch(setHomeData(res.data)));
                        SetFCM()
                        setLoading(false)
                    })
                }
                else { ShowErrorMessage(res?.data?.message), setLoading(false) }
            })
                .catch(err => { console.log("err", err), setLoading(false) })
        }
        else {
            ShowErrorMessage("All fields are mendotry")
        }
    }

    const SetFCM = async () => {

        let fcmtoken = await AsyncStorage.getItem("fcmtoken")

        let data = {
            fcm_token: fcmtoken,
            device_type: Platform.OS,
            app_version: DeviceInfo.getVersion()

        }

        assignFcmToken(data).then((res) => {
            // ShowInfoMessage(res.data.success)
            if (res?.data?.suc)
                console.log("FCM Token Saved", res.data);
        }).catch(err => { return err; });

    }

    return (
        <SafeAreaView style={styles.container} >
            <Pressable >
                {/* <BigfootLogoIcon width={width / 2} height={width / 2.79} /> */}
                <Image style={{ width: width / 2, height: width / 2, resizeMode: "contain" }} source={Images.logo} />

            </Pressable>
            <Text style={styles.text1}></Text>
            <Text style={styles.text2}>Login to your account</Text>
            <CustomTextInput onChangeText={(text) => setEmail(text)} Icon={EmailIcon} placeholder={"NRIC/FIN"} />
            <CustomTextInput secureTextEntry={!showPassword} onChangeText={(text) => setPassword(text)} Icon={LockIcon} placeholder={"Pin"} showEye leftIcon={!showPassword ? "eye" : "eye-off"} onPressLeftIcon={() => setShowPassword(!showPassword)} />
            <Text onPress={()=>navigation.navigate(routes.forgotPassowrd)} style={styles.forgotPassword}>Forgot password?</Text>

            {/* <View style={{ width: width, paddingLeft: 20, marginVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                <Pressable onPress={()=>dispatch(setAppType(!isStudent))} style={{ width: width / 3, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor:isStudent ? colors.secondryColor: colors.secondryMainColor, elevation: 2, borderRadius: 10 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color:isStudent ? colors.black: colors.white }} >Hrms</Text>
                </Pressable>

                <Pressable onPress={()=>dispatch(setAppType(!isStudent))}  style={{ width: width / 3, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor:isStudent ? colors.secondryMainColor: colors.secondryColor, elevation: 2, borderRadius: 10,marginLeft:15 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: isStudent ? colors.white : colors.black }} >Student</Text>
                </Pressable>
            </View> */}
            <CustomButton style={{ marginTop: 15 }} onPress={() => Login()} title={"Login"} />



            <View style={{ flex: 1 }} />

            <Text onPress={() => navigation.navigate(routes.contactSupprot)} style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12, textAlign: "center" }} >Facing problem logging into your account ?{'\n'} <Text style={{ color: colors.primaryColor, textDecorationLine: "underline", fontFamily: fonts.PoppinsMedium }} >Contact support</Text></Text>


            <LoaderComponet visible={loading} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: colors.white, paddingVertical: width / 15 },
    text1: { fontFamily: fonts.PoppinsMedium, color: colors.placeHolderTextColor, fontSize: 16, marginTop: 10 },
    text2: { fontFamily: fonts.PoppinsMedium, color: colors.black, marginTop: width / 10, marginBottom: 20 },
    forgotPassword: { width: width / 1.10, fontFamily: fonts.PoppinsMedium, color: colors.transPrimary60, textAlign: "right", marginBottom: width / 20, fontSize: 10 }
})
export default LoginScreen;