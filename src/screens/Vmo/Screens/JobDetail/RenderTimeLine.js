import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import Images from '../../assets/Images';
// import { TimeLineAPI } from '../../api';
import moment from 'moment'
import { TimelineEightSVG, TimelineElevenSVG, TimelineFiveSVG, TimelineFouSVG, TimelineNineSVG, TimelineSevenSVG, TimelineSixSVG, TimelineTenSVG, TimelineThirteenSVG, TimelineTwellveSVG, TimlineOneSVG, TimlineThreeSVG, TimlineTwoSVG } from '../../assets/Icons';
import Timeline from 'react-native-timeline-flatlist'


const RenderTimeLine = (props) => {


    const StepTitle = [
        {
            id: '1',
            title: 'Service Scheduled',
            time: props?.TimeLine?.service_scheduled?.time,
            date: (moment(props?.TimeLine?.service_scheduled?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.service_scheduled?.date).format('DD MMM YYYY')),
            image: TimlineOneSVG,
        },
        {
            id: '2',
            title: 'Quote Created',
            time: props?.TimeLine?.quote_created?.time,
            date: (moment(props?.TimeLine?.quote_created?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.quote_created?.date).format('DD MMM YYYY')),
            image: TimlineTwoSVG,
        },
        {
            id: '3',
            title: 'Quotation Approved Internally',
            time: props?.TimeLine?.quotation_approved_internally?.time,
            date: (moment(props?.TimeLine?.quotation_approved_internally?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.quotation_approved_internally?.date).format('DD MMM YYYY')),
            image: TimlineThreeSVG,
        },
        {
            id: '4',
            title: 'Assigned to Workshop',
            time: props?.TimeLine?.vehicle_in_workshop?.time,
            date: (moment(props?.TimeLine?.vehicle_in_workshop?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.vehicle_in_workshop?.date).format('DD MMM YYYY')),
            image: TimelineFouSVG,
        },
        {
            id: '5',
            title: 'Material Requested',
            time: props?.TimeLine?.material_requested?.time,
            date: (moment(props?.TimeLine?.material_requested?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.material_requested?.date).format('DD MMM YYYY')),
            image: TimelineFiveSVG,
        },
        {
            id: '6',
            title: 'Material Collected',
            time: props?.TimeLine?.material_collected?.time,
            date: (moment(props?.TimeLine?.material_collected?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.material_collected?.date).format('DD MMM YYYY')),
            image: TimelineSixSVG,
        },
        {
            id: '7',
            title: 'Repair Complete',
            time: props?.TimeLine?.repair_complete?.time,
            date: (moment(props?.TimeLine?.repair_complete?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.repair_complete?.date).format('DD MMM YYYY')),
            image: TimelineSevenSVG,
        },
        {
            id: '8',
            title: 'Vehicle in Quality Control',
            time: props?.TimeLine?.vehicle_in_quality_control?.time,
            date: (moment(props?.TimeLine?.vehicle_in_quality_control?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.vehicle_in_quality_control?.date).format('DD MMM YYYY')),
            image: TimelineEightSVG,
        },
        {
            id: '9',
            title: 'Vehicle Quality Control Complete',
            time: props?.TimeLine?.vehicle_quality_control_complete?.time,
            date: (moment(props?.TimeLine?.vehicle_quality_control_complete?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.vehicle_quality_control_complete?.date).format('DD MMM YYYY')),
            image: TimelineNineSVG,
        },
        {
            id: '10',
            title: 'Vehicle in Wash queue',
            time: props?.TimeLine?.vehicle_in_wash_queue?.time,
            date: (moment(props?.TimeLine?.vehicle_in_wash_queue?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.vehicle_in_wash_queue?.date).format('DD MMM YYYY')),
            image: TimelineTenSVG,
        },
        {
            id: '11',
            title: 'Wash Completed',
            time: props?.TimeLine?.wash_completed?.time,
            date: (moment(props?.TimeLine?.wash_completed?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.wash_completed?.date).format('DD MMM YYYY')),
            image: TimelineTenSVG,
        },
        {
            id: '12',
            title: 'Invoice & Discharge Voucher Generated ',
            time: props?.TimeLine?.invoice_discharge_voucher_generated?.time,
            date: (moment(props?.TimeLine?.invoice_discharge_voucher_generated?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.invoice_discharge_voucher_generated?.date).format('DD MMM YYYY')),
            image: TimelineTwellveSVG,
        },
        {
            id: '13',
            title: 'Delivered',
            time: props?.TimeLine?.delivered?.time,
            date: (moment(props?.TimeLine?.delivered?.date).format('DD MMM YYYY') === "Invalid date" ? "Pending" : moment(props?.TimeLine?.delivered?.date).format('DD MMM YYYY')),
            image: TimelineThirteenSVG,
        },
    ]

    function getIndex(id) {
        return StepTitle.findIndex(obj => obj.id === id);
    }

    return (
        <View>
            <View style={styles.RowTimeLineWrapper}>
                {
                    StepTitle.map((item, i, StepTitle) => (
                        <View style={styles.RowStepAndTitleWrap} key={i}>
                            <View style={styles.RowTimeLine} >
                                {getIndex(item?.id) === props?.TimelineStatus ?
                                    <View style={styles.RowTimeLineCircleOngoing} key={i}>
                                        <item.image height={18} width={18} />
                                    </View>
                                    :
                                    getIndex(item?.id) > props.TimelineStatus ?
                                        <View style={styles.RowTimeLineCircleIncomplete}>
                                            <item.image height={18} width={18} />
                                        </View>
                                        :
                                        <View style={styles.RowTimeLineCircleCompleted}>
                                            <item.image height={18} width={18} />
                                        </View>
                                }
                                {StepTitle.length - 1 === i ?
                                    null :
                                    <View style={styles.FirstRowDownLine}></View>
                                }
                            </View>
                            <View style={styles.RowTimeLineSteps}>
                                <View style={styles.RowNameAndTIme} key={i}>
                                    <Text style={styles.TimeLineItemTitle}>{item.title}</Text>
                                    {item.date == "Pending" ? null
                                        :
                                        <Text style={styles.DateAndTime}>{item.time}</Text>
                                    }
                                </View>
                                <Text style={styles.DateAndTime}>{item.date}</Text>
                                {StepTitle.length - 1 === i ?
                                    null :
                                    <View style={styles.RowBottomLine}></View>
                                }
                            </View>
                        </View>
                    ))
                }
            </View>
        </View>

    )
}

export default RenderTimeLine

const styles = StyleSheet.create({

    RowTimeLineWrapper:
    {
        // border: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        paddingVertical: 10,
        // backgroundColor: "red",
    },
    TimeLineWrap:
    {
        marginVertical: 20,
    },

    RowStepAndTitleWrap:
    {
        flexDirection: 'row',
    },


    RowTimeLineSteps:
    {
        width: '80%',
        /* backgroundColor: red, */
        flexDirection: 'row',
        paddingBottom: 15,
        marginVertical: 2,
        // justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        // backgroundColor: "pink",
    },


    RowNameAndTIme:
    {
        width: '65%',
        minHeight: 40,
        justifyContent: 'center',
        alignSelf: 'center',
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

    RowTimeLine:
    {
        width: '20%',
        /* margin:2 , */
        // borderColor: '#fff',
        // borderWidth: 0.5,
        // backgroundColor: "yellow",
    },

    RowTimeLineCircle:
    {

        backgroundColor: '#B3B3B3',
        backgroundColor: 'red',
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
        backgroundColor: '#FFFFFF',
        // backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 14,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
        zIndex: 2,
        borderColor: '#B3B3B3',
        borderWidth: 1,
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
        // backgroundColor: "blue",
    },

    FirstRowDownLine:
    {

        backgroundColor: '#B3B3B3',
        // backgroundColor: '#000',
        height: "100%",
        // transform: [{ rotate: "90deg" }],
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        /* bottom: 30%, */
        width: 2,
        zIndex: -3,
        // content: '',
    },

    RowBottomLine:
    {

        backgroundColor: "#ddd",
        height: "2%",
        position: 'absolute',
        width: '100%',
        bottom: 2,
        // content: '',
    },

    RowStepTick:
    {

    },

})