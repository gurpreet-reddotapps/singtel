import { View, Text, ImageBackground, StyleSheet, Pressable, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Images from '../assets/Images'
import { windowHeight, windowWidth } from '../utils/Dimension'

import IoIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../Constant/Colors';
import fonts from '../../../assects/fonts';
import { GreenTickTocn, WhitePdfAVG } from '../assets/Icons';


const ImageHeader = (props) => {
    const navigation = useNavigation();
    console.log(props?.jobSingleData, "props?.jobSingleData")
    return (
        <ImageBackground source={props.jobSingleData.order_type == 0 ? Images.HeaderBack : Images.AccidentBack} style={styles.HeaderContainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            <View style={styles.HeaderWrapper} >
                <View style={styles.backAndHeading} >
                    <Pressable style={styles.backArrowStyle} onPress={() => navigation.goBack()} >
                        <IoIcon name="chevron-back" size={25} color="#FFFFFF" />
                    </Pressable>
                    <View style={styles.HeadingID} >
                        {props?.orderIDAdmin ?
                            <Text style={styles.HeadingText} >#{props?.orderIDAdmin}</Text>
                            :
                            <Text style={styles.HeadingText} >#{props?.jobSingleData?.order_id}</Text>
                        }
                    </View>
                </View>
                <View style={styles.DownStyling} >
                    <View style={styles.NameAndNumber} >
                        {props?.jobSingleData?.order_type == 0 ?
                            <Text style={styles.nameStyle} >General servicing & repairs</Text>
                            : props?.jobSingleData?.order_type == 1 ?
                            <Text style={styles.nameStyle} >Accidental claims</Text>
                            : null
                        }
                        <Text style={styles.subNameStyle} >VRN:{props?.jobSingleData?.vehicle_number}</Text>
                    </View>
                    <View style={styles.idWithIcon} >
                        <Text style={styles.DownID} >{props?.jobSingleData?.vehicle_category}</Text>
                    </View>
                    <View style={styles.IconStyle} >

                        {

                            props?.jobSingleData?.job_status == 0 ?
                                <Text style={styles.StatusTextUnCompleted} >Incomplete</Text>
                                :
                                <>
                                    <GreenTickTocn width={windowWidth / 30} height={windowHeight / 30} />
                                    <Text style={styles.StatusText} >Completed</Text>
                                </>
                        }
                        <TouchableOpacity style={styles.TextAndIconWhite} onPress={props?.OpenJObCard} >
                            <Text style={[styles.subNameStyleForWhite,]} >Download Job Card </Text>
                            <View style={styles.UpIcon} >
                                <WhitePdfAVG width={windowWidth / 20} height={windowHeight / 20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default ImageHeader

const styles = StyleSheet.create({
    HeaderContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        height: windowHeight / 3,
        paddingVertical: 10,
    },
    HeaderWrapper: {
        // backgroundColor: "red",
        width: '100%',
        height: '85%',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
    },
    backAndHeading: {
        marginTop: 10,
        // backgroundColor: "pink",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        height: '20%',
    },
    backArrowStyle: {
        // backgroundColor: 'purple',
        width: '10%',
    },
    HeadingID: {
        // backgroundColor: 'green',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        right: '60%',
    },
    HeadingText: {
        color: Colors.Pure_White,
        fontSize: 18,
        lineHeight: 27,
        fontFamily: fonts.PoppinsSemiBold,
    },
    DownStyling: {
        // backgroundColor: 'purple',
        paddingHorizontal: 5,
    },
    NameAndNumber: {
        // backgroundColor: 'green',
    },
    nameStyle: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
        textTransform: 'uppercase',
        paddingVertical: 5,
    },
    subNameStyle: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
        textTransform: 'uppercase',
        paddingVertical: 5,
    },
    idWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    IconStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    DownID: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: fonts.PoppinsMedium,
        color: Colors.Pure_White,
    },
    StatusTextUnCompleted: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: fonts.PoppinsSemiBold,
        // marginHorizontal: 5,
        color: '#FFA600',
    },
    StatusText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: fonts.PoppinsSemiBold,
        marginHorizontal: 5,
        color: '#27AE60',
    },
    TextAndIconWhite: {
        // backgroundColor: 'purple',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 15,
    },
    subNameStyleForWhite: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
        textTransform: 'uppercase',
        paddingVertical: 5,
        bottom: 1
    },
    UpIcon: {
        marginBottom: "3%",
    },
})