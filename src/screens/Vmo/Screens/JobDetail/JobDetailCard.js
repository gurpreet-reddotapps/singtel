import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import ImageHeader from '../../Components/ImageHeader'
import fonts from '../../../../assects/fonts'
import { Colors } from '../../Constant/Colors'
import moment from 'moment'

// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
import NavigationCard from '../../Components/Cards/NavigationCard'
import CollapseiveCard from '../../Components/Cards/CollapseiveCard'
import * as Animatable from 'react-native-animatable';
import JobsCard from '../../Components/Cards/JobsCard'
import Timeline from 'react-native-timeline-flatlist';
import Images from '../../assets/Images'
import RenderTimeLine from './RenderTimeLine'
import NavigationString from '../../routes/NavigationString'
import { useSelector, useDispatch } from 'react-redux';
import { JobDetailAPI, TimeLineAPI } from '../../api'
import Spinner from '../../Components/Spinner'
import { windowHeight } from '../../utils/Dimension'
import { saveJobDetail, setOrderId, setOrderStatus } from '../../../../redux/actions/Job'

const JobDetailCard = (props) => {

    const [jobSingleData, setjobSingleData] = useState(false)
    const { jobId, orderId, } = useSelector(state => state.JobDetails);

    const formattedStartDate = moment(jobSingleData?.start_date).format('YY-MM-DD')

    const formattedEndDate = moment(jobSingleData?.end_time).format('YY-MM-DD')

    const formatedBookingDate = moment(jobSingleData?.booking_date).format('YY-MM-DD')


    const JobDetailFetch = (data) => {
        props?.setloading(true);
        JobDetailAPI(data).then((res) => {
            if (res?.data?.success === true) {
                props?.setloading(true);
                setjobSingleData(res?.data)
                // dispatch(saveJobDetail(res?.data, true))
                dispatch(setOrderId(res?.data?.order_id))
                dispatch(setOrderStatus(res?.data?.current_order_status))
                props?.setloading(false)
            } else {
                props?.setloading(true);
                showError('No job Found !');
                // dispatch(saveJobDetail(null, false))
                props?.setloading(false)
            }
            return res;
        }).catch(err => { props?.setloading(false); return err; });

    }

    useEffect(() => {
        JobDetailFetch({
            job_id: jobId,
        })
    }, [])


    return (
        <View>
            <View style={[styles.JobCenter]}>
                <View style={styles.JobDateCenter} >
                    <View style={[styles.upperTextCenter]}>
                        <Text style={styles.cardTextGrey} >Start Date</Text>
                        <Text style={styles.cardTextBlack} >{formattedStartDate}</Text>
                    </View>
                </View>
                <View style={styles.LineForRow} >
                    <Text>- - - - - - - - - - - - - - - </Text>
                </View>
                <View style={styles.JobOtherDetailCenter}>
                    <View style={[styles.upperTextCenter]}>
                        <Text style={styles.cardTextGrey}>End Date</Text>
                        <Text style={styles.cardTextBlack}>{formattedEndDate}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.BottomLine]}></View>
            <View style={styles.JobDetail}>
                <View style={styles.JobDate} >
                    <View style={styles.StartDate} >
                        <View style={styles.upperText} >
                            <Text style={styles.cardTextGrey} >Vehicle Registration No.</Text>
                            <Text style={styles.cardTextBlack} >{jobSingleData?.vehicle_number}</Text>
                        </View>
                    </View>
                    <View style={styles.DownText} >
                        <Text style={styles.cardTextGrey} >Booking date</Text>
                        <Text style={styles.cardTextBlack} >{formatedBookingDate}</Text>
                    </View>
                </View>
                <View style={styles.JobOtherDetail}>
                    <View style={styles.upperText}>
                        <Text style={styles.cardTextGrey}>Vehicle Type</Text>
                        <Text style={styles.cardTextBlack}>{jobSingleData?.vehicle_category}</Text>
                    </View>
                    <View style={styles.DownText}>
                        <Text style={styles.cardTextGrey}>Total amount</Text>
                        <Text style={styles.cardTextBlack}>SGD {jobSingleData?.amount}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.BottomLine]}></View>
            <View style={styles.DownCTA} >
                <Text style={styles.DownCTAText} >Add estimates</Text>
                <Text style={styles.DownCTATextRed} >Report job</Text>
            </View>
            <View style={styles.JobButtonArea} >
                <Pressable style={styles.JobButton}
                    bgColor={'#004A7F'}
                    // onPress={() => { startJobMethod() }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.JobButtonText} >
                        Start Job
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.JobButton}
                    bgColor={'#004A7F'}
                    // onPress={() => { EndJobMethod() }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.JobButtonText} >
                        End Job
                    </Text>
                </Pressable>

            </View>
        </View>
    )
}

export default JobDetailCard


const styles = StyleSheet.create({
    JobDetailContentWrapper: {
        // backgroundColor: 'yellow',
    },
    DownloadLink: {
        // backgroundColor: 'pink',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: '5%',
        marginVertical: '5%',
    },
    DownloadText: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.primary_Red,
        textDecorationLine: 'underline',
        paddingVertical: 5,
    },
    CollapsibleStyle: {
    },
    CollapsibleWrapper: {
    },
    // JobDetail Styling
    JobDetail: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        zIndex: 5,
    },
    JobCenter: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    BottomLine: {
        borderBottomColor: "#155B9F99",
        borderBottomWidth: 0.5,
        alignSelf: 'center',
        width: '85%',
    },
    JobDate: {
        justifyContent: 'space-between',
        width: '60%',
    },
    JobDateCenter: {
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    upperTextCenter: {
        paddingVertical: 10,
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
    DownCTA: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingVertical: '2%',
        // backgroundColor: 'red',
    },
    DownCTAText: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsSemiBold,
        color: '#155B9F',
        marginVertical: 8,
    },
    DownCTATextRed: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsSemiBold,
        color: '#AE282E',
        marginVertical: 8,
    },
    JobButtonArea: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        width: '100%',
        margin: 0,
        bottom: '-5%',
    },
    JobButton: {
        backgroundColor: "#155B9F",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: 'center',
        width: '35%',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    JobButtonText: {
        color: "#fff",
        fontFamily: fonts.PoppinsSemiBold,
        fontSize: 14,
    },
    timelineContainer: {
        borderBottomWidth: 1,
        borderColor: 'red',
        paddingHorizontal: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 10,
    },
    title: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    subTitle: {
        fontSize: 14,
        color: 'grey',
    },

    //TimeLine Styling

    RowTimeLineWrapper:
    {
        // border: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingVertical: 10,
    },

    RowStepAndTitleWrap:
    {
        flexDirection: 'row',
    },

    RowTimeLine:
    {
        width: '20 %',
        /* margin:2 , */
        /* backgroundColor: red, */
    },

    RowTimeLineSteps:
    {
        width: '80%',
        /* backgroundColor: red, */
        flexDirection: 'row',
        paddingBottom: 15,
        marginVertical: 2,
    },

    RowTimeLineCircle:
    {

        backgroundColor: '#B3B3B3',
        width: 25,
        height: 25,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },

    RowTimeLineCircleIncomplete:
    {

        backgroundColor: '#B3B3B3',
        width: 30,
        height: 30,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5 %',
        zIndex: 2,
    },

    RowTimeLineCircleCompleted:
    {

        backgroundColor: '#0DAF4B',
        width: 30,
        height: 30,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        zIndex: 2,
    },

    RowTimeLineCircleOngoing:
    {

        backgroundColor: '#FFA600',
        width: 30,
        height: 30,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        zIndex: 5,
    },


    RowNameAndTIme:
    {

        width: '65%',
    },

    TimeLineItemTitle:
    {

        color: '#000',
        fontSize: 15,
        fontWeight: "600",
    },

    DateAndTime:
    {

        color: "#777",
        fontSize: 15,
    },

    RowDownLine:
    {

        backgroundColor: '#B3B3B3',
        // backgroundColor: #000,
        height: 3,
        transform: [{ rotate: "90deg" }],
        /* position: absolute, */
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        /* bottom: 30%, */
        width: '121%',
        zIndex: -3,
        // content: '',
    },

    FirstRowDownLine:
    {

        backgroundColor: '#B3B3B3',
        backgroundColor: '#000',
        height: 3,
        transform: [{ rotate: "90deg" }],
        /* position: absolute, */
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        /* bottom: 30%, */
        width: '80%',
        zIndex: -3,
        // content: '',
    },

    RowBottomLine:
    {

        backgroundColor: "#ddd",
        height: "2%",
        position: 'absolute',
        width: '100%',
        // content: '',
    },

    RowStepTick:
    {

    },

})