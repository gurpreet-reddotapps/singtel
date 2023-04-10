import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Animated, TextInput, StyleSheet, Modal, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { colors } from '../../../assects/colors';
// import Images from '../../../../assects/Images';
import { width } from '../../../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import fonts from '../../../assects/fonts';
import { ArrowBackIcon, ArrowBackWhiteIcon, BackIcon, CloseIcon, EmailIcon, HideIcon, MenuIcon } from '../../../assects/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MenuWhiteIcon } from '../../../assects/Icons/Vmo';
import { windowHeight, windowWidth } from '../utils/Dimension';

const VMOCustomHeader = ({ title, onPress, style, RightIcon, menuIcon, backIcon, checkIn, onPressBack }) => {
    const navigation = useNavigation();

    return (
        // <View style={styles.totalHeaderWraper} >
        <View style={[menuIcon || backIcon ? styles.HeaderViewWrapper : styles.HeaderViewWrapperCenter]} >
            {menuIcon ?
                <Pressable style={{ padding: 20, }} onPress={() => navigation.openDrawer()}  >
                    <MenuWhiteIcon width={width / 20} height={width / 20} />
                </Pressable> :
                backIcon ?
                    <Pressable style={{ padding: 20, }} onPress={() => navigation.goBack()} >
                        <ArrowBackWhiteIcon width={windowWidth / 40} height={windowHeight / 40} />
                    </Pressable> :
                    checkIn ?
                        <Pressable onPress={() => onPressBack()} >
                            <ArrowBackWhiteIcon width={windowWidth / 40} height={windowHeight / 40} />
                        </Pressable> :
                        null}
            <Text style={styles.headerMainText} >{title}</Text>
            {RightIcon ? <View>{RightIcon}</View> : <Text style={styles.rightIconStyle} ></Text>}
        </View>
        // </View>
    )
}




export default VMOCustomHeader;


const styles = StyleSheet.create({
    container: { backgroundColor: colors.white },
    totalHeaderWraper: {
        height: '8%',
    },
    HeaderViewWrapper: {
        width: '100%',
        height: windowHeight / 15,
        // height: '6%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.primaryColor,
        // paddingHorizontal: 15,
        // backgroundColor: 'red'
    },
    HeaderViewWrapperCenter: {
        width: '100%',
        // height: '6%',
        height: windowHeight / 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryColor,
        // paddingHorizontal: 15
    },
    HeaderText: {
        width: '20%',
        height: '20%',
    },
    headerMainText: {
        color: colors.white,
        fontFamily: fonts.PoppinsSemiBold,
        fontSize: 18,
        // paddingRight: -15,
        position: 'absolute',
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        width : '100%',
        zIndex: -2,
        // backgroundColor: 'red',
    },
    rightIconStyle: {
        width: width / 20,
        height: width / 20
    },
})