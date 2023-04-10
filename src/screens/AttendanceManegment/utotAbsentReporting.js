import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput, Image, Linking } from 'react-native';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { LocationBlackIcon, SearchIconIcon } from '../../assects/Icons';
import { height, iosOpacity, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import CalendarStrip from 'react-native-calendar-strip';
import Images from '../../assects/Images';
import { IdCardBlueIcon, PhoneCallIcon, TeamsIcon } from '../../assects/Icons/attendance';
import { getTeamAttendance } from '../../api';
import moment from 'moment';

const UtOtAbsentReporting = ({ navigation, route }) => {
    const [index, setIndex] = React.useState(0);
    const [TabData] = useState([{ key: "ut", title: "Present List", data: "0", color: colors.progressColor },
    { key: "absent", title: "Absent List", data: "0", color: colors.blue },
    ])
    const [activeTab, setActiveTab] = useState(0);

    const [presentData, setPresentData] = useState([]);
    const [absentData, setAbsentData] = useState([]);


    useEffect(() => {
        fetchTeamAttendance(moment().format("YYYY-MM-DD"))
    }, [])

    function fetchTeamAttendance(date) {
        const data = {
            date: date
        }
        console.log("DHJ",date)
        getTeamAttendance(data).then((res) => {
            console.log("getTeamAttendance",res.data)
            setPresentData(res.data.present_data)
            setAbsentData(res.data.absent_data)

        })
    }

    const allDate = new Date()

    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, width: width / 1.15, elevation: 1, alignSelf: "center", borderRadius: 20 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    console.log("KDFJKSLD", index)
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: width / 2.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                            borderTopLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            alignItems: "center",
                            justifyContent: "center",

                        }} >
                            <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                        </Pressable>

                    )
                }} />
            </View>
        )
    }
    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 3, resizeMode: "contain" }} source={Images.no_record_found} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: 10 }} >No records found </Text>

            </View>
        )
    }


    function RenderUnderTimeData({ item }) {
        const start = moment(item.check_in_time);
        const end = moment(item.check_out_time);
        const diffrenceBetweenDates = moment.duration(end.diff(start));
        const shiftStartTime = moment("2022-07-25"+item.shift_start_time,"YYYY-MM-DD HH:mm:ss");
        const shiftEndTime = moment("2022-07-25"+item.shift_end_time,"YYYY-MM-DD HH:mm:ss");
        const shiftTimeDiff = moment.duration(shiftEndTime.diff(shiftStartTime)).asHours().toFixed(0)
        const time = item?.check_out_time ? diffrenceBetweenDates.asHours() < 1 ? 1 : diffrenceBetweenDates.asHours().toFixed(0): 1
        console.log("shiftTimeDiff",shiftTimeDiff)

        return (
            <View style={[{ width: width / 1.10, height: width / 2.60, flexDirection: "column", justifyContent: "space-evenly", paddingHorizontal: 5, borderRadius: 10, marginVertical: 15, backgroundColor: colors.white, elevation: 2 }, iosOpacity]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Image style={{ width: width / 10, height: width / 10, borderRadius: 100 }} source={{uri:item.profile_pic}} />
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, }} >{item.name}</Text>
                            <Text style={{ color: colors.transBlack60, fontSize: 10, fontFamily: fonts.PoppinsRegular, }} >{item.designation}</Text>
                        </View>
                    </View>
                    <View style={{ width: width / 2.4, flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 5 }} >
                        <View style={{ top: 2 }} >
                            {/* <LocationBlackIcon width={12} height={12} /> */}
                        </View>
                        <Text style={{ color: colors.B212529, fontSize: 11, paddingLeft: 5, fontFamily: fonts.PoppinsRegular, }} >{item.check_in_address}</Text>
                    </View>
                </View>
                <View style={{ width: width / 1.40, height: 5, marginTop: 5, backgroundColor: colors.DBDBDB, overflow: "hidden", alignSelf: "center", borderRadius: 20 }} >
                    <View style={{ width: (width / 1.40 / shiftTimeDiff==0?1:shiftTimeDiff) * time, height: 5, backgroundColor: item.is_late == 0 ? colors.green : colors.warningRed }} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10, marginVertical: 5 }} >
                    <View>
                        <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >In</Text>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_in_time).format("HH:mm")}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }} >
                        <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Out</Text>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_out_time).format("hh:mm") == "Invalid date" ? " -- / -- " : moment(item.check_out_time).format("hh:mm")}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }} >
                        <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >UT</Text>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ut_timing}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }} >
                        <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >OT</Text>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ot_timing}</Text>
                    </View>
                </View>
            </View>
        )
    }

    function RenderAbsentList({ item }) {
        return (
            <View style={[{ width: width / 1.10, height: width / 3, flexDirection: "column", justifyContent: "space-evenly", paddingHorizontal: 10, borderRadius: 10, marginVertical: 15, backgroundColor: "#FFFFFF", elevation: 2 }, iosOpacity]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Image style={{ width: width / 10, height: width / 10, borderRadius: 100 }} source={{uri:item.profile_pic}} />
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, }} >{item.name}</Text>
                            <Text style={{ color: colors.transBlack60, fontSize: 10, fontFamily: fonts.PoppinsRegular, }} >{item.designation}</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => Linking.openURL(`tel:${item.mobile_number}`)}   >
                        <PhoneCallIcon width={width / 15} height={width / 15} />
                    </Pressable>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                    <View  >
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <IdCardBlueIcon width={width / 25} height={width / 25} />
                            <Text style={{ color: colors.primaryColor, fontSize: 12, top: 1, fontFamily: fonts.PoppinsMedium, marginLeft: 5 }} >{item.employee_code}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <TeamsIcon width={width / 25} height={width / 25} />
                            <Text style={{ color: colors.primaryColor, fontSize: 12, top: 1, fontFamily: fonts.PoppinsMedium, marginLeft: 5 }} >{item.department}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }} >
                        {/* <Text style={{ color: colors.transBlack60, fontSize: 11, fontFamily: fonts.PoppinsRegular, }} >Department</Text> */}
                        <Text style={{ color: colors.primaryColor, fontSize: 12, fontFamily: fonts.PoppinsMedium, }} >{item.leave_name}</Text>
                    </View>
                </View>

            </View>
        )
    }

    const test = useMemo(function Test() {

    }, [])
    return (

        <View style={styles.container} >
            <CustomHeader backIcon title={"My Team’s Attendance"} />

            <View style={[{ width: width / 1.20, height: width / 7.5, flexDirection: "row", marginTop: 15, borderRadius: 5, elevation: 3, overflow: "hidden", backgroundColor: colors.warningRed, alignSelf: "center" }, iosOpacity]} >
                <Pressable onPress={() => setActiveTab(0)} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: activeTab == 0 ? colors.primaryColor : colors.white }}>
                    <Text style={{ color: activeTab == 0 ? colors.white : colors.black, fontFamily: fonts.PoppinsMedium }} >Under Time</Text>
                </Pressable>
                <Pressable onPress={() => setActiveTab(1)} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: activeTab == 1 ? colors.primaryColor : colors.white }}>
                    <Text style={{ color: activeTab == 1 ? colors.white : colors.black, fontFamily: fonts.PoppinsMedium }} >Absent List</Text>
                </Pressable>
            </View>


            <View style={{ width: width / 1.20, height: width / 9.5, marginVertical: 25, flexDirection: "row", alignItems: "center", paddingHorizontal: 2, borderWidth: 1, borderColor: colors.transPrimary60, borderRadius: 100, alignSelf: "center" }} >
                <TextInput placeholder='Search' placeholderTextColor={colors.placeHolderTextColor} style={{ flex: 1, paddingLeft: 10, color: colors.black }} scrollEnabled={false} allowFontScaling={false} />
                <View style={{ width: width / 8, height: width / 11, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 100, borderBottomRightRadius: 100 }} >
                    <SearchIconIcon width={width / 20} height={width / 20} />
                </View>
            </View>


            <CalendarStrip
                scrollable={true}
                startingDate={allDate}
                selectedDate={allDate}
                showMonth={true}
                scrollToOnSetSelectedDate={true}
                onDateSelected={(date) => fetchTeamAttendance(moment(date).format("YYYY-MM-DD"))}

                // onDateSelected={(date) => { dateSelection(date); showDate(date) }}
                highlightDateContainerStyle={{ backgroundColor: colors.white, shouldAllowFontScaling: false, width: '70%', borderRadius: 0 }}
                highlightDateNameStyle={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }}
                highlightDateNumberStyle={{ color: colors.white, fontFamily: fonts.PoppinsMedium, fontSize: 14 }}
                dayComponentHeight={60}
                highlightDateNumberContainerStyle={{ backgroundColor: colors.primaryColor, width: width / 10, height: width / 10, alignItems: "center", justifyContent: "center" }}
                leftSelector={[]}
                rightSelector={[]}
                style={{ height: width / 5, shouldAllowFontScaling: true, width: width / 1.20, alignSelf: "center" }}
                dayContainerStyle={{ borderRadius: 5, marginRight: 10 }}
                calendarHeaderContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}
                calendarHeaderStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', color: colors.primaryColor, fontSize: 14, bottom: 5, fontFamily: fonts.PoppinsMedium, alignSelf: 'flex-start' }}
                dateNumberStyle={{ color: '#000', height: width / 10, textAlignVertical: "center", textAlign: "center", fontSize: 14, fontWeight: '600' }}
                dateNameStyle={{ color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsMedium }}

            // iconContainer={{ backgroundColor: 'red', width: 20, height: 50 }}
            />




            <FlatList ListEmptyComponent={ListEmptyComponent} style={{ alignSelf: "center" }} data={activeTab == 0 ? presentData : absentData} renderItem={({ item, index }) => {
                if(activeTab==0){
                    return(
                        <RenderUnderTimeData  item={item} />
                    )
                }
                else{
                    return(
                        <RenderAbsentList item={item} />
                    )
                }

            }} />





            {/* <TabViewComponent
            Screens={{ ut: UnderTime, absent: AbsentList }}
            renderTabBar={renderTabBar}
            TabRoutes={TabData} /> */}


        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    holidayCardContainer: { width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" },
    holidayCardTitle: { color: colors.primaryColor, fontFamily: fonts.PoppinsMedium },
    checkInTimeCardContainer: { width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" },
    checkInTimeTextConatiner: { width: width / 1.10, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    checkInTimeText: { color: colors.black, fontFamily: fonts.PoppinsMedium, fontSize: 16 },
    checkInDate: { color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 },
    checkInTimeCardContainer2: { width: width / 1.30, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    checkInTimeCardContainer2Text: { color: "#475569", fontFamily: fonts.PoppinsRegular, fontSize: 12 }


})
const calendarStyle = {
    onLeaveStyles: { customStyles: { container: { borderColor: colors.warningRed, borderWidth: 1 }, text: { color: colors.black } } },
    absentStyles: { customStyles: { container: { backgroundColor: colors.warningRed }, text: { color: colors.white } } },
    onTimeStyles: { customStyles: { container: { backgroundColor: colors.lightGreen, width: 100, height: 100 }, text: { color: colors.white } } },
    LateStyles: { customStyles: { container: { backgroundColor: colors.yellow }, text: { color: colors.white } } },
    todayStyle: { customStyles: { container: { backgroundColor: colors.primaryColor }, text: { color: colors.white } } }

}
export default UtOtAbsentReporting;