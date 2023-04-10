import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Image, Pressable, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Platform, PanResponder, Animated, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, ArrowBackIcon, ArrowBackWhiteIcon, ArrowForwardIcon, ArrowForwardWhiteIcon, CheckInTimelineIcon, CheckOutTimelineIcon, MoonIcon, SunIcon, WeekOffIcon } from '../../assects/Icons';
import { height, hitSlop, iosOpacity, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import routes from '../../routes/routes';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import { getAttendanceDateRangeWise, getAttendanceMonthWise, getAttendanceYearWise, getHomeDetails, getTeamAttendance } from '../../api';
import { LoaderComponet } from '../../component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import TabViewComponent from '../../component/TabViewComponent';
import { SceneMap, TabView } from 'react-native-tab-view';
import { BarChart } from "react-native-chart-kit";
import Images from '../../assects/Images';
import Icon from 'react-native-vector-icons/Ionicons';
const AttendanceManegment = ({ navigation, route }) => {
    const [index, setIndex] = React.useState(0);

    const indicators = [{ title: "Today", color: "#155B9F" }, { title: "Absent", color: "#E54218" },
    { title: "On Time", color: "#1F8B88" },
    { title: "Late", color: "#D8A23B" }]

    const routess = [{ key: "week", title: "Week", data: "0", color: colors.progressColor },
    { key: "month", title: "Month", data: "0", color: colors.blue },

    ]

    const Dataa = [{ onpress: () => navigation.navigate(routes.myAttendance), title: "My Attendance", desc: "See daily/mothly attendance statistics here.", color: "#4776E6", op: Images.attendance_op_top, image: Images.my_atte_btn },
    { onpress: () => navigation.navigate(routes.myHistory), title: "My History", desc: "See your daily check in, check out records here.", color: "#20C5B1", op: Images.attendance_op_bottom, image: Images.my_his_btn },
    { onpress: () => navigation.navigate(routes.utotreporting), title: "My Team Attendance", desc: "See employee who are late & absent here.", color: "#867BF5", op: Images.attendance_op_top, image: Images.my_utot_btn },
        // { onpress: () => navigation.navigate(routes.myAttendance), title: "Plan a Schedule", desc: "Schedule tasks for employee in your teams.", color: "#A665D1", op: Images.attendance_op_bottom, image: Images.my_plan_btn },
    ]





    const [activeTab, SetActiveTab] = useState("0");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const calendarRef = useRef()
    const sheetRef = React.useRef(null);
    const refRBSheet = useRef();

    const [selectedMonth, setSelectedMonth] = useState("");
    const { user } = useSelector(state => state.userDetails);
    const [attendance_data, setAttendance_data] = useState([]);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const [attendance_dataMonth, setAttendance_dataMonth] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(moment().format("MMM YYYY"))
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"))
    const [currentDateForCalendar, setCurrentDateForCalendar] = useState(moment().format("YYYY-MM-DD"))
    const [timingSelectionDate, setTimingSelectionDate] = useState("");
    const [dynamicHieght, setDynamicHieght] = useState(0);

    const today = moment();
    //    for weeks 
    const [todayDate, setTodayDate] = useState(moment(currentDate))
    const [begginingOfCurrentWeek, setbegginingOfCurrentWeek] = useState(todayDate.clone().startOf('weeks').add(1, 'days').format("YYYY-MM-DD"))
    const [endOfWeek, setEndOfWeek] = useState(todayDate.clone().endOf('weeks').add(1, 'days').format("YYYY-MM-DD"))

    const startDateOfCurrentMonth = today.clone().startOf('months').format("YYYY-MM-DD")
    const [loading, setLoading] = useState(false);
    let tempMarkedDates = {}
    const [markedDates, setMarkedDates] = useState({});
    const [barchartData, setBarchartData] = useState([0, 0, 0, 0, 0, 0,0]);
    const [presentData, setPresentData] = useState([]);
    const [absentData, setAbsentData] = useState([]);



    useEffect(() => {
        let st = today.clone().startOf('months').format("YYYY-MM-DD");
        let end = today.clone().endOf('months').format("YYYY-MM-DD")
        getMarkedDate(st, end)
        // fetchTeamAttendance(moment().format("YYYY-MM-DD"))
    }, [])

    useEffect(() => {
        setbegginingOfCurrentWeek(todayDate.clone().startOf('weeks').add(1, 'days').format("YYYY-MM-DD"))
        setEndOfWeek(todayDate.clone().endOf('weeks').add(1, 'days').format("YYYY-MM-DD"))
    }, [todayDate])

    useEffect(() => {
        GetAttendance()
    }, [begginingOfCurrentWeek, homeData])


    useEffect(() => {
        GetAttendance()
    }, [homeData])

    function GetAttendance() {
        setLoading(true)
        const data = {
            "start_date": begginingOfCurrentWeek,
            "end_date": endOfWeek
        }

        getAttendanceDateRangeWise(data).then((res) => {
            setLoading(false)
            let temp = [];
            res.data.attendance_data.map((data) => {
                var start = moment(data.check_in_time, "YYYY-MM-DD HH:mm:ss")
                var end = moment(data.check_out_time, "YYYY-MM-DD HH:mm:ss")
                var rem = moment.duration(end.diff(start))
                var totalHours = rem.asHours().toFixed(1) == "NaN" ? 0.0 : rem.asHours().toFixed(1)
                temp.push(totalHours)
            })
            console.log("DSDSDSDDDSSSSSSSSSSSS", temp)
            setBarchartData(temp)
            // setAttendance_data(res.data.attendance_data)
        })
    }


    function fetchTeamAttendance(date) {
        const data = {
            date: date
        }
        getTeamAttendance(data).then((res) => {
            console.log("SDLOKHJSLJKD", res.data)
            setPresentData(res.data.present_data)
            setAbsentData(res.data.absent_data)
        })
    }


    function getMarkedDate(st, end) {
        setLoading(true)
        const dataMonthwise = {
            "start_date": st,
            "end_date": moment().format("YYYY-MM-DD")
        }
        getAttendanceDateRangeWise(dataMonthwise).then((res) => {
            setAttendance_dataMonth(res.data.attendance_data)
            res.data.attendance_data.map((data, key) => {
                tempMarkedDates[data.date] = data.is_late == 1 ? calendarStyle.LateStyles :
                    ((data.check_in_time != "") && data.date != moment().format("YYYY-MM-DD")) ? calendarStyle.onTimeStyles :
                        (data.is_holiday == 1) ? null :
                            data.check_in_time == "" ? calendarStyle.absentStyles :
                                data.date == moment().format("YYYY-MM-DD") ? calendarStyle.todayStyle :
                                    null
            })
            setLoading(false)
            setMarkedDates(tempMarkedDates)
        })

    }

    var getDaysBetweenDates = function (startDate, currentDate) {
        var now = startDate.clone(), dates = [];

        while (now.isSameOrBefore(currentDate)) {
            dates.push(now.format('YYYY-MM-DD'));
            now.add(1, 'days');
        }
        return dates;
    };

    function renderTimelineWeeks({ item, index }) {
        if (item.is_holiday == 1) {
            return (
                <View style={{ width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" }} >
                    <View style={{ alignItems: "center" }} >
                        <WeekOffIcon width={width / 10} height={width / 10} />
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }} >Week Off</Text>
                    </View>
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }}  >{moment(item.date).format("ddd DD MMM YY")}</Text>
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, width: width / 6 }}  >{ }</Text>
                </View>
            )
        }
        else if (item.check_in_time != "") {
            const start = moment(item.check_in_time);
            const end = moment(item.check_out_time);
            const diffrenceBetweenDates = moment.duration(end.diff(start));
            const time = item?.check_out_time ? diffrenceBetweenDates.asHours() < 1 ? diffrenceBetweenDates.asMinutes().toFixed(0) + " min" : diffrenceBetweenDates.asHours().toFixed(0) + " Hrs" : ""
            return (
                <Pressable onPress={() => { setDynamicHieght(item.timings.length <= 1 ? width / 3 : (width / 9 * item.timings.length) + 20), setTimingSelectionDate(item.date), setTimeout(() => { refRBSheet.current.open() }, 200) }} style={{ width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" }} >
                    <View style={{ width: width / 1.10, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, fontSize: 16 }} >{moment(item.check_in_time).format("hh:mm A")}</Text>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{moment(item.date).format("ddd DD MMM YY")}</Text>
                        <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, fontSize: 16 }} >{moment(item.check_out_time).format("hh:mm A") == "Invalid date" ? " -- / -- " : moment(item.check_out_time).format("hh:mm A")}</Text>
                    </View>

                    <View style={{ width: width / 1.30, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <Text style={{ color: "#475569", fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{"In"}</Text>
                        <Text style={{ color: "#4C9F87", fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{time}</Text>
                        <Text style={{ color: "#475569", fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{"Out"}</Text>
                    </View>
                </Pressable>
            )
        }
        else if (item.check_in_time == "") {
            return (
                <View style={{ width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" }} >
                    <View style={{ width: width / 1.10, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <View style={{ alignItems: "center", justifyContent: "center" }} >
                            <AbsentIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.warningRed }} >Absent</Text>
                        </View>

                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: width / 12 }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{moment(item.date).format("ddd DD MMM YY")}</Text>
                        </View>

                        <View style={{ alignItems: "center", justifyContent: "center", width: width / 5 }} >
                            {/* <Pressable onPress={() => navigation.navigate(routes.leaveManegmentStack)} style={{ width: width / 5, height: width / 12, alignItems: "center", justifyContent: "center", borderRadius: 100, borderColor: colors.transPrimary60, borderWidth: 1 }} >
                            <Text style={{ color: colors.primaryColor, fontSize: 11 }} >Apply Leave</Text>
                        </Pressable> */}
                        </View>
                    </View>


                </View>

            )
        }
        else if (item.type == "day") {
            return (
                null

            )
        }
        else {
            return (
                null

            )
        }

    }

    function changeWeekToPrev() {
        setTodayDate(moment(moment(begginingOfCurrentWeek).subtract(2, 'days').format("YYYY-MM-DD")))
    }

    function changeWeekToNext() {
        setTodayDate(moment(moment(endOfWeek).add(1, 'days').format("YYYY-MM-DD")))
    }

    function RenderWeek() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ width: width / 1.10, height: width / 8, elevation: 1, borderRadius: 7, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: colors.white, alignSelf: "center", marginTop: width / 15 }} >
                    <TouchableOpacity hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                        <ArrowBackIcon width={width / 20} height={width / 20} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}  >
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 16 }} >{moment(begginingOfCurrentWeek).format("DD/MM/YY")}</Text>
                        <Text style={{ color: "#555555", fontFamily: fonts.PoppinsMedium, fontSize: 16 }} >To</Text>
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 16 }} >{moment(endOfWeek).format("DD/MM/YY")}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity hitSlop={hitSlop} onPress={() => changeWeekToNext()} >
                        <ArrowForwardIcon width={width / 20} height={width / 20} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    data={attendance_data}
                    keyExtractor={item => item.id}
                    renderItem={renderTimelineWeeks}
                />
            </View>
        )
    }

    const handleConfirms = () => {
        setCurrentDateForCalendar(moment().format("YYYY-MM-DD"))
        setCurrentDate(moment().format("YYYY-MM-DD"))
    }

    function renderIndicators({ item, index }) {
        return (
            <Pressable onPress={() => handleConfirms()} style={{ width: width / 5, paddingVertical: 1, marginHorizontal: 5, borderRadius: 2, backgroundColor: item.color, alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsRegular, }} >{item.title}</Text>
            </Pressable>
        )
    }

    function renderDayTimeline({ item, index }) {

        if (item.is_holiday == 1) {
            return (
                <View style={styles.holidayCardContainer} >
                    <View style={{ alignItems: "center" }} >
                        <WeekOffIcon width={width / 10} height={width / 10} />
                        <Text style={styles.holidayCardTitle} >Week Off</Text>
                    </View>
                    <Text style={[styles.holidayCardTitle, { fontSize: 12 }]}  >{moment(item.date).format("ddd DD MMM YY")}</Text>
                    <Text style={[styles.holidayCardTitle, { width: width / 6 }]}  >{ }</Text>
                </View>
            )
        }
        else if (item.check_in_time != "") {
            const start = moment(item.check_in_time);
            const end = moment(item.check_out_time);
            const diffrenceBetweenDates = moment.duration(end.diff(start));
            const time = item?.check_out_time ? diffrenceBetweenDates.asHours() < 1 ? diffrenceBetweenDates.asMinutes().toFixed(0) + " min" : diffrenceBetweenDates.asHours().toFixed(0) + " Hrs" : ""
            return (
                <View style={[styles.checkInTimeCardContainer]} >
                    <View style={[styles.checkInTimeTextConatiner]} >
                        <Text style={styles.checkInTimeText} >{moment(item.check_in_time).format("hh:mm A")}</Text>
                        <Text style={styles.checkInDate} >{moment(item.date).format("ddd DD MMM YY")}</Text>
                        <Text style={styles.checkInTimeText} >{moment(item.check_out_time).format("hh:mm A") == "Invalid date" ? " -- / -- " : moment(item.check_out_time).format("hh:mm A")}</Text>
                    </View>

                    <View style={styles.checkInTimeCardContainer2} >
                        <Text style={[styles.checkInTimeCardContainer2Text]} >{"In"}</Text>
                        <Text style={[styles.checkInTimeCardContainer2Text, { color: "#4C9F87" }]} >{time}</Text>
                        <Text style={[styles.checkInTimeCardContainer2Text]} >{"Out"}</Text>
                    </View>
                </View>
            )
        }
        else if (item.check_in_time == "") {
            return (
                <View style={{ width: width / 1.10, height: width / 5, marginVertical: 5, paddingHorizontal: 15, borderRadius: 5, backgroundColor: colors.white, elevation: 1, alignItems: "center" }} >
                    <View style={{ width: width / 1.10, marginVertical: 5, paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <View style={{ alignItems: "center", justifyContent: "center" }} >
                            <AbsentIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.warningRed }} >Absent</Text>
                        </View>

                        <View style={{ alignItems: "center", justifyContent: "center", marginLeft: width / 12 }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{moment(item.date).format("ddd DD MMM YY")}</Text>
                        </View>

                        <View style={{ alignItems: "center", justifyContent: "center", width: width / 5 }} >
                            {/* <Pressable onPress={() => navigation.navigate(routes.leaveManegmentStack)} style={{ width: width / 5, height: width / 12, alignItems: "center", justifyContent: "center", borderRadius: 100, borderColor: colors.transPrimary60, borderWidth: 1 }} >
                                  <Text style={{ color: colors.primaryColor, fontSize: 11 }} >Apply Leave</Text>
                              </Pressable> */}
                        </View>
                    </View>
                </View>

            )
        }
        else if (item.type == "day") {
            return (
                null
            )
        }
        else {
            return (
                null

            )
        }
    }


    var renderCalender = useMemo(function calen() {
        return <>
            <Calendar
                initialDate={currentDateForCalendar}
                style={[{
                    borderWidth: 0,
                    borderColor: 'gray',

                    width: width / 1.10,
                    elevation: 2,
                    alignSelf: "center",
                    marginTop: 10
                }, iosOpacity]}
                markingType="custom"
                markedDates={markedDates}
                onDayPress={(data) => { setCurrentDate(data.dateString) }}
                onMonthChange={(data) => {
                    setCurrentDate(data.dateString)
                    setCurrentMonth(moment(data.dateString).format("MMM YYYY"))
                    setCurrentDateForCalendar(moment(data.dateString).format("YYYY-MM-DD"))
                    getMarkedDate("2022-" + moment(data.dateString).format("MM") + "-01", "2022-" + moment(data.dateString).format("MM") + "-30")
                }}
                headerStyle={{ width: width / 1.10, alignSelf: "center", backgroundColor: colors.white, elevation: 2 }}
                renderHeader={(data) => {
                    return (
                        <Pressable onPress={() => setDatePickerVisibility(true)} style={{ width: width / 2, height: 50, alignItems: "center", justifyContent: "center" }} >
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium }} >{currentMonth}</Text>
                        </Pressable>
                    )
                }}

                renderArrow={(data) => {
                    if (data == "left") {
                        return (
                            <ArrowBackIcon width={width / 22} height={width / 22} />
                        )
                    }
                    else {
                        return (
                            <ArrowForwardIcon width={width / 22} height={width / 22} />
                        )
                    }
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#ffffff',
                    todayBackgroundColor: "#155B9F",
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
            />
        </>
    }, [currentDateForCalendar, markedDates])
    function RenderMonth() {

        return (
            <ScrollView style={{ flex: 1 }} >
                <FlatList style={{ alignSelf: "center", marginVertical: 20 }} numColumns={4} data={indicators} renderItem={renderIndicators} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 20 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 8, height: 8, bottom: 2, marginHorizontal: 5, backgroundColor: colors.yellow }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >Day</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 8, height: 8, bottom: 2, marginHorizontal: 5, backgroundColor: colors.black }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >Night</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 8, height: 8, borderRadius: 100, borderWidth: 1, borderColor: colors.warningRed, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >On Leave</Text>
                    </View>
                </View>
                {renderCalender}


                <FlatList style={{ alignSelf: "center", marginTop: 10 }} data={attendance_dataMonth.filter(item => item.date == currentDate)} renderItem={renderDayTimeline} />
            </ScrollView>
        )
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setTodayDate(moment(moment(date).format("YYYY-MM-DD")))
        setCurrentDateForCalendar(moment(date).format("YYYY-MM-DD"))
        setCurrentDate(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            <Text>Swipe down to close</Text>
        </View>
    );



    const renderTabBar = (data) => {
        return (
            <View style={{ backgroundColor: colors.white, marginTop: 15, width: width / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 }} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: width / 3.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                            borderTopLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
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

    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
        datasets: [
            {
                data: barchartData
            }
        ]
    };


    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        barPercentage: 0.5,
        height: 5000,
        fillShadowGradient: colors.primaryColor,
        fillShadowGradientOpacity: 1,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => colors.primaryColor,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

        style: {
            borderRadius: 16,
            fontFamily: fonts.PoppinsMedium,
        },
        propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: "#e3e3e3",
            strokeDasharray: "0",
        },
        propsForLabels: {
            fontFamily: fonts.PoppinsMedium,
        },
    };




 
    return (

        <View style={styles.container} >
            <CustomHeader backIcon title={"Attendance Management"} />







            <FlatList
                ListHeaderComponent={
                    <>

                        <View style={{ width: width, height: width / 8, alignItems: "center", justifyContent: "center" }} >
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 13 }} >Overall Attendance</Text>
                        </View>
                        <View style={{ width: width / 1.10, height: width / 8, marginBottom: 10, elevation: 3, borderRadius: 7, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: colors.white, alignSelf: "center" }} >

                            <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                                <ArrowBackIcon />
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}  >
                                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 12, marginHorizontal: 10 }} >{moment(begginingOfCurrentWeek).format("MMM DD,YYYY")}</Text>
                                <Text style={{ color: "#555555", fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >-</Text>
                                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 12, marginHorizontal: 10 }} >{moment(endOfWeek).format("MMM DD,YYYY")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToNext()} >
                                <ArrowForwardIcon />
                            </TouchableOpacity>
                        </View>

                        <BarChart
                            style={{
                                marginVertical: 8,
                                marginTop: 10,
                            }}
                            showValuesOnTopOfBars
                            data={data}
                            width={width}
                            height={width / 2}
                            showBarTops={true}

                            yAxisLabel=""
                            yAxisSuffix='h'
                            chartConfig={chartConfig}
                            verticalLabelRotation={0}
                        />



                        <View style={{ width: width / 1.20, height: 1, backgroundColor: colors.B212529, opacity: 0.2, alignSelf: "center", marginVertical: 10 }} />
                    </>
                }
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: "center" }}
                data={Dataa}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={item.onpress} style={{ width: width / 1.15, height: width / 3.20, borderRadius: 16, marginVertical: 15, backgroundColor: item.color }} >
                            <ImageBackground style={{ width: index % 2 == 0 ? width / 1.20 : width / 1.15, bottom: index % 2 == 0 ? 5 : 0, height: index % 2 == 0 ? width / 4 : width / 3.20, marginTop: index % 2 == 0 ? 0 : 25 }} resizeMode="contain" source={item.op}  >
                                {index % 2 == 0 ?
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 12, marginTop: 12 }} >
                                        <View style={{ width: width / 1.70 }} >
                                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.white }} >{item.title}</Text>
                                            <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 13, color: colors.darkWhite }} >{item.desc}</Text>
                                        </View>
                                        <Image style={{ width: width / 6, height: width / 6, resizeMode: "contain", top: 10 }} source={item.image} />
                                    </View> :

                                    null}

                                {index % 2 == 0 ?
                                    <View style={{ marginLeft: 10, marginTop: 5 }} >
                                        <ArrowForwardWhiteIcon width={width / 20} height={width / 20} />
                                    </View> :
                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, bottom: 15 }} >
                                            <View style={{ width: width / 1.70 }} >
                                                <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.white }} >{item.title}</Text>
                                                <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 13, color: colors.darkWhite }} >{item.desc}</Text>
                                            </View>
                                            <Image style={{ width: width / 6, height: width / 6, resizeMode: "contain", top: 10 }} source={item.image} />
                                        </View>
                                        <View style={{ marginLeft: 10, bottom: 10 }} >
                                            <ArrowForwardWhiteIcon width={width / 20} height={width / 20} />
                                        </View>
                                    </View>

                                }
                            </ImageBackground>

                        </Pressable>
                    )
                }} />


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />



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
    onTimeStyles: { customStyles: { container: { backgroundColor: colors.lightGreen }, text: { color: colors.white } } },
    LateStyles: { customStyles: { container: { backgroundColor: colors.yellow }, text: { color: colors.white } } },
    todayStyle: { customStyles: { container: { backgroundColor: colors.primaryColor }, text: { color: colors.white } } }

}
export default AttendanceManegment;