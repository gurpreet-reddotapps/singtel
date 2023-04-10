import { View, Text, StyleSheet, FlatList, Pressable, ImageBackground, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import TabViewComponent from '../../Components/TabViewComponent'
import { colors } from '../../../../assects/colors'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { AllOrdersAPI, GetCompletedJobsAPI, OverDueAPI, UpComingAPI, WorkInProgressAPI } from '../../api'
import Spinner from '../../Components/Spinner';
import JobCardAdmin from '../../Components/Cards/JobCardAdmin';
import { useFocusEffect } from '@react-navigation/native';
import ImagePath from '../../Constant/ImagePath'
import AdminHomeSearch from './AdminSearch'
import AdminJobCard from '../../Components/Cards/AdminJobCard'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const SwipeHomeTabs = () => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [dataItem, setdataItem] = useState();
    const [cardLabel, setcardLabel] = useState();
    const [General, setGeneral] = useState();
    const [Accidental, setAccidental] = useState();
    const [Reporting, setReporting] = useState();
    const [Completed, setCompleted] = useState();
    const [loading, setloading] = useState(false);



    const allTheJobs = async () => {
        //Upcoming API
        setloading(true)
        let dataOne = { filters: "", page_index: "", page_size: "", search: "", sort_by_field: "", sort_by_type: "desc", type: 0 }
        let dataTwo = { filters: "", page_index: "", page_size: "", search: "", sort_by_field: "", sort_by_type: "desc", type: 1 }
        let dataThree = { filters: "", page_index: "", page_size: "", search: "", sort_by_field: "", sort_by_type: "desc", type: 2 }
        AllOrdersAPI(dataOne).then((res) => { setloading(true); setGeneral(res?.data?.all_orders?.data); setloading(false); }).catch(err => { setloading(false); return err; });
        AllOrdersAPI(dataTwo).then((res) => { setloading(true); setAccidental(res?.data?.all_orders?.data); setloading(false); }).catch(err => { setloading(false); return err; });
        AllOrdersAPI(dataThree).then((res) => { setloading(true); setReporting(res?.data?.all_orders?.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        allTheJobs()
    }, [])



    useFocusEffect(
        React.useCallback(() => {
            console.log("Here It First");
            allTheJobs()
            // return () => {
            // }
        }, [])
    );


    const emptySearch = () => {
        allTheJobs()
    }

    const propData = {
        setGeneral,
        setAccidental,
        setReporting,
        setloading,
    }

    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <AdminJobCard data={item} allTheJobs={allTheJobs} />
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



    const [TabData] = useState([{ key: "general", title: "General", data: "0", color: colors.progressColor },
    { key: "accidental", title: "Accidental", data: "0", color: colors.blue },
    { key: "reporting", title: "Reporting", data: "0", color: colors.blue },
    ])


    const GeneralView = () => {
        return (
            <>
                <FlatList
                    data={General}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }

    const AccidentalView = () => {
        return (
            <>
                <FlatList
                    data={Accidental}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={EmptyItem}
                />
            </>
        )
    }

    const ReportingView = () => {
        return (
            <>
                <FlatList
                    data={Reporting}
                    keyExtractor={(e, index) => index.toString()}
                    renderItem={renderItem}
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
            <AdminHomeSearch {...propData} emptySearch={emptySearch} />
            {loading === true ?
                <SkeletonPlaceholder  >
                    <ScrollView style={styles.ShadowStyle} >
                        <View style={styles.TabShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.ThirdShadow} />
                        <View style={styles.CircleAbso} />
                    </ScrollView>
                </SkeletonPlaceholder>
                :
                <TabViewComponent
                    Screens={{ general: GeneralView, accidental: AccidentalView, reporting: ReportingView }}
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


export default SwipeHomeTabs