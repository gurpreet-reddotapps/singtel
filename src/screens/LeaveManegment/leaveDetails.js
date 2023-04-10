import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, ScrollView, Platform, Linking, KeyboardAvoidingView, TextInput, Modal, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ApproveSubordinateLeaveRequest, cancelLeaveRequest, getLeaveRequestStatus, leaveRequestComment, RejectSubordinateLeaveRequest } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, AnnualLeaveIcon, ArrowBackIcon, ArrowForwardIcon, BlueCalenderIcon, CheckmarkCloseIcon, CheckmarkGreenIcon, CheckmarkGreenLogoIcon, CloseRedIcon, MoonIcon, NotificationBellIcon, SickLeaveIcon, StaticsIcon, SunIcon, TaskCompleteIcon, UploadBtnIcon, WeekOffIcon } from '../../assects/Icons';
import { FileDownloadIcon, PdfRedIcon, SendBtnBlueIcon } from '../../assects/Icons/leave';
import Images from '../../assects/Images';
import { dummyProfilePic, height, hitSlop, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
const LeaveDetails = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [selectedCategory, SetselectedCategory] = useState(0);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("")
    const { user } = useSelector(state => state.userDetails);
    const [tabPosition, setTabPosition] = useState(0);
    const [leaveRequestStatus, setLeaveRequestStatus] = useState({});


    const [TabData] = useState([{ key: "leavedetails", title: "Leave details", data: "0", color: colors.progressColor },
    { key: "comments", title: "Comments", data: "0", color: colors.blue },
    { key: "timeline", title: "Timeline", data: "0", color: colors.blue },
    ])

    const optionArray = [
        { title: "8 out of 14 left", option: "Annual Leave", bgColor: "#F0A500" },


    ]


    const [visible, setVisible] = useState(false);
    useEffect(() => {
        navigation.addListener('focus', () => {


            if (route?.params?.flag == "unpaid") {
                setVisible(true)
            }
            fetchLeaveRequestStatus()
        })
    }, [])

    function fetchLeaveRequestStatus() {
        setLoading(true)
        const data = {
            leave_request_id: route.params.id
        }
        getLeaveRequestStatus(data).then((res) => { setTimeout(() => { setLoading(false) }, 200), setLeaveRequestStatus(res.data), console.log("DSDSDSD", res.data) })

    }



    const CancelLeaveApplicationAlert = (id) => {
        Alert.alert('Cancel', 'Are you sure want to cancel leave', [{ 'text': "Ok", onPress: () => CancelLeaveApplication(id) }, { text: "Cancel" }])
    }

    const CancelLeaveApplication = (id) => {
        const data = {
            leave_request_id: id
        }
        cancelLeaveRequest(data).then((res) => {
            console.log("cancelLeaveRequest", res.data)
            ShowSuccessMessage("Leave application cancelled")
            navigation.goBack();
        })
            .catch((err) => { ShowErrorMessage("Something went wrong") })

    }


    const LeaveDetails = () => {

        const start = moment(leaveRequestStatus?.leave_details?.start_date);
        const end = moment(leaveRequestStatus?.leave_details?.end_date);
        const diffrenceBetweenDates = moment.duration(end.diff(start));
        const LeaveData = route.params.routeType == "approval" ?
            leaveRequestStatus?.leave_details ? [
                { title: "Name", data: leaveRequestStatus?.user_details?.employee_name },
                { title: "Department", data: leaveRequestStatus?.user_details?.department_name },
                { title: "Employee Id", data: leaveRequestStatus?.user_details?.employee_code },
                { title: "Request Id", data: leaveRequestStatus?.leave_details?.id },
                // { title: "Number of Days", data: diffrenceBetweenDates.asDays() == 0 ? "1" : diffrenceBetweenDates.asDays() },
                { title: "Number of Days", data: Number.isInteger(leaveRequestStatus?.leave_details?.days) ? leaveRequestStatus?.leave_details?.days == 1 ? leaveRequestStatus?.leave_details?.days + " Day" : leaveRequestStatus?.leave_details?.days + " Days" : leaveRequestStatus?.leave_details?.days },
                { title: "Start", data: moment(leaveRequestStatus?.leave_details?.start_date).format("DD MMM YYYY") },
                { title: "End", data: moment(leaveRequestStatus?.leave_details?.end_date).format("DD MMM YYYY") },
                { title: "Leave reason", data: leaveRequestStatus?.leave_details?.reason },
                { title: "Leave category", data: leaveRequestStatus?.leave_details?.leave_category_title },
                { title: "Documents uploaded", data: leaveRequestStatus?.leave_details?.files.length == 0 ? "No" : "Yes" },
            ] : null
            :
            leaveRequestStatus?.leave_details ? [
                { title: "Request Id", data: leaveRequestStatus?.leave_details?.id },
                // { title: "Number of Days", data: diffrenceBetweenDates.asDays() == 0 ? "1" : diffrenceBetweenDates.asDays() },
                { title: "Number of Days", data: Number.isInteger(leaveRequestStatus?.leave_details?.days) ? leaveRequestStatus?.leave_details?.days == 1 ? leaveRequestStatus?.leave_details?.days + " Day" : leaveRequestStatus?.leave_details?.days + " Days" : leaveRequestStatus?.leave_details?.days },
                { title: "Start", data: moment(leaveRequestStatus?.leave_details?.start_date).format("DD MMM YYYY") },
                { title: "End", data: moment(leaveRequestStatus?.leave_details?.end_date).format("DD MMM YYYY") },
                { title: "Leave reason", data: leaveRequestStatus?.leave_details?.reason },
                { title: "Leave category", data: leaveRequestStatus?.leave_details?.leave_category_title },
                { title: "Documents uploaded", data: leaveRequestStatus?.leave_details?.files.length == 0 ? "No" : "Yes" },
            ] : null

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList ItemSeparatorComponent={() => <View style={{ borderColor: colors.transPrimary60, borderTopWidth: 0.5 }} />} data={LeaveData} renderItem={({ item, index }) => {
                    return (
                        <View  >
                            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 15 }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.title}</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529 }} >{item.data}</Text>
                            </View>
                            {item.title == "Documents uploaded" && leaveRequestStatus?.leave_details?.files.length != 0 ?
                                <FlatList style={{ alignSelf: "center" }} data={leaveRequestStatus?.leave_details?.files} renderItem={({ item, index }) => {
                                    if (item.url.split('.').pop() == "pdf") {
                                        return (
                                            <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginVertical: 10, backgroundColor: colors.transPrimayColor, borderRadius: 5 }} >
                                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                                    <PdfRedIcon width={width / 20} height={width / 20} />
                                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular, fontSize: 12, marginLeft: 10 }} >{item.document_name}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                                    <Pressable onPress={() => Linking.openURL(item.url)} style={{ flexDirection: "row", paddingHorizontal: 10, height: 20, backgroundColor: colors.darkWhite, borderRadius: 5 }} >
                                                        <FileDownloadIcon width={width / 20} height={width / 20} />
                                                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }} >{" Download"}</Text>
                                                    </Pressable>

                                                </View>
                                            </View>
                                        )
                                    }
                                    else {
                                        return (
                                            <View style={{ width: width / 1.10, height: width / 1.50, alignSelf: "center", borderRadius: 5, borderWidth: 1, padding: 2, marginVertical: 10, borderColor: colors.transPrimary60 }} >
                                                <Image style={{ flex: 1 }} source={{ uri: item.url }} />
                                            </View>
                                        )
                                    }
                                }} />

                                : null}
                        </View>
                    )
                }} />
                {leaveRequestStatus?.leave_details?.status == 0 && route.params.routeType != "approval" ? <ButtonComponent onPress={() => CancelLeaveApplicationAlert(leaveRequestStatus?.leave_details?.id)} title={"Cancel leave"} bgColor={colors.primaryColor} style={{ width: width / 1.20, alignSelf: "center" }} /> : null}
            </View>
        )
    }

    function EmptyData() {
        return (
            <View style={{ width: width, height: height / 1.60, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 1.50, resizeMode: "contain" }} source={Images.emptyData} />
            </View>
        )
    }
    function onComment() {
        setLoading(true)
        const data = {
            "leave_request_id": leaveRequestStatus?.leave_details?.id,
            "comment": comment
        }
        leaveRequestComment(data).then((res) => {
            if (res.data.success) {
                ShowSuccessMessage(res.data.message)
                fetchLeaveRequestStatus()
                setComment("")
            }
        })
        console.log("SMDLKSJLKDS", data)
    }
    const Comments = () => {

        return (
            <View style={{ flex: 1 }} >
                <FlatList ListEmptyComponent={EmptyData} style={{ marginTop: width / 15 }} data={leaveRequestStatus?.comments} renderItem={({ item, index }) => {
                    // console.log("item.profile_pic",moment(item.created_at).fromNow("h"))
                    return (
                        <View style={{ width: width, height: width / 3.5, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", borderTopColor: colors.transBorder, borderTopWidth: 1 }} >
                            <View style={{ width: width, flexDirection: "row" }} >
                                <Image style={{ width: width / 9, height: width / 9, borderRadius: 10 }} source={{ uri: item.profile_pic != "" ? item.profile_pic : "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" }} />
                                <View style={{ width: width / 1.30, marginLeft: 10 }}  >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }} >{item.name}</Text>
                                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsLight, fontSize: 12 }} >{moment.utc(item.created_at).local().startOf('seconds').fromNow()}</Text>
                                    </View>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.comment}</Text>

                                </View>
                            </View>
                        </View>
                    )
                }} />

            </View>
        )
    }
    const getLine = () => {
        return (
            <View style={{ width: 2, height: width / 5, marginTop: 10, backgroundColor: '#155B9FB2' }} />
        )

    }
    const Timeline = () => {
        const commentData = [{ designation: "Manager", date: "5 Jan 2022 l 03:02 pm", desc: "Your application accepted by your manager." },
        { designation: "Sr. Manager", date: "5 Jan 2022 l 03:02 pm", desc: "Your application accepted by your sr. manager" },
        { designation: "Management", date: "5 Jan 2022 l 03:02 pm", desc: "Your application rejected by admin due to inadequate documents. " },
        ]

        return (
            <View style={{ flex: 1, alignSelf: "center" }} >


                <FlatList style={{ marginTop: width / 10 }} data={leaveRequestStatus?.approvers} renderItem={({ item, index }) => {
                    return (
                        <View  >
                            <View style={{ width: width / 1.10, alignSelf: "center", flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }} >
                                <ImageBackground style={{ width: width / 10, height: width / 10, alignItems: "flex-end", overflow: "visible" }} borderRadius={10} source={{ uri: (item.profile_pic != "" && item.profile_pic != undefined) ? item.profile_pic : dummyProfilePic }}  >
                                    <View style={{ backgroundColor: colors.white, padding: 2, bottom: 5, left: 5, borderRadius: 100 }} >
                                        {item.status == 0 ? null :
                                            item.status == 1 ?
                                                <CheckmarkGreenIcon width={width / 25} height={width / 25} /> :
                                                <CheckmarkCloseIcon width={width / 25} height={width / 25} />}
                                    </View>
                                </ImageBackground>
                                <View style={{ width: width / 1.30, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", paddingTop: 5 }} >
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium }} >{item?.name}</Text>

                                    <Text style={{ color: '#155B9FCC', fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.approval_timing != "" ? moment(item.approval_timing).format("DD MMM YYYY | hh:mm a") : ""}</Text>
                                </View>
                            </View>
                            <View style={{ width: width / 1.10, height: width / 4, flexDirection: "row", justifyContent: "space-between", alignSelf: "center" }} >
                                <View style={{ width: width / 10, height: width / 10, alignItems: "center" }} >
                                    {leaveRequestStatus?.approvers?.length == 3 ? (index == 0 || index == 1) ? getLine() : null :
                                        leaveRequestStatus?.approvers?.length == 2 ? (index == 0) ? getLine() : null : null}
                                </View>
                                <View style={{ width: width / 1.30 }} >
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, bottom: 10 }} >{item?.role_name}</Text>

                                    <View style={{ height: width / 5.5, width: width / 1.30, paddingRight: 10, borderBottomColor: '#155B9F33', borderBottomWidth: index != 2 ? 1 : 0 }} >

                                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.status_text}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                }} />


            </View>
        )
    }




    const renderTabBar = (data) => {
        setTabPosition(data.navigationState.index)
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


    function ApproveRequest() {
        setLoading(true)
        const data = {
            leave_request_id: leaveRequestStatus?.leave_details?.id
        }
        ApproveSubordinateLeaveRequest(data).then((res) => {
            setLoading(false)

            if (res?.data?.success) {
                navigation.goBack();
                ShowSuccessMessage(res?.data?.message)
            }
            else {
                navigation.goBack();
                ShowSuccessMessage(res?.data?.message)
            }
        })
    }


    function RejectRequest() {
        const data = {
            leave_request_id: leaveRequestStatus?.leave_details?.id,
            reason_for_rejection: "not implement"
        }
        RejectSubordinateLeaveRequest(data).then((res) => {
            if (res?.data?.success) {
                ShowSuccessMessage(res?.data?.message)
            }
            else {
                ShowErrorMessage(res?.data?.message)
            }
        })
    }


    return (
        <View style={styles.container} >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} keyboardVerticalOffset={Platform.OS == "ios" ? width / 10 : -width / 1.50} >
                <CustomHeader backIcon title={"Leave details"} />
                <TabViewComponent
                    Screens={{ leavedetails: LeaveDetails, comments: Comments, timeline: Timeline }}
                    renderTabBar={renderTabBar}
                    IntialIndex={route?.params?.flag}
                    TabRoutes={TabData} />
                {tabPosition == 1 ? <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignSelf: "center", borderColor: colors.transPrimary60, borderWidth: 1, borderRadius: 10, marginBottom: 20 }} >
                    <TextInput value={comment} onChangeText={(data) => setComment(data)} style={{ flex: 1, paddingLeft: 10, color: colors.B212529 }} placeholder="Add a comment…" placeholderTextColor={colors.B8B8B} />
                    <Pressable hitSlop={hitSlop} onPress={() => onComment()} >
                        <SendBtnBlueIcon width={width / 5} height={width / 15} />
                    </Pressable>
                </View> : null}

                {tabPosition == 0 && route.params.routeType == "approval" && leaveRequestStatus?.leave_details?.status == 0 ?
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }} >
                        <ButtonComponent onPress={() => ApproveRequest()} title={"Approve Leave"} bgColor={colors.primaryColor} style={{ width: width / 2.40, alignSelf: "center" }} />
                        <ButtonComponent onPress={() => RejectRequest()} title={"Reject Leave"} bgColor={colors.primaryColor} style={{ width: width / 2.40, alignSelf: "center" }} />
                    </View>
                    : null}

                <LoaderComponet visible={loading} />
            </KeyboardAvoidingView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default LeaveDetails;