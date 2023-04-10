import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, TextInput, StyleSheet, Modal, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { width } from '../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import fonts from '../assects/fonts';
import { BackIcon, CloseIcon, EmailIcon, HideIcon } from '../assects/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const CustomButton = ({ title, onPress,style }) => {


    return (
        <Pressable onPress={onPress} accessibilityRole={"button"} style={[{ width: width / 1.10, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor, borderRadius: 10 },style]} >
            <Text style={{ color: colors.white, fontFamily: fonts.PoppinsRegular }} >{title}</Text>
        </Pressable>
    )
}




export default CustomButton;
