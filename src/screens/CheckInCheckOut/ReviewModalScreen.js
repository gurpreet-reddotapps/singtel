import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Vibration, View, Alert, TextInput, TouchableOpacity, ActivityIndicator, Text, KeyboardAvoidingView, NativeModules, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDetails, getUserShiftDetails, userCheckIn, userCheckOut } from '../../api';
import { colors } from '../../assects/colors';
import { height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage } from '../../component';
import { setHomeData } from '../../redux/actions/Home';
import { saveUserCurrentRegion, saveUserLatLng } from '../../redux/actions/userLocation';
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

const ReviewModalScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
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

    const [remarkMandatory, setRemarkMandatory] = useState(false);
    const [sliderPosition, setSliderPosition] = useState(true);
    const [workMode, setWorkMode] = useState("Work");
    const [visible, setVisible] = useState(false)
    const [userShiftDetails, setUserShiftDetails] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);

    const sheetRef = useRef();

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
    

    function setRemarkonOthersClick() {
        setRemark("")
        setOtherRemark("Others")
    }

    
    function setRemarkonClick(item) {
        setRemark(item)
        setShowDropDown(!showDropDown)
    }

    


    function onEndReachedCheckIn() {
        // setChekInModal("clear")
        // setRemarkMandatory(false)
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
                    onCheckOut(address)
                }
                else {
                    onCheckIn(address)
                }

            })
            .catch((error) => {
                console.error(error);
            });




       
    }


    function onCheckIn(address) {
        const data = JSON.stringify({
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_in_remark": remark,
            "location_name": address,
            "selected_location_address":route?.params?.location_address,

        })
        console.log("onCheckInModal",data,route?.params?.location_address)

        userCheckIn(data).then((res) => {
            console.log("userCheckIn", res.data)

            if (res.data.success) {
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                navigation.pop()
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })
               
            }
            else {
                navigation.pop()
                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review })
              
                // ShowErrorMessage(res.data.message)
                setShowLoader(false)
                setRemarkMandatory(true)
                setRemark("")

            }
            
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage(res.data.message)
        })
    }


    function onCheckOut(address) {
        const data = JSON.stringify({
            "start_time": homeData?.check_in_details?.check_in_time,
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_out_remark": remark,
            "location_name": address,
            "selected_location_address":route?.params?.location_address,

        })
        console.log("onCheckOut",data)
        userCheckOut(data).then((res) => {
            console.log("userCheckOut", res.data,route?.params?.location_address)

            if (res.data.success) {
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                navigation.pop()
                
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })

            }
            else {
                navigation.pop()
                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review })
              
                setShowLoader(false)
                setRemarkMandatory(true)
                setRemark("")
            }
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage(res.data.message)
        })
    }

    function onCloseConfirmationModal() {
        getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
        setConfirmationModal(false)
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#00000068', alignItems: "center", justifyContent: "center" }} >
            <Pressable onPress={() => navigation.goBack()} style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
                <Pressable onPress={() => { }} style={{ width: width / 1.20, minHeight: width, maxHeight: height / 1.40, paddingVertical: 10, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", borderRadius: 10, backgroundColor: colors.white, elevation: 2 }} >
                    {remark != "" ? <WarningIcon width={width / 6} height={width / 6} /> : <WarningRedIcon width={width / 6} height={width / 6} />}
                  
                    <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 16, color: colors.black, textAlign: "center",paddingHorizontal:10 }} >{route.params.message}{'\n'}{route.params?.review  ?<Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 13, textAlign: "center" }} >Please enter a remark!!</Text>:null}</Text>
                  {route.params?.review  ?  <Pressable onPress={() => setShowDropDown(!showDropDown)} style={{ width: width / 1.30, height: width / 7.5, marginTop: 20, flexDirection: "row", borderRadius: 10, elevation: 2, overflow: "hidden", backgroundColor: colors.white, borderColor: remark != "" ? colors.primaryColor : colors.warningRed, borderWidth: 1 }} >
                        <View style={{ width: width / 9, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: remark != "" ? colors.primaryColor : colors.warningRed }} >
                            <RemarkIcon width={width / 22} height={width / 22} />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }} >
                            <Text style={{ flex: 1, textAlign: "right", color: remark != "" ? colors.primaryColor : colors.warningRed, fontSize: 12, fontFamily: fonts.PoppinsRegular, }} >{remark != "" ? remark : "No Remarks"}</Text>
                            <View style={{ marginHorizontal: 10 }} >
                                {remark != "" ? <ArrowDownIcon width={width / 35} height={width / 35} /> : <ArrowDownRedIcon width={width / 35} height={width / 35} />}
                            </View>
                        </View>
                    </Pressable> : null}

                    {showDropDown ? <Pressable onPress={() => { }} style={[{ width: width / 1.30, minHeight: width / 2, maxHeight: width, elevation: 5, marginVertical: 10, backgroundColor: colors.white, borderRadius: 5 },iosOpacity]} >
                        <FlatList data={!homeData?.is_checked_in?checinRemarks:checoutRemarks} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => { item == "Others" ? setRemarkonOthersClick() : setRemarkonClick(item) }} style={{ width: width / 1.30, height: width / 10, alignItems: "flex-start", justifyContent: "center", paddingHorizontal: 15 }} >
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item}</Text>
                                </TouchableOpacity>
                            )
                        }} />

                        {remark == "Others" || otherRemark == "Others" ? <TextInput
                            //   onSubmitEditing={(event) => setRemark( event.nativeEvent.text )}
                            onChangeText={(t) => setRemark(t)}
                            placeholder='Enter your text here '
                            placeholderTextColor={colors.placeHolderTextColor}
                            style={{ width: width / 1.40, paddingLeft: 10, textAlignVertical: "top", color: colors.B212529, alignSelf: "center", borderRadius: 10, marginVertical: 10, height: width / 6, borderWidth: 1, borderColor: colors.transPrimayColor }} /> : null}
                    </Pressable> : null}

                    <ButtonComponent onPress={route.params?.review &&  remark != ""  ? () =>onEndReachedCheckIn() :  remark==""? ()=> navigation.navigate(routes.checkIncheckout) :()=>ShowErrorMessage("Please choose any reson")} style={{ width: width / 1.35 }} bgColor={colors.primaryColor} title={route.params?.review ? "Submit":"Close"} />
                </Pressable>
            </Pressable>
            <CheckInConfirmModal homeData={homeData} onClose={() => onCloseConfirmationModal()} visible={confirmatinModal} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    imageView: { width: width / 2, height: width / 2 }
})
export default ReviewModalScreen;