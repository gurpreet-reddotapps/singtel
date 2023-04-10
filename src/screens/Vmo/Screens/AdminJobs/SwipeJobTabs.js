import { View, Text, StyleSheet, FlatList, Pressable, ImageBackground, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import TabViewComponent from '../../Components/TabViewComponent'
import { colors } from '../../../../assects/colors'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { GetCompletedJobsAPI, OverDueAPI, UpComingAPI, WorkInProgressAPI } from '../../api'
import Spinner from '../../Components/Spinner';
import JobCardAdmin from '../../Components/Cards/JobCardAdmin';
import { useFocusEffect } from '@react-navigation/native';
import AdminJobSearch from './AdminJobSearch';
import ImagePath from '../../Constant/ImagePath'
import moment from 'moment';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const SwipeJobTabs = () => {


    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [dataItem, setdataItem] = useState();
    const [cardLabel, setcardLabel] = useState();
    const [loading, setloading] = useState(false);
    const [upcomingData, setupcomingData] = useState();
    const [WorkInProgress, setWorkInProgress] = useState();
    const [overdue, setoverdue] = useState();
    const [Completed, setCompleted] = useState();
    const [FilteredCompleted, setFilteredCompleted] = useState();


    const currentTime = new Date().toISOString();

    const allTheJobs = async (data) => {
        //Upcoming API
        UpComingAPI(data).then((res) => { console.log(res, "UP"); setloading(true); setupcomingData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        WorkInProgressAPI(data).then((res) => { setloading(true); setWorkInProgress(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        OverDueAPI(data).then((res) => { setloading(true); setoverdue(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        GetCompletedJobsAPI(data).then((res) => { setloading(true); setCompData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    const setCompData = (data) => {
        setCompleted(data);
        console.log("DATE !!!!!!!!!!!!!!!!!!");
        // var today = new Date();
        // let lastDate = new Date(new Date().setDate(today.getDate() - 30));
        // let ourFormatLast = moment(lastDate).format('dd/mm/yy'); 
        // const currentTime = new Date().toISOString();
        // console.log(data, "data?.start_time DATE !!!!!!!!!!!!!!!!!!");
        // const filteredJobs = data.filter((x) => x.end_time > lastDate);
        // console.log(filteredJobs, "lastDate !!!!!!!!!!!!!!!!!!");
        // setCompleted(filteredJobs);
    }

    useEffect(() => {
        setloading(true)
        allTheJobs({
            show_all_jobs: true,
            search: "",
        })
    }, [])


    // useFocusEffect(
    //     React.useCallback(() => {
    //         allTheJobs({
    //             show_all_jobs: true
    //         })
    //     }, [])
    // );



    const emptySearch = () => {
        console.log("Check");
        allTheJobs({
            show_all_jobs: true,
            search: "",
        })
    }

    const propData = {
        setupcomingData,
        setWorkInProgress,
        setoverdue,
        setCompleted,
        setloading,
        // emptySearch,
    }


    const UpComingList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobCardAdmin jobStatus={"CO"} data={item} />
                </View>
            </View>
        );
    };

    const InProgressList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobCardAdmin jobStatus={"IP"} data={item} />
                </View>
            </View>
        );
    };

    const OverDueList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobCardAdmin jobStatus={"OD"} data={item} />
                </View>
            </View>
        );
    };

    const CompletedList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobCardAdmin jobStatus={"CD"} data={item} />
                </View>
            </View>
        );
    };



    const EmptyItem = ({ item, index }) => {
        return (
            <View style={styles.imageBackgroundWrapper} >
                <View style={styles.ImageWrap} >
                    <ImageBackground source={ImagePath.home_gif} style={styles.ImageBackgroundStyle} height={windowHeight}  >
                    </ImageBackground>
                </View>
            </View>
        );
    };



    const [TabData] = useState([{ key: "Upcoming", title: "Upcoming", data: "0", color: colors.progressColor },
    { key: "InProgress", title: "In Progress", data: "0", color: colors.blue },
    { key: "Overdue", title: "Overdue", data: dataItem, color: colors.blue },
    { key: "completed", title: "Completed", data: dataItem, color: colors.blue },
    ])


    const UpcomingView = () => {
        return (
            <>
                <FlatList
                    data={upcomingData}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={UpComingList}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }

    const InProgressView = () => {
        return (
            <>
                <FlatList
                    data={WorkInProgress}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={InProgressList}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }

    const OverDueView = () => {
        return (
            <>
                <FlatList
                    data={overdue}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={OverDueList}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }

    const CompletedView = () => {
        return (
            <>
                <FlatList
                    data={Completed}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={CompletedList}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }


    const renderTabBar = (data) => {
        return (
            <View style={{ backgroundColor: "#FFFFFF", marginTop: 15, width: windowWidth / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 }} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: windowWidth / 3.30, height: windowWidth / 8, backgroundColor: data.navigationState.index == index ? "#155B9F" : "#FFFFFF",
                            borderTopLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            alignItems: "center",
                            justifyContent: "center",
                        }} >
                            <Text style={{ color: data.navigationState.index == index ? "#FFFFFF" : "#212529", fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                        </Pressable>
                    )
                }} />
            </View>
        )
    }


    return (
        <View style={styles.container} >
            <AdminJobSearch {...propData} emptySearch={emptySearch} />
            {/* <Pressable onPress={dateCheck} >
                <Text>Nick</Text>
            </Pressable> */}
            {loading === true ?
                <SkeletonPlaceholder  >
                    <ScrollView style={styles.ShadowStyle} >
                        <View style={styles.TabShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                    </ScrollView>
                </SkeletonPlaceholder>
                :
                <TabViewComponent
                    Screens={{ Upcoming: UpcomingView, InProgress: InProgressView, Overdue: OverDueView, completed: CompletedView }}
                    renderTabBar={renderTabBar}
                    TabRoutes={TabData} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    itemContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    imageBackgroundWrapper: {
        flex: 1,
        width: windowWidth,
        height: "50%",
        // zIndex: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        top: 10,
        // margin: '5%',
    },
    ImageWrap: {
        width: windowWidth,
        height: windowHeight / 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
    },
    ImageBackgroundStyle: {
        height: '85%',
        width: '85%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'flex-end'
    },
    ShadowStyle: {
        // alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        height: windowHeight,
        // marginTop: '70%',
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
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 140,
        borderRadius: 10,
    },
    TabShadow: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 50,
        borderRadius: 4,
    },
    CircleAbso: {
        width: 50,
        height: 50,
        position: 'absolute',
        justifyContent: 'flex-end',
        borderRadius: 50,
    },
})


export default SwipeJobTabs