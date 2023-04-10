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
import { ArrowDownIcon, ArrowDownRedIcon, BriefcaseFillIcon, BriefcaseIcon, CheckinBrefIcon, CheckingreenIcon, CheckInTimelineIcon, CheckoutBrefIcon, CheckoutredIcon, ClockBadgeCheckmarkIcon, IdentiCardIcon, LocationBlackIcon, LocationWhiteIcon, RemarkIcon, SuccessIcon, WarningIcon, WarningRedIcon } from '../../assects/Icons';
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

const CheckInConfirmModalScreen = ({ navigation, route }) => {
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
    const checkinTime = moment(homeData?.check_in_details?.current_check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.current_check_in_time).format("HH:mm")
    // const checkinTime = moment(homeData?.check_in_details?.current_check_in_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_in_time).format("HH:mm")
    const checkoutTime = moment(homeData?.check_in_details?.check_out_time).format("HH:mm") == "Invalid date" ? "-" : moment(homeData?.check_in_details?.check_out_time).format("HH:mm")

    useEffect(() => {
        setTimeout(() => {
            getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
            navigation.navigate(routes.profile)
        }, 2000)
    }, [])

    function goBack(){
                    getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
            navigation.navigate(routes.profile)
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#00000068', alignItems: "center", justifyContent: "center" }} >
            <Pressable onPress={()=>goBack()} style={{ flex: 1, alignItems: "center", justifyContent: "center"}} >
                <View style={{ width: width / 1.20, height: height / 3, flexDirection: "column", justifyContent: "space-between", paddingBottom: 20, alignItems: "center", backgroundColor: colors.white, elevation: 5, borderRadius: 15 }} >

                    <SuccessIcon width={width / 3.5} height={width / 3.5} />
                    
                    <View style={{ alignItems: "center" }} >
                        <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 14, color: colors.B212529 ,bottom:10}} >{!homeData?.is_checked_in != true ? "Your Check in confirmed" : "Your Check out confirmed"}</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 14, color: colors.B212529, marginTop: 5 }} >{!homeData?.is_checked_in != true ? "Have a good working day!!" : "Take a good rest!"}</Text>
                    </View>


                    <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
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



                </View>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    imageView: { width: width / 2, height: width / 2 }
})
export default CheckInConfirmModalScreen;