import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLeaveBalanceDetails, getLeaveCategory, getLeavePolicy } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon, CloseRedIcon, MyRequestIcon, SickLeaveIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { getLeaveCategoryBgColors, hitSlop, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import CircularProgress from '../../component/CircularProgress';
import Icon from 'react-native-vector-icons/Ionicons';
import { PdfRedIcon } from '../../assects/Icons/leave';
import { SvgUri } from 'react-native-svg';
import { CalendarActiveIcon } from '../../assects/Icons/TabIcons';

const LeaveBalance = ({ navigation }) => {
    const [leavePolicyData, setLeavePolicyData] = useState(false);
    const [userLeaveBalance, setUserLeaveBalance] = useState([])
    const [loading, setLoading] = useState(false)
    const [userConsumedLeaveBalance, setUserConsumedLeaveBalance] = useState(null)
    const [leaveDetails, setLeaveDetails] = useState([])
    const [leaveDetailsKey, setLeaveDetailsKey] = useState(0)
    const [confirmModal, setConfirmModal] = useState(false)
    const [leaveCategoryId, setLeaveCategoryId] = useState("")
    const [leaveBalanceDetails, setLeaveBalanceDetails] = useState([])





    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const [showUnpaidLeaveAlert, setShowUnpaidLeaveAlert] = useState(false);
    const [leaveCategory, setLeaveCategory] = useState(false);

    const dispatch = useDispatch();



    const [TabData] = useState([{ key: "category", title: "Categories", data: "0", color: colors.progressColor },
    // { key: "unpaid", title: "Unpaid", data: "0", color: colors.blue },
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
            setUserLeaveBalance(res.data.available_leaves_details),
                setLeaveDetails(res.data.leaves_details)
            setLeaveBalanceDetails(res?.data)
            setLoading(false)
            setUserConsumedLeaveBalance(res.data.consumed_leaves_details)
        }).catch((err) => console.log("SDSDSDDDSD", err))
        getLeavePolicy().then((res) => {
            console.log("DSDDDD", res.data)
            setLeavePolicyData(res.data)
        })


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
    const leaveButtons = [{ title: "Annual Leave", icon: Images.leave_balance_btn, color: "#867BF5" },
    { title: "MC Leave", icon: Images.mcLeave, color: "#FF5B62" },
    { title: "Home Leave", icon: Images.homeLeave, color: "#4776E6" },
    { title: "WICA Leave", icon: Images.wicaLeave, color: "#20C5B1" }
    ]
    const ConfirmModal = () => {
        var ext = leaveDetails[leaveDetailsKey]?.image.split('.').pop();

        return (
            <Modal transparent visible={confirmModal}  >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width, height: "40%", elevation: 3, alignItems: "center", alignSelf: "center", backgroundColor: colors.white, borderTopLeftRadius: 15, borderTopRightRadius: 15 }, iosOpacity]} >
                        <View style={{ width: width, height: width / 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15 }} >
                            <View style={{ height: width / 7, flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                                {ext == "svg" ? <SvgUri style={{ alignSelf: "flex-end" }} width={width / 10.5} height={width / 10.5} uri={leaveDetails[leaveDetailsKey]?.image} /> : <Image style={{ width: width / 7.5, height: width / 7.5, alignSelf: "flex-end" }} source={{ uri: leaveDetails[leaveDetailsKey]?.image }} />}
                                {/* <CalendarActiveIcon width={width / 20} height={width / 20} /> */}
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginLeft: 15, fontSize: 13, marginTop: 15 }} >{leaveDetails[leaveDetailsKey]?.title}</Text>
                            </View>
                            <Icon onPress={() => setConfirmModal(false)} name={'close'} color={"#505050"} size={20} />
                        </View>
                        <View style={{ width: width / 1.30, height: 1, opacity: 0.8, backgroundColor: colors.C4C4C4, marginTop: 10 }} />
                        {/* <View style={{ width:width/1.20,flexDirection: "row" }} >
                            <View>
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular, marginLeft: 15, fontSize: 13 }} >Eligible</Text>
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginLeft: 15, fontSize: 13 }} >10</Text>
                            </View>
                            <View style={{marginLeft:width/4}} >
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular, marginLeft: 15, fontSize: 13 }} >Eligible</Text>
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginLeft: 15, fontSize: 13 }} >10</Text>
                            </View>
                        </View> */}
                        <FlatList style={{ marginTop: 10 }} contentContainerStyle={{ alignContent: "flex-start" }} numColumns={2} data={leavesData} renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: width / 2, marginVertical: 8 }} >
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular, marginLeft: 15, fontSize: 13 }} >{item.title}</Text>
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsSemiBold, marginLeft: 15, fontSize: 13 }} >{item.value}</Text>
                                </View>
                            )
                        }} />


                        <ButtonComponent onPress={() => { navigation.navigate(routes.applyNewLeave, { category: leaveCategoryId ,title:leaveDetails[leaveDetailsKey]?.title}), setConfirmModal(false) }} title={"Apply For Leave"} bgColor={colors.primaryColor} style={{ width: width / 1.40, marginBottom: 20, alignSelf: "center" }} />


                    </View>
                </View>
            </Modal>
        )
    }

    const leavesData = [
        // { title: "Eligible", value: leaveDetails[leaveDetailsKey]?.available}, 
        { title: "Earned", value: leaveDetails[leaveDetailsKey]?.total },
        { title: "Consumed", value: leaveDetails[leaveDetailsKey]?.consumed },
        { title: "Balance", value: leaveDetails[leaveDetailsKey]?.available },
        { title: "Carry forward leaves", value: leaveBalanceDetails?.detail?.total_carry_forward_leaves },
    ]

    const Category = () => {
        return (
            <View style={{ flex: 1, }} >
                <View  >
                    <FlatList style={{ alignSelf: "center", marginTop: width / 15 }} numColumns={2} data={userLeaveBalance} renderItem={({ item, index }) => {
                        var ext = item.image.split('.').pop();
                        return (
                            <Pressable
                                // onPress={()=> navigation.navigate(routes.applyNewLeave,{category:item.id})} 
                                onPress={() => { setLeaveDetailsKey(index), setConfirmModal(true), setLeaveCategoryId(item.id) }}
                                style={{ width: width / 2.7, height: width / 2.5, justifyContent: "space-between", padding: 10, borderRadius: 8, marginHorizontal: 15, marginVertical: 10, backgroundColor: getLeaveCategoryBgColors(index) }} >
                                {ext == "svg" ? <SvgUri style={{ alignSelf: "flex-end" }} width={width / 7.5} height={width / 7.5} uri={item.image} /> : <Image style={{ width: width / 7.5, height: width / 7.5, alignSelf: "flex-end" }} source={{ uri: item.image }} />}
                                <View>
                                    <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium }} >{item.title}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                        <View  >
                                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white, fontSize: 10 }} >Consumed</Text>
                                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }} >{leaveDetails[index]?.consumed}</Text>
                                        </View>
                                        <View  >
                                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white, fontSize: 10 }} >Balance</Text>
                                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }} >{leaveDetails[index]?.available}</Text>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        )
                    }} />
                </View>
                <View style={{ flex: 1 }} />
                {/* <ButtonComponent onPress={() => navigation.navigate(routes.applyNewLeave)} title={"Apply For Leave"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} /> */}
            </View>
        )
    }

    const Unpaid = () => {


        return (
            <View style={{ flex: 1, }} >
                <View  >
                    {/* <FlatList style={{ alignSelf: "center", marginTop: width / 15 }} numColumns={2} data={userLeaveBalance} renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: width / 2.7, height: width / 2.5, justifyContent: "space-between", padding: 10, borderRadius: 8, marginHorizontal: 15, marginVertical: 10, backgroundColor: getLeaveCategoryBgColors(index) }} >
                                <SvgUri style={{ alignSelf: "flex-end" }} width={width / 7.5} height={width / 7.5} uri={item.image} />
                                <View>
                                    <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium }} >{item.title}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                        <View  >
                                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white, fontSize: 10 }} >Consumed</Text>
                                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }} >{userLeaveBalance[index].count}</Text>
                                        </View>
                                        <View  >
                                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white, fontSize: 10 }} >Balance</Text>
                                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }} >{item.count}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }} /> */}
                </View>
                <View style={{ flex: 1 }} />
                <ButtonComponent onPress={() => setShowUnpaidLeaveAlert(true)} title={"Apply For Unpaid Leave"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} />
            </View>
        )
    }
    const LeavePolicy = () => {
        return (
            <View style={{ flex: 1, alignSelf: "center" }} >
                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, paddingHorizontal: 10, textAlign: "center", marginTop: 15 }} >Last updated on {moment(leavePolicyData?.update_at).format("DD MMM YYYY")}</Text>
                <Pressable onPress={() => Linking.openURL(leavePolicyData?.leave_policy_url)} style={{ width: width / 1.10, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <PdfRedIcon width={width / 18} height={width / 18} />
                    <Text style={{ width: width / 1.50, color: colors.B212529, fontFamily: fonts.PoppinsRegular, marginVertical: 10, paddingHorizontal: 10 }} >{"Leave policy.pdf"}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        {/* < width={12} height={12} /> */}
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, fontSize: 12, top: 1.5, marginHorizontal: 5 }} >Download</Text>
                    </View>
                </Pressable>
                {/* <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, paddingHorizontal: 15, textAlign: "left", marginVertical: 15 }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text> */}
            </View>
        )
    }



    function RenderTab({ item, index, data }) {
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
    }
    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => <RenderTab data={data} item={item} index={index} />} />
            </View>
        )
    }

    function UnpaidLeaveConfirmModal() {
        return (
            <Modal visible={showUnpaidLeaveAlert} transparent  >
                <TouchableOpacity onPress={() => setShowUnpaidLeaveAlert(false)} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 25, backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.15, height: width / 1.50, justifyContent: "space-between", paddingBottom: 10, alignItems: "center", elevation: 5, borderRadius: 10, backgroundColor: colors.white }, iosOpacity]} >
                        {/* <Text style={{fontFamily:fonts.PoppinsMedium,color:colors.black,alignSelf:"flex-end",margin:10}} >X</Text> */}
                        <Pressable hitSlop={hitSlop} onPress={() => setShowUnpaidLeaveAlert(false)} style={{ margin: 10, alignSelf: "flex-end" }} >
                            <Icon name='close' size={20} color={"#505050"} />
                        </Pressable>

                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 14, textAlign: "center", paddingHorizontal: 15 }} >Unpaid leaves are deducted directly from employees payroll.
                            Are you sure you would like to apply for an unpaid leave</Text>
                        <ButtonComponent onPress={() => { setShowUnpaidLeaveAlert(false), navigation.navigate(routes.applyNewLeave, { flag: "unpaid" }) }} title={"Continue"} bgColor={colors.primaryColor} style={{ width: width / 1.30 }} />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Leave Balance"} />
            {userConsumedLeaveBalance ? <TabViewComponent
                Screens={{ category: Category, leavepolicy: LeavePolicy }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} /> : null}



            <UnpaidLeaveConfirmModal />
            <ConfirmModal />

            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default LeaveBalance;