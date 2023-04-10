import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, Image, FlatList, TextInput, Modal, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { getLeaveRequest, getSubOrdinateRequest } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, AnnualLeaveIcon, ArrowBackIcon, ArrowForwardIcon, BlueCalenderIcon, CheckmarkGreenIcon, MoonIcon, NotificationBellIcon, SickLeaveIcon, StaticsIcon, SunIcon, TaskCompleteIcon, UploadBtnIcon, WeekOffIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { getLeaveCategoryBgColors, height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { SvgUri } from 'react-native-svg';

const LeaveApproval = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [selectedCategory, SetselectedCategory] = useState(0);
    const [leaveApproval, SetLeaveApproval] = useState([]);
    const [loading, setLoading] = useState(false);


    const [TabData] = useState([{ key: "approved", title: "Approved", data: "0", color: colors.progressColor },
    { key: "pending", title: "Pending", data: "0", color: colors.blue },
    { key: "rejected", title: "Rejected", data: "0", color: colors.blue },
    ])

    const optionArray = [
        { title: "8 out of 14 left", option: "Annual Leave", bgColor: "#F0A500" },


    ]
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getSubOrdinateRequest().then((res) => { console.log("SDSDSDDD", res.data), SetLeaveApproval(res.data), setLoading(false) })
    }, [])

    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 1.60, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 1.50, resizeMode: "contain" }} source={Images.emptyData} />
            </View>
        )
    }

    function LeaveCardComponent({ data, index }) {
        const startDate = moment(data?.start_date).format("DD MMM");
        const endDate = moment(data?.end_date).format("DD MMM");
        const start = moment(data?.start_date, "YYYY-MM-DD");
        const end = moment(data?.end_date, "YYYY-MM-DD");
        const diffrenceBetweenDates = moment.duration(end.diff(start)).asDays();
        var ext = data?.leave_category_image?.split('.')?.pop();

        return (
            <TouchableOpacity onPress={() => navigation.navigate(routes.leaveDetails, { id: data?.id, routeType: "approval",days:data.days })} style={[{ width: width / 1.10, height: width / 2.20, marginHorizontal: 5, borderRadius: 10, elevation: 2, marginVertical: 10 }, iosOpacity]} >
                <View style={{ width: width / 1.10, height: width / 2.50 / 2.50, borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: getLeaveCategoryBgColors(index) }} >
                    {/* <SickLeaveIcon width={width / 8} height={width / 8} /> */}
                    {ext == "svg" ? <SvgUri width={width / 7.5} height={width / 7.5} uri={data?.leave_category_image} /> : <Image style={{ width: width / 7.5, height: width / 7.5 }} source={{ uri: data?.leave_category_image }} />}

                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.white, marginLeft: 10, width: width / 3 }} >{data?.leave_category_title}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{moment(data?.start_date).format("DD/MM/YY")} - {moment(data?.end_date).format("DD/MM/YY")}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "space-evenly", backgroundColor: colors.white, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginVertical: 15 }} >
                        <View>
                            <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.B8B8B }} >Employee Name</Text>
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 14, color: colors.primaryColor }} >{data?.name_of_user}</Text>
                        </View>
                        <View>
                            <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.B8B8B }} >Department</Text>
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 14, color: colors.primaryColor }} >{data?.department_name}</Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.35, borderTopColor: colors.DBDBDB, borderTopWidth: 1, alignSelf: "center" }} >
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >Queue 2 of 8</Text>
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >{diffrenceBetweenDates == 0 ? "1" : diffrenceBetweenDates} Days </Text>
                        <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.B8B8B, marginRight: 10 }} >#{data?.id}</Text>
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
                    data={leaveApproval?.leave_requests?.filter((data) => data.status == 1)}
                    renderItem={(item, index) => LeaveCardComponent({ data: item?.item, index: item.index })}
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
                    data={leaveApproval?.leave_requests?.filter((data) => data.status == 0)}
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
                    data={leaveApproval?.leave_requests?.filter((data) => data.status == 2)}
                    renderItem={(item, index) => LeaveCardComponent({ data: item.item, index: item.index })} />
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
            <CustomHeader backIcon title={"Leave Approvals"} />
            {/* <View style={{ flex: 1, paddingTop: 20 }} >
                <FlatList
                    ListEmptyComponent={ListEmptyComponent}
                    directionalLockEnabled style={{ alignSelf: "center", }}
                    data={leaveApproval}
                    renderItem={LeaveCardComponent}
                />
            </View> */}
            {/* <TabViewComponent
                Screens={{ approved: Approved, pending: Pending, rejected: Rejected }}
                renderTabBar={renderTabBar}

                TabRoutes={TabData} /> */}

            <FlatList
                ListEmptyComponent={ListEmptyComponent}
                directionalLockEnabled style={{ alignSelf: "center", }}
                data={leaveApproval?.leave_requests?.filter((data) => data.status == 0)}
                renderItem={(item, index) => LeaveCardComponent({ data: item.item, index: item.index })} />

            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default LeaveApproval;