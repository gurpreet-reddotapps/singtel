import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import JobsDetailCard from '../../Components/Cards/JobsDetailCard';
import { AllOrdersAPI, CompletedJobsAPI, GetCompletedJobsAPI, OverDueAPI, UpComingAPI, WorkInProgressAPI } from '../../api';
import { useEffect } from 'react';
import Spinner from '../../Components/Spinner';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import fonts from '../../../../assects/fonts';
import AdminJobCard from '../../Components/Cards/AdminJobCard';
import JobCardAdmin from '../../Components/Cards/JobCardAdmin';
import { useFocusEffect } from '@react-navigation/native';
import AdminJobSearch from './AdminJobSearch';

const categoryList = ['Upcoming', 'In Progress', 'Overdue', "Completed"];


const AdminJobsTab = () => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [dataItem, setdataItem] = useState();
    const [cardLabel, setcardLabel] = useState();
    const [General, setGeneral] = useState();
    const [Accidental, setAccidental] = useState();
    const [Reporting, setReporting] = useState();
    const [Completed, setCompleted] = useState();
    const [loading, setloading] = useState(false);
    const [upcomingData, setupcomingData] = useState();
    const [WorkInProgress, setWorkInProgress] = useState();
    const [overdue, setoverdue] = useState();



    const allTheJobs = async (data) => {
        //Upcoming API
        UpComingAPI(data).then((res) => { console.log(res?.data, "UP"); setloading(true); setupcomingData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        WorkInProgressAPI(data).then((res) => { console.log(res?.data, "WIP");; setloading(true); setWorkInProgress(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        OverDueAPI(data).then((res) => { console.log(res?.data, "OD");; setloading(true); setoverdue(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        GetCompletedJobsAPI(data).then((res) => { console.log(res?.data, "CJ");; setloading(true); setCompleted(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        setloading(true)
        allTheJobs({
            show_all_jobs: true,
            search: "",
        })
    }, [])

    useEffect(() => {
        showActiveData(0)
    }, [upcomingData || WorkInProgress || overdue || Completed])



    useFocusEffect(
        React.useCallback(() => {
            allTheJobs({
                show_all_jobs: true
            })
            showActiveData(0)
            // return () => {
            // }
        }, [])
    );



    const emptySearch = () => {
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
        emptySearch,
    }

    const showActiveData = (index) => {
        setSelectedCategoryIndex(index)
        console.log(index, "THIS ONE IS INEDX");
        if (index === 0) {
            setdataItem(upcomingData)
            setcardLabel("CO")
        } else if (index === 1) {
            setdataItem(WorkInProgress)
            setcardLabel("IP")
        } else if (index === 2) {
            setdataItem(overdue)
            setcardLabel("OD")
        } else if (index === 3) {
            setdataItem(Completed)
            setcardLabel("CD")
        }
    }


    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={style.itemContainer}>
                <View>
                    <JobCardAdmin data={item} />
                </View>
            </View>
        );
    };


    return (
        <>
            <AdminJobSearch {...propData} />
            <View style={style.JobCategoryWrapper}>
                <View horizontal style={style.categoryListContainer}>
                    <ScrollView horizontal style={style.HorizontalStyle} >
                        {categoryList.map((category, index) => (
                            <Pressable
                                onPress={() => showActiveData(index)}>
                                <View
                                    style={[
                                        style.categoryListView,
                                        index == selectedCategoryIndex && style.activeCategoryListView,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            style.categoryListText,
                                            index == selectedCategoryIndex && style.activeCategoryListText,
                                        ]}>
                                        {category}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {loading === true ? <Spinner style={{ height: '100%' }} />
                    :
                    <FlatList
                        data={dataItem}
                        keyExtractor={(e, index) => index.toString()}
                        renderItem={renderItem}
                    />
                }
            </View>
        </>
    )
}

export default AdminJobsTab


const style = StyleSheet.create({

    Wrapper: {
        flex: 1,
    },
    JobCategoryWrapper: {
        // paddingHorizontal: 15,
        flex: 1,
    },
    HorizontalStyle: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
    },
    categoryListContainer: {
        // alignSelf: 'center',
        flexDirection: 'row',
        // width: "100%",
        backgroundColor: "#FFFFFF",
        // height: "8%",
        height: windowHeight / 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    categoryListText: {
        borderRadius: 5,
        // width: "100%",
        // alignItems: 'center',
        // justifyContent: 'center',
        fontSize: 15,
        fontFamily: fonts.PoppinsRegular,
        textAlign: 'center',
        alignSelf: 'center',
        color: "#8C8C8C",

    },
    activeCategoryListText: {
        borderRadius: 5,
        // width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontFamily: fonts.PoppinsRegular,
        textAlign: 'center',
        color: "#FFFFFF",
    },
    midlleView: {
        width: "100%",
        borderRadius: 5,
        paddingHorizontal: " 7%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: "green",
    },
    activemidlleView: {
        height: "100%",
        width: "100%",
        backgroundColor: "#004A7F",
        borderRadius: 5,
        padding: "3%",
        paddingHorizontal: " 7%",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    itemContainer: {
        flexDirection: 'column',
        paddingVertical: 10,
    },
    categoryListView: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: windowWidth / 3.1,
        borderRadius: 5,
    },
    activeCategoryListView: {
        height: '100%',
        backgroundColor: "#004A7F",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 5,
    },
});