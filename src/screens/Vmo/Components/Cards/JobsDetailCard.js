import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import { setJobId } from '../../../../redux/actions/Job'
import { ShowErrorMessage } from '../../../../component'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import moment from 'moment'
import NavigationString from '../../routes/NavigationString'
import { DoubleArrowSVG } from '../../assets/Icons'



const JobsDetailCard = (props) => {
    const [Status, setStatus] = useState('IP')
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const formattedStartDate = moment(props?.dataItem?.start_time).format('DD-MM-YY')

    const formattedEndDate = moment(props?.dataItem?.end_time).format('DD-MM-YY')


    const onPressHandler = async () => {
        dispatch(setJobId(props?.dataItem?.job_id))
        if (props?.dataItem?.job_id !== null) {
            navigation.navigate(NavigationString.JOB_DETAIL_SCREEN)
        }
        else {
            ShowErrorMessage("No More data found!")
        }
    }

    return (
        <Pressable style={styles.cardWrapper} activeOpacity={0.9} onPress={() => onPressHandler()} >
            <ImageBackground borderTopRightRadius={10} borderTopLeftRadius={10} source={'OD' == props.jobStatus ? Images.OverDueUpperCard : 'IP' == props.jobStatus ? Images.inProgressupperCard : 'CO' == props.jobStatus ? Images.CheckOutUpperCard : 'CD' == props.jobStatus ? Images.lightGreen : null} style={styles.UpperCardArea} >
                {props?.dataItem?.order_type === 0 ?
                    <Text style={styles.CardHeading} >General servicing  & Repairs</Text>
                    :
                    <Text style={styles.CardHeading} >Accidental claims</Text>
                }
                {/* <View style={styles.StatusView} >
                    <Text style={styles.CardStatus} >{'OD' == props.jobStatus ? "Overdue" : 'IP' == props.jobStatus ? "In Progress" : 'CO' == props.jobStatus ? "Check Out" : 'CD' == props.jobStatus ? "Completed" : null}</Text>
                </View> */}
                <View style={styles.OrderStatusView} >
                    <Text style={styles.CardStatus} >{props?.dataItem?.order_id}</Text>
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
                        <Text style={styles.cardTextBlack} >{props?.dataItem?.vehicle_number}</Text>
                    </View>
                </View>
                <View style={styles.JobOtherDetail}>
                    <View style={[styles.upperText]}>
                        <Text style={styles.cardTextGrey}>End Date</Text>
                        <Text style={styles.cardTextBlack}>{formattedEndDate}</Text>
                    </View>
                    <View style={styles.DownText}>
                        <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                        <Text style={styles.cardTextBlack}>{props?.dataItem?.category}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomLine} />
            <View style={styles.seeDetail}  >
                <Text style={styles.seeDetailText} >See details </Text>
                <DoubleArrowSVG height={15} width={15} />
            </View>
        </Pressable>
    )
}

export default JobsDetailCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 15,
        margin: '2%',
        marginBottom: '2%',
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
        width: '70%',
    },
    StatusView: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        borderRadius: 5,
        width: '20%',
        alignItems: 'center',
    },
    OrderStatusView: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        borderRadius: 5,
        alignItems: 'center',
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
    bottomLine: {
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "rgba(38, 114, 171, 0.2)",
        borderBottomWidth: 1,
    },
    seeDetail: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2.5%',
        flexDirection: 'row',
    },
    seeDetailText: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#155B9F',
        fontSize: 14,
        lineHeight: 18,
        fontFamily: fonts.PoppinsMedium,
    },
})