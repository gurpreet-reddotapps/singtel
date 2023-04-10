import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, TextInput, StyleSheet, Modal, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import fonts from '../assects/fonts';
import { BackIcon, CloseIcon, EmailIcon, HideIcon } from '../assects/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

IconIonicons.loadFont()
const CustomTextInput = ({placeholder,Icon,onChangeText,secureTextEntry,value,editable,maxLength,keyboardType,showEye,leftIcon,onPressLeftIcon}) => {
   

    return (
        <View style={{ width: width / 1.10, height: width / 7.5,marginVertical:width/35, flexDirection: "row", backgroundColor: colors.white, borderWidth: 0.5, borderColor: colors.transPrimayColor, borderRadius: 10, overflow: "hidden" }} >
            <View style={{ width: width / 7.5, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                <Icon width={width / 18} height={width / 18} />
            </View>
            <TextInput keyboardType={keyboardType} maxLength={maxLength} editable={editable} value={value} secureTextEntry={secureTextEntry} onChangeText={onChangeText} style={{ flex: 1, paddingLeft: width / 17,color:colors.B212529 }} placeholder={placeholder} placeholderTextColor={colors.transBlack} />
           {showEye ? <Pressable onPress={onPressLeftIcon} style={{ width: width / 7.5, height: width / 7.5, alignItems: "center", justifyContent: "center", }} >
                <IconIonicons name={leftIcon} size={24} color={colors.transBlack}  width={width / 18} height={width / 18} />
            </Pressable> : null}
        </View>
    )
}

CustomTextInput.defaultProps={
    Icon:EmailIcon
}


export default CustomTextInput;
