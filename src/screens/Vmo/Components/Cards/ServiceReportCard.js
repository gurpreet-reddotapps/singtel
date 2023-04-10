import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image } from 'react-native'
import React, { useRef } from 'react'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';

import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from '../BottomSheet';
import { windowHeight } from '../../utils/Dimension';
import moment from 'moment'
import SurveyBottomSheet from '../../Screens/SurveyDetail/SurveyBottomSheet';

const ServiceReportCard = (props) => {

    const formattedStartDate = moment(props?.item?.surveyor_time).format('DD/MM/YY, h:mm:ss a')

    const refRBSheet = useRef();
    const refreshListData = () => {
        console.log("Referese Load Data")
        props.loadData()
    }

    const onPressHandler = async () => {
        refRBSheet.current.open()
    }


    return (
        <>
            <Pressable style={styles.cardWrapper} activeOpacity={0.8} onPress={() => { props?.disableEdit == true ? {} : refRBSheet.current.open() }} >
                <ImageBackground source={Images.darkGreen} style={styles.UpperCardArea} >
                    <Text style={styles.CardHeading} >Survey ID #{props?.item?.id}</Text>
                </ImageBackground>
                <View style={styles.JobDetail}>
                    <View style={styles.upperArea} >
                        <View style={styles.upperTextStyle} >
                            <Text style={styles.cardTextGrey} >Survey date/time</Text>
                            <Text style={styles.cardTextBlack}  >{formattedStartDate}</Text>
                        </View>
                        <View style={styles.upperTextStyle} >
                            <Text style={styles.cardTextGrey} >Insurance Co</Text>
                            <Text style={styles.cardTextBlack} >{props?.item?.surveyor_company}</Text>
                        </View>
                    </View>
                    <View style={styles.upperArea} >
                        <View style={styles.upperTextStyle} >
                            <Text style={styles.cardTextGrey} >Approval type</Text>
                            <Text style={styles.cardTextBlack} >{props?.item?.approval_type}</Text>
                        </View>
                        <View style={styles.upperTextStyle} >
                            <Text style={styles.cardTextGrey} >Approval amount</Text>
                            <Text style={styles.cardTextBlack} >{props?.item?.approved_total}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
            <RBSheet
                ref={refRBSheet}
                height={windowHeight / 2.8}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'

                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    }
                }}
            >
                <BottomSheet Heading={`ID #${props?.item?.id}`} CloseIT={() => refRBSheet.current.close()}
                    children={
                        <>
                            <SurveyBottomSheet id={props?.item?.id} item={props?.item}
                                closeIt={() => refRBSheet.current.close()}
                                loadData={props.loadData}
                            />
                        </>
                    }
                />
            </RBSheet>
        </>
    )
}

export default ServiceReportCard



const styles = StyleSheet.create({
    MaterialWrapper: {
        flex: 1,
    },
    // NEW START
    upperArea: {
        flexDirection: 'row',
        // backgroundColor: 'red'
    },
    upperTextStyle: {
        width: "50%",
        paddingVertical: 5,
        // backgroundColor: 'yellow'
    },
    TextStyle: {
    },
    // NEW END 
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        // marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: '2%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    semiCircle: {
        backgroundColor: '#FFB326',
        position: 'absolute',
        height: '50%',
        width: '50%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderRadius: 500,
        right: '-12%',
        bottom: '26%',
        overflow: 'hidden',
        transform: [{ rotate: "90deg" }],
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        // right: '-20%',
        zIndex: 3,
    },
    validationstyle: {
        fontSize: 14,
        color: "red",
        fontFamily: fonts.PoppinsMedium,
    },
    UpperCardArea: {
        backgroundColor: '#1F8B88',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    EditBottom: {
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    StatusView: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        borderRadius: 5,

    },
    CardStatus: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
        color: Colors.Pure_White,
    },
    dashArea: {
        position: 'absolute',
        left: '40%',
        top: '10%',
    },
    makeItrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    LineForRow: {
        marginTop: '5%',
    },
    TextForRow: {
        maxWidth: '50%',
    },
    TextAndLine: {
        // flexDirection: 'row',
        paddingVertical: 5,
    },
    TextAndLine: {
        flexDirection: 'row',
    },
    JobDetail: {
        // flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        zIndex: 5,
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
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
    },
    JobDate: {
        justifyContent: 'space-between',
        width: '60%',
    },
    StartDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    upperText: {
        width: '95%',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    cardTextGrey: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: fonts.PoppinsRegular,
        color: '#777',
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
    },
    DownText: {
        marginVertical: 5,
        paddingHorizontal: 5,

    },
    JobOtherDetail: {
        justifyContent: "space-between",
        width: '40%',
    },
    TrashView: {
        width: '100%',
        height: '100%',
        padding: '2%',
        // backgroundColor: 'red',
    },
    TileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        paddingVertical: 10,
    },
    TileText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 19,
        color: "#155B9F",
        paddingHorizontal: 10,
        width: '80%',
    },
    IconArea: {
        width: '15%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
    },
    TrashView: {
        width: '100%',
        height: '100%',
        padding: '2%',
        // backgroundColor: 'red',
    },
    TileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        paddingVertical: 10,
    },
    TileText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 19,
        color: "#155B9F",
        paddingHorizontal: 10,
        width: '80%',
    },
    IconArea: {
        width: '15%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
    },
    TextColor: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000',
    }
})