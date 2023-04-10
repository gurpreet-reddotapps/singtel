import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import Geocoder from 'react-native-geocoding';
import { getAttendanceDateRangeWise } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckinWhiteIcon, LocationPinWhiteIcon } from '../../assects/Icons/attendance';
import Images from '../../assects/Images';
import { height, iosOpacity, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import { useSwipe } from '../../customeHooks/useSwipe';
import {LoaderComponet} from '../../component/index'
import { useSelector } from 'react-redux';
const MyHistory = ({ navigation, route }) => {
    const [index, setIndex] = React.useState(0);
    const dateStripRef = useRef();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.userDetails);

    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)




    useEffect(() => {
        fetchHistory(selectedDate)
    }, [selectedDate])

    function fetchHistory(date) {
        setLoading(true)
        const data = {
            "start_date": date,
            "end_date": date
        }
        getAttendanceDateRangeWise(data).then((res) => {
            setLoading(false)
            console.log("res.data.attendance_data", res.data.attendance_data[0].timings)
            setHistory(res.data.attendance_data)
        }).catch((err) => { console.log("snd", err), setLoading(true) })
    }

    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"))
    const [currentDateForCalendar, setCurrentDateForCalendar] = useState(moment().format("YYYY-MM-DD"))
    const [timingSelectionDate, setTimingSelectionDate] = useState("");
    const [dynamicHieght, setDynamicHieght] = useState(0);

    const today = moment();
    //    for weeks 
    const [todayDate, setTodayDate] = useState(moment(currentDate))


    const [allDate, setAllDate] = useState(new Date())

    const arrayData = [{ checkout: "", address: "", remark: "" },
    { checkout: "", address: "", remark: "" }]
    console.log("UHFDIJHSJI", moment(allDate).add(1, 'day'))


    const getAddress = (i, l) => new Promise(async (resolve, reject) => {

        Geocoder.from(i, l).then(json => {
            return resolve(json.results[0].formatted_address)
        })
            .catch((err) => { return reject(err) })


    })

    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 2.50, resizeMode: "contain" }} source={Images.no_history} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529 }} >You have not done any check in/out
                    from this device  yet !</Text>

            </View>
        )
    }


    function CheckOutCard({ date, time, item }) {
        return (
            <View style={[{ width: width / 1.10, maxHeight: width, minHeight: width / 6, padding: 10, marginVertical: 10, borderRadius: 8, backgroundColor: colors.white, elevation: 2.5 }, iosOpacity]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >

                    <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                        <View style={{ width: width / 15, height: width / 15, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                            <CheckinWhiteIcon width={width / 25} height={width / 25} />
                        </View>
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Check out</Text>
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{date}<Text style={{ color:item?.is_late == 0 ?  colors.green :colors.warningRed }} > {time}</Text></Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                        <View style={{ width: width / 15, height: width / 15, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                            <LocationPinWhiteIcon width={width / 25} height={width / 25} />
                        </View>
                        <TouchableOpacity onPress={() => OpenMap(item.check_in_latitude, item.check_in_longitude)} style={{ marginLeft: 10, width: width / 3 }} >
                            <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Address</Text>
                            {item.is_out_of_radius ? <Text numberOfLines={3} style={{ color: colors.warningRed, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"Others"}</Text>
                                : <Text numberOfLines={3} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{(item?.location_name != "" && item?.location_name != undefined) ? item?.location_name : "CRISTOFORI MUSIC PTE LTD"}</Text>}
                        </TouchableOpacity>
                    </View>


                </View>
                {item.is_out_of_radius ? <View style={{ width: width / 1.10, height: width / 7, justifyContent: "center" }} >
                    <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Address</Text>
                    <Text numberOfLines={3} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{(item?.location_name != "" && item?.location_name != undefined) ? item?.location_name : "CRISTOFORI MUSIC PTE LTD"}</Text>
                </View> : null}

                {item?.check_in_remark != "" ? <View style={{ width: width / 1.40, height: 1, backgroundColor: colors.darkWhite, marginVertical: 5, alignSelf: "center" }} /> : null}
                {item?.check_in_remark != "" ? <View style={{ width: width / 1.10, height: width / 7, justifyContent: "center" }} >
                    <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Remarks</Text>
                    <Text numberOfLines={2} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item?.check_out_remark}</Text>
                </View> : null}
            </View>
        )
    }


    function CheckInCard({ date, time, item }) {
        return (
            <View style={[{ width: width / 1.10, maxHeight: width, minHeight: width / 6, padding: 10, marginVertical: 10, borderRadius: 8, backgroundColor: colors.white, elevation: 2.5 }, iosOpacity]} >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }} >

                    <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                        <View style={{ width: width / 15, height: width / 15, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                            <CheckinWhiteIcon width={width / 25} height={width / 25} />
                        </View>
                        <View style={{ marginLeft: 10 }} >
                            <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Check in</Text>
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{date}<Text style={{ color:item?.is_late == 0 ?  colors.green :colors.warningRed }} > {time}</Text></Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                        <View style={{ width: width / 15, height: width / 15, borderRadius: 100, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                            <LocationPinWhiteIcon width={width / 25} height={width / 25} />
                        </View>
                        <TouchableOpacity onPress={() => OpenMap(item.check_in_latitude, item.check_in_longitude)} style={{ marginLeft: 10, width: width / 3 }} >
                            <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Address</Text>
                            {item.is_out_of_radius ? <Text numberOfLines={3} style={{ color: colors.warningRed, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{"Others"}</Text>
                                : <Text numberOfLines={3} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{(item?.location_name != "" && item?.location_name != undefined) ? item?.location_name : "CRISTOFORI MUSIC PTE LTD"}</Text>}
                        </TouchableOpacity>
                    </View>


                </View>
                {item.is_out_of_radius ? <View style={{ width: width / 1.10, height: width / 7, justifyContent: "center" }} >
                    <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Address</Text>
                    <Text numberOfLines={3} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{(item?.location_name != "" && item?.location_name != undefined) ? item?.location_name : "CRISTOFORI MUSIC PTE LTD"}</Text>
                </View> : null}

                {item?.check_in_remark != "" ? <View style={{ width: width / 1.40, height: 1, backgroundColor: colors.darkWhite, marginVertical: 5, alignSelf: "center" }} /> : null}
                {item?.check_in_remark != "" ? <View style={{ width: width / 1.10, height: width / 7, justifyContent: "center" }} >
                    <Text style={{ color: colors.transBlack60, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >Remarks</Text>
                    <Text numberOfLines={2} style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, fontSize: 12 }}>{item?.check_in_remark}</Text>
                </View> : null}
            </View>
        )

    }

    function OpenMap(lat, lng) {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });


        Linking.openURL(url);
    }


    function onSwipeLeft() {
        setAllDate(moment(allDate).add(1, 'day'))
        fetchHistory(moment(allDate).format("YYYY-MM-DD"))
    }

    function onSwipeRight() {
        setAllDate(moment(allDate).subtract(1, 'day'))
        fetchHistory(moment(allDate).format("YYYY-MM-DD"))
    }


    return (

        <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
            style={styles.container} >
            <CustomHeader backIcon title={"History"} />





            <FlatList

                ListHeaderComponent={
                    <>
                        <CalendarStrip
                            ref={dateStripRef}
                            scrollable={true}
                            startingDate={allDate}
                            selectedDate={allDate}

                            showMonth={true}
                            onDateSelected={(data) => fetchHistory(moment(data).format("YYYY-MM-DD"))}
                            scrollToOnSetSelectedDate={true}
                            // onDateSelected={(date) => { dateSelection(date); showDate(date) }}
                            highlightDateContainerStyle={{ backgroundColor: colors.white, shouldAllowFontScaling: false, width: '70%', borderRadius: 0 }}
                            highlightDateNameStyle={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }}
                            highlightDateNumberStyle={{ color: colors.white, fontFamily: fonts.PoppinsMedium, fontSize: 14 }}
                            dayComponentHeight={60}
                            highlightDateNumberContainerStyle={{ backgroundColor: colors.primaryColor, width: width / 10, height: width / 10, alignItems: "center", justifyContent: "center" }}
                            leftSelector={[]}
                            rightSelector={[]}

                            style={{ height: width / 5, shouldAllowFontScaling: true, marginTop: width / 10, width: width / 1.20, alignSelf: "center" }}
                            dayContainerStyle={{ borderRadius: 5, marginRight: 10 }}
                            calendarHeaderContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}
                            calendarHeaderStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', color: colors.D6D6D, fontSize: 14, bottom: 5, fontFamily: fonts.PoppinsMedium, alignSelf: 'flex-start' }}
                            dateNumberStyle={{ color: '#000', height: width / 10, textAlignVertical: "center", textAlign: "center", fontSize: 14, fontWeight: '600' }}
                            dateNameStyle={{ color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsMedium }}


                        // iconContainer={{ backgroundColor: 'red', width: 20, height: 50 }}
                        />

                        <View style={{ width: width / 1.20, height: 1, backgroundColor: colors.darkWhite, marginVertical: 10, alignSelf: "center" }} />

                    </>
                }
                ListEmptyComponent={ListEmptyComponent} style={{ alignSelf: "center" }} data={history[0]?.timings} renderItem={({ item, index }) => {

                    const checkInDate = moment(item.check_in_time).format("DD/MM/YYYY")
                    const checkOutDate = moment(item.check_out_time).format("DD/MM/YYYY")
                    const checkInTime = moment(item.check_in_time).format("HH:mm")
                    const checkOutTime = moment(item.check_out_time).format("HH:mm")
                    return (
                        <View  >
                            <CheckInCard
                                date={checkInDate}
                                time={checkInTime}
                                item={item}
                            />

                            {item.check_out_time ?
                                <CheckOutCard
                                    date={checkOutDate}
                                    time={checkOutTime}
                                    item={item}
                                />
                                : null}
                        </View>
                    )


                }} />
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
    onLeaveStyles: { customStyles: { container: { borderColor: colors.warningRed, borderWidth: 1 }, text: { color: colors.black } } },
    absentStyles: { customStyles: { container: { backgroundColor: colors.warningRed }, text: { color: colors.white } } },
    onTimeStyles: { customStyles: { container: { backgroundColor: colors.lightGreen, width: 100, height: 100 }, text: { color: colors.white } } },
    LateStyles: { customStyles: { container: { backgroundColor: colors.yellow }, text: { color: colors.white } } },
    todayStyle: { customStyles: { container: { backgroundColor: colors.primaryColor }, text: { color: colors.white } } }

}
export default MyHistory;