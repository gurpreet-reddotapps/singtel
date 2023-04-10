import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Modal, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import Icon from 'react-native-vector-icons/FontAwesome';
import fonts from '../assects/fonts';
import { BackIcon, CheckmarkCloseIcon, CheckmarkGrayIcon, CheckmarkGreenIcon, ClockBadgeCheckmarkIcon, HideIcon, SearchIcon } from '../assects/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from 'react-native-flash-message';

export const SwitchBar = ({ status,onPress, style,size }) => {
    return (
    <Pressable style={{width:width/15,height:width/25,paddingHorizontal:1,alignItems:status?"flex-end":"flex-start",justifyContent:"center",borderRadius:100,backgroundColor:status?colors.primaryColor:colors.gray}} onPress={onPress} >
        <View style={{width:width/30,height:width/30,backgroundColor:colors.white,borderRadius:100}} />
    </Pressable>
    )

    
}


export const SearchBar = ({ placeholder, style }) => {
    return (
        <View style={[{ width: width / 1.10, height: width / 8, flexDirection: "row", alignItems: "center", marginVertical: 20, borderWidth: 1, borderColor: "#C6C6C6", backgroundColor: "#F1F1F1", borderRadius: 10, alignSelf: "center" }, style]} >
            <Pressable style={{ paddingHorizontal: 10 }} >
                <SearchIcon width={15} height={15} />
            </Pressable>
            <TextInput style={{ flex: 1 }} placeholder={placeholder} placeholderTextColor={colors.placeHolderTextColor} />
        </View>

    )
}
export const LinearGradientView = () => {
    return (
        <LinearGradient colors={['#FFFFFF', '#F2F2F2']} style={{ flex: 1 }}>

        </LinearGradient>
    )
}

export const TransparentButton = ({ title, onPress, style, fontSize, fontFamily }) => {
    return (
        <Pressable onPress={onPress} >
            <ImageBackground source={Images.btnBg} style={[{ width: width / 2, height: width / 10, alignItems: "center", justifyContent: "center" }, style]} resizeMode="contain" >
                <Text style={{ color: "#007AFF", fontFamily: fontFamily ? fontFamily : fonts.PoppinsRegular, fontSize: fontSize ? fontSize : 14 }} >{title}</Text>
            </ImageBackground>
        </Pressable>
    )
}

export const ButtonComponent = ({ onPress, title, opacity, bgColor, textColor, style, disabled }) => {
    return (
        <Pressable disabled={disabled} onPress={onPress} style={[{ width: width / 2.37, height: width / 7, elevation: 3, shadowOffset: { width: 0, height: 1 }, shadowColor: 'black', shadowOpacity: 0.3, alignItems: "center", justifyContent: "center", borderRadius: 15, backgroundColor: bgColor, opacity: opacity ? 0.7 : 1, marginVertical: 10 }, style]} >
            <Text style={{ color: textColor ? textColor : colors.white, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center" }} >{title}</Text>
        </Pressable>
    )
}
export const TextInputComponet = ({ close, hide, title, placeholder }) => {
    return (
        <View style={{ marginTop: 10, height: width / 5 }} >
            <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsLight, fontSize: 16 }} >{title}</Text>
            <View style={{ width: width / 1.20, height: width / 8, flexDirection: "row", alignItems: "flex-end", borderBottomColor: colors.placeHolderTextColor, borderBottomWidth: 0.5 }} >
                <TextInput style={{ flex: 1, fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.primaryColor }} placeholder={placeholder} />
                <Pressable style={{ marginBottom: 10 }} >
                    {hide ? <HideIcon width={15} height={15} /> : close ? <CloseIcon width={15} height={15} /> : null}
                </Pressable>
            </View>
        </View>
    )
}


export const LoaderComponet = ({ visible }) => {
    return (
        <Modal style={{ flex: 1 }} visible={visible} transparent >
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00000096" }} >
                <ActivityIndicator size={"large"} color={colors.primaryColor} />
            </View>
        </Modal>
    )
}



export function ShowErrorMessage(data) {
    console.log("DKSJDKLSD", data)
    showMessage({
        type: 'danger',
        icon: 'danger',
        message: data,
        duration: 1500

    })
}


export function ShowInfoMessage(data) {
    console.log("DKSJDKLSD", data)
    showMessage({
        type: 'info',
        icon: 'info',
        message: data,
        duration: 1500

    })
}





export function ShowSuccessMessage(data) {
    showMessage({
        type: 'success',
        icon: 'success',
        message: data
    })
}

export function SearchText({ data, searchText }) {
    let text = searchText.toLowerCase()
    let feed = data
    let filteredName = feed.filter((item) => {
        return item.title.toLowerCase().match(text)
    })
    if (!text || text === '') {
        return feeds;
    } else if (Array.isArray(filteredName)) {
        return filteredName
    }
}
