import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Vibration, View, Alert, TextInput, TouchableOpacity, ActivityIndicator, Text, KeyboardAvoidingView, NativeModules, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { convertGeoCordsToSVY21_OpenMap, getAddress_OpenMap, getHomeDetails, getToken_OpenMap, getUserShiftDetails, userCheckIn, userCheckOut } from '../../api';
import { colors } from '../../assects/colors';
import { height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage } from '../../component';
import { setHomeData } from '../../redux/actions/Home';
import { saveLocationName, saveUserCurrentRegion, saveUserLatLng } from '../../redux/actions/userLocation';
import routes from '../../routes/routes';
import HomePage from '../Homepage';
import CheckInConfirmModal from './Modals/CheckInConfirmModal';
import CheckInModal from './Modals/CheckInModal';
import CheckOutModal from './Modals/CheckOutModal';
import { ArrowDownIcon, ArrowDownRedIcon, BriefcaseFillIcon, BriefcaseIcon, CheckinBrefIcon, CheckingreenIcon, CheckInTimelineIcon, CheckoutBrefIcon, CheckoutredIcon, ClockBadgeCheckmarkIcon, IdentiCardIcon, LocationBlackIcon, LocationWhiteIcon, RemarkIcon, WarningIcon, WarningRedIcon } from '../../assects/Icons';
import MapComponent from './Modals/MapComponent';
import fonts from '../../assects/fonts';
import useUpdateEffect from '../../customeHooks/useUpdateEffect';
import BottomSheet from 'reanimated-bottom-sheet';
import Slider from '../../component/SliderComponent';
import { Change_dormitoryIcon, CheckInIcon } from '../Dormitory/assects/icons';
import { Location } from '../Vmo/assets/Icons';
import CustomHeader from '../../component/CustomHeader';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { getDistance, getPreciseDistance } from 'geolib';
import { GetLocationApi } from '../../component/GetLocation';
import openMap from 'react-native-open-maps';
import RNFetchBlob from "react-native-blob-util";
const fs = RNFetchBlob.fs;
// import Geocoder from 'react-native-geocoding';
// import Geocoder from 'react-native-geocoder-reborn';
// Geocoder.fallbackToGoogle("AIzaSyBl3VSase0Xm5hWCewNyynXzsfPvtYHhnQ");
// Geocoder.forceGoogleOnIos(true);
// Geocoder.init("AIzaSyBl3VSase0Xm5hWCewNyynXzsfPvtYHhnQ");

const CheckInCheckOut = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    // const { openmapToken } = useSelector(state => state.openMap);

    const { user } = useSelector(state => state.userDetails);

    const { userLatLng, userCurrentRegion, locationName } = useSelector(state => state.userLocation);

    const [latLng, setLatlng] = useState(userLatLng)
    const [showLoader, setShowLoader] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(userCurrentRegion);
    const [checkInModal, setChekInModal] = useState(false);
    const [confirmatinModal, setConfirmationModal] = useState(false);
    const [homeDataUs, setHomeDataUs] = useState([]);
    const [remark, setRemark] = useState("");
    const [otherRemark, setOtherRemark] = useState("");
    const [message, setMessage] = useState("");
    const [is_review, setisReview] = useState(false);



    const [remarkMandatory, setRemarkMandatory] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(true);
    const [workMode, setWorkMode] = useState("Work");
    const [visible, setVisible] = useState(false)
    const [userShiftDetails, setUserShiftDetails] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDownShift, setShowDropDownShift] = useState(false);
    const [shiftLocation, setShiftLocations] = useState([]);

    const [location_name, setLocationName] = useState("");
    const [location_address, setLocationAddress] = useState("");
    const [addressComponent, setaddressComponent] = useState("");
    const [profilePicBas64, setProfilePicBase64] = useState("")




    useEffect(() => {
        getLocationPermisson()
        getUserShiftDetails().then((res) => {
            setUserShiftDetails(res.data.shift)
            // setLocationName(res.data.shift?.location_name)
            // setLocationAddress(res.data.shift?.location_address)
            getShiftLocation()
        }).catch((err) => console.log("err", err))

    }, [])

    useEffect(() => {
        if (shiftLocation.length != 0) {
            setLocationName(shiftLocation[0].location_name)
            setLocationAddress(shiftLocation[0].location_address)

        }
    }, [shiftLocation])




    async function getShiftLocation() {
        var temp = [];
        await homeData?.shift_locations.map((data, key) => {
            var dis = getDistance(
                { latitude: userLatLng.latitude, longitude: userLatLng.longitude },
                { latitude: data.latitude, longitude: data.longitude },
            );
            data["distance"] = dis / 1000
            temp.push(data)
            setShowLoader(false)

        })
        setShiftLocations(temp.sort((a,b)=>(a.distance > b.distance)?1:-1))
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
                console.log("SKDJKSND", currentRegion)
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

    function WithFaceAuth(){
        navigation.navigate(routes.cameraScreen, { flag: "rec", location_address: location_address, remark: remark })
    }

    async function onEndReachedCheckIn() {
        if(homeData?.face_auth_required){
            WithFaceAuth()
        }
        else{
            WithoutFaceAuth()
        }
    }

    function WithoutFaceAuth(){
         fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + userLatLng.latitude + '&lon=' + userLatLng.longitude + '&zoom=18&addressdetails=1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json())
            .then((json) => {
                var address = json?.display_name

                if (homeData?.is_checked_in) {
                    CheckOut(address)
                }
                else {
                    CheckIn(address)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }



    function CheckIn(addressComponent) {
        setShowLoader(true)

        const data = JSON.stringify({
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_in_remark": remark,
            "location_name": addressComponent,
            "selected_location_address":location_address,

        })
        
        console.log("userCheckInPayload", data)
        userCheckIn(data).then((res) => {
            console.log("userCheckIn", res.data)
            if (res.data.success) {
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                // setRemark("")
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })

                setTimeout(() => {


                    setConfirmationModal(false)
                    navigation.navigate(routes.profile)
                }, 1500)
            }
            else {

                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review, location_address: location_address })
                setShowLoader(false)
                // setRemark("")
            }
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage(res.data.message)
        })
    }

    function CheckOut(addressComponent) {
        setShowLoader(true)

        const data = JSON.stringify({
            "start_time": homeData?.check_in_details?.check_in_time,
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_out_remark":remark,
            "location_name": addressComponent,
            "selected_location_address":location_address,

        })
        console.log("SDKFHNJKSHFJ", data)
        userCheckOut(data).then((res) => {
            console.log("userCheckOut", res)

            if (res.data.success) {
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })

                // setRemark("")
                setTimeout(() => {
                    // getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
                    setConfirmationModal(false)
                    navigation.navigate(routes.profile)
                }, 1500)
            }
            else {
                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review, location_address: location_address })
                // ShowErrorMessage(res.data.message)
                setShowLoader(false)
                // setRemark("")
            }
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage("Error")
        })

    }




    function onCloseConfirmationModal() {
        getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
        setConfirmationModal(false)
    }

    function setRemarkonOthersClick() {
        setRemark("")
        setOtherRemark("Others")
        setShowDropDown(!showDropDown)

    }


    function setRemarkonClick(item) {
        setRemark(item)
        setOtherRemark("")
        setShowDropDown(!showDropDown)
    }

    function setShiftLocation(item) {
        setLocationName(item.location_name)
        setLocationAddress(item.location_address)
        setShowDropDownShift(false)

    }

    function renderContent() {
        const checkinTime = moment(homeData?.check_in_details?.check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_in_time).format("HH:mm")
        const checkoutTime = moment(homeData?.check_in_details?.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_out_time).format("HH:mm")
        return (
            <View style={{ backgroundColor: colors.white, height: height / 1.70, alignItems: "center" }} >
                <View style={{ alignItems: "center", paddingTop: 10 }} >

                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "center", padding: 15 }} >

                        <View  >
                            <Pressable onPress={() => { setShowDropDownShift(!showDropDownShift) }} style={[{ width: width / 1.10, height: width / 7, marginTop: 20, flexDirection: "row", borderRadius: 10, elevation: 2, backgroundColor: colors.white }, iosOpacity]} >
                                <View style={{ width: width / 7, height: width / 7, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                                    <LocationWhiteIcon width={width / 22} height={width / 22} />
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ flex: 1, textAlign: "right", color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsRegular, }} >{location_name + "\n" + location_address}</Text>
                                    <View style={{ marginHorizontal: 10 }} >
                                        <ArrowDownIcon width={width / 35} height={width / 35} />
                                    </View>
                                </View>
                            </Pressable>

                            {/* <Pressable  style={[{ width: width / 1.10, height: width / 7, marginTop: 20, flexDirection: "row", borderRadius: 10, elevation: 2, backgroundColor: colors.white},iosOpacity]} >
                                <View style={{ width: width / 7, height: width / 7,borderTopLeftRadius:10,borderBottomLeftRadius:10, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor }} >
                                    <LocationWhiteIcon width={width / 22} height={width / 22} />
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ flex: 1, textAlign: "right", color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsRegular, }} >{userLatLng.latitude + "\n" + userLatLng.longitude}</Text>
                                    <View style={{ marginHorizontal: 10 }} >
                                        <ArrowDownIcon width={width / 35} height={width / 35} />
                                    </View>
                                </View>
                            </Pressable> */}




                            {showDropDownShift ? <Pressable onPress={() => { }} style={[{ width: width / 1.15, alignSelf: "center", minHeight: width / 7, maxHeight: width, elevation: 5, marginVertical: 10, backgroundColor: colors.white, borderRadius: 5 }, iosOpacity]} >
                                <FlatList data={shiftLocation} renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { setShiftLocation(item) }} style={{ flex: 1, height: width / 7, alignItems: "flex-start", justifyContent: "center", paddingHorizontal: 15 }} >
                                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.location_name}</Text>

                                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.location_address}</Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                            </Pressable> : null}

                            <Pressable onPress={() => setShowDropDown(!showDropDown)} style={[{ width: width / 1.10, height: width / 7, marginTop: 20, flexDirection: "row", borderRadius: 10, elevation: 2, backgroundColor: colors.white }, iosOpacity]} >
                                <View style={{ width: width / 7, height: width / 7, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <RemarkIcon width={width / 22} height={width / 22} />
                                </View>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }} >
                                    <Text style={{ flex: 1, textAlign: "right", color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsRegular, }} >{remark != "" ? remark : "No Remarks"}</Text>
                                    <View style={{ marginHorizontal: 10 }} >
                                        <ArrowDownIcon width={width / 35} height={width / 35} />
                                    </View>
                                </View>
                            </Pressable>

                        </View>


                        {showDropDown ? <Pressable onPress={() => { }} style={[{ width: width / 1.15, minHeight: width / 2, maxHeight: width, elevation: 5, marginVertical: 10, backgroundColor: colors.white, borderRadius: 5 }, iosOpacity]} >
                            <FlatList data={!homeData?.is_checked_in ? checinRemarks : checoutRemarks} renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => { item == "Others" ? setRemarkonOthersClick() : setRemarkonClick(item) }} style={{ flex: 1, height: width / 10, alignItems: "flex-start", justifyContent: "center", paddingHorizontal: 15 }} >
                                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                        </Pressable> : otherRemark == "Others" ?
                            <TextInput
                                //   onSubmitEditing={(event) => setRemark( event.nativeEvent.text )}
                                onChangeText={(t) => setRemark(t)}
                                placeholder='Enter your text here '
                                placeholderTextColor={colors.placeHolderTextColor}
                                style={{ width: width / 1.10, paddingLeft: 10, textAlignVertical: "top", color: colors.B212529, alignSelf: "center", borderRadius: 10, height: width / 5, borderWidth: 1, borderColor: colors.transPrimayColor }} /> :
                            null}

                        {!showDropDown && !showDropDownShift ? <View>
                            <Text style={{ color: colors.black, fontFamily: fonts.PoppinsBlack, fontSize: 24, textAlign: "center" }} >{moment().format("HH:mm")}</Text>
                            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 20 }} >
                                <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                                    <View style={{ marginTop: 5 }} >
                                        <CheckingreenIcon width={10} height={10} />
                                    </View>
                                    <View style={{ marginLeft: 10 }} >
                                        <Text style={{ color: colors.transBlack, fontSize: 11, fontFamily: fonts.PoppinsMedium }} >Check In</Text>
                                        <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsMedium }} >{checkinTime}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "flex-start" }} >
                                    <View style={{ marginTop: 5 }} >
                                        <CheckoutredIcon width={10} height={10} />
                                    </View>
                                    <View style={{ marginLeft: 10 }} >
                                        <Text style={{ color: colors.transBlack, fontSize: 11, fontFamily: fonts.PoppinsMedium }} >Check Out</Text>
                                        <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsMedium }} >{checkoutTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View> : null}

                        <Slider
                            childrenContainer={{ backgroundColor: colors.C4C4C4 }}
                            onEndReached={onEndReachedCheckIn}
                            isLeftToRight={!homeData?.is_checked_in}
                            containerStyle={{
                                width: width / 1.20, height: width / 6.25, marginVertical: 15, alignSelf: "center", alignItems: "center", justifyContent: "center", paddingHorizontal: 6, backgroundColor: colors.CACACA, borderRadius: 100, borderWidth: 1, borderColor: colors.white
                            }}
                            thumbElement={
                                <View style={{ width: width / 8, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderColor: colors.primaryColor, borderWidth: 1, borderRadius: 100 }} >
                                    <ClockBadgeCheckmarkIcon width={width / 10} height={width / 10} />
                                </View>
                            }
                        >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, backgroundColor: colors.CACACA }} >{!homeData?.is_checked_in ? 'Slide to Clock In' : 'Slide to Clock Out'}</Text>
                        </Slider>
                    </View>


                </View>

            </View>
        )
    }
    function HomeCheckInOutModal() {
        return (
            <Modal visible={visible} transparent >
                <Pressable onPress={() => { setVisible(false), navigation.navigate(routes.leaveManegment) }} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 25, backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.15, height: width / 2, justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 10, alignItems: "center", elevation: 5, borderRadius: 10, backgroundColor: colors.white }, iosOpacity]} >
                        <Pressable onPress={() => setVisible(false)} style={{ alignSelf: "flex-end" }} >
                            <Icon name='close' size={20} color={colors.B8B8B} />
                        </Pressable>
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center", paddingHorizontal: 15 }} >Are you sure you want to {!homeData?.is_checked_in ? "check in" : "check out"} from this location</Text>
                        <ButtonComponent onPress={() => { setVisible(false) }} title={"Continue"} bgColor={colors.primaryColor} style={{ width: width / 1.30, height: width / 8.5 }} />
                    </View>
                </Pressable>
            </Modal>
        )
    }
    const checinRemarks = ["I need to checkin early today",
        "I was late due to transit.",
        "I forgot to punch on time",
        "Working from different location today.",
        "Others"]


    const checoutRemarks = ["Need to leave urgently.",
        "I was working till late today.",
        "I forgot to punch on time.",
        "Working from different location today.",
        "Others"]

    const sheetRef = useRef();
    return (
        <KeyboardAvoidingView behavior={"height"} style={styles.container} >
            <CustomHeader backIcon title={homeData?.is_checked_in ? "Check Out" : "Check In"} />
            <MapComponent latLng={userLatLng} currentRegion={userCurrentRegion} locationName={locationName} />

            <BottomSheet
                snapPoints={["65%", height / 1.70]}
                enabledManualSnapping={false}
                borderRadius={0}
                enabledGestureInteraction={false}
                ref={sheetRef}
                initialSnap={1}
                onOpenEnd={() => setSliderPosition(false)}
                onCloseEnd={() => setSliderPosition(true)}
                renderContent={renderContent}
            />

            <HomeCheckInOutModal />

            <CheckInConfirmModal homeData={homeData} onClose={() => onCloseConfirmationModal()} visible={confirmatinModal} />

            {/* <LoaderComponet visible={showLoader} /> */}
        </KeyboardAvoidingView >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default CheckInCheckOut;