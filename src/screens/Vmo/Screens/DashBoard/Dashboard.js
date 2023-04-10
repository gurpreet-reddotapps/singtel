import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, Image, FlatList, ImageBackground, } from 'react-native'
import React, { useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import DateInput from '../../Components/DateInput'
import DashBoardCard from '../../Components/Cards/DashBoardCard'
import { Checkbox } from 'react-native-paper';

import { Provider as PaperProvider } from 'react-native-paper';
import Images from '../../assets/Images'
import fonts from '../../../../assects/fonts'
import { width } from '../../../../assects/strings'
import { colors } from '../../../../assects/colors'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import DashBoardGraph from '../../Components/DashBoardGraph'
import { FetchDashboardAPI } from '../../api'
import Spinner from '../../Components/Spinner'
import moment from 'moment'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CustomCheckBox from '../../Components/CheckBox'

const Dashboard = () => {
    const [DashData, setDashData] = useState()
    const [START_DATE_PL, setSTART_DATE_PL] = useState();
    const [END_DATE_PL, setEND_DATE_PL] = useState();
    const [loading, setloading] = useState()

    const START_DATE = moment(new Date()).format('YYYY-MM-DD')
    const END_DATE = moment(new Date()).format('YYYY-MM-DD')

    const DashBoardData = (data) => {
        setloading(true)
        FetchDashboardAPI(data).then(async (res) => {
            setSTART_DATE_PL(data.start_date)
            setEND_DATE_PL(data.end_date)
            await res?.data && setDashData(res?.data)
            setloading(false)
            return res
        }).catch(err => { return err; });
    }

    useEffect(() => {
        DashBoardData({
            start_date: START_DATE,
            end_date: END_DATE,
        })
    }, [])


    const cardArray = [{ id: "0", percent: DashData?.jobs_overview?.jobs_completed, title: "Jobs Completed", progress: "", image: Images.jobsCompleted, request: "10" },
    { id: "1", percent: DashData?.jobs_overview?.jobs_assigned, title: "Jobs Assigned", progress: "", image: Images.jobsassigned, request: "10" },
    { id: "2", percent: DashData?.jobs_overview?.open_jobs, title: "Open Jobs", progress: "", image: Images.openjobs, request: "10" },
    { id: "3", percent: DashData?.jobs_overview?.jobs_completed_on_time, title: "Jobs completed on time", progress: "", image: Images.ontime, request: "10" },
    { id: "4", percent: DashData?.jobs_overview?.jobs_delayed, title: "Jobs Delayed", progress: "", image: Images.delayed, request: "10" },

    ]


    const RequestCards = ({ item, index }) => (

        <ImageBackground style={[styles.ImagBackStyle, { marginHorizontal: index == 0 ? 15 : 5 }]} source={item?.image} borderRadius={20} >
            <View style={styles.TextView} >
                <Text style={styles.HeadingTextPercents} >{item.percent}%</Text>
                <Text style={styles.HeadingText} >{item.title}</Text>
            </View>
        </ImageBackground>
    )

    return (
        <PaperProvider>
            <SafeAreaView style={styles.DashBoardWrapper}>
                <VMOCustomHeader menuIcon title={"VMO"} />
                {loading === true ?
                    <>
                        <SkeletonPlaceholder >
                            <View style={styles.ShadowStyle} >
                                {/* <View style={{ width: 120, height: 20, paddingHorizontal:"10%", borderRadius:10 }} /> */}
                                <View style={styles.DateTouchableShadow} />
                                <View style={styles.SecondShadow} />
                                <View style={styles.ThirdShadowView} >
                                    <View style={styles.ThirdShadow} />
                                    <View style={styles.ThirdShadow} />
                                    <View style={styles.ThirdShadow} />
                                </View>
                                <View style={styles.SecondShadow} />
                                <View style={styles.GraphShadow} />
                            </View>
                        </SkeletonPlaceholder>
                    </>
                    :
                    <View style={styles.DashBoardContentWrapper} >
                        <DateInput END_DATE_PL={END_DATE_PL} START_DATE_PL={START_DATE_PL} DashBoardData={DashBoardData} />
                        <View style={styles.JobsOverviewWrapper} >
                            <Text style={styles.JobOverVIewText} >Jobs Overview</Text>
                            <FlatList style={{ marginVertical: '5%', }} horizontal data={cardArray} renderItem={RequestCards} />
                        </View>
                        <View style={styles.GraphArea} >
                            <Text style={styles.VehiclesViewText} >Vehicles Serviced</Text>
                            <DashBoardGraph DashData={DashData}
                            />
                        </View>
                    </View>}
            </SafeAreaView>
        </PaperProvider>
    )
}

export default Dashboard


const styles = StyleSheet.create({
    DashBoardWrapper: {
        height: '100%',
        backgroundColor: Colors.Pure_White,
    },
    DashBoardContentWrapper: {
        flex: 1,
        // paddingHorizontal: '2%',
    },
    JobsOverviewWrapper: {
        // paddingHorizontal: '2%',
        // paddingVertical: '2%',
        borderBottomColor: "#155B9F99",
        borderBottomWidth: 0.5
    },
    GraphArea: {
        // backgroundColor: 'red',
    },
    scrollViewCardArea: {
        backgroundColor: 'skyblue',
        width: '100%',
        height: '85%',
        padding: '2%',
    },
    JobOverVIewText: {
        fontSize: 18,
        fontFamily: fonts.PoppinsSemiBold,
        lineHeight: 27,
        color: '#212529',
        paddingHorizontal: 15,
    },
    VehiclesViewText: {
        fontSize: 18,
        fontFamily: fonts.PoppinsSemiBold,
        lineHeight: 27,
        color: '#212529',
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    ImagBackStyle: {
        width: windowWidth / 3,
        height: windowWidth / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextView: {
        height: '60%',
        // backgroundColor: 'red',
    },
    HeadingText: {
        width: windowWidth / 4,
        fontFamily: fonts.PoppinsSemiBold,
        color: colors.white,
        fontSize: 14,
        paddingTop: 10,
    },
    HeadingTextPercents: {
        width: windowWidth / 4,
        fontFamily: fonts.PoppinsSemiBold,
        color: colors.white,
        fontSize: 24,
        paddingTop: 5,
        // lineHeight: 19,
    },
    ShadowStyle: {
        // alignItems: "center",
        // flex: 1,
        width: '90%',
        alignSelf: 'center',
        height: '100%',
        paddingHorizontal: 5,
    },
    DateTouchableShadow: {
        width: windowWidth / 1.1,
        alignSelf: 'center',
        height: windowHeight / 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    SecondShadow: {
        width: windowWidth / 2,
        marginTop: 20,
        justifyContent: 'flex-end',
        height: 25,
        borderRadius: 4,
    },
    ThirdShadowView: {
        flexDirection: 'row',
    },
    ThirdShadow: {
        width: windowWidth / 3,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 140,
        borderRadius: 10,
    },
    GraphShadow: {
        width: windowWidth / 1.2,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: windowHeight / 4,
        borderRadius: 10,
    },
})