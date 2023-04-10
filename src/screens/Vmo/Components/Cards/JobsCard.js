import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'

import { useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { setJobId } from '../../../../redux/actions/Job'
import { ShowErrorMessage } from '../../../../component'



const JobsCard = (props) => {
    const [Status, setStatus] = useState('IP')
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const formattedStartDate = moment(props?.data?.start_time).format('DD-MM-YY')
    const formattedStartTime = moment(props?.data?.start_time).format('h:mm A')

    const formattedEndDate = moment(props?.data?.end_time).format('DD-MM-YY')
    const formattedEndTime = moment(props?.data?.end_time).format('h:mm A')

    const onPressHandler = async () => {
        dispatch(setJobId(props?.data?.job_id))
        if (props?.data?.job_id !== null) {
            navigation.navigate(NavigationString.JOB_DETAIL_SCREEN)
        }
        else {
            ShowErrorMessage("No More data found!")
        }
    }


    return (
        <Pressable style={styles.cardWrapper} activeOpacity={0.8} onPress={() => onPressHandler()} >
            <ImageBackground source={'OD' == props.jobStatus ? Images.OverDueUpperCard : 'IP' == props.jobStatus ? Images.inProgressupperCard : 'CO' == props.jobStatus ? Images.CheckOutUpperCard : null} style={styles.UpperCardArea} >
                {props?.data?.order_type === 0 ?
                    <Text style={styles.CardHeading} >General servicing  & Repairs</Text>
                    :
                    <Text style={styles.CardHeading} >Accidental claims</Text>
                }
                {/* <View style={styles.StatusView} >
                    <Text style={styles.CardStatus} >{'OD' == props.jobStatus ? "Overdue" : 'IP' == props.jobStatus ? "In Progress" : 'CO' == props.jobStatus ? "Check Out" : null}</Text>
                </View> */}
                <View style={styles.StatusView} >
                    <Text style={styles.CardStatus} >{props?.data?.order_id}</Text>
                </View>
            </ImageBackground>
            <View style={styles.JobDetail}>
                <View style={styles.JobDate} >
                    <View style={styles.StartDate} >
                        <View style={styles.upperText} >
                            <View style={styles.makeItrow} >
                                <View style={styles.TextForRow} >
                                    <Text style={styles.cardTextGrey} >Start Time</Text>
                                    <Text style={styles.cardTextBlack} >{formattedStartTime}</Text>
                                </View>
                                <View style={styles.LineForRow} >
                                    <Text style={styles.LineForRowText} >- - - - - - - - - - - - - </Text>
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
                        <Text style={styles.cardTextGrey}>End Time</Text>
                        <Text style={styles.cardTextBlack}>{formattedEndTime}</Text>
                    </View>
                    <View style={styles.DownText}>
                        <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                        <Text style={styles.cardTextBlack}>{props?.data?.category}</Text>
                    </View>
                </View>
            </View>
            {/* <View style={styles.semiCircle}>
            </View> */}
        </Pressable>
    )
}

export default JobsCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 10,
        margin: '2%',
        marginBottom: '5%',
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
    LineForRowText: {
        color: '#000',
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
})