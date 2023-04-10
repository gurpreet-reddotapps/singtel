import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, TextInput, Modal, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { getLeaveRequest } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, AnnualLeaveIcon, ArrowBackIcon, ArrowForwardIcon, BlueCalenderIcon, CheckmarkGrayIcon, CheckmarkGreenIcon, CheckmarkRedIcon, MoonIcon, NotificationBellIcon, SickLeaveIcon, StaticsIcon, SunIcon, TaskCompleteIcon, UploadBtnIcon, WeekOffIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { getLeaveCardColor, getLeaveCategoryBgColors, height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { SvgUri } from 'react-native-svg';

const MyRequests = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [selectedCategory, SetselectedCategory] = useState(0);
    const [leaveRequests, SetLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highest_queue_no, setHighestQqueueNo] = useState("0");

    const [TabData] = useState([{ key: "approved", title: "Approved", data: "0", color: colors.progressColor },
    { key: "pending", title: "Pending", data: "0", color: colors.blue },
    { key: "rejected", title: "Rejected", data: "0", color: colors.blue },
    ])

    
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        navigation.addListener('focus',()=>{
            GetLeaveRequest();
        })
    }, [])


    const GetLeaveRequest=()=>{
        setLoading(true)
        const data = {
            status: -1
        }
        getLeaveRequest(data).then((res) => { console.log("SDSDSDDD", res.data), SetLeaveRequests(res.data), setLoading(false) })
    }
    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 1.40, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 1.50, resizeMode: "contain" }} source={Images.emptyData} />
            </View>
        )
    }

    const getLine = () => {
        return (
            <View style={{ width: width / 5.28, height: 3, backgroundColor: colors.primaryColor, marginHorizontal: 10 }} />

        )

    }
    function LeaveCardComponent({ data, index }) {
        const startDate = moment(data.start_date).format("DD MMM");
        const endDate = moment(data.end_date).format("DD MMM");
        const start = moment(data.start_date, "YYYY-MM-DD");
        const end = moment(data.end_date, "YYYY-MM-DD");
        const diffrenceBetweenDates = moment.duration(end.diff(start)).asDays();
        var ext = data?.leave_category_image.split('.').pop();
        const approve = ["0", "1", "2"]

        return (
            <TouchableOpacity onPress={() => navigation.navigate(routes.leaveDetails, { id: data.id, flag: 0,days:data.days })} style={[{ width: width / 1.10, height: width / 2.65, marginHorizontal: 5, borderRadius: 10, overflow: "hidden", elevation: 2, marginVertical: 10 }, iosOpacity]} >
                <View style={{ width: width / 1.10, height: width / 2.65 / 2, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: getLeaveCardColor(data.status) }} >
                    {/* <SickLeaveIcon width={width / 8} height={width / 8} /> */}
                    {ext == "svg" ? <SvgUri width={width / 7.5} height={width / 7.5} uri={data.leave_category_image} /> : <Image style={{ width: width / 7.5, height: width / 7.5 }} source={{ uri: data.leave_category_image }} />}

                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.white, marginLeft: 10, width: width / 3 }} >{data.leave_category_title}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{moment(data.start_date).format("DD/MM/YY")} - {moment(data.end_date).format("DD/MM/YY")}</Text>
                </View>
                <View style={{ width: width / 1.10, height: width / 2.65 / 2, justifyContent: "space-evenly", backgroundColor: colors.white }} >

                    <View style={{ flex: 1 }} >
                        <FlatList style={{ alignSelf: "center" }} horizontal data={data.approvers} renderItem={({ item, index }) => {
                            console.log("item.approvers?.length",data.approvers)
                            return (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "center" }}  >
                                    {item.status == 0 ? <CheckmarkGrayIcon width={width / 18} height={width / 18} /> :
                                        item.status == 1 ? <CheckmarkGreenIcon width={width / 18} height={width / 18} /> :
                                            <CheckmarkRedIcon width={width / 18} height={width / 18} />}
                                    {data.approvers?.length == 3 ? (index == 0 || index == 1) ? getLine() : null :
                                        data.approvers?.length == 2 ? (index == 0) ? getLine() : null : null}

                                </View>
                            )
                        }} />

                    </View>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.35, borderTopColor: colors.DBDBDB, borderTopWidth: 1, alignSelf: "center" }} >
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >Queue {data.queue_no ? data.queue_no : 0} of {leaveRequests?.highest_queue_no}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >{Number.isInteger(data.days) ? data.days == 1 ? data.days+" Day" :data.days+" Days" :data.days}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.B8B8B, marginRight: 10 }} >#{data.id}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        )
    }

    function Approved() {

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    ListEmptyComponent={ListEmptyComponent}
                    directionalLockEnabled style={{ alignSelf: "center", }}
                    data={leaveRequests?.leave_requests?.filter((data) => data.status == 1)}
                    renderItem={(item, index) => LeaveCardComponent({ data: item.item, index: item.index })}
                />
            </View>
        )
    }

    function Pending() {

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    ListEmptyComponent={ListEmptyComponent}
                    directionalLockEnabled style={{ alignSelf: "center", }}
                    data={leaveRequests?.leave_requests?.filter((data) => data.status == 0)}
                    renderItem={(item, index) => LeaveCardComponent({ data: item.item, index: item.index })} />
            </View>
        )
    }
    function Rejected() {
        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    ListEmptyComponent={ListEmptyComponent}
                    directionalLockEnabled style={{ alignSelf: "center", }}
                    data={leaveRequests?.leave_requests?.filter((data) => data.status == 2)}
                    renderItem={(item, index) => LeaveCardComponent({ data: item.item, index: item.index })}/>
            </View>
        )
    }




    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, width: width / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    console.log("KDFJKSLD", index)
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




    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"My Requests"} />
            <TabViewComponent
                Screens={{ approved: Approved, pending: Pending, rejected: Rejected }}
                renderTabBar={renderTabBar}

                TabRoutes={TabData} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default MyRequests;