import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, Animated, Easing, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

// import Animated, {  EasingNode } from 'react-native-reanimated'
import AntIcon from 'react-native-vector-icons/AntDesign';
import Images from '../assets/Images';
import { windowHeight, windowWidth } from '../utils/Dimension';
import { useNavigation } from '@react-navigation/native';
import NavigationString from '../routes/NavigationString';
import fonts from '../../../assects/fonts';


const FloatingButton = (props) => {
    const [open, setopen] = useState(false)
    const navigation = useNavigation();

    const _rotate = useRef(new Animated.Value(0)).current;
    const rotate = _rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] })
    const animate = () => {
        _rotate.setValue(0)
        Animated.spring(_rotate, {
            toValue: open == true ? 0 : 1,
            useNativeDriver: true,
            bounciness: 0
        }).start();
    };

    const OpenCheck = () => {
        console.log(open, "VAL OF OPEN");
        if (open == false) {
            setopen(!open)
            animate()
        } else if (open == true) {
            setopen(!open)
            animate()
        }
    }

    const NavigateScreen = (val) => {
        if (val == "GENERAL") {
            OpenCheck()
            navigation.navigate(NavigationString.NEW_ORDER)
            return true
        } else if (val == "ACCIDENTAL") {
            navigation.navigate(NavigationString.NEW_ACCIDENTAL_CLAIM)
            OpenCheck()
            return true

        } else if (val == "REPORTING") {
            navigation.navigate(NavigationString.NEW_REPORTING)
            OpenCheck()
            return true

        } else {
            return false;
        }
    }



    return (
        <View style={[styles.FloatingWrapper,
        { backgroundColor: open ? '#00000055' : null, height: open === true ? windowHeight : "auto", bottom: open === false ? 10 : null },
        props.style]} >
            {
                open === true ?
                    <>

                        <TouchableWithoutFeedback onPress={() => NavigateScreen("REPORTING")}  >
                            <Animated.View style={[styles.FloatbuttonIcon, styles.secondary, styles.ActionButton]} >
                                <View style={styles.NameOFIcon} >
                                    <Text style={styles.ItemText} >Reporting only</Text>
                                </View>
                                <View style={styles.ImageWrapper} >
                                    <Image source={Images.reportOnly} style={styles.IconImage} resizeMode="contain" />
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => NavigateScreen("ACCIDENTAL")} >
                            <Animated.View style={[styles.FloatbuttonIcon, styles.secondary, styles.ActionButton]} >
                                <View style={styles.NameOFIcon} >
                                    <Text style={styles.ItemText} >Accidental claims</Text>
                                </View>
                                <View style={styles.ImageWrapper} >
                                    <Image source={Images.claim} style={styles.IconImage} resizeMode="contain" />
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => NavigateScreen("GENERAL")} >
                            <Animated.View style={[styles.FloatbuttonIcon, styles.secondary, styles.ActionButton]} >
                                <View style={styles.NameOFIcon} >
                                    <Text style={styles.ItemText} >General servicing & repair</Text>
                                </View>
                                <View style={styles.ImageWrapper} >
                                    <Image source={Images.serviceRepair} style={styles.IconImage} resizeMode="contain" />
                                </View>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </>

                    : null
            }



            <TouchableWithoutFeedback
                onPress={OpenCheck}
            >
                <Animated.View style={[styles.Floatbutton, styles.menu, { transform: [{ rotate }] }
                ]} >
                    <AntIcon name="plus" size={20} color="#FFFFFF" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FloatingButton


const styles = StyleSheet.create({
    FloatingWrapper: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        zIndex: 15,
        // height: windowHeight,
        // backgroundColor: 'red',
    },
    Floatbutton: {
        width: 45,
        height: 45,
        bottom: '12%',
        right: '5%',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        // position: 'absolute',
        shadowOffset: { height: 10 },
    },
    FloatbuttonIcon: {
        width: '85%',
        height: windowHeight / 10,
        bottom: '25%',
        // position: 'absolute',
        right: '20%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        shadowRadius: 10,
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        marginHorizontal: '-15%',
        // marginVertical: '3%',
        // borderWidth: 5,
        // backgroundColor: 'pink',
    },
    menu: {
        backgroundColor: "#155B9F",

    },
    NameOFIcon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // width: '70%',
    },
    ItemText: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 1.5,
        elevation: 8,
        fontFamily: fonts.PoppinsMedium,
        fontSize: 14,
        color: "#000",
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 13 },

    },
    ImageWrapper: {
        width: '25%',
        height: '65%',
        shadowColor: '#000',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 13 },

    },
    IconImage: {
        height: '100%',
        width: '100%',
    },
    ActionButton: {
        flexDirection: 'row',
        // backgroundColor: 'green',
        right: '10%',
    },
})
