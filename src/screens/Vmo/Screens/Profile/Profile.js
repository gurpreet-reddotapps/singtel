import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/Images'
import OctIcon from 'react-native-vector-icons/Octicons';
import NavigationString from '../../routes/NavigationString'
import { UpdateProfileAPI } from '../../api'
import { ShowSuccessMessage } from '../../../../component'



const Profile = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setphone] = useState();
    const navigation = useNavigation()

    const updateProfile = async (data) => {
        UpdateProfileAPI(data).then((res) => {
            console.log(res?.data, "!!!!!!!!!!!");
            if (res?.data?.success === true) {
                ShowSuccessMessage("Profile Updated Successfully")
                navigation.navigate(NavigationString.SETTINGS_SCREEN)
            }
            return res;

        }).catch(err => { console.log(err, 'Error'); return err; });

    }

    return (
        <SafeAreaView style={styles.ProfileWrapper} >
            <VMOCustomHeader title={"My profile"} backIcon />
            <View style={styles.ProfileContentWrapper} >
                <View style={styles.ProfileImage} >
                    <TouchableOpacity style={styles.ImageCircleView} activeOpacity={0.7} >
                        <View style={styles.editView} >
                            <OctIcon name='pencil' size={20} color="#FFFFFF" style={styles.ArrowIcon} />
                        </View>
                        <Image source={Images.profilePic} style={styles.ImageStyling} />
                    </TouchableOpacity>
                </View>
                <View style={styles.ProfileInputArea} >
                    <Text style={styles.TextColor} >Name</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        onChangeText={userName => setName(userName)}
                        placeholder="Enter the name"
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    ></TextInput>
                    <Text style={styles.TextColor} >Email address</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        onChangeText={userEmail => setEmail(userEmail)}
                        placeholder="Enter the email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    ></TextInput>
                    <Text style={styles.TextColor} >Phone number</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        onChangeText={phoneNumber => setphone(phoneNumber)}
                        placeholder="Enter the phone"
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    ></TextInput>
                    {/* <Pressable onPress={() => navigation.navigate(NavigationString.UPDATEPASSWORD_SCREEN)} >
                        <Text style={styles.LinkText} >Update password</Text>
                    </Pressable> */}

                </View>
                <View style={styles.ProfileButton} >
                    <CustomButton title={"Save"} style={{ width: '100%' }} onPress={() => {
                        updateProfile({
                            name: name,
                            email: email,
                        });
                    }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Profile


const styles = StyleSheet.create({
    ProfileWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    ProfileContentWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 20,
    },
    ProfileImage: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    ProfileInputArea: {
        width: '100%',
        height: '70%',
    },
    ProfileButton: {
        width: '100%',
        height: '10%',
    },
    ImageStyling: {
        width: '100%',
        height: '100%',
        borderRadius: 500,
    },
    ImageCircleView: {
        width: '35%',
        height: '90%',
        borderRadius: 400,
        borderWidth: 5,
        borderColor: '#FFF',
        shadowColor: '#000',
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
    editView: {
        backgroundColor: '#505050',
        position: "absolute",
        right: '0%',
        width: '25%',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        zIndex: 5,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        // borderWidth: 2,
        // borderColor: "#FFFFFF",
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
    LinkText: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: fonts.PoppinsMedium,
        color: Colors.primary_Red,
        textDecorationLine: 'underline',
        paddingVertical: 5,
    },
})