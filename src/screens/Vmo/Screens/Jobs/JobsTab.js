import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import JobsDetailCard from '../../Components/Cards/JobsDetailCard';
import { CompletedJobsAPI, GetCompletedJobsAPI, OverDueAPI, UpComingAPI, WorkInProgressAPI } from '../../api';
import { useEffect } from 'react';
import Spinner from '../../Components/Spinner';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import fonts from '../../../../assects/fonts';

const categoryList = ['Upcoming', 'In Progress', 'Overdue', "Completed"];


const JobsTab = () => {

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
    const [dataItem, setdataItem] = useState();
    const [cardLabel, setcardLabel] = useState();
    const [upcomingData, setupcomingData] = useState();
    const [WorkInProgress, setWorkInProgress] = useState();
    const [overdue, setoverdue] = useState();
    const [Completed, setCompleted] = useState();
    const [loading, setloading] = useState(false);


    const allTheJobs = async (data) => {
        //Upcoming API
        UpComingAPI(data).then((res) => { setloading(true); setupcomingData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        WorkInProgressAPI(data).then((res) => { setloading(true); setWorkInProgress(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        OverDueAPI(data).then((res) => { setloading(true); setoverdue(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
        GetCompletedJobsAPI(data).then((res) => { setloading(true); setCompleted(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        allTheJobs({})
    }, [])

    useEffect(() => {
        showActiveData(0)
    }, [])

    useEffect(() => {
        showActiveData(0)
    }, [upcomingData || WorkInProgress || overdue || Completed])



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
                    <JobsDetailCard jobStatus={cardLabel} dataItem={item} />
                </View>
            </View>
        );
    };

    return (
        <View style={style.JobCategoryWrapper}>
            <View horizontal style={style.categoryListContainer}>
                <ScrollView horizontal style={style.HorizontalStyle} >
                    {categoryList.map((category, index) => (
                        <Pressable
                            onPress={() => showActiveData(index)}>
                            <View
                                // style={style.midlleView}
                                // style={[
                                //     style.midlleView,
                                //     index == selectedCategoryIndex && style.activemidlleView,
                                // ]}
                                style={[
                                    style.categoryListView,
                                    index == selectedCategoryIndex && style.activeCategoryListView,
                                ]}
                            >
                                {/* <Text>Nick HERE Nick HERENick HERE  ||||| </Text> */}
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
    )
}

export default JobsTab


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
        // flexDirection: 'row',
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