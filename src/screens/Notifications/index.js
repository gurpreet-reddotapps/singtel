import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, SafeAreaView, Text, Pressable, FlatList, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, readAllNotification, readNotification } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, ArrowBackIcon, ArrowForwardIcon, CommentOutlineIcon, HeartOutlineIcon, MoonIcon, NotificationBellIcon, StaticsIcon, SunIcon, TaskCompleteIcon, WeekOffIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, iosOpacity, width } from '../../assects/strings';
import { LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import { setNotifications } from '../../redux/actions/Notifications';
import routes from '../../routes/routes';
import moment from 'moment';
const Notifications = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [notificationsData, setNotificationsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { notification } = useSelector(state => state.notificationDetail);

    const [ArrayData, setArray] = useState([{ image: Images.an1, like: "1.1k", cmt: "59" },
    { image: Images.an2, like: "1.1k", cmt: "59" },
    { image: Images.an3, like: "1.1k", cmt: "59" },
    { image: Images.an4, like: "1.1k", cmt: "59" },
    { image: Images.an5, like: "1.1k", cmt: "59" },
    { image: Images.an6, like: "1.1k", cmt: "59" },
    { image: Images.an7, like: "1.1k", cmt: "59" },
    { image: Images.an8, like: "1.1k", cmt: "59" }
    ]);

    const [TabData] = useState([{ key: "view1", title: "Notifications", data: "0", color: colors.progressColor },
    { key: "view2", title: "Announcements", data: "0", color: colors.blue },
    ])

    useEffect(() => {
        navigation.addListener('focus', () => {
            setTimeout(() => {
                fetchNotifications()
            }, 1000)
        })

    }, [navigation])

    function fetchNotifications() {
        setLoading(true)
        getNotifications().then((res) => {
            setLoading(false)
            dispatch(setNotifications(res.data.notifications))
        });
    }


    const ListEmptyComponent = () => {
        return (
            <View style={{ height: height / 1.50, justifyContent: "center", alignItems: "center" }} >
                <NotificationBellIcon width={width} height={width / 2} />
                <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 24, color: colors.black }} >No Notifications Yet</Text>
                <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.transBlack, textAlign: "center", marginVertical: 10 }} > You have no notifications right now.Come back later</Text>
            </View>
        )
    }

    const onNotificationReadAll = () => {
        setLoading(true)
        readAllNotification().then((res) => {
            fetchNotifications()
        }).catch(() => setLoading(false))
    }


    const onNotificationRead = (id, type ,typeId, read) => {
        if (!read) {
            setLoading(true)
            const data = {
                notification_id: id
            }
            readNotification(data).then((res) => {
                setLoading(false)
                fetchNotifications()
                if (res?.data?.success) {
                    switch (type) {
                        case "check_out_reminder":
                            return navigation.navigate(routes.checkIncheckout)
                        case "check_in_reminder":
                            return navigation.navigate(routes.checkIncheckout)
                        case "leave_request":
                            return navigation.navigate(routes.leaveDetails, { id: typeId,flag:0,routeType:"approval"})
                        case "leave_request_comment":
                            return navigation.navigate(routes.leaveDetails, { id: typeId,flag:1 })
                        case "leave_request_approval":
                            return navigation.navigate(routes.leaveDetails, { id: typeId,flag:2})
                        default:
                            return
                    }
                }
            }).catch(() => setLoading(false))
        }
        else{
            switch (type) {
                case "leave_request":
                    return navigation.navigate(routes.leaveDetails, { id: typeId,flag:0,routeType:"approval"})
                case "leave_request_comment":
                    return navigation.navigate(routes.leaveDetails, { id: typeId,flag:1 })
                case "leave_request_approval":
                    return navigation.navigate(routes.leaveDetails, { id: typeId,flag:2})
                default:
                    return
            }
        }
    }

    function renderNotification() {
        return (
            <View style={{ flex: 1 }} >
                {notification?.length != 0 ? <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 15 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.black }} >Notifications ({notification?.length})</Text>
                    <Text onPress={() => onNotificationReadAll()} style={{ fontFamily: fonts.PoppinsLight, color: colors.B212529, fontSize: 12 }} >Mark all as read</Text>
                </View> : null}
                <FlatList ListEmptyComponent={ListEmptyComponent} data={notification} renderItem={({ item, index }) => {
                    const time = moment.utc(item.updated_at).local().startOf('seconds').fromNow()

                    return (
                        <Pressable onPress={() => onNotificationRead(item.id, item.type , item.entity_id, item.read)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 15, paddingVertical: 10, marginVertical: 1, backgroundColor: !item.read ? colors.transPrimayColor : null }} >
                            {item.read ?

                                <TaskCompleteIcon width={width / 20} height={width / 20} />
                                :
                                <View style={{ width: width / 21, height: width / 21, borderColor: colors.primaryColor, borderWidth: 1, borderRadius: 2 }} >

                                </View>}
                            <View style={{ flex: 1, paddingLeft: 10 }} >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{item.title}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsLight, fontSize: 9 }} >{time}</Text>
                                </View>
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular, fontSize: 10 }} >{item.body}</Text>
                            </View>
                        </Pressable>
                    )
                }} />
            </View>
        )
    }

    function renderAnnouncment({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate(routes.announcementsPage)} style={{ width: width / 2.43, height: width / 2.40, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, overflow: "hidden" }} >
                <ImageBackground style={{ flex: 1 }} source={item.image}  >
                    <ImageBackground style={{ flex: 1, alignItems: "center", justifyContent: "center" }} source={Images.opacity10} >
                        <View style={{ width: width / 2.43, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 10 }} >
                            <HeartOutlineIcon width={width / 20} height={width / 20} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{item.like}</Text>
                            <View style={{ width: 1, height: width / 20, backgroundColor: colors.white }} />
                            <CommentOutlineIcon width={width / 20} height={width / 20} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{item.cmt}</Text>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </Pressable>
        )
    }

    function Announcment() {
        return (
            <View style={{ flex: 1 }} >
                <FlatList
                    style={{ alignSelf: "center", paddingTop: 10 }}
                    numColumns={2}
                    data={ArrayData}
                    keyExtractor={item => item.like}
                    renderItem={renderAnnouncment} />

            </View>
        )
    }
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
    return (
        <View style={styles.container} >
            <CustomHeader title={"Notifications"} />

            {/* <TabViewComponent
                Screens={{ view1: renderNotification, view2: Announcment }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} /> */}

            {renderNotification()}

            {/* <LoaderComponet visible={loading} /> */}
        </View>

    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default Notifications;