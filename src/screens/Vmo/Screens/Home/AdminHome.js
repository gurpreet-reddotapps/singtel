import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, TextInput, ImageBackground, Image, ScrollView, SafeAreaView } from 'react-native'

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { FloatingAction } from "react-native-floating-action";
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import VMOCustomHeader from '../../Components/VMOCustomHeader';
import ImagePath from '../../Constant/ImagePath';
import CustomSearch from '../../Components/CustomSeach';
import Images from '../../assets/Images';
import FloatingButton from '../../Components/FloatingButton';
import JobsCard from '../../Components/Cards/JobsCard';
import NavigationCard from '../../Components/Cards/NavigationCard';
import RNPickerSelect from 'react-native-picker-select';


import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString';
import { AdminHomeAPI, HomeJobData } from '../../api';
import Spinner from '../../Components/Spinner';
import DropDown, { Dropdown } from '../NewOrder/DropDown';
import { useSelector, useDispatch } from 'react-redux';
import HomeSearch from '../../Components/HomeSearch';
import AdminJobCard from '../../Components/Cards/AdminJobCard';
import CustomButton from '../../Components/CustomButton';
import { windowHeight } from '../../utils/Dimension';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



const AdminHome = () => {


    const [renderdata, setRenderData] = useState();
    const [DataLength, setDataLength] = useState();
    const [loading, setloading] = useState(false);
    const [HeaderDate, setHeaderDate] = useState();
    const navigation = useNavigation();
    const [ArrayData, setArray] = useState([{ title: "General servicing  & Repairs", status: "In progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#FFA600" },
    { title: "General servicing  & Repairs", status: "Overdue", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#FF6161" },
    { title: "General servicing  & Repairs", status: "in progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#1F8B88" },
    { title: "General servicing  & Repairs", status: "in progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#1F8B88" }]);

    const { homeData } = useSelector(state => state.homeDetails);


    const HomeAPI = (data) => {
        setloading(true)
        AdminHomeAPI(data).then((res) => { console.log(res?.data?.all_orders?.data); setRenderData(res?.data?.all_orders?.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        showDate()
        let data = {
            type: 0,
            search: "",
            page_index: 1,
            page_size: 100,
            sort_by_field: "",
            sort_by_type: "desc"
        }
        HomeAPI(data)
    }, [])


    const emptySearch = () => {
        showDate()
        let data = {
            type: 0,
            search: "",
            page_index: 1,
            page_size: 100,
            sort_by_field: "",
            sort_by_type: "desc"
        }
        HomeAPI(data)
    }

    useEffect(() => {
        setDataLength(renderdata?.length)
    }, [renderdata])


    useFocusEffect(
        React.useCallback(() => {
            showDate()
            let data = {
                type: 0,
                search: "",
                page_index: 1,
                page_size: 100,
                sort_by_field: "",
                sort_by_type: "desc"
            }
            HomeAPI(data)
            return () => {
                console.log("Here It Second");
            }
        }, [])
    );


    const allDate = new Date()
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const startDate = moment(allDate).format('YYYY-MM-DD')
    const endDate = moment(allDate).format('YYYY-MM-DD')
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    const SelectedDate = (year + '-' + month + '-' + date);

    const showDate = (formatDate) => {
        let date = moment(formatDate).format('DD');
        let day = moment(formatDate).format('ddd ');
        let month = moment(formatDate).format('MMM');
        let year = moment(formatDate).format('YYYY');
        let objForDate = {
            date: date,
            day: day,
            month: month,
            year: year,
        }
        setHeaderDate(objForDate)
    }


    const dateSelection = (date) => {
        let BothDate = moment(date).format('YYYY-MM-DD');
        let data = {
            start_date: BothDate,
            end_date: BothDate,
        }
        HomeAPI(data)
    }


    // Action Button 

    const actions = [
        {
            text: "Reporting only",
            icon: require("../../assets/Images/reportOnly.png"),
            name: "bt_accessibility",
            position: 1,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "Accidental claims",
            icon: Images.reportOnly,
            name: "bt_language",
            position: 2,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "General servicing & repair",
            icon: Images.claim,
            name: "bt_room",
            position: 3,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        }
    ];

    const renderDataFlatList = ({ item }) => (
        <>
            <AdminJobCard jobStatus={'IP'} data={item} />
        </>
    )


    return (
        <SafeAreaView style={styles.container} >
            <VMOCustomHeader title={"VMO"} menuIcon />
            <View style={styles.calenderWrapper} >
                <View style={styles.headerDateWrapper} >
                    <Text style={styles.DateText} >{HeaderDate?.date}</Text>
                    <View style={styles.subDateWrapper} >
                        <Text style={styles.yearDayText} >{HeaderDate?.day}</Text>
                        <Text style={styles.yearDayText} >{HeaderDate?.month} {HeaderDate?.year}</Text>
                    </View>
                </View>
                <View style={styles.CalenderArea} >
                    <CalendarStrip
                        scrollable={true}
                        startingDate={allDate}
                        selectedDate={allDate}
                        showMonth={false}
                        scrollToOnSetSelectedDate={true}
                        onDateSelected={(date) => { dateSelection(date); showDate(date) }}
                        highlightDateContainerStyle={{ backgroundColor: '#004A7F', shouldAllowFontScaling: false, width: '70%', borderRadius: 10 }}
                        highlightDateNameStyle={{ color: '#fff', }}
                        highlightDateNumberStyle={{ color: '#fff', }}
                        dayComponentHeight={60}
                        leftSelector={[]}
                        rightSelector={[]}
                        style={{ height: 100, justifyContent: 'center', shouldAllowFontScaling: true, }}
                        dayContainerStyle={{ borderRadius: 5, marginRight: 10, }}
                        calendarHeaderContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                        calendarHeaderStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}
                        dateNumberStyle={{ color: '#000', fontSize: 16, fontWeight: '600' }}
                        dateNameStyle={{ color: '#BCC1CD', fontSize: 12, fontWeight: '500' }}
                        iconContainer={{ backgroundColor: 'red', width: 0, height: 0 }}
                    />
                </View>
            </View>
            <HomeSearch Customwidth={'90%'} emptySearch={emptySearch} setloading={setloading} setRenderData={setRenderData} />
            <Text style={styles.JobsHeadTextArea} ><Text style={styles.JobsHeadText} >Orders</Text> ({DataLength} Orders available) </Text>
            <FloatingButton style={{ zIndex: 5, position: 'absolute' }} />
            {
                loading === true ?
                    <>
                        <SkeletonPlaceholder  >
                            <ScrollView style={styles.ShadowStyle} >
                                <View style={styles.ThirdShadow} />
                                <View style={styles.ThirdShadow} />
                                <View style={styles.ThirdShadow} />
                                <View style={styles.ThirdShadow} />
                                <View style={styles.ThirdShadow} />
                                <View style={styles.ThirdShadow} />
                            </ScrollView>
                        </SkeletonPlaceholder>
                    </>
                    :
                    <View>
                        <FlatList
                            data={renderdata}
                            keyExtractor={(e, index) => index.toString()}
                            renderItem={renderDataFlatList}
                            ListFooterComponent={<View style={styles.FlatBottom} />}
                        />
                    </View>


            }
        </SafeAreaView>
    )
}

export default AdminHome



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    Floatcontainer: {
        backgroundColor: Colors.Pure_White,
    },
    calenderWrapper: {
        width: '100%',
        height: '22%',
        borderBottomColor: "#155B9F99",
        borderBottomWidth: 0.5
    },
    CalenderArea: {
        width: '100%',
        height: '50%',
    },
    headerDateWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: '40%',
        paddingHorizontal: '5%',
        paddingTop: '2%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subDateWrapper: {
        justifyContent: 'flex-end',
        paddingHorizontal: '3%',
    },
    DateText: {
        color: Colors.secondary_Black,
        fontSize: 44,
        fontWeight: '500',
    },
    yearDayText: {
        color: '#155B9F66',
        fontSize: 14,
        fontWeight: '500',
    },
    totalJobSection: {
        padding: '2%',
        height: '60%',
    },
    JobsHeadTextArea: {
        fontFamily: fonts.PoppinsRegular,
        color: '#212529',
        marginLeft: 15,
        height: '5%',
    },
    JobsHeadText: {
        color: "#212529",
        fontFamily: fonts.PoppinsBold,
        fontSize: 18
    },
    imageBackgroundWrapper: {
        width: '50%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    ImageBackgroundStyle: {
        height: '80%',
        width: '100%',
        alignSelf: 'center'
    },
    FlatBottom: {
        paddingBottom: 150,
        height: windowHeight / 2,
    },
    ShadowStyle: {
        // alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        height: windowHeight,
        marginTop: '70%',
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
})