import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import JobsDetailCard from '../../Components/Cards/JobsDetailCard';
import { AllOrdersAPI, CompletedJobsAPI, OverDueAPI, UpComingAPI, WorkInProgressAPI } from '../../api';
import { useEffect } from 'react';
import Spinner from '../../Components/Spinner';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import fonts from '../../../../assects/fonts';
import AdminJobCard from '../../Components/Cards/AdminJobCard';
import FloatingButton from '../../Components/FloatingButton';
import { useFocusEffect } from '@react-navigation/native';
import CustomSearch from '../../Components/CustomSeach';
import AdminHomeSearch from './AdminSearch';

const categoryList = ['General', 'Accidental', 'Reporting'];


const AdminHomeTabs = () => {

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

    useEffect(() => {
        showActiveData(0)
    }, [General || Accidental || Reporting])

    useFocusEffect(
        React.useCallback(() => {
            console.log("Here It First");
            allTheJobs()
            // return () => {
            // }
        }, [])
    );

    const showActiveData = (index) => {
        setSelectedCategoryIndex(index)
        console.log(index, "THIS ONE IS INEDX");
        if (index === 0) {
            setdataItem(General)
            setcardLabel("CO")
        } else if (index === 1) {
            setdataItem(Accidental)
            setcardLabel("IP")
        } else if (index === 2) {
            setdataItem(Reporting)
            setcardLabel("OD")
        }
    }



    const emptySearch = () => {
        allTheJobs()
    }



    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={style.itemContainer}>
                <View>
                    <AdminJobCard data={item} allTheJobs={allTheJobs} />
                </View>
            </View>
        );
    };

    const propData = {
        setReporting,
        setAccidental,
        setGeneral,
        setloading,
        emptySearch,
        setdataItem
    }

    return (
        <>
            <AdminHomeSearch {...propData} />
            <View style={style.JobCategoryWrapper}>
                <View horizontal style={style.categoryListContainer}>
                    <View style={style.HorizontalStyle} >
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
                    </View>
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

export default AdminHomeTabs


const style = StyleSheet.create({

    Wrapper: {
        flex: 1,
        zIndex: 4,
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