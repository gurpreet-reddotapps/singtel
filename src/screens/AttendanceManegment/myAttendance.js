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
import { getAttendanceDateRangeWise, getAttendanceMonthWise, getAttendanceYearWise, getHomeDetails } from '../../api';
import { LoaderComponet } from '../../component';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import TabViewComponent from '../../component/TabViewComponent';
import { SceneMap, TabView } from 'react-native-tab-view';
import { BarChart } from "react-native-chart-kit";
import Images from '../../assects/Images';
import Icon from 'react-native-vector-icons/Ionicons';
import { AbsentRedIcon } from '../../assects/Icons/attendance';
const MyAttendance = ({ navigation, route }) => {
    const [index, setIndex] = React.useState(0);

    const indicators = [{ title: "Today", color: "#155B9F" }, { title: "Absent", color: "#E54218" },
    { title: "On Time", color: "#1F8B88" },
    { title: "Late", color: "#D8A23B" }]

    const routess = [{ key: "week", title: "Week", data: "0", color: colors.progressColor },
    { key: "month", title: "Month", data: "0", color: colors.blue },

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


    useEffect(() => {
        let st = today.clone().startOf('months').format("YYYY-MM-DD");
        // let end = today.clone().endOf('months').format("YYYY-MM-DD")
        let end = moment().format("YYYY-MM-DD")

        getMarkedDate(st, end)
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
            console.log("SOIDJSLKDJLKSJD",res?.data?.attendance_data)
            setAttendance_data(res.data.attendance_data)
        })
    }

    function getMarkedDate(st, end, timestamp) {

        setLoading(true)

        const dataMonthwise = {
            "start_date": st,
            "end_date": end
        }

        console.log("dataMonthwise", dataMonthwise)
        getAttendanceDateRangeWise(dataMonthwise).then((res) => {
            setAttendance_dataMonth(res.data.attendance_data)
            res.data.attendance_data.map((data, key) => {
                tempMarkedDates[data.date] = data.is_late == 1 ? calendarStyle.LateStyles :
                    // ((data.check_in_time != "") && data.date != moment().format("YYYY-MM-DD")) ? calendarStyle.onTimeStyles :
                    (data.is_holiday == 1) ? null :
                        data.is_future_date == 1 ? calendarStyle.noDataStyles :
                            data.present == 1 ? calendarStyle.onTimeStyles :
                                data.present == 0 ? calendarStyle.absentStyles :
                                    data.date == moment().format("YYYY-MM-DD") ? calendarStyle.todayStyle :
                                        null
            })
            setMarkedDates(tempMarkedDates)
            setLoading(false)

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

                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"-"}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"-"}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <WeekOffIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >Week off</Text>
                        </View>
                    </View>
                </View>


                // <View style={styles.holidayCardContainer} >
                //     <View style={{ alignItems: "center" }} >
                //         <WeekOffIcon width={width / 10} height={width / 10} />
                //         <Text style={styles.holidayCardTitle} >Week Off</Text>
                //     </View>
                //     <Text style={[styles.holidayCardTitle, { fontSize: 12 }]}  >{moment(item.date).format("ddd DD MMM YY")}</Text>
                //     <Text style={[styles.holidayCardTitle, { width: width / 6 }]}  >{ }</Text>
                // </View>
            )
        }
        else if (item.is_future_date == 1) {

            return (
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <Image style={{ width: width / 10, height: width / 10, resizeMode: "contain" }} source={Images.no_record_found} />
                            <Text style={{ color: colors.D6D6D, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >No data found</Text>
                        </View>
                    </View>
                </View>

            )
        }

        else if (item.present == 1) {
            const start = moment(item.check_in_time);
            const end = moment(item.check_out_time);
            const diffrenceBetweenDates = moment.duration(end.diff(start));

            const shiftStartTime = moment("2022-07-25" + item.shift_start_time, "YYYY-MM-DD HH:mm:ss");
            const shiftEndTime = moment("2022-07-25" + item.shift_end_time, "YYYY-MM-DD HH:mm:ss");
            const shiftTimeDiff = moment.duration(shiftEndTime.diff(shiftStartTime)).asHours().toFixed(0)

            const time = item?.check_out_time ? diffrenceBetweenDates.asHours() < 1 ? 1 : diffrenceBetweenDates.asHours().toFixed(0) : 1
            return (

                <View style={{ width: width, height: width / 2.10, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >In</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(item.check_in_time).format("HH:mm")}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Out</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(item.check_out_time).format("HH:mm")}</Text>
                            </View>
                        </View>
                        <View style={{ width: width / 1.40, height: 5, marginTop: 5, backgroundColor: colors.DBDBDB, overflow: "hidden", alignSelf: "center", borderRadius: 20 }} >
                            <View style={{ width: width / 1.40 / shiftTimeDiff * time, height: 5, backgroundColor: item.is_late == 0 ? colors.green : item.is_ot == 1 ? "orange" : colors.warningRed }} />
                        </View>

                        <View style={{ flex: 1 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10, marginVertical: 5 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Late</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.late_timing}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Under</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ut_timing}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >OT</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ot_timing}</Text>
                            </View>
                        </View>

                    </View>
                </View>


            )
        }
        else if (item.present == 0) {
            console.log("SDSD", item)

            return (
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <AbsentRedIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.absentColor, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >Absent</Text>
                        </View>
                    </View>
                </View>

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
                <View style={[{ width: width / 1.10, height: width / 8, marginTop: 10, elevation: 2, borderRadius: 7, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: colors.white, alignSelf: "center" }, iosOpacity]} >

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

                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    data={attendance_data}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: width / 1.20, height: 1, marginVertical: 10, backgroundColor: colors.B212529, opacity: 0.1, alignSelf: "center" }} />}
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

    function onMonthChange(data) {
        console.log("SDJOIKSJDLOIKSJDLOKJSKLDJSKLDJLSKJDKL", data)
        setCurrentDate(data.dateString)
        setCurrentMonth(moment(data.dateString).format("MMM YYYY"))
        setCurrentDateForCalendar(moment(data.dateString).format("YYYY-MM-DD"))
        getMarkedDate("2023-" + moment(data.dateString).format("MM") + "-01",
            moment(currentDate).clone().endOf('month').subtract(0, 'days').format("YYYY-MM-DD")
        )
    }

    var renderCalender = useMemo(function calen() {
        return <>
            <Calendar
                initialDate={currentDateForCalendar}
                style={{
                    borderWidth: 0,
                    borderColor: 'gray',

                    width: width / 1.10,
                    alignSelf: "center",
                    marginTop: 10
                }}
                markingType="custom"
                markedDates={markedDates}
                onDayPress={(data) => { setCurrentDate(data.dateString) }}
                // onMonthChange={(data) => onMonthChange(data)}
                headerStyle={{ width: width / 1.10, alignSelf: "center", backgroundColor: colors.white }}
                renderHeader={(data) => {
                    return (
                        <Pressable onPress={() => setDatePickerVisibility(true)} style={{ width: width / 2, height: 50, alignItems: "center", justifyContent: "center" }} >
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >{currentMonth}</Text>
                        </Pressable>
                    )
                }}

                renderArrow={(data) => {
                    if (data == "left") {
                        return (
                            <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                                <ArrowBackIcon />
                            </TouchableOpacity>
                        )
                    }
                    else {
                        return (
                            <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                                <ArrowForwardIcon />
                            </TouchableOpacity>
                        )
                    }
                }}

                theme={{
                    weekVerticalMargin: 2,
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#000000',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#ffffff',
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
                    textDayFontSize: 14,
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 12,
                    'stylesheet.day.basic': {
                        'base': {
                            height: width / 8,
                            width: width / 8,
                            alignItems: "center",
                            justifyContent: 'center'
                        }
                    },
                }}
            />
        </>
    }, [currentDateForCalendar, todayDate])

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
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"-"}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"-"}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <WeekOffIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >Week off</Text>
                        </View>
                    </View>
                </View>

                // <View style={styles.holidayCardContainer} >
                //     <View style={{ alignItems: "center" }} >
                //         <WeekOffIcon width={width / 10} height={width / 10} />
                //         <Text style={styles.holidayCardTitle} >Week Off</Text>
                //     </View>
                //     <Text style={[styles.holidayCardTitle, { fontSize: 12 }]}  >{moment(item.date).format("ddd DD MMM YY")}</Text>
                //     <Text style={[styles.holidayCardTitle, { width: width / 6 }]}  >{ }</Text>
                // </View>
            )
        }
        else if (item.is_future_date == 1) {
            return (
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <Image style={{ width: width / 10, height: width / 10, resizeMode: "contain" }} source={Images.no_record_found} />
                            <Text style={{ color: colors.D6D6D, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >No data found</Text>
                        </View>
                    </View>
                </View>

            )
        }

        else if (item.present == 1) {
            const start = moment(item.check_in_time);
            const end = moment(item.check_out_time);
            const diffrenceBetweenDates = moment.duration(end.diff(start));
            const shiftStartTime = moment("2022-07-25" + item.shift_start_time, "YYYY-MM-DD HH:mm:ss");
            const shiftEndTime = moment("2022-07-25" + item.shift_end_time, "YYYY-MM-DD HH:mm:ss");
            const shiftTimeDiff = moment.duration(shiftEndTime.diff(shiftStartTime)).asHours().toFixed(0)
            const time = item?.check_out_time ? diffrenceBetweenDates.asHours() < 1 ? 1 : diffrenceBetweenDates.asHours().toFixed(0) : 1
            
            return (
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >In</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(item.check_in_time).format("HH:mm")}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Out</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{moment(item.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(item.check_out_time).format("HH:mm")}</Text>
                            </View>
                        </View>
                        <View style={{ width: width / 1.40, height: 5, marginTop: 5, backgroundColor: colors.DBDBDB, overflow: "hidden", alignSelf: "center", borderRadius: 20 }} >
                            <View style={{ width: width / 1.40 / shiftTimeDiff * time, height: 5, backgroundColor: item.is_late == 0 ? colors.green : item.is_ot == 1 ? "orange" : colors.warningRed }} />
                        </View>

                        <View style={{ flex: 1 }} />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginHorizontal: 10, marginVertical: 5 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Late</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.late_timing}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Under</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ut_timing}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >OT</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.ot_timing}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            )
        }
        else if (item.present == 0) {
            return (
                <View style={{ width: width, height: width / 2.20, flexDirection: "row", marginVertical: 5 }} >
                    <View style={{ width: width / 8, height: width / 8, marginLeft: 15, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, top: 5 }} >{moment(item.date).format("DD")}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 14, color: colors.white }} >{moment(item.date).format("dd")}</Text>
                    </View>
                    <View style={[{ flex: 1, marginHorizontal: 15, elevation: 2, borderRadius: 8, backgroundColor: colors.white }, iosOpacity]} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", margin: 10, paddingBottom: 10, borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} >
                            <View>
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Type</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_name}</Text>
                            </View>
                            <View style={{ alignItems: "flex-end" }} >
                                <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Shift Time</Text>
                                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item.shift_start_time} - {item.shift_end_time}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                            <AbsentRedIcon width={width / 10} height={width / 10} />
                            <Text style={{ color: colors.absentColor, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginVertical: 5 }} >Absent</Text>
                        </View>
                    </View>
                </View>

            )
        }

        else {
            return (
                null

            )
        }

    }

    function RenderMonth() {
        return (
            <View style={{ flex: 1 }} >

                {/* {renderCalender} */}

                <Calendar
                    initialDate={currentDateForCalendar}
                    style={{
                        borderWidth: 0,
                        borderColor: 'gray',

                        width: width / 1.10,
                        alignSelf: "center",
                        marginTop: 10
                    }}
                    enableSwipeMonths={true}
                    markingType="custom"
                    markedDates={markedDates}
                    onDayPress={(data) => { setCurrentDate(data.dateString) }}
                    onMonthChange={(data) => onMonthChange(data)}
                    // onMonthChange={month =>{ alert("okoko")}}
                    headerStyle={{ width: width / 1.10, alignSelf: "center", backgroundColor: colors.white }}
                    renderHeader={(data) => {
                        return (
                            <Pressable onPress={() => setDatePickerVisibility(true)} style={{ width: width / 2, height: 50, alignItems: "center", justifyContent: "center" }} >
                                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >{currentMonth}</Text>
                            </Pressable>
                        )
                    }}

                    renderArrow={(data) => {
                        if (data == "left") {
                            return (
                                <View style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                                    <ArrowBackIcon />
                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                                    <ArrowForwardIcon />
                                </View>
                            )
                        }
                    }}

                    theme={{
                        weekVerticalMargin: 1,
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#000000',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#ffffff',
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
                        textDayFontSize: 14,
                        textMonthFontSize: 14,
                        textDayHeaderFontSize: 12,
                        'stylesheet.day.basic': {
                            'base': {
                                height: width / 10,
                                width: width / 10,
                                alignItems: "center",
                                justifyContent: 'center'
                            }
                        },
                    }}
                />


                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 2, marginTop: width / 15 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.blue, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Today</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.ontime, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >On Time</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.warningRed, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Absent</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.yellow, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Late</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
                <FlatList style={{ alignSelf: "center", marginTop: 10 }} data={attendance_dataMonth.filter(item => item.date == currentDate)} renderItem={renderDayTimeline} />
            </View>
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





    return (

        <View style={styles.container} >
            <CustomHeader backIcon title={"My Attendance"} />
            <View style={[{ width: width / 1.10, height: width / 8, elevation: 1, borderRadius: 7, overflow: "hidden", flexDirection: "row", alignSelf: "center", marginTop: width / 15 }, iosOpacity]} >
                <Pressable onPress={() => { SetActiveTab(0) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: activeTab == "0" ? colors.primaryColor : colors.white }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: activeTab == "0" ? colors.white : colors.black, fontSize: 16 }} >Week</Text>
                </Pressable>
                <Pressable onPress={() => { SetActiveTab(1) }} style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: activeTab == "1" ? colors.primaryColor : colors.white }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: activeTab == "1" ? colors.white : colors.black, fontSize: 16 }}  >Month</Text>
                </Pressable>
            </View>


            {activeTab == 0 ? RenderWeek() : RenderMonth()}



            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <LoaderComponet visible={loading} />




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
    onLeaveStyles: { customStyles: { container: { borderColor: colors.warningRed, borderWidth: 1, borderRadius: 0, width: width / 10, height: width / 10 }, text: { color: colors.black } } },
    absentStyles: { customStyles: { container: { backgroundColor: colors.warningRed, borderRadius: 0, width: width / 10, height: width / 10, alignItems: "center" }, text: { color: colors.white } } },
    onTimeStyles: { customStyles: { container: { backgroundColor: colors.ontime, borderRadius: 0, width: width / 10, height: width / 10 }, text: { color: colors.white } } },
    LateStyles: { customStyles: { container: { backgroundColor: colors.yellow, borderRadius: 0, width: width / 10, height: width / 10 }, text: { color: colors.white } } },
    todayStyle: { customStyles: { container: { backgroundColor: colors.primaryColor, borderRadius: 0, width: width / 10, height: width / 10 }, text: { color: colors.white } } },
    noDataStyles: { customStyles: { container: { backgroundColor: colors.white, borderRadius: 0, width: width / 10, height: width / 10 }, text: { color: colors.black } } },



}
export default MyAttendance;