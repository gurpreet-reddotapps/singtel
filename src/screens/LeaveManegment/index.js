import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDetails, getLeaveBalanceDetails } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackIcon, ArrowForwardIcon, ArrowForwardWhiteIcon, CheckmarkGreenIcon, MyRequestIcon, SickLeaveIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { getLeaveCategoryBgColors, height, hitSlop, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import CircularProgress from '../../component/CircularProgress';
import PureChart from 'react-native-pure-chart';
import { BarChart } from "react-native-chart-kit";
import { setHomeData } from '../../redux/actions/Home';


const LeaveManegment = ({ navigation }) => {
    const [leavePolicyData, setLeavePolicyData] = useState(false);
    const [userLeaveBalance, setUserLeaveBalance] = useState([])
    const [loading, setLoading] = useState(false)
    const [userConsumedLeaveBalance, setUserConsumedLeaveBalance] = useState(null)
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const [financialYear, setFinancialYear] = useState(moment().format("YYYY"))
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"))
    const [todayDate, setTodayDate] = useState(moment(currentDate))


    const dispatch = useDispatch();



    const [TabData] = useState([{ key: "paid", title: "Paid", data: "0", color: colors.progressColor },
    { key: "unpaid", title: "Unpaid", data: "0", color: colors.blue },
    { key: "leavepolicy", title: "Leave policy", data: "0", color: colors.blue },
    ])
    const optionArray = [
        { title: "8 out of 14 left", option: "Annual Leave", bgColor: "#F0A500" },
        { title: "8 out of 14 left", option: "MC Leave", bgColor: "#46244C" },
        { title: "1 out of 2 left", option: "Compassionate ", bgColor: "#155F7F" },
        { title: "8 out of 46 left", option: "Hospitalisation", bgColor: "#595C59" },
        { title: "8 out of 8 left", option: "Home Leave", bgColor: "#1F8B88" },
        { title: "0 out of 0 left", option: "Maternity", bgColor: "#533E85" },
        { title: "0 out of 6 left", option: "Child Care", bgColor: "#EB4747" },
        { title: "0 out of 0 left", option: "WICA Leave", bgColor: "#155B9F" },

    ]

    const optionArray1 = [
        { title: "8 taken", option: "Annual Leave", bgColor: "#F0A500" },
        { title: "8 taken", option: "Home Leave", bgColor: "#46244C" },
        { title: "1 taken", option: "MC Leave ", bgColor: "#155F7F" },
        { title: "8 taken", option: "Hospitalisation", bgColor: "#595C59" },
    ]
    useEffect(() => {
        setLoading(true)
        getLeaveBalanceDetails().then((res) => {
            console.log("KLSJFLKSLKFDKF", res.data)
            // setUserLeaveBalance(res.data.available_leaves_details),
            setLoading(false)
            setUserConsumedLeaveBalance(res.data.consumed_leaves_details)
        }).catch((err) => console.log("SDSDSDDDSD", err))

    }, [])


    const props = {
        activeStrokeWidth: 10,
        inActiveStrokeWidth: 10,
        inActiveStrokeOpacity: 0.2
    };


    function LeaveDetailsBar({ progress1, progress2, progress3, }) {
        console.log("DDprogress1", progress1)


        return (
            <CircularProgressBase
                {...props}
                value={progress3}
                radius={85}
                activeStrokeColor={colors.yellow}
                inActiveStrokeColor={colors.yellow}
            >

                <CircularProgressBase
                    {...props}
                    value={progress2}
                    radius={70}
                    activeStrokeColor={colors.warningRed}
                    inActiveStrokeColor={colors.warningRed}
                >
                    <CircularProgressBase
                        children={
                            <>
                                <Text style={{ color: colors.black, fontSize: 36 }} >{progress1}</Text>
                                <Text style={{ color: colors.placeHolderTextColor, bottom: 10 }} >Remaining</Text>
                                <Text style={{ color: colors.placeHolderTextColor, bottom: 10 }} >out of 56</Text>

                            </>
                        }

                        {...props}
                        inActiveStrokeOpacity={0.2}
                        value={progress1}
                        radius={55}
                        activeStrokeColor={colors.primaryColor}
                        inActiveStrokeColor={colors.transPrimary60}
                    />
                </CircularProgressBase>
            </CircularProgressBase>
        )
    }
    function renderLeaveCategory({ item, index }) {
        return (
            <View style={{ width: width / 2.40, height: width / 5.50, alignItems: "center", justifyContent: "center", backgroundColor: getLeaveCategoryBgColors(index), borderRadius: 20, marginHorizontal: 5, marginVertical: 5 }}>
                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsLight }} ><Text style={{ fontSize: 24, fontFamily: fonts.PoppinsMedium }} >{item.count}</Text> out of 14 left</Text>
                <Text numberOfLines={2} style={{ fontFamily: fonts.PoppinsRegular, textAlign: "center" }} >{item.title}</Text>
            </View>
        )
    }
    const Paid = () => {
        return (
            <View style={{ flex: 1, }} >
                <View  >
                    {/* <Image style={{ width: width / 2, height: width / 2, marginVertical: width / 15, alignSelf: "center" }} source={Images.Chart} /> */}

                    {userConsumedLeaveBalance ? <View style={{ alignSelf: "center", marginVertical: width / 15 }} >
                        <LeaveDetailsBar
                            progress1={userConsumedLeaveBalance[0]?.count}
                            progress2={userConsumedLeaveBalance[1]?.count}
                            progress3={userConsumedLeaveBalance[2]?.count}
                        />
                    </View> : null}

                    <FlatList style={{ alignSelf: "center" }} numColumns={2} data={userConsumedLeaveBalance} renderItem={renderLeaveCategory} />

                    {homeData?.last_leave_requests.length != 0 ? <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingLeft: 15, paddingRight: 25, marginVertical: 10 }} >
                        <Text style={{ fontFamily: fonts.PoppinsBold, color: colors.B212529 }} >My Leaves</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.primaryColor }} >See All</Text>
                    </View> : null}


                    <FlatList directionalLockEnabled style={{ alignSelf: "center", paddingLeft: 10 }} horizontal data={homeData?.last_leave_requests} renderItem={({ item, index }) => {

                        const start = moment(item.start_date, "YYYY-MM-DD");
                        const end = moment(item.end_date, "YYYY-MM-DD");
                        const diffrenceBetweenDates = moment.duration(end.diff(start)).asDays();


                        return (

                            <TouchableOpacity style={[{ width: width / 1.20, height: width / 2.65, marginHorizontal: 5, borderRadius: 10, overflow: "hidden", elevation: 2, marginVertical: 10 }, iosOpacity]} >
                                <View style={{ width: width / 1.20, height: width / 2.65 / 2, flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: colors.lightGreen }} >
                                    <SickLeaveIcon width={width / 8} height={width / 8} />
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.white, marginRight: 10 }} >{item.reason}</Text>
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.white }} >{moment(item.start_date).format("DD MMM")} - {moment(item.end_date).format("DD MMM")}</Text>
                                </View>
                                <View style={{ width: width / 1.20, height: width / 2.65 / 2, justifyContent: "space-evenly", backgroundColor: colors.white }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", flex: 1 }} >
                                        <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                                        <View style={{ width: width / 5.28, height: 3, backgroundColor: colors.primaryColor }} />
                                        <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                                        <View style={{ width: width / 5.28, height: 3, backgroundColor: colors.primaryColor }} />
                                        <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                                    </View>

                                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.35, borderTopColor: colors.DBDBDB, borderTopWidth: 1, alignSelf: "center" }} >
                                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >Queue {item.total_queue_counts} of 8</Text>
                                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >{diffrenceBetweenDates} Days </Text>
                                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.placeHolderTextColor, marginRight: 10 }} >#12345</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />





                </View>
                <View style={{ flex: 1 }} />
                <ButtonComponent onPress={() => navigation.navigate(routes.applyNewLeave)} title={"Apply Leave"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} />
            </View>
        )
    }

    const Unpaid = () => {


        return (
            <View style={{ flex: 1, }} >
                <View>
                    <Image style={{ width: width / 2, height: width / 2, marginVertical: width / 15, alignSelf: "center" }} source={Images.ChartUnpaid} />

                    <FlatList style={{ alignSelf: "center" }} numColumns={2} data={userConsumedLeaveBalance} renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: width / 2.40, height: width / 5.50, alignItems: "center", justifyContent: "center", backgroundColor: getLeaveCategoryBgColors(index), borderRadius: 20, marginHorizontal: 5, marginVertical: 5 }}>
                                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsLight }} ><Text style={{ fontSize: 24, fontFamily: fonts.PoppinsMedium }} >{item.count}</Text> out of 14 left</Text>
                                <Text numberOfLines={2} style={{ fontFamily: fonts.PoppinsRegular, textAlign: "center" }} >{item.title}</Text>
                            </View>
                        )
                    }} />

                </View>
                <View style={{ flex: 1 }} />
                <ButtonComponent onPress={() => navigation.navigate(routes.applyNewLeave, { flag: "unpaid" })} title={"Apply Unpaid Leave"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} />
                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, paddingHorizontal: 10, textAlign: "center", marginVertical: 15 }} >Unpaid leaves are directly deducted from payroll.
                    For any concerns, please create a support ticket.</Text>
            </View>
        )
    }
    const LeavePolicy = () => {
        return (
            <View style={{ flex: 1, alignSelf: "center" }} >
                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, paddingHorizontal: 10, textAlign: "center", marginTop: 15 }} >Last updated on 24 June 2022</Text>
                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, paddingHorizontal: 15, textAlign: "left", marginVertical: 15 }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>
        )
    }



    function RenderTab({ item, index, data }) {
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
    }
    const renderTabBar = (data) => {
        return (
            <View style={{ backgroundColor: colors.white, marginTop: 15, width: width / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 }} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => <RenderTab data={data} item={item} index={index} />} />
            </View>
        )
    }

    const Dataa = homeData?.is_leave_access ? [{ onpress: () => navigation.navigate(routes.leaveBalance), title: "Apply Leave", desc: "You can apply for leaves here.", color: "#4776E6", op: Images.attendance_op_top, image: Images.leave_balance_btn },
    { onpress: () => navigation.navigate(routes.myRequest), title: "My Leave Requests", desc: "See my leave applications here.", color: "#20C5B1", op: Images.attendance_op_bottom, image: Images.leave_request_btn },
    { onpress: () => navigation.navigate(routes.leaveApproval), title: "Leave Approvals", desc: "See employee who apply for leaves here.", color: "#867BF5", op: Images.attendance_op_top, image: Images.leave_approval_btn },
    { onpress: () => navigation.navigate(routes.myTeamLeaves), title: "My Team's Leave", desc: "See employee who are late & absent here.", color: "#A665D1", op: Images.attendance_op_top, image: Images.my_utot_btn },

    ] : []




    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
            {
                data: [5, 6, 6, 8, 9, 0],
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
    function OnRetry() {
        setLoading(true)
        getHomeDetails().then((res) => {
            setLoading(false)
            console.log("getHomeDetails", res.data)
            dispatch(setHomeData(res.data))
        }).catch((res) => { setLoading(false) })
    }
    function ListEmptyComponent() {
        return (
            <View style={{ width: width, height: height/2, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }} >
                <Image style={{ width: width / 3, height: width / 3, resizeMode: "contain" }} source={Images.denied} />
                <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 18, marginTop: 20 }} >You Don't have access </Text>
                {/* <ButtonComponent onPress={() =>OnRetry()} style={{ marginTop: width / 3 }} bgColor={colors.primaryColor} title="Retry" /> */}
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Leave Management"} />

            {/* <View style={{ width: width, height: width / 8, alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 13 }} >Leave Statistics</Text>
            </View>

            <View style={{ width: width / 1.10, height: width / 8, marginBottom: 10, elevation: 3, borderRadius: 7, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: colors.white, alignSelf: "center" }} >
                <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToPrev()} >
                    <ArrowBackIcon />
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}  >
                    <Text style={{ color: "#555555", fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >FY {financialYear}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: width / 18, height: width / 18, padding: 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.B212529, borderRadius: 100 }} hitSlop={hitSlop} onPress={() => changeWeekToNext()} >
                    <ArrowForwardIcon />
                </TouchableOpacity>
            </View> */}



            {/* <BarChart
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
 */}

            {/* <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 2, marginTop: width / 15 }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.annualCodeColor, bottom: 2, marginHorizontal: 5 }} />
                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Annual</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.warningRed, bottom: 2, marginHorizontal: 5 }} />
                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >MC Leave</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.primaryColor, bottom: 2, marginHorizontal: 5 }} />
                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Home Leave</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                    <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.ontime, bottom: 2, marginHorizontal: 5 }} />
                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >WICA</Text>
                </View>
            </View> */}

            <FlatList
                ListEmptyComponent={ListEmptyComponent()}
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: "center", marginTop: 15 }}
                data={Dataa} renderItem={({ item, index }) => {
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
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default LeaveManegment;