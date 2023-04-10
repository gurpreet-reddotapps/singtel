import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'

import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { setJobId, setOrderId } from '../../../../redux/actions/Job'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import BottomSheet from '../BottomSheet'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import RBSheet from "react-native-raw-bottom-sheet";
import { EditIcon, TrashIcon } from '../../assets/Icons'
import { DeleteReportingAPI } from '../../api'




const AdminJobCard = (props) => {
    const [Status, setStatus] = useState('IP')
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const refRBSheet = useRef();

    const formattedStartDate = moment(props?.data?.start_time).format('DD-MM-YY')

    const formattedEndDate = moment(props?.data?.end_time).format('DD-MM-YY')

    const onPressHandler = async () => {
        dispatch(setOrderId(props?.data?.id))
        if (props?.data?.id !== null) {
            navigation.navigate(NavigationString.ADMIN_JOB_DETAIL)
        }
        else {
            ShowErrorMessage("No More data found!")
        }
    }

    //For Reporting 

    const alertOnPress = (val) => {
        Alert.alert('Delete Item', 'Choose an option', [
            { text: 'Delete', onPress: () => sendIdForDeltion(val) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }


    const sendIdForDeltion = async (surveyID) => {
        console.log("Delete this", surveyID);

        let data = {
            order_id: props?.data?.id,
        }

        DeleteReportingAPI(data).then((res) => {
            ShowSuccessMessage("Deleted Successfully")
            refRBSheet.current.close()
            props.allTheJobs();
            return res;
        }).catch(err => { return err; });

        // let data = {
        //     survey_id: surveyID,
        // }
        // DeleteSurveyReportAPI(data).then((res) => {
        //     props.closeIt();
        //     console.log(res?.data);
        //     setDeleted(true);
        //     props.loadData();
        //     ShowSuccessMessage("Deleted Successfully")
        //     return res;
        // }).catch(err => { return err; });

    }



    const onPressHandlerForEdit = async () => {
        navigation.navigate(NavigationString.EDIT_REPORTING, { item: props?.data })
        refRBSheet.current.close();
    }


    return (
        <Pressable style={styles.cardWrapper} activeOpacity={0.8} onPress={() => { props?.data?.type == 2 ? refRBSheet.current.open() : onPressHandler() }} >
            <ImageBackground source={'OD' == props.jobStatus ? Images.OverDueUpperCard : 'IP' == props.jobStatus ? Images.inProgressupperCard : 'CO' == props.jobStatus ? Images.CheckOutUpperCard : null} style={styles.UpperCardArea} >
                {props?.data?.type === 0 ?
                    <Text style={styles.CardHeading} >General servicing  & Repairs</Text>
                    : props?.data?.type === 1 ?
                        <Text style={styles.CardHeading} >Accidental claims</Text>
                        : props?.data?.type === 2 ?
                            <Text style={styles.CardHeading} >Reporting</Text>
                            : null
                }
                <View style={styles.StatusView} >
                    <Text style={styles.CardStatus} >{props?.data?.id}</Text>
                </View>
            </ImageBackground>
            <View style={styles.JobDetail}>
                <View style={styles.JobDate} >
                    <View style={styles.StartDate} >
                        <View style={styles.upperText} >
                            <View style={styles.makeItrow} >
                                <View style={styles.TextForRow} >
                                    <Text style={styles.cardTextGrey} >Start Date</Text>
                                    <Text style={styles.cardTextBlack} >{formattedStartDate}</Text>
                                </View>
                                <View style={styles.LineForRow} >
                                    <Text>- - - - - - - - - - - - - - - </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.DownText} >
                        <Text style={styles.cardTextGrey} >Vehicle Registration No.</Text>
                        <Text style={styles.cardTextBlack} >{props?.data?.vehicle_number}</Text>
                    </View>
                </View>
                <View style={styles.JobOtherDetail}>
                    <View style={[styles.upperText]}>
                        <Text style={styles.cardTextGrey}>End Date</Text>
                        <Text style={styles.cardTextBlack}>{formattedEndDate}</Text>
                    </View>
                    <View style={styles.DownText}>
                        <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                        <Text style={styles.cardTextBlack}>{props?.data?.category}</Text>
                    </View>
                </View>
            </View>
            {/* <View style={styles.semiCircle}>
            </View> */}
            <RBSheet
                ref={refRBSheet}
                height={windowHeight / 4}
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
                <BottomSheet Heading={`Reporting ID #${props?.data?.id}`} CloseIT={() => refRBSheet.current.close()}
                    children={
                        <>
                            <View style={styles.TrashView} >
                                <Pressable style={styles.TileView} onPress={() => onPressHandlerForEdit()} >
                                    <View style={styles.IconArea} >
                                        <EditIcon width={windowWidth / 20} height={windowHeight / 20} />
                                    </View>
                                    <Text style={styles.TileText} >Edit</Text>
                                </Pressable>
                                <Pressable style={styles.TileView} onPress={() => alertOnPress(props?.data?.id)} >
                                    <View style={styles.IconArea} >
                                        <TrashIcon width={windowWidth / 20} height={windowHeight / 20} />
                                    </View>
                                    <Text style={styles.TileText} >Delete</Text>
                                </Pressable>
                            </View>
                        </>
                    }
                />
            </RBSheet>
        </Pressable>
    )
}

export default AdminJobCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        // marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: '2%',
        // marginBottom: '5%',
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
    UpperCardArea: {
        backgroundColor: '#FFA600',
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
        // backgroundColor: 'pink',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        zIndex: 5,
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
    TextColor: {
        fontSize: 15,
        paddingVertical: 5,
        color: '#000',
    }
})