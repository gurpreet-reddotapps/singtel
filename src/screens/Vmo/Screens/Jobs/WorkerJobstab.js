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
// import AdminJobSearch from './AdminJobSearch';
import ImagePath from '../../Constant/ImagePath'
import JobSearch from './JobSearch'
import JobsDetailCard from '../../Components/Cards/JobsDetailCard'
import { useSelector, useDispatch } from 'react-redux';
import { setJobClose } from '../../../../redux/actions/Job'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";




const WorkerJobstab = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [dataItem, setdataItem] = useState();
    const [cardLabel, setcardLabel] = useState();
    const [upcomingData, setupcomingData] = useState();
    const [WorkInProgress, setWorkInProgress] = useState();
    const [overdue, setoverdue] = useState();
    const [Completed, setCompleted] = useState();
    const [loading, setloading] = useState(false);
    const { jobClosed } = useSelector(state => state.JobDetails);

    const dispatch = useDispatch();

    const allTheJobs = async (data) => {
        //Upcoming API
        UpComingAPI(data).then((res) => { console.log(res, "FOR ORDER ID"); setloading(true); setupcomingData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        WorkInProgressAPI(data).then((res) => { setloading(true); setWorkInProgress(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        OverDueAPI(data).then((res) => { console.log(res, "OVER DUE ALL RESPONSE"); setloading(true); setoverdue(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        GetCompletedJobsAPI(data).then((res) => { setloading(true); setCompleted(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    useFocusEffect(
        React.useCallback(() => {
            allTheJobs({})
            return () => console.log("AFTER");
        }, [])
    );


    useEffect(() => {
        allTheJobs({})
    }, [])

    useEffect(() => {
        if (jobClosed == true) {
            allTheJobs({})
            dispatch(setJobClose(false));
        }
    }, [])


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
    }


    const EmptyItem = () => {
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


    const UpComingList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobsDetailCard jobStatus={"CO"} dataItem={item} />
                </View>
            </View>
        );
    };

    const InProgressList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobsDetailCard jobStatus={"IP"} dataItem={item} />
                </View>
            </View>
        );
    };

    const OverDueList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobsDetailCard jobStatus={"OD"} dataItem={item} />
                </View>
            </View>
        );
    };

    const CompletedList = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <JobsDetailCard jobStatus={"CD"} dataItem={item} />
                </View>
            </View>
        );
    };


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


    const NavigateHandler = async (data, item) => {
        data.jumpTo(item.key);
        item.key == "Upcoming" ? setcardLabel("CO")
            : item.key == "InProgress" ? setcardLabel("IP")
                : item.key == "Overdue" ? setcardLabel("OD")
                    : item.key == "completed" ? setcardLabel("CD") :
                        null
    }


    const renderTabBar = (data) => {
        return (
            <View style={{ backgroundColor: "#FFFFFF", marginTop: 15, width: windowWidth / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 }} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => NavigateHandler(data, item)} style={{
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
            <JobSearch {...propData} emptySearch={emptySearch} />
            {loading == true ?
                <>
                    <SkeletonPlaceholder>
                        <ScrollView style={styles.ShadowStyle} >
                            <View style={styles.TabShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                        </ScrollView>
                    </SkeletonPlaceholder>
                </>
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
        paddingHorizontal: 5,
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
})


export default WorkerJobstab