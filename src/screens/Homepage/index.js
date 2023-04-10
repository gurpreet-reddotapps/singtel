import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, NativeModules, Modal, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { assignFcmToken, generatePaySlip, getAttendanceDateRangeWise, getHomeDetails, getLeaveBalanceDetails, getLeaveCalendar, getNotifications, getProfilePictureUrl, getUserCanAccess, sendNotification, updateProfilePicture, uploadProfilePictureApi } from '../../api';
import { androidPermission } from '../../appPermission/permissions';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackIcon, ArrowForwardIcon, BigfootLogoIcon, BriefcaseFillIcon, BriefcaseFillWhiteIcon, BriefcaseIcon, CardCalendarIcon, DollorIcon, DoubleBedIcon, LeavesIcon, MenuIcon, VmoLogoIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { hitSlop, iosOpacity, width } from '../../assects/strings';
import { GetLocationApi } from '../../component/GetLocation';
import useUpdateEffect from '../../customeHooks/useUpdateEffect';
import { setHomeData } from '../../redux/actions/Home';
import { setNotifications } from '../../redux/actions/Notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import { saveLocationName, saveUserCurrentRegion, saveUserLatLng } from '../../redux/actions/userLocation';
import ImagePicker from 'react-native-image-crop-picker';
import routes from '../../routes/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import Geocoder from 'react-native-geocoding';
import Dots from './dots';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geolocation from '@react-native-community/geolocation'
import VersionCheck from 'react-native-version-check';
import DeviceInfo from 'react-native-device-info';
import SpInAppUpdates, {
    NeedsUpdateResponse,
    IAUUpdateKind,
    StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { request, requestMultiple, openSettings, check, PERMISSIONS } from 'react-native-permissions';
const inAppUpdates = new SpInAppUpdates(
    false // isDebug
);
import NavigationString from '../Vmo/routes/NavigationString';
import { setJobId, setOrderId } from '../../redux/actions/Job';
import CameraScreen from './FaceCamera';
import { storeUserAccessData } from '../../redux/actions/userAccess';

Geocoder.init("AIzaSyDEaOuvObxQCBS2cuachAoNRfV9__guii0");

const HomePage = ({ navigation, route }) => {

    const BASEURL = NativeModules.RNConfig.env == "prod" ? "https://api.piano.sg/api" :
        NativeModules.RNConfig.env == "staging" ? "https://cristofori-hrms.reddotapps.com.sg" :
            "https://cristofori-internal-hrms.reddotapps.com.sg"

    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const time = moment().subtract(1, 'days').format('hh:mm A')
    const [timeWithDay, setTimewithDay] = useState(moment().format('ddd DD MMM YYYY'))
    const [tempImage, setTempImage] = useState(null);
    const [activeDot, setActiveDot] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(moment().format("MMM YYYY"))
    const [markedDates, setMarkedDates] = useState({});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"))
    const [currentDateForCalendar, setCurrentDateForCalendar] = useState(moment().format("YYYY-MM-DD"))
    const [todayDate, setTodayDate] = useState(moment(currentDate))
    const [attachmentSelecterVisible, setAttachmentSelecterVisible] = useState(false);
    const [profilePhotoModal, setProfilePhotoModal] = useState(false);
    const [salarySlipPdf, setSalarySlip] = useState({});


    let tempMarkedDates = {}

    console.log("homeData", homeData)
    const pickerOption = [
        { title: "Camera", onpress: () => openCamera() },
        { title: "Photo Gallery", onpress: () => openGallery() },

    ]
    useEffect(() => {
        getUserCanAccess().then((res) => {
            dispatch(storeUserAccessData(res?.data?.can_access))
            console.log("getUserCanAccess", res?.data)
        })
        inAppUpdates.checkNeedsUpdate().then((result) => {
            if (result.shouldUpdate) {
                let updateOptions = {};
                if (Platform.OS === 'android') {
                    // android only, on iOS the user will be promped to go to your app store page
                    updateOptions = {
                        updateType: IAUUpdateKind.IMMEDIATE,
                    };
                }
                inAppUpdates.startUpdate({ forceUpgrade: true, updateType: IAUUpdateKind.FLEXIBLE }); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
            }
        });
    })

    useEffect(() => {

        setTimeout(() => {
            // BackgroundAndQuitNotification();
            CheckCameraPermissionOnIos()
            getLocationPermisson();
            getMarkedDate();
            SetFCM()
            getHomeDetails().then((res) => {
                console.log("getHomeDetails", res.data)
                // if(res.data.request_pin){
                //     navigation.navigate(routes.setUpYourPin)
                // }

                CheckProfilePicture(res.data.user.profile_pic)
                dispatch(setHomeData(res.data))
            }).catch((res) => { setLoading(false) })
            fetchNotifications()
        }, 500)
    }, [])



    function GenerateSalarySlip() {
        setLoading(true)
        generatePaySlip({ url: BASEURL +homeData?.payslip_url }).then((res) => {
            setLoading(false)
            navigation.navigate(routes.webviewScreen, { url: res?.data?.url })
        })
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            setTimeout(() => {
                if (homeData) {
                    if (!homeData?.request_pin) {
                        if (!homeData?.user?.profile_pic) {
                            setProfilePhotoModal(true)
                        }
                    }
                }
            }, 500);
        })

    }, [])

    function CheckCameraPermissionOnIos() {
        if (Platform.OS == "ios") {
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((status) => {
                console.log('Camera', status[PERMISSIONS.IOS.CAMERA]);
                console.log('FaceID', status[PERMISSIONS.IOS.MEDIA_LIBRARY]);
            })
        }
    }



    function CheckProfilePicture(profilePic) {

        if (homeData) {
            if (homeData?.request_pin) {
                navigation.navigate(routes.setUpYourPin)

            }
            else {
                if (!profilePic) {
                    setProfilePhotoModal(true)
                }
            }
        }
    }



    function BackgroundAndQuitNotification() {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("First Opend", remoteMessage)
            if (remoteMessage) {
                setLoading(true)
                deepLink(remoteMessage.data?.entity_type, remoteMessage.data?.leave_request_id, remoteMessage.data?.job_id, remoteMessage.data?.order_id)
            }
        });

        messaging().onMessage(remoteMessage => {
            console.log("onMessage", remoteMessage)
            if (remoteMessage) {
                setLoading(true)
                deepLink(remoteMessage.data?.entity_type, remoteMessage.data?.leave_request_id, remoteMessage.data?.job_id, remoteMessage.data?.order_id)
            }
        })

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                console.log("getInitialNotification", remoteMessage)
                if (remoteMessage) {
                    setLoading(true)
                    deepLink(remoteMessage.data?.entity_type, remoteMessage.data?.leave_request_id, remoteMessage.data?.order_id)
                }
            })
    }


    function deepLink(type, typeId, JobID, OrderID) {
        console.log("Test Job", type, JobID, OrderID)
        if (type == "job") {
            if (JobID !== undefined) {
                dispatch(setJobId(JobID))
            }
        } else if (type == "order") {
            if (OrderID !== undefined) {
                dispatch(setOrderId(OrderID))
            }
        }
        setLoading(false)
        switch (type) {
            case "check_out_reminder":
                return navigation?.navigate(routes.checkIncheckout)
            case "check_in_reminder":
                return navigation?.navigate(routes.checkIncheckout)
            case "leave_request":
                return navigation.navigate(routes.leaveDetails, { id: typeId, flag: 0 })
            case "leave_request_comment":
                return navigation.navigate(routes.leaveDetails, { id: typeId, flag: 1 })
            case "leave_request_approval":
                return navigation.navigate(routes.leaveDetails, { id: typeId, flag: 2 })
            case "job":
                return navigation.navigate(NavigationString.JOB_DETAIL_SCREEN, { id: JobID })
            case "order":
                return navigation.navigate(NavigationString.ADMIN_JOB_DETAIL, { id: OrderID })
            default:
                return
        }
    }

    const SetFCM = async () => {

        let fcmtoken = await AsyncStorage.getItem("fcmtoken")

        let data = {
            fcm_token: fcmtoken,
            device_type: Platform.OS,
            app_version: DeviceInfo.getVersion()

        }
        assignFcmToken(data).then((res) => {
            console.log(res?.data);
            console.log("FCM Token Saved");
        }).catch(err => { return err; });
    }



    function fetchNotifications() {
        getNotifications().then((res) => {
            dispatch(setNotifications(res.data.notifications))
        });
    }



    async function getMarkedDate(startDate, endDate) {
        let monthStartDate = moment().clone().startOf('months').format("YYYY-MM-DD");
        let monthEndDate = moment().clone().endOf('months').format("YYYY-MM-DD");
        // Platform.OS == "android" ? setLoading(true) : null
        const dataMonthwise = {
            "start_date": startDate ? startDate : monthStartDate,
            "end_date": endDate ? endDate : monthEndDate
        }
        console.log("SJDKSHJLKDHSJKDHSJKDHSLJKDHSJKDHSJKDHJKSDHJKSHDJKSHDJKSHDJK", dataMonthwise)
        getLeaveCalendar(dataMonthwise).then((res) => {
            console.log("getLeaveCalendar", res?.data)
            setLoading(false)
            res.data.leave_requests?.map(async (data, key) => {

                tempMarkedDates[data.date] = await data.status == 0 ? calendarStyle.LateStyles :
                    data.status == 1 ? calendarStyle.onTimeStyles :
                        data.status == 2 ? calendarStyle.absentStyles :
                            null

                setTimeout(() => {
                    setMarkedDates(tempMarkedDates)

                }, 500)

                // console.log("DMLSKDJLKSDJLKSJDLKSJDLKSJLKD", tempMarkedDates)

            }).catch(() => setLoading(false))



        })

    }

    function onScroll(event) {
        //console.log("Y", event.nativeEvent.contentOffset.y);

        const scrollPositionX = event.nativeEvent.contentOffset.x
        const offset = 115

        if (scrollPositionX >= 0 && scrollPositionX <= parseInt(width - offset)) {
            setActiveDot(1)
        } else if (scrollPositionX >= (width - offset) && scrollPositionX <= ((width * 2) - offset)) {
            setActiveDot(2)
        } else if (scrollPositionX >= ((width * 2) - offset) && scrollPositionX <= (width * 3) - offset) {
            setActiveDot(3)
        } else if (scrollPositionX >= ((width * 3) - offset) && scrollPositionX <= (width * 4) - offset) {
            setActiveDot(4)
        } else if (scrollPositionX >= ((width * 4) - offset) && scrollPositionX <= (width * 5) - offset) {
            setActiveDot(5)
        } else if (scrollPositionX >= ((width * 5) - offset) && scrollPositionX <= (width * 6) - offset) {
            setActiveDot(6)
        } else if (scrollPositionX >= ((width * 6) - offset) && scrollPositionX <= (width * 7) - offset) {
            setActiveDot(7)
        } else if (scrollPositionX >= ((width * 7) - offset) && scrollPositionX <= (width * 8) - offset) {
            setActiveDot(8)
        } else if (scrollPositionX >= ((width * 8) - offset) && scrollPositionX <= (width * 9) - offset) {
            setActiveDot(9)
        } else if (scrollPositionX >= ((width * 9) - offset) && scrollPositionX <= (width * 10) - offset) {
            setActiveDot(10)
        }

    }



    async function getLocationPermisson() {
        if (Platform.OS == "android") {
            await androidPermission().then((res) => {
                if (res) {
                    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                        interval: 10000,
                        fastInterval: 5000,
                    }).then(async (data) => {
                        if (data == "already-enabled" || data == "enabled") {
                            await GetLocationApi().then((res) => {
                                console.log("GetLocationApi", res)
                                let currentRegion = {
                                    latitude: res.coords.latitude,
                                    longitude: res.coords.longitude,
                                    latitudeDelta: 0.001,
                                    longitudeDelta: 0.001,
                                };
                                // Geocoder.from(res.coords.latitude, res.coords.longitude).then(json => {
                                //     var addressComponent = json.results[1].formatted_address;
                                //     dispatch(saveLocationName(addressComponent))
                                // })
                                //     .catch((err) => console.log("Geocoding error", err))
                                dispatch(saveUserCurrentRegion(currentRegion))
                                dispatch(saveUserLatLng({ latitude: res.coords.latitude, longitude: res.coords.longitude }))
                            })
                        }
                    }).catch((err) => {
                        console.log("err", err)
                    });
                }
            })
        }
        else {
            Geolocation.requestAuthorization();
            await GetLocationApi().then((res) => {
                let currentRegion = {
                    latitude: res.coords.latitude,
                    longitude: res.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                };
                // Geocoder.from(res.coords.latitude, res.coords.longitude).then(json => {
                //     var addressComponent = json.results[1].formatted_address;
                //     dispatch(saveLocationName(addressComponent))
                //     console.log("Ios Location name", addressComponent)
                // })
                dispatch(saveUserCurrentRegion(currentRegion))
                dispatch(saveUserLatLng({ latitude: res.coords.latitude, longitude: res.coords.longitude }))
            })
        }
    }








    const cardArray1 = Platform.OS == "android" ? NativeModules.RNConfig.env == "staging" || NativeModules.RNConfig.env == "dev" ?
        [
            { id: "0", title: "Attendance", icon: LeavesIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => navigation.navigate(routes.attendanceManegmentStack), isEnabled: true },
            { id: "1", title: "Recruitment", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.recriutmentStack), isEnabled: homeData?.is_recruitment_access },
            // { id: "2", title: "Payroll", icon: DollorIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => alert("In Progress"), isEnabled: true },
            { id: "3", title: "VMO", icon: VmoLogoIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.vmoStack), isEnabled: homeData?.is_vmo_user },
            { id: "3", title: "My School", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.schoolManagmentStack), isEnabled: true },
            { id: "3", title: "Training", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.trainingWebviewScreen), isEnabled: true },


        ]

        :

        [
            { id: "0", title: "Attendance", icon: LeavesIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => navigation.navigate(routes.attendanceManegmentStack), isEnabled: true },
            { id: "1", title: "Recruitment", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.recriutmentStack), isEnabled: homeData?.is_recruitment_access },
            // { id: "2", title: "Payroll", icon: DollorIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => alert("In Progress"), isEnabled: true },
            { id: "3", title: "VMO", icon: VmoLogoIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.vmoStack), isEnabled: homeData?.is_vmo_user },
            { id: "3", title: "My School", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.schoolManagmentStack), isEnabled: true },
            { id: "3", title: "Training", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.trainingWebviewScreen), isEnabled: true },

        ]
        :

        [
            { id: "0", title: "Attendance", icon: LeavesIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => navigation.navigate(routes.attendanceManegmentStack), isEnabled: true },
            { id: "1", title: "Recruitment", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.recriutmentStack), isEnabled: homeData?.is_recruitment_access },
            // { id: "2", title: "Payroll", icon: DollorIcon, progress: "", image: Images.dashboard_cardYellow, request: "10", onPress: () => alert("In Progress"), isEnabled: true },
            { id: "3", title: "VMO", icon: VmoLogoIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.vmoStack), isEnabled: homeData?.is_vmo_user },
            { id: "3", title: "My School", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.schoolManagmentStack), isEnabled: true },
            { id: "3", title: "Training", icon: BriefcaseFillWhiteIcon, progress: "", image: Images.dashboard_cardGreen, request: "10", onPress: () => navigation.navigate(routes.trainingWebviewScreen), isEnabled: true },

        ]





    function RequestCards({ item, index }) {
        return (
            <ImageBackground style={{ width: width / 3, height: width / 2, justifyContent: "space-between", marginHorizontal: index == 0 ? 15 : 5 }} source={item?.image} >
                <Text style={{ backgroundColor: colors.white, width: width / 5, borderRadius: 10, alignSelf: "flex-end", marginTop: 15, marginRight: 10, color: colors.black, fontSize: 10, lineHeight: 15, fontFamily: fonts.PoppinsRegular, textAlign: "center" }} >{item.request} Request</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
                    <View style={{ marginBottom: width / 15 }} >
                        <item.icon width={15} height={20} />
                    </View>
                    <Text style={{ width: width / 4, fontFamily: fonts.PoppinsSemiBold, color: colors.white, fontSize: 16 }} >{item.title}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, paddingBottom: 10 }} >
                    <Text style={{ fontSize: 10, fontFamily: fonts.PoppinsLight, color: colors.white }} >Progress</Text>
                    <View style={{ width: width / 4, height: 2, backgroundColor: colors.white, borderRadius: 10 }} />
                    <Text style={{ fontSize: 10, fontFamily: fonts.PoppinsLight, color: colors.white, alignSelf: "flex-end" }} >30%</Text>
                </View>
            </ImageBackground>
        )
    }

    function ModuleButtons({ item, index }) {
        if (item.isEnabled)
            return (
                <Pressable hitSlop={hitSlop} onPress={item.onPress} style={{ alignItems: "center" }} >
                    <LinearGradient colors={[colors.primaryColor, colors.primaryColor]} style={{ width: width / 7, height: width / 7, alignItems: "center", justifyContent: "center", borderRadius: 12, marginHorizontal: 15 }} >
                        <item.icon width={width / 15} height={width / 15} />
                    </LinearGradient>
                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginTop: 10, fontSize: 12 }} >{item.title}</Text>
                </Pressable>
            )
        else return null
    }

    function AttachmentSelector() {
        return (
            <Modal visible={attachmentSelecterVisible} transparent >
                <Pressable onPress={() => setAttachmentSelecterVisible(false)} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 10, backgroundColor: "#00000099" }} >
                    <View style={{ width: width / 1.05, height: width / 3.5, overflow: "hidden", backgroundColor: colors.white, marginBottom: 7, borderRadius: 10 }} >
                        <FlatList ItemSeparatorComponent={() => <View style={{ width: width / 1.05, height: 1, backgroundColor: colors.B212529, opacity: 0.2 }} />} data={pickerOption} renderItem={({ item, index }) => {
                            return (
                                <Pressable onPress={item.onpress} style={{ width: width / 1.05, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }} >
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor }} >{item.title}</Text>
                                </Pressable>
                            )
                        }} />
                    </View>

                    <Pressable onPress={() => setAttachmentSelecterVisible(false)} style={{ width: width / 1.05, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderRadius: 10 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 14 }} >Cancel</Text>
                    </Pressable>
                </Pressable>

            </Modal>
        )
    }



    async function openGallery() {
        setTimeout(() => {
            setAttachmentSelecterVisible(false)
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                mediaType: "photo",

                cropping: true,
                cropperCircleOverlay: true,
            }).then(image => {
                setTempImage(image.path)
                getImageUrl(image)
            });
        }, 200)

    }


    async function openCamera() {
        setTimeout(() => {
            setAttachmentSelecterVisible(false)
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                mediaType: "photo",

                cropping: true,
                cropperCircleOverlay: true,
            }).then(image => {
                setTempImage(image.path)
                getImageUrl(image)
            });
        }, 200)
    }
    async function getImageUrl(image) {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop()
        });
        await getProfilePictureUrl(formData).then((res) => {
            if (res.data.success) {
                const data = {
                    profile_pic_url: res.data.url
                }
                updateProfilePicture(data).then((res) => {
                    if (res.data.success) {
                        setLoading(false)
                        getHomeDetails().then((res) => {
                            if (res.data?.request_pin) {
                                navigation.navigate(routes.setUpYourPin)
                            }
                            dispatch(setHomeData(res.data))
                        })
                        ShowSuccessMessage("Profile picture updated successfully")
                    }
                    else {
                        setLoading(false)
                        ShowErrorMessage("Profile picture updation failed")
                    }
                }).catch((res) => setLoading(false))
            }
            else {
                setLoading(false)
                ShowErrorMessage("Profile picture updation failed")
            }
        })
            .catch((err) => { setLoading(false) })
    }




    const createFormData = async (FileData) => {
        const data = new FormData();
        FileData.map(FileData => {
            data.append('file', {
                uri: Platform.OS === 'ios' ? FileData.uri.replace('file://', '') : FileData.uri,
                name: FileData.name,
                fileName: 'File',
                type: FileData.type,
            });
            setdocName(FileData.name)
        })
        return data;
    };

    const silderData = [{ title: "My Attendance", image: Images.my_att_trans, content: renderAttendane() },
    { title: "Leave calendar", image: Images.leave_cal_trans, content: renderCalender() },
    // { title: "My Tasks", image: Images.my_task_trans, content: renderMyTask() },
    { title: "Payroll Details", image: Images.payroll_trans, content: renderPayroll() }
    ]




    function renderIndicators({ item, index }) {
        return (
            <Pressable onPress={() => handleConfirms()} style={{ width: width / 5, height: 20, paddingVertical: 1, marginHorizontal: 5, borderRadius: 2, backgroundColor: item.color, alignItems: "center", justifyContent: "center" }} >
                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsRegular, }} >{item.title}</Text>
            </Pressable>
        )
    }


    function renderCalender() {
        return (
            <View style={{ flex: 1 }} >
                <Calendar
                    initialDate={currentDateForCalendar}
                    style={{
                        borderWidth: 0,
                        borderColor: 'gray',
                        width: width / 1.25,
                        alignSelf: "center",
                    }}
                    markedDates={markedDates}
                    markingType="custom"
                    onMonthChange={(data) => {
                        setCurrentMonth(moment(data.dateString).format("MMM YYYY"))
                        getMarkedDate("2023-" + moment(data.dateString).format("MM") + "-01", "2023-" + moment(data.dateString).format("MM") + "-30")
                    }}
                    headerStyle={{ width: width / 1.25, justifyContent: "center", flexDirection: "column", alignSelf: "center" }}
                    renderHeader={(data) => {
                        return (
                            <Pressable onPress={() => setDatePickerVisibility(true)} style={{ width: width / 2, alignItems: "center" }} >
                                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{currentMonth}</Text>
                            </Pressable>
                        )
                    }}

                    renderArrow={(data) => {
                        if (data == "left") {
                            return (
                                <ArrowBackIcon width={width / 30} height={width / 30} />
                            )
                        }
                        else {
                            return (
                                <ArrowForwardIcon width={width / 30} height={width / 30} />
                            )
                        }
                    }}
                    theme={{
                        weekVerticalMargin: 0,
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: 'black',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#ffffff',
                        selectedDayTextColor: '#000000',
                        todayTextColor: '#ffffff',
                        todayBackgroundColor: "#155B9F",
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        // 'stylesheet.calendar.header':{
                        //     week:{
                        //         height:width,
                        //         backgroundColor:'red'
                        //     }
                        // },
                        'stylesheet.day.basic': {
                            'base': {
                                height: width / 20,
                                width: width / 20,
                                alignItems: "center",
                                justifyContent: 'center'
                            }
                        },

                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 10,
                        textMonthFontSize: 12,
                        textDayHeaderFontSize: 10
                    }}
                />
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 2 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.green, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Approved</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.yellow, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Pending</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <View style={{ width: 10, height: 10, borderRadius: 100, borderWidth: 2.5, borderColor: colors.warningRed, bottom: 2, marginHorizontal: 5 }} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >Rejected</Text>
                    </View>
                </View>
            </View>
        )
    }


    function renderAttendane() {
        const checkinTime = moment(homeData?.check_in_details?.check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_in_time).format("HH:mm")
        const checkoutTime = moment(homeData?.check_in_details?.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_out_time).format("HH:mm")
        return (
            <View style={{ flex: 1 }} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: width / 20 }} >
                    <View  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >In</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 18, fontFamily: fonts.PoppinsBold }} >{checkinTime}</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "flex-end" }}  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >Out</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 18, fontFamily: fonts.PoppinsBold }} >{checkoutTime}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >Total</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 18, fontFamily: fonts.PoppinsBold }} >{homeData?.check_in_details?.total_working_hours}</Text>
                    </View>
                </View>


                <View style={{ borderBottomColor: colors.gray, borderBottomWidth: 0.5, marginHorizontal: 15 }} />

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 20 }} >
                    <View  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >Late</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 15, fontFamily: fonts.PoppinsBold }} >{homeData?.late_timing}</Text>
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }}  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >UT</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 15, fontFamily: fonts.PoppinsBold }} >{homeData?.ut_timing}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}  >
                        <Text style={{ color: colors.gray, fontSize: 12 }} >OT</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 15, fontFamily: fonts.PoppinsBold }} >{homeData?.ot_timing}</Text>
                    </View>
                </View>

                <Text onPress={() => navigation.navigate(routes.myHistory)} style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "center", textDecorationLine: "underline", marginTop: Platform.OS == "android" ? 15 : width / 10 }} >View History</Text>


            </View>
        )
    }

    function renderMyTask() {
        return (
            <View style={{ flex: 1 }} >
                <View style={{ width: width / 1.30, height: width / 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 15 }} >
                    <View style={{ width: 3, height: width / 6, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#4776E6" }} />
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.black, fontSize: 12, marginVertical: 2 }} >Interview for safety coordinator-PSA post</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.black, fontSize: 12, marginVertical: 2 }} >10:00-12:00</Text>
                        <View style={{ width: width / 1.92, height: 3, borderRadius: 10, backgroundColor: '#4776E6', marginTop: 5 }} />
                    </View>
                </View>

                <View style={{ borderBottomColor: colors.gray, borderBottomWidth: 0.5, marginHorizontal: 15 }} />

                <View style={{ width: width / 1.30, height: width / 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginVertical: 15 }} >
                    <View style={{ width: 3, height: width / 6, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#20C5B1" }} />
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.black, fontSize: 12, marginBottom: 10 }} >Team meeting</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.black, fontSize: 12, marginVertical: 2 }} >10:00-12:00</Text>
                        <View style={{ width: width / 1.92, height: 3, borderRadius: 10, backgroundColor: 'gray', marginTop: 5 }} />
                    </View>
                </View>

                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "center", textDecorationLine: "underline", }} >View History</Text>


            </View>
        )
    }

    function renderPayroll() {
        return (
            <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-between" }} >
                <View style={{ width: width / 1.30, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, paddingVertical: width / 20 }} >
                    {/* <View  >
                        <Text style={{ color: colors.gray, fontSize: 16 }} >Last Pay</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 20, fontFamily: fonts.PoppinsBold }} >0.00</Text>
                    </View> */}
                    <View style={{ alignItems: "center", justifyContent: "center" }}  >
                        <Text style={{ color: colors.gray, fontSize: 16 }} >Net Pay for Last Month</Text>
                        <Text style={{ color: colors.primaryColor, fontSize: 20, fontFamily: fonts.PoppinsBold }} >S${homeData?.net_pay}</Text>
                    </View>
                </View>
                <Text onPress={() => GenerateSalarySlip()} style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "center", textDecorationLine: "underline", marginBottom: 10 }} >View Salary Slip</Text>

            </View>
        )
    }

    const handleConfirm = (date) => {
        setTodayDate(moment(moment(date).format("YYYY-MM-DD")))
        setCurrentDateForCalendar(moment(date).format("YYYY-MM-DD"))
        setCurrentDate(moment(date).format("YYYY-MM-DD"))
        hideDatePicker();
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);

    };
    function uploadProfilePic() {
        if (Platform.OS == "android") {
            check(PERMISSIONS.ANDROID.CAMERA).then((res) => {
                if (res == "granted") {
                    setProfilePhotoModal(false)
                    navigation.navigate(routes.cameraScreen)
                }
                else {
                    openSettings().then((res) => {
                        console.log("Done")
                    })
                }
            })

        }
        else {
            check(PERMISSIONS.IOS.CAMERA).then((res) => {
                if (res == "granted") {
                    setProfilePhotoModal(false)
                    navigation.navigate(routes.cameraScreen)
                }
                else {
                    openSettings().then((res) => {
                        console.log("Done")
                    })
                }
            })
        }
    }
    function ProfilePicUploadModal() {
        return (
            <Modal transparent visible={profilePhotoModal} >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.20, height: width / 3, flexDirection: "column", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.white, borderRadius: 10, elevation: 3 }, iosOpacity]} >
                        <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium }} >Upload profile picture</Text>

                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, paddingHorizontal: 10, textAlign: "center" }} >Please upload a photo of yourself that clearly shows your face</Text>
                        <Pressable
                            onPress={() => uploadProfilePic()}
                            // onPress={() => { setProfilePhotoModal(false), navigation.navigate(routes.cameraScreen) }} 
                            style={{ width: width / 1.20, height: width / 8, alignItems: "center", justifyContent: "center", borderTopColor: colors.primaryColor, borderTopWidth: 1 }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }}  >Upload</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ProfilePicUploadModal />

            {Platform.OS == "ios" ? <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} /> : null}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
                <View style={{ width: width, height: width / 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }} >
                    <Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={() => navigation.openDrawer()} >
                        <MenuIcon width={width / 15} height={width / 15} />
                    </Pressable>
                    {/* <BigfootLogoIcon width={width / 5} height={width / 7} /> */}
                    {homeData?.logo == "" ? <Image style={{ width: width / 5, height: width / 5, resizeMode: "contain" }} source={Images.logo} /> : <Image style={{ width: width / 5, height: width / 7, resizeMode: "contain" }} source={{ uri: homeData?.logo }} />}




                </View>

                <View style={[{ width: width / 1.20, height: width / 3, alignItems: "center", justifyContent: "center", elevation: 10, borderRadius: 10, marginTop: width / 15, backgroundColor: colors.primaryColor, alignSelf: "center" }, iosOpacity]} >
                    {/* <ImageBackground style={{ width: width / 1.20, height: width / 3, alignItems: "center" }} resizeMode="contain" source={Images.transparentFoot} > */}

                    <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate(routes.cameraScreen)} style={{ width: width / 4, height: width / 4, borderRadius: 100, position: "absolute", bottom: width / 4.5 }}  >
                        <Image style={{ width: width / 4, height: width / 4, borderRadius: 100, position: "absolute" }} source={((homeData?.user?.profile_pic == null || homeData?.user?.profile_pic == "") && tempImage == null) ? Images.vicePresident : homeData?.user?.profile_pic == null ? { uri: tempImage } : { uri: homeData?.user?.profile_pic }} />
                        <Icon name='create' color={"#ccc"} size={20} style={{ marginTop: width / 6, marginLeft: width / 5, zIndex: 1 }} />
                    </TouchableOpacity>


                    <View style={{ width: width / 1.20, height: width / 4.5, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", marginTop: width / 9 }} >
                        <Text numberOfLines={1} style={{ color: colors.white, fontFamily: fonts.PoppinsRegular, fontSize: 17, top: 5 }} >{homeData?.user?.name}</Text>
                        <Text numberOfLines={1} style={{ color: colors.white, fontFamily: fonts.PoppinsRegular, fontSize: 15 }} >{homeData?.user?.role_name}</Text>
                        <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsLight, fontSize: 14 }} >{timeWithDay}  </Text>
                        {/* {homeData?.shift_timings == "Invalid date - Invalid date" ? null : "| " + homeData?.shift_timings} */}
                    </View>
                    {/* </ImageBackground> */}
                </View>

                {/* <FlatList style={{ marginVertical: width / 15 }} horizontal data={cardArray} renderItem={RequestCards} /> */}

                <FlatList style={{ marginTop: width / 15, marginBottom: 10, alignSelf: "center" }} horizontal data={cardArray1} renderItem={ModuleButtons} />



                <View style={{ width: width / 1.10, alignSelf: "center", borderRadius: 15, overflow: "hidden", marginTop: 10 }} >
                    <FlatList showsHorizontalScrollIndicator={false} scrollEventThrottle={70} onScroll={(s) => onScroll(s)} horizontal pagingEnabled={true} data={silderData} renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: width / 1.10, height: width / 1.30, alignItems: "center", backgroundColor: colors.primaryColor }} >
                                <View style={{ width: width / 1.20, height: width / 8, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", alignSelf: "center", marginTop: 10 }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium, fontSize: 16 }} >{item.title}</Text>
                                        <Text style={{ color: colors.white, fontFamily: fonts.PoppinsLight, fontSize: 12 }}>{moment().format("DD/MM/YYYY, dddd")}</Text>
                                    </View>
                                    <Image style={{ width: width / 4, height: width / 4, resizeMode: "contain", left: 5 }} source={item.image} />
                                </View >
                                <View style={{ width: width / 1.25, height: width / 1.80, marginTop: 10, overflow: "hidden", backgroundColor: colors.white, borderRadius: 10, alignSelf: "center" }} >
                                    {item.content}
                                </View>

                                <Dots activeDot={activeDot} activeColor={colors.white} inactiveColor={"#d0d0d0"} count={silderData.length} containerStyle={styles.dotContainer} />
                            </View>
                        )
                    }} />
                </View>

                {/* <Pressable onPress={()=>navigation.navigate(routes.dashboardStack)} style={{width:30,height:20,backgroundColor:'red',borderRadius:100}} >

                </Pressable> */}

            </ScrollView>


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <AttachmentSelector />
            <LoaderComponet visible={loading} />

        </SafeAreaView>


    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 },
    viewBox: {
        justifyContent: 'center',
        width: width / 1.10,
        alignItems: 'center',
        alignSelf: "center",
        height: 200,
        backgroundColor: colors.primaryColor
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        width: width / 1.10,
        borderRadius: 10,
        overflow: "hidden"
    },
    dotContainer: {
        position: 'absolute',
        bottom: -17,

    }
})

const calendarStyle = {
    onLeaveStyles: { customStyles: { container: { borderColor: colors.warningRed, borderWidth: 1, borderRadius: 0, width: width / 20, height: width / 20 }, text: { color: colors.black } } },
    absentStyles: { customStyles: { container: { backgroundColor: colors.warningRed, borderRadius: 0, width: width / 20, height: width / 20, alignItems: "center" }, text: { color: colors.white } } },
    onTimeStyles: { customStyles: { container: { backgroundColor: colors.ontime, borderRadius: 0, width: width / 20, height: width / 20 }, text: { color: colors.white } } },
    LateStyles: { customStyles: { container: { backgroundColor: colors.yellow, borderRadius: 0, width: width / 20, height: width / 20 }, text: { color: colors.white } } },
    todayStyle: { customStyles: { container: { backgroundColor: colors.primaryColor, borderRadius: 0, width: width / 20, height: width / 20 }, text: { color: colors.white } } }

}
export default HomePage;