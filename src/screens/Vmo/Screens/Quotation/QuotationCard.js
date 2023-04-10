import { View, Text, StatusBar, StyleSheet, SafeAreaView, FlatList, Pressable, ImageBackground, Image } from 'react-native'
import React, { useRef } from 'react'
import Images from '../../assets/Images';
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';

import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from '../../Components/BottomSheet';
import QuoatationBottomSheet from './QuoatationBottomSheet';
import { windowHeight } from '../../utils/Dimension';

const QuotationCard = (props) => {

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
            <Pressable style={styles.FuelCardAreaNNT} onPress={onPressHandler} >
                <ImageBackground
                    source={props?.item?.status == "Approved" ? Images.darkGreen : Images.yellowBack}
                    style={[styles.UpperCardArea,
                    { backgroundColor: props?.item?.status == "Approved" ? '#1F8B88' : '#FFA600' }
                    ]} >
                    <View style={styles.EngineImageView} >
                        <Text style={styles.CardHeading} >Quotation ID #{props?.item?.id}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.CardWrapper} >
                    <View style={styles.JobDetails}>
                        <View style={styles.JobDateUp}>
                            <View style={styles.StartDate}>
                                <View styles={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Remarks</Text>
                                    <Text style={[styles.StatusText, { color: '#000', }]} >{props?.item?.remark}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.threeItem} >
                        <View style={styles.JobDetails}>
                            <View style={styles.JobDate}>
                                <View styles={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Created By</Text>
                                    <Text style={styles.cardTextBlack}>{props?.item?.created_by_name}</Text>
                                </View>
                            </View>
                            <View style={styles.JobDate}>
                                <View styles={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Status</Text>
                                    <Text style={styles.cardTextBlack} >{props?.item?.status}</Text>
                                </View>
                            </View>
                            <View style={styles.JobDate}>

                                <View styles={styles.UpperText}>
                                    <Text style={styles.cardTextGrey}>Amount</Text>
                                    <Text style={styles.cardTextBlack}>${props?.item?.price}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
            <RBSheet
                ref={refRBSheet}
                height={windowHeight / 2.4}
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
                            <QuoatationBottomSheet id={props?.item?.id}
                                statusVal={props?.item?.status}
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

export default QuotationCard



const styles = StyleSheet.create({
    MaterialWrapper: {
        flex: 1,
    },
    UpperCardArea: {
        backgroundColor: '#1F8B88',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    CardWrapper: {
    },
    threeItem: {
        justifyContent: 'space-evenly',
        // backgroundColor: 'red',
        // alignItems: 'center',
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    FuelCardAreaNNT: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: 15,
        overflow: "hidden",
        shadowColor: '#777777',
        shadowOpacity: 0.5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 50,
        shadowOpacity: 0.25,
    },
    MarginPaddingView: {
        paddingHorizontal: 10,
    },
    EngineImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    EngineImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    JobDetails: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        padding: 5,
        // backgroundColor: 'green',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    JobDateUp: {
        justifyContent: "space-between",
        alignItems: 'center',
    },
    JobDate: {
        justifyContent: "space-evenly",
        // alignItems: 'center',
        // backgroundColor: 'pink',
        // width: '33.33%',
    },
    StartDate: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    UpperText: {
        padding: 5,
    },
    cardTextGrey: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: fonts.PoppinsRegular,
        color: 'rgba(33, 37, 41, 0.6)',
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
    },
    CenterCardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        justifyContent: "center",
        fontFamily: fonts.PoppinsMedium,
        textAlign: 'center',
        color: '#000',

    },
    FuelCardText: {
        fontSize: 13,
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
    },
    StatusText: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 25,
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