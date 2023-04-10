import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import Images from '../../assets/Images'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { UpdatePasswordAPI } from '../../api';
import { ShowSuccessMessage } from '../../../../component';
import NavigationString from '../../routes/NavigationString';

const UpdatePass = () => {
    const [newPassword, setNewPassword] = useState()
    const navigation = useNavigation();



    const updatePassword = async (data) => {
        UpdatePasswordAPI(data).then((res) => {
            console.log(res?.data, "!!!!!!!!!!!");
            if (res?.data?.success === true) {
                ShowSuccessMessage("Password Updated Successfully")
                navigation.navigate(NavigationString.SETTINGS_SCREEN)
            }
            return res;

        }).catch(err => { return err; });


    };



    return (
        <SafeAreaView style={styles.UpdatePassWrapper} >
            <VMOCustomHeader title={"Update password"} backIcon />
            <View style={styles.UpdatePassContentWrapper} >
                <View style={styles.ImageStyle} >
                    <Image source={Images.UPpassword} />
                </View>
                <View style={styles.InputFeilds} >
                    <Text style={styles.TextColor} >New password</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        onChangeText={(pass) => setNewPassword(pass)}
                        placeholder="Enter the name"
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    ></TextInput>
                    <Text style={styles.TextColor} >Confirm password</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    ></TextInput>
                </View>
                <CustomButton title={"Save"} style={{ width: '100%' }} onPress={() =>
                    updatePassword({
                        password: newPassword,
                    })}
                />
            </View>
        </SafeAreaView>
    )
}

export default UpdatePass


const styles = StyleSheet.create({
    UpdatePassWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    UpdatePassContentWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    ImageStyle: {
        // backgroundColor: 'pink',
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    InputFeilds: {
        width: '100%',
        height: '50%',
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 20,
    },
    TextInputStyles: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#000',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,

    },
})