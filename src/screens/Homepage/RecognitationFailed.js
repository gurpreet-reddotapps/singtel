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

const RecognitationFailed = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
   
    const dispatch = useDispatch();

   
    return (
        <SafeAreaView style={styles.container} >
           <Pressable onPress={()=>navigation.goBack()} style={{width:width,height:width,backgroundColor:'red'}} >

           </Pressable>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    text1: { fontFamily: fonts.PoppinsMedium, color: colors.placeHolderTextColor, fontSize: 16, marginTop: 10 },
    text2: { fontFamily: fonts.PoppinsMedium, color: colors.black, marginTop: width / 7, marginBottom: width / 7 },
    forgotPassword: { width: width / 1.10, fontFamily: fonts.PoppinsMedium, color: colors.transPrimary60, textAlign: "right", marginBottom: width / 20, fontSize: 10 }
})
export default RecognitationFailed;