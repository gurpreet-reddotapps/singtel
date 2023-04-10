import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StatusBar, Image, TouchableOpacity, Animated, TextInput, StyleSheet, Modal, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { colors } from '../assects/colors';
import Images from '../assects/Images';
import { hitSlop, width } from '../assects/strings';
import Icon from 'react-native-vector-icons/Ionicons';
import fonts from '../assects/fonts';
import { ArrowBackIcon, ArrowBackWhiteIcon, BackIcon, CloseIcon, EmailIcon, HideIcon, MenuIcon } from '../assects/Icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MenuWhiteIcon } from '../assects/Icons/Vmo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const CustomHeader = ({ title, onPress, style, RightIcon, menuIcon, backIcon, fontSize, LeftIcon, onLeftIconPress,onRightIconPress}) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    return (
        <View>
            <View style={{ height: insets.top, backgroundColor: colors.primaryColor }} >
                <StatusBar showHideTransition='fade' backgroundColor={colors.primaryColor} barStyle="light-content" />
            </View>
            <View style={{ width: width, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.primaryColor, paddingHorizontal: 15 }} >
                {menuIcon ?
                    <Pressable hitSlop={hitSlop} onPress={() => navigation.openDrawer()} >
                        <MenuWhiteIcon width={width / 20} height={width / 20} />
                    </Pressable> :
                    backIcon ?
                        <Pressable hitSlop={hitSlop} onPress={() => navigation.goBack()} >
                            <ArrowBackWhiteIcon width={width / 25} height={width / 25} />
                        </Pressable> :
                        LeftIcon ?
                            <Pressable hitSlop={hitSlop} onPress={onLeftIconPress} >
                                <LeftIcon width={width / 15} height={width / 15} />
                            </Pressable> :
                            <Text style={{ width: width / 20, height: width / 20 }} ></Text>}

                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsSemiBold, fontSize: fontSize ? fontSize : 18 }} >{title}</Text>
                {RightIcon ?
                    <Pressable  hitSlop={hitSlop} onPress={onRightIconPress} >
                        {RightIcon}
                    </Pressable>
                    :
                    <Text style={{ width: width / 20, height: width / 20 }} ></Text>}
            </View>
        </View>
    )
}




export default CustomHeader;
