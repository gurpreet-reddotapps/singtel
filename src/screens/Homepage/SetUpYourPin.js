import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable, SafeAreaView, Modal, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { assignFcmToken, ForgotPasswordRequest, ForgotPasswordVerify, getHomeDetails, login } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { BigfootLogoIcon, EmailIcon, KeyIcon, LockIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import CustomTextInput from '../../component/CustomTextInput';
import { setHomeData, setUserCheckInStatus } from '../../redux/actions/Home';
import { setLogOut, storeUserDetails } from '../../redux/actions/users';
import DeviceInfo from 'react-native-device-info';
import routes from '../../routes/routes';
import Images from '../../assects/Images';

const SetUpYourPinScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSend, setOtpSend] = useState(false);
    const [otp, setOtp] = useState("");
    const [pin, setPin] = useState("");
    const [cnfPin, setCnfPin] = useState("");
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    const dispatch = useDispatch();

    function verifyOtp() {
        if(pin==cnfPin){
            const data = {
                email: user?.user?.email,
                otp:otp,
                password:pin
            }
            ForgotPasswordVerify(data).then((res) => {
                if(res?.data?.success){
                    Logout()
                    ShowSuccessMessage("Pin setup successfully")
                }else{
                    ShowErrorMessage(res?.data?.msg)
                }
            })
        }
        else{
            ShowErrorMessage("Pin not match")
        }
       
    }
    const Logout = async () => {
        dispatch(setLogOut());
        // await AsyncStorage.removeItem("fcmtoken")
    }

    function sendOtp() {
        const data = {
            email: user?.user?.email
        }
        ForgotPasswordRequest(data).then((res) => {
            console.log("SDSDSDSD",res.data)

            if (res.data.success) {
                setOtpSend(true)
            }
        })
    }

    function VerifyEmail() {
        return (
            <View style={{ alignItems: "center" }} >
                <Text style={styles.text2}>Setup  your new PIN</Text>
                <CustomTextInput editable={false} onChangeText={(text) => setEmail(text)} Icon={EmailIcon} value={user.user.email} placeholder={"Otp"} />
                <Text style={styles.forgotPassword}></Text>
                <CustomButton onPress={() => sendOtp()} title={"Send Otp"} />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView   behavior="position" >
            <Pressable style={{alignSelf:"center"}}  >
                {/* <BigfootLogoIcon width={width / 2} height={width / 2.79} /> */}
                <Image style={{ width: width / 2, height: width / 2 }} source={Images.logo} />
            </Pressable>
            {!otpSend ? <VerifyEmail /> :

                <View style={{ alignItems: "center" }} >
                    <Text style={styles.text2}>Setup  your new PIN</Text>
                    <CustomTextInput keyboardType="numeric" maxLength={6}  onChangeText={(text) => setOtp(text)} Icon={KeyIcon} placeholder={"Otp"} />
                    <CustomTextInput keyboardType="numeric" maxLength={4} onChangeText={(text) => setPin(text)} Icon={EmailIcon} placeholder={"4 Digit PIN"} />
                    <CustomTextInput keyboardType="numeric" maxLength={4} onChangeText={(text) => setCnfPin(text)} Icon={LockIcon} placeholder={"Confirm 4 Digit PIN "} />
                    <Text style={styles.forgotPassword}></Text>
                    <CustomButton onPress={() => verifyOtp()} title={"Save"} />
                </View>}
            <View style={{ flex: 1 }} />

            <LoaderComponet visible={loading} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", backgroundColor: colors.white, paddingVertical: width / 15 },
    text1: { fontFamily: fonts.PoppinsMedium, color: colors.placeHolderTextColor, fontSize: 16, marginTop: 10 },
    text2: { fontFamily: fonts.PoppinsMedium, color: colors.black, marginTop: width / 7, marginBottom: width / 7 },
    forgotPassword: { width: width / 1.10, fontFamily: fonts.PoppinsMedium, color: colors.transPrimary60, textAlign: "right", marginBottom: width / 20, fontSize: 10 }
})
export default SetUpYourPinScreen;