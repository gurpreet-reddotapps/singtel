import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StatusBar, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable, Alert, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import Spinner from '../../Components/Spinner';
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission';
import RNPickerSelect from 'react-native-picker-select';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import FormButton from '../../Components/FormButton';
import FormInput from '../../Components/FormInput';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImageAction from '../../Components/ImageAction'
import Images from '../../assets/Images'
import { DeleteImageAPI, FetchSuperVisorAPI, SaveCheckOutDataAPI, UploadOrderImagesAPI } from '../../api';
import { setCheckOutPageOneDataInRedux, setCheckOutPageOtherItemDataInRedux, setCheckOutUploadOrderImage, setPageCheckOutTwoDataInRedux } from '../../../../redux/actions/CheckOut';
import AsyncStorage from '@react-native-async-storage/async-storage';



const StepWiseForm = (props) => {
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(props?.disableEdit);
    const { checkOutDataArray, pageOneArrayForCheckOut, pageTwoArrayForCheckOut, orderImageArrayForCheckOut, pageOtherItemArrayForCheckOut, reduxLoading } = useSelector(state => state.CheckOutDetail);
    const { orderId, jobDetail } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    const scrollViewRef = useRef();

    const fillDetailSection = () => {
        scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true})
      }

    useEffect(() => {
        if (jobDetail?.job_type === 3) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if (jobDetail?.job_type === 2 && jobDetail.job_status == 1) {
            setdisableEdit(true)
        } else if (user?.user?.id == jobDetail?.mechanic_id) {
            if (jobDetail.job_status == 1) {
                console.log("UNDER PRIMARY ");
                return setdisableEdit(true)
            } else {
                console.log("UNDER Secondry");
                return setdisableEdit(false)
            }
        }else if(jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id){
            setdisableEdit(true)
        }
    }, [])

   
   
    // useEffect(() => {
    //     if (user?.user?.role === 3) {
    //         if (jobDetail.job_status == 1) {
    //             return setdisableEdit(true)
    //         } else {
    //             return setdisableEdit(false)
    //         }
    //     } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
    //         if (jobDetail.job_status == 1) {
    //             return setdisableEdit(true)
    //         } else {
    //             return setdisableEdit(false)
    //         }
    //     } else if (user?.user?.role === 2 && jobDetail.job_status == 1) {
    //         setdisableEdit(true)
    //     } else if (user?.user?.role == 1 && user?.user?.id == jobDetail?.mechanic_id) {
    //         if (jobDetail.job_status == 1) {
    //             console.log("UNDER PRIMARY ");
    //             return setdisableEdit(true)
    //         } else {
    //             console.log("UNDER Secondry");
    //             return setdisableEdit(false)
    //         }
    //     }else if(user?.user?.role == 1 && user?.user?.id !== jobDetail?.mechanic_id){
    //         setdisableEdit(true)
    //     }
    // }, [])

    
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const StepWiseComponent = () => {

        const finalSubmit = async () => {

            console.log(pageOneArrayForCheckOut, "pageOneArrayForCheckOut");
            console.log(pageTwoArrayForCheckOut, "pageTwoArrayForCheckOut");
            console.log(orderImageArrayForCheckOut, "orderImageArrayForCheckOut");
            console.log(pageOtherItemArrayForCheckOut, "pageOtherItemArrayForCheckOut");


            let data = {
                order_id: orderId,
                // Exterior 
                road_tax: pageTwoArrayForCheckOut.speedLimitLabel,
                radio_antenna: pageTwoArrayForCheckOut.roadTax,
                speed_limit_label: pageTwoArrayForCheckOut.radioAntenna,
                door_alarm: pageTwoArrayForCheckOut.doorAlarm,
                centre_locking: pageTwoArrayForCheckOut.centerLocking,
                // Interior 
                vehicle_iu: pageOneArrayForCheckOut.chooseData,
                fix_accessories: pageOneArrayForCheckOut.fixAccessories,
                carpets: pageOneArrayForCheckOut.numberOfCarpets,
                solar_film: pageOneArrayForCheckOut.solarFilm,
                seat_leather: pageOneArrayForCheckOut.seatLeatherPannel,
                safety_belts: pageOneArrayForCheckOut.safteyBelts,
                dashboard: pageOneArrayForCheckOut.dashBoard,
                radio_player: pageOneArrayForCheckOut.radioCdDvd,
                ash_tray: pageOneArrayForCheckOut.ashTray,
                warning_light: pageOneArrayForCheckOut.warnigLight,
                indicate_light_on: pageOneArrayForCheckOut.indicateLightOn,
                air_con: pageOneArrayForCheckOut.airCon,
                horn: pageOneArrayForCheckOut.horn,
                real_mirror: pageOneArrayForCheckOut.realMirror,
                right_wing_mirror: pageOneArrayForCheckOut.rightingMirror,
                power_window: pageOneArrayForCheckOut.powerWindows,
                rear_booth_carpet: pageOneArrayForCheckOut.crearBoothCarpet,
                spare_tyre_supporting_board: pageOneArrayForCheckOut.spareTyreSupporting,
                spare_tyre: pageOneArrayForCheckOut.spareTyres,
                tool_kit: pageOneArrayForCheckOut.jackToolKit,
                breakdown_sign: pageOneArrayForCheckOut.breakDownSign,
                rear_boot_remote: pageOneArrayForCheckOut.rearBootRemoteLatch,
                remarks: pageOneArrayForCheckOut.interiorRemarks,
                // Other Item 
                mileage: objectForOther.mileage,
                gasoline_level: objectForOther.gasolineLevel,
                check_in_date: moment(objectForOther.startDate).format('YYYY-MM-DD'),
                check_in_by: objectForOther.userSuperVisor,
                // photos: orderImageArrayForCheckOut,
                photos: TotalArrayOfImages,
            }
            console.log(data, "let's see");
            SaveCheckOutDataAPI(data).then(async (res) => {
                console.log(res, "This is the response after saving the Check In");
                console.log(res?.data, "This is the response after saving the Check In");
                if (res?.data?.success === true) {
                    ShowSuccessMessage("The Check Out Data Was Saved")
                    try {
                        await AsyncStorage.setItem(`check_out_marking_${orderId}`, true.toString())
                    } catch (e) {
                        console.log(e);
                    }
                    navigation.goBack()
                } else {

                    ShowErrorMessage("Check In Data was not Saved")
                }
                return res;

            }).catch(err => { return err; });

            setloacalLoading(false)

            props.checkInAPI()

        }





        // Interior State 
        // const [fixAccessories, setfixAccessories] = useState(pageOneArrayForCheckOut?.fixAccessories ? pageOneArrayForCheckOut.fixAccessories : "");
        const [chooseData, setchooseData] = useState(pageOneArrayForCheckOut?.chooseData == "" || pageOneArrayForCheckOut?.chooseData == undefined ? checkOutDataArray.vehicle_iu == "" ? "" : checkOutDataArray?.vehicle_iu : pageOneArrayForCheckOut?.chooseData);
        const [fixAccessories, setfixAccessories] = useState(pageOneArrayForCheckOut?.fixAccessories == "" || pageOneArrayForCheckOut?.fixAccessories == undefined ? checkOutDataArray.fix_accessories == "" ? "" : checkOutDataArray.fix_accessories : pageOneArrayForCheckOut?.fixAccessories);
        const [numberOfCarpets, setnumberOfCarpets] = useState(pageOneArrayForCheckOut?.numberOfCarpets == "" || pageOneArrayForCheckOut?.numberOfCarpets == undefined ? checkOutDataArray.carpets == "" ? "" : checkOutDataArray.carpets : pageOneArrayForCheckOut?.numberOfCarpets);
        const [solarFilm, setsolarFilm] = useState(pageOneArrayForCheckOut?.solarFilm == "" || pageOneArrayForCheckOut?.solarFilm == undefined ? checkOutDataArray.solar_film == "" ? "" : checkOutDataArray.solar_film : pageOneArrayForCheckOut?.solarFilm);
        const [seatLeatherPannel, setseatLeatherPannel] = useState(pageOneArrayForCheckOut?.seatLeatherPannel == "" || pageOneArrayForCheckOut?.seatLeatherPannel == undefined ? checkOutDataArray.seat_leather == "" ? "" : checkOutDataArray.seat_leather : pageOneArrayForCheckOut?.seatLeatherPannel);
        const [safteyBelts, setsafteyBelts] = useState(pageOneArrayForCheckOut?.safteyBelts == "" || pageOneArrayForCheckOut?.safteyBelts == undefined ? checkOutDataArray.safety_belts == "" ? "" : checkOutDataArray.safety_belts : pageOneArrayForCheckOut?.safteyBelts);
        const [dashBoard, setdashBoard] = useState(pageOneArrayForCheckOut?.dashBoard == "" || pageOneArrayForCheckOut?.dashBoard == undefined ? checkOutDataArray.dashboard == "" ? "" : checkOutDataArray.dashboard : pageOneArrayForCheckOut?.dashBoard);
        const [radioCdDvd, setradioCdDvd] = useState(pageOneArrayForCheckOut?.radioCdDvd == "" || pageOneArrayForCheckOut?.radioCdDvd == undefined ? checkOutDataArray.radio_player == "" ? "" : checkOutDataArray.radio_player : pageOneArrayForCheckOut?.radioCdDvd);
        const [ashTray, setashTray] = useState(pageOneArrayForCheckOut?.ashTray == "" || pageOneArrayForCheckOut?.ashTray == undefined ? checkOutDataArray.ash_tray == "" ? "" : checkOutDataArray.ash_tray : pageOneArrayForCheckOut?.ashTray);
        const [warnigLight, setwarnigLight] = useState(pageOneArrayForCheckOut?.warnigLight == "" || pageOneArrayForCheckOut?.warnigLight == undefined ? checkOutDataArray.warning_light == "" ? "" : checkOutDataArray.warning_light : pageOneArrayForCheckOut?.warnigLight);
        const [indicateLightOn, setindicateLightOn] = useState(pageOneArrayForCheckOut?.indicateLightOn == "" || pageOneArrayForCheckOut?.indicateLightOn == undefined ? checkOutDataArray.indicate_light_on == "" ? "" : checkOutDataArray.indicate_light_on : pageOneArrayForCheckOut?.indicateLightOn);
        const [airCon, setairCon] = useState(pageOneArrayForCheckOut?.airCon == "" || pageOneArrayForCheckOut?.airCon == undefined ? checkOutDataArray.air_con == "" ? "" : checkOutDataArray.air_con : pageOneArrayForCheckOut?.airCon);
        const [horn, sethorn] = useState(pageOneArrayForCheckOut?.horn == "" || pageOneArrayForCheckOut?.horn == undefined ? checkOutDataArray.horn == "" ? "" : checkOutDataArray.horn : pageOneArrayForCheckOut?.horn);
        const [realMirror, setrealMirror] = useState(pageOneArrayForCheckOut?.realMirror == "" || pageOneArrayForCheckOut?.realMirror == undefined ? checkOutDataArray.real_mirror == "" ? "" : checkOutDataArray.real_mirror : pageOneArrayForCheckOut?.realMirror);
        const [rightingMirror, setrightingMirror] = useState(pageOneArrayForCheckOut?.rightingMirror == "" || pageOneArrayForCheckOut?.rightingMirror == undefined ? checkOutDataArray.right_wing_mirror == "" ? "" : checkOutDataArray.right_wing_mirror : pageOneArrayForCheckOut?.rightingMirror);
        const [powerWindows, setpowerWindows] = useState(pageOneArrayForCheckOut?.powerWindows == "" || pageOneArrayForCheckOut?.powerWindows == undefined ? checkOutDataArray.power_window == "" ? "" : checkOutDataArray.power_window : pageOneArrayForCheckOut?.powerWindows);
        const [crearBoothCarpet, setcrearBoothCarpet] = useState(pageOneArrayForCheckOut?.crearBoothCarpet == "" || pageOneArrayForCheckOut?.crearBoothCarpet == undefined ? checkOutDataArray.rear_booth_carpet == "" ? "" : checkOutDataArray.rear_booth_carpet : pageOneArrayForCheckOut?.crearBoothCarpet);
        const [spareTyreSupporting, setspareTyreSupporting] = useState(pageOneArrayForCheckOut?.spareTyreSupporting == "" || pageOneArrayForCheckOut?.spareTyreSupporting == undefined ? checkOutDataArray.spare_tyre_supporting_board == "" ? "" : checkOutDataArray.spare_tyre_supporting_board : pageOneArrayForCheckOut?.spareTyreSupporting);
        const [spareTyres, setspareTyres] = useState(pageOneArrayForCheckOut?.spareTyres == "" || pageOneArrayForCheckOut?.spareTyres == undefined ? checkOutDataArray.spare_tyre == "" ? "" : checkOutDataArray.spare_tyre : pageOneArrayForCheckOut?.spareTyres);
        const [jackToolKit, setjackToolKit] = useState(pageOneArrayForCheckOut?.jackToolKit == "" || pageOneArrayForCheckOut?.jackToolKit == undefined ? checkOutDataArray.tool_kit == "" ? "" : checkOutDataArray.tool_kit : pageOneArrayForCheckOut?.jackToolKit);
        const [breakDownSign, setbreakDownSign] = useState(pageOneArrayForCheckOut?.breakDownSign == "" || pageOneArrayForCheckOut?.breakDownSign == undefined ? checkOutDataArray.breakdown_sign == "" ? "" : checkOutDataArray.breakdown_sign : pageOneArrayForCheckOut?.breakDownSign);
        const [rearBootRemoteLatch, setrearBootRemoteLatch] = useState(pageOneArrayForCheckOut?.rearBootRemoteLatch == "" || pageOneArrayForCheckOut?.rearBootRemoteLatch == undefined ? checkOutDataArray.rear_boot_remote == "" ? "" : checkOutDataArray.rear_boot_remote : pageOneArrayForCheckOut?.rearBootRemoteLatch);
        const [interiorRemarks, setinteriorRemarks] = useState(pageOneArrayForCheckOut?.interiorRemarks == "" || pageOneArrayForCheckOut?.interiorRemarks == undefined ? checkOutDataArray.remarks == "" ? "" : checkOutDataArray.remarks : pageOneArrayForCheckOut?.interiorRemarks);



        let objectForOne = {
            chooseData,
            fixAccessories,
            numberOfCarpets,
            solarFilm,
            seatLeatherPannel,
            safteyBelts,
            dashBoard,
            radioCdDvd,
            ashTray,
            warnigLight,
            indicateLightOn,
            airCon,
            horn,
            realMirror,
            rightingMirror,
            powerWindows,
            crearBoothCarpet,
            spareTyreSupporting,
            spareTyres,
            jackToolKit,
            breakDownSign,
            rearBootRemoteLatch,
            interiorRemarks,
        }

        const SaveInterior = () => {
            if (checkOutDataArray.vehicle_iu == "") {
                if (chooseData !== "" &&
                    fixAccessories !== "" &&
                    numberOfCarpets !== "" &&
                    solarFilm !== "" &&
                    seatLeatherPannel !== "" &&
                    safteyBelts !== "" &&
                    dashBoard !== "" &&
                    radioCdDvd !== "" &&
                    ashTray !== "" &&
                    warnigLight !== "" &&
                    indicateLightOn !== "" &&
                    airCon !== "" &&
                    horn !== "" &&
                    realMirror !== "" &&
                    rightingMirror !== "" &&
                    powerWindows !== "" &&
                    crearBoothCarpet !== "" &&
                    spareTyreSupporting !== "" &&
                    spareTyres !== "" &&
                    jackToolKit !== "" &&
                    breakDownSign !== "" &&
                    rearBootRemoteLatch !== "" &&
                    interiorRemarks !== ""
                ) {
                    dispatch(setCheckOutPageOneDataInRedux(objectForOne))
                    goNext()
                } else {
                    ShowErrorMessage("Please Enter all the values")
                }
            } else {
                dispatch(setCheckOutPageOneDataInRedux(objectForOne))
                goNext()
            }
        }



        useEffect(() => {
            console.log(pageOneArrayForCheckOut.chooseData, "THIS IS REDUX OBJ VALUE");
        }, [])


        // Interior Data 
        const VEHICLE_IU = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" },];
        const FIX_ACCESSORIES = [{ label: 'Listed In Remarks', value: 'Listed In Remarks', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const SOLAR_FILMS = [{ label: 'OK', value: 'OK', key: "0" }, { label: 'Scratches', value: 'Scratches', key: "1" }, { label: 'N.A', value: 'N.A', key: "2" }];
        const SEAT_LEATHER_PANEL = [{ label: 'OK', value: 'OK', key: "0" }, { label: 'Scratches', value: 'Scratches', key: "1" }, { label: 'Torn', value: 'Torn', key: "2" }];
        const SAFTEY_BELTS = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Jam', value: 'Jam', key: "1" }, { label: 'Torn', value: 'Torn', key: "2" }];
        const DASHBOARD = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Jam', value: 'Jam', key: "1" }, { label: 'Crack', value: 'Crack', key: "2" }];
        const RADIO_CD_DVD = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }];
        const ASH_TRAY = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const WARNIG_LIGHT = [{ label: 'No Warning', value: 'No Warning', key: "0" }, { label: 'Light On', value: 'Light On', key: "1" }];
        const INDICATE_LIGHT_ON = [{ label: 'Yes', value: 'Yes', key: "0" }, { label: 'NO', value: 'NO', key: "1" }, { label: 'N.A', value: 'N.A', key: "2" }];
        const AIR_CON = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }];
        const HORN = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Woring', value: 'Not Woring', key: "1" }];
        const REAL_MIRROR = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'Damage', value: 'Damage', key: "1" }, { label: 'NA', value: 'NA', key: "2" }];
        const RIGHT_WING_MIRRO_FOLDING_MOTOR = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }, { label: 'Not Tested', value: 'Not Tested', key: "2" }, { label: 'NA', value: 'NA', key: "2" }];
        const POWER_WINDOWS = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }];
        const REAR_BOTH_CARPET = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'Damage', value: 'Damage', key: "1" }, { label: 'NA', value: 'NA', key: "2" }];
        const SPARE_TYPE_SUPPORTING = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const SPARE_TYRES = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const JACK_TOOLS_KIT = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const BREAK_DOWN_SIGN = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }];
        const REAR_BOOT_REMOTE_LATCH = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }];



        // Exterior State 
        const [roadTax, setroadTax] = useState(pageOneArrayForCheckOut?.roadTax == "" || pageOneArrayForCheckOut?.roadTax == undefined ? checkOutDataArray.road_tax == "" ? "" : checkOutDataArray?.road_tax : pageOneArrayForCheckOut?.roadTax)
        const [radioAntenna, setradioAntenna] = useState(pageOneArrayForCheckOut?.radioAntenna == "" || pageOneArrayForCheckOut?.radioAntenna == undefined ? checkOutDataArray.radio_antenna == "" ? "" : checkOutDataArray.radio_antenna : pageOneArrayForCheckOut?.radioAntenna)
        const [speedLimitLabel, setspeedLimitLabel] = useState(pageOneArrayForCheckOut?.speedLimitLabel == "" || pageOneArrayForCheckOut?.speedLimitLabel == undefined ? checkOutDataArray.speed_limit_label == "" ? "" : checkOutDataArray.speed_limit_label : pageOneArrayForCheckOut?.speedLimitLabel)
        const [doorAlarm, setdoorAlarm] = useState(pageOneArrayForCheckOut?.doorAlarm == "" || pageOneArrayForCheckOut?.doorAlarm == undefined ? checkOutDataArray.door_alarm == "" ? "" : checkOutDataArray.door_alarm : pageOneArrayForCheckOut?.doorAlarm)
        const [centerLocking, setcenterLocking] = useState(pageOneArrayForCheckOut?.centerLocking == "" || pageOneArrayForCheckOut?.centerLocking == undefined ? checkOutDataArray.centre_locking == "" ? "" : checkOutDataArray.centre_locking : pageOneArrayForCheckOut?.centerLocking)


        // Exterior Data 
        const ROAD_TAX = [{ label: 'Valid', value: 'Valid', key: "0" }, { label: 'Expired', value: 'Expired', key: "1" }, { label: 'NA', value: 'NA', key: "2" }]
        const RADIO_ANTENA = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }]
        const SPEED_LIMIT_LABEL = [{ label: 'Intact', value: 'Intact', key: "0" }, { label: 'NA', value: 'NA', key: "1" }]
        const DOOR_ALARM = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }]
        const CENTER_LOCKING = [{ label: 'Working', value: 'Working', key: "0" }, { label: 'Not Working', value: 'Not Working', key: "1" }]

        let objectForTwo = {
            roadTax,
            radioAntenna,
            speedLimitLabel,
            doorAlarm,
            centerLocking,
        }
        const SaveExterior = () => {
            if (checkOutDataArray?.road_tax == "") {
                if (roadTax !== "" &&
                    radioAntenna !== "" &&
                    speedLimitLabel !== "" &&
                    doorAlarm !== "" &&
                    centerLocking !== "") {
                    dispatch(setPageCheckOutTwoDataInRedux(objectForTwo))
                    goNext()
                } else {
                    showError("Please Enter all the values")
                }
            } else {
                dispatch(setPageCheckOutTwoDataInRedux(objectForTwo))
                goNext()
            }
        }


        // MEDIA FUNCTION START 


        const [previousImage, setpreviousImage] = useState(null);
        const [imagesArray, setImagesArray] = useState();
        // const TotalArrayOfImages = checkOutDataArray.photos;
        const [TotalArrayOfImages, setTotalArrayOfImages] = useState(checkOutDataArray?.photos);

        const [mediaaLoading, setmediaaLoading] = useState(false);


        const createFormData = (imagePath, body = {}) => {
            const data = new FormData();

            data.append('file', {
                uri: Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
                name: 'image.png',
                fileName: 'image',
                type: 'image/png',
            });

            Object.keys(body).forEach(key => {
                data.append(key, body[key]);
            });
            console.log('data ---------', data);
            return data;
        };

        useEffect(() => {
            // console.log(pageTwoArrayForCheckOut, 'THIS IS THE EXTERIOR DATA');
            console.log('RE RUN');
            let CheckInMediaImages = checkOutDataArray.photos;
            setpreviousImage(CheckInMediaImages);
        }, []);

        const onSelectImage = async () => {
            const permissionStatus = await androidCameraPermission();
            if (permissionStatus || Platform.OS == 'ios') {
                Alert.alert('Upload Order Image', 'Choose an option', [
                    { text: 'Camera', onPress: onCamera },
                    { text: 'Gallery', onPress: onGallery },
                    { text: 'Cancel', onPress: () => { } },
                ]);
            }
        };

        const onCamera = () => {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log(image);
                // setphoto(image.path);
                handleUploadPhoto(image.path);
            });
        };

        const onGallery = async () => {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                console.log('selected Image', image);
                // setphoto(image.path);
                handleUploadPhoto(image.path);
            });
        };


        const handleUploadPhoto = async (IMAGE_PATH) => {
            setmediaaLoading(true)

            let data = createFormData(IMAGE_PATH, { order_id: orderId })

            console.log(TotalArrayOfImages, "HERE IT IS Before");

            UploadOrderImagesAPI(data).then((res) => {
                console.log('response IS THIS', res?.data);
                if (res?.data?.success === true) {
                    dispatch(setCheckOutUploadOrderImage(res));
                    let setData = { url: res?.data?.url }
                    TotalArrayOfImages.push(setData)
                    let check = [setData]
                    console.log(TotalArrayOfImages, "Normal Data");
                    console.log(check, "CHECK DATA");
                    ShowSuccessMessage('fetched Success');
                    console.log(imagesArray, "<------");
                    setmediaaLoading(false)
                } else {
                    ShowErrorMessage('Not able to upload Image Try Again');
                   return setmediaaLoading(false)
                }
                return res;

            }).catch(err => { return err; });
            setImagesArray(TotalArrayOfImages);
            console.log(TotalArrayOfImages, "HERE IT IS AFTER");
        };

        const selectImage = (item) => {
            console.log(item);
            Alert.alert('Delete Order Image', 'Choose an option', [
                { text: 'Delete', onPress: () => deleteImage(item) },
                { text: 'Cancel', onPress: () => { return } },
            ]);
        }

        const deleteImage = async (image) => {

            setmediaaLoading(true)

            console.log(TotalArrayOfImages, "Array Before Deletion");

            index = TotalArrayOfImages.findIndex(x => x.url === image);

            console.log(index);

            TotalArrayOfImages.splice(index, 1);

            setpreviousImage(TotalArrayOfImages);

            ShowSuccessMessage("Image Deleted", image)

            setmediaaLoading(false)
            let data = {
                file_name: image,
            }

            DeleteImageAPI(data).then((res) => {
                console.log(res?.data, "Data return from Image");
                setmediaaLoading(false)
                return res;

            }).catch(err => {             setmediaaLoading(false);                return err; });
        }


        const SaveMedia = () => {

            dispatch(setCheckOutUploadOrderImage(TotalArrayOfImages))
            goNext()
        }


        const ImageSection = ({ item }) => {
            return (
                <>
                {
                    disableEdit == false ?
                    <ImageAction imageURL={item?.url} onImageTouch={() => selectImage(item.url)} />
                    :
                    <ImageAction imageURL={item?.url}  />
                }

                </>
            )
        }



        // Media FUNCTION END 

        // Other FUNCTION START   
        const [mileage, setmileage] = useState(pageOtherItemArrayForCheckOut?.mileage == "" || pageOtherItemArrayForCheckOut?.mileage == undefined ? checkOutDataArray.mileage == "" ? "" : checkOutDataArray.mileage : pageOtherItemArrayForCheckOut?.mileage)
        const [gasolineLevel, setgasolineLevel] = useState(pageOtherItemArrayForCheckOut?.gasolineLevel == "" || pageOtherItemArrayForCheckOut?.gasolineLevel == undefined ? checkOutDataArray.gasoline_level == "" ? "" : checkOutDataArray.gasoline_level : pageOtherItemArrayForCheckOut?.gasolineLevel)
        const [startDate, setStartDate] = useState(pageOtherItemArrayForCheckOut?.startDate == "" || pageOtherItemArrayForCheckOut?.startDate == undefined ? checkOutDataArray.check_in_date == "" ? "" : checkOutDataArray.check_in_date : pageOtherItemArrayForCheckOut?.startDate)
        const [userSuperVisor, setUserSuperVisor] = useState(pageOtherItemArrayForCheckOut?.checkInBy == "" || pageOtherItemArrayForCheckOut?.checkInBy == undefined ? checkOutDataArray.check_in_by == "" ? "" : checkOutDataArray.check_in_by : pageOtherItemArrayForCheckOut?.checkInBy)
        const [checkInBy, setcheckInBy] = useState(checkOutDataArray.check_in_by)
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [supervisors, setSupervisors] = useState();
        const [loading, setLoading] = useState(true);

        const GASOLINE_LEVEL = [{ label: 'E', value: 'E', key: "0" },
        { label: '1/8', value: '1/8', key: "1" },
        { label: '1/4', value: '1/4', key: "2" },
        { label: '1/2', value: '1/2', key: "3" },
        { label: '5/8', value: '5/8', key: "4" },
        { label: '3/4', value: '3/4', key: "5" },
        { label: '7/8', value: '7/8', key: "6" },
        { label: 'F', value: 'F', key: "7" },
        { label: 'N/A', value: 'N/A', key: "8" },
        ]





        const fetchSuperVisor = async (data) => {

            FetchSuperVisorAPI(data).then((res) => {
                let trying = null
                console.log(res?.data?.supervisors, "It is the Superviors ");
                let setingObect = (res?.data?.supervisors.map((superVisor, index) => {
                    return trying = { label: superVisor.name, value: superVisor.name, key: index.toString() }
                }))
                console.log(setingObect, "SETTING THE OBJECT")
                setSupervisors(setingObect)
                setLoading(false)
                return res;
            }).catch(err => { return err; });
        }



        useEffect(() => {
            console.log(orderImageArrayForCheckOut, "THIS IS THE IMAGE ARRAY DATA");
            fetchSuperVisor({})
        }, [])



        const showStartDatePicker = () => {
            setDatePickerVisibility(true);
            setStartDate(null)
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handelStartPicker = (date) => {
            console.log("A date has been picked: ", date);
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handelStartPicker}
                onCancel={hideDatePicker}
            />
            hideDatePicker();
            setStartDate(moment(date).format('YYYY-MM-DD'))
        };

        // Other FUNCTION END 

        let objectForOther = {
            mileage,
            gasolineLevel,
            userSuperVisor,
            startDate,
        }

        const tapForLog = () => {
            // console.log(checkOutDataArray, "checkOutDataArray THIS IS REDUX OBJ VALUE");
            console.log(pageOtherItemArrayForCheckOut, "pageOtherItemArrayForCheckOut THIS IS REDUX OBJ VALUE");
            console.log(objectForOther, "objectForOther THIS IS REDUX OBJ VALUE");
        }

        const SaveOtherItem = async () => {
            if (checkOutDataArray?.mileage == "") {
                if (mileage !== "" &&
                    gasolineLevel !== "" &&
                    startDate !== "" &&
                    userSuperVisor !== "") {

                    dispatch(setCheckOutPageOtherItemDataInRedux(objectForOther))
                    goNext()
                    setloacalLoading(true)
                    setTimeout(() => {
                        finalSubmit()
                    }, 5000);
                } else {

                    ShowErrorMessage("Please Enter all the values")

                }
            } else {

                dispatch(setCheckOutPageOtherItemDataInRedux(objectForOther))
                goNext()
                setloacalLoading(true)
                setTimeout(() => {
                    finalSubmit()
                }, 5000);
            }

        }

        return (
            <>
                <View>
                    {page === 1 ?
                        <>
                        {disableEdit == true ? null : 
                            <TouchableOpacity style={styles.TileView} onPress={() => { props?.CheckInAPIData() }} >
                                <Text style={styles.TileText} >FETCH DATA FROM CHECK-IN</Text>
                            </TouchableOpacity>
                        }


                            <Text style={styles.TextColor} >Vehicle IU</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value, index) => setchooseData((index - 1).toString())}
                                itemKey={pageOneArrayForCheckOut?.chooseData == "" || pageOneArrayForCheckOut?.chooseData == undefined ? checkOutDataArray.vehicle_iu == "" ? "" : checkOutDataArray.vehicle_iu : pageOneArrayForCheckOut?.chooseData}
                                style={pickerSelectStyles}
                                items={VEHICLE_IU}
                                disabled={disableEdit}
                            />



                            <Text style={styles.TextColor} >Fix Accessories</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                itemKey={pageOneArrayForCheckOut?.fixAccessories == "" || pageOneArrayForCheckOut?.fixAccessories == undefined ? checkOutDataArray.fix_accessories == "" ? "" : checkOutDataArray.fix_accessories : pageOneArrayForCheckOut?.fixAccessories}
                                onValueChange={(value, index) => setfixAccessories((index - 1).toString())}
                                items={FIX_ACCESSORIES}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >No.of Car mats / carpets</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                onChangeText={text => setnumberOfCarpets(text)}
                                autoCorrect={false}
                                keyboardType='numeric'
                                editable={!disableEdit}
                                autoCapitalize="none"
                            >
                                {numberOfCarpets === ""
                                    ? checkOutDataArray.carpets
                                    : numberOfCarpets}
                            </TextInput>



                            <Text style={styles.TextColor} >Solar Films</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.solarFilm == "" || pageOneArrayForCheckOut?.solarFilm == undefined ? checkOutDataArray.solar_film == "" ? "" : checkOutDataArray.solar_film : pageOneArrayForCheckOut?.solarFilm}
                                onValueChange={(value, index) => setsolarFilm((index - 1).toString())}
                                items={SOLAR_FILMS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Seat leather/panels</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.seatLeatherPannel == "" || pageOneArrayForCheckOut?.seatLeatherPannel == undefined ? checkOutDataArray.seat_leather == "" ? "" : checkOutDataArray.seat_leather : pageOneArrayForCheckOut?.seatLeatherPannel}
                                onValueChange={(value, index) => setseatLeatherPannel((index - 1).toString())}
                                items={SEAT_LEATHER_PANEL}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Safety Belts</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.safteyBelts == "" || pageOneArrayForCheckOut?.safteyBelts == undefined ? checkOutDataArray.safety_belts == "" ? "" : checkOutDataArray.safety_belts : pageOneArrayForCheckOut?.safteyBelts}
                                onValueChange={(value, index) => setsafteyBelts((index - 1).toString())}
                                items={SAFTEY_BELTS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Dashboard</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.dashBoard == "" || pageOneArrayForCheckOut?.dashBoard == undefined ? checkOutDataArray.dashboard == "" ? "" : checkOutDataArray.dashboard : pageOneArrayForCheckOut?.dashBoard}
                                onValueChange={(value, index) => setdashBoard((index - 1).toString())}
                                items={DASHBOARD}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Radio/CD/DVD player</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.radioCdDvd == "" || pageOneArrayForCheckOut?.radioCdDvd == undefined ? checkOutDataArray.radio_player == "" ? "" : checkOutDataArray.radio_player : pageOneArrayForCheckOut?.radioCdDvd}
                                onValueChange={(value, index) => setradioCdDvd((index - 1).toString())}
                                items={RADIO_CD_DVD}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Ash Tray/Cigarette Lighter</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.ashTray == "" || pageOneArrayForCheckOut?.ashTray == undefined ? checkOutDataArray.ash_tray == "" ? "" : checkOutDataArray.ash_tray : pageOneArrayForCheckOut?.ashTray}
                                onValueChange={(value, index) => setashTray((index - 1).toString())}
                                items={ASH_TRAY}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Warning Light</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.warnigLight == "" || pageOneArrayForCheckOut?.warnigLight == undefined ? checkOutDataArray.warning_light == "" ? "" : checkOutDataArray.warning_light : pageOneArrayForCheckOut?.warnigLight}
                                onValueChange={(value, index) => setwarnigLight((index - 1).toString())}
                                items={WARNIG_LIGHT}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Indicate light on</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.indicateLightOn == "" || pageOneArrayForCheckOut?.indicateLightOn == undefined ? checkOutDataArray.indicate_light_on == "" ? "" : checkOutDataArray.indicate_light_on : pageOneArrayForCheckOut?.indicateLightOn}
                                onValueChange={(value, index) => setindicateLightOn((index - 1).toString())}
                                items={INDICATE_LIGHT_ON}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Air Con</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.airCon == "" || pageOneArrayForCheckOut?.airCon == undefined ? checkOutDataArray.air_con == "" ? "" : checkOutDataArray.air_con : pageOneArrayForCheckOut?.airCon}
                                onValueChange={(value, index) => setairCon((index - 1).toString())}
                                items={AIR_CON}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Horn</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.horn == "" || pageOneArrayForCheckOut?.horn == undefined ? checkOutDataArray.horn == "" ? "" : checkOutDataArray.horn : pageOneArrayForCheckOut?.horn}
                                onValueChange={(value, index) => sethorn((index - 1).toString())}
                                items={HORN}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Real Mirror/ Clip On Mirror</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.realMirror == "" || pageOneArrayForCheckOut?.realMirror == undefined ? checkOutDataArray.real_mirror == "" ? "" : checkOutDataArray.real_mirror : pageOneArrayForCheckOut?.realMirror}
                                onValueChange={(value, index) => setrealMirror((index - 1).toString())}
                                items={REAL_MIRROR}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Right wing mirror folding motor/ Auto left</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.rightingMirror == "" || pageOneArrayForCheckOut?.rightingMirror == undefined ? checkOutDataArray.right_wing_mirror == "" ? "" : checkOutDataArray.right_wing_mirror : pageOneArrayForCheckOut?.rightingMirror}
                                onValueChange={(value, index) => setrightingMirror((index - 1).toString())}
                                items={RIGHT_WING_MIRRO_FOLDING_MOTOR}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Power Windows</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.powerWindows == "" || pageOneArrayForCheckOut?.powerWindows == undefined ? checkOutDataArray.power_window == "" ? "" : checkOutDataArray.power_window : pageOneArrayForCheckOut?.powerWindows}
                                onValueChange={(value, index) => setpowerWindows((index - 1).toString())}
                                items={POWER_WINDOWS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Rear booth carpet / Mat</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.crearBoothCarpet == "" || pageOneArrayForCheckOut?.crearBoothCarpet == undefined ? checkOutDataArray.rear_booth_carpet == "" ? "" : checkOutDataArray.rear_booth_carpet : pageOneArrayForCheckOut?.crearBoothCarpet}
                                onValueChange={(value, index) => setcrearBoothCarpet((index - 1).toString())}
                                items={REAR_BOTH_CARPET}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Spare Tyre Supporting board</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.spareTyreSupporting == "" || pageOneArrayForCheckOut?.spareTyreSupporting == undefined ? checkOutDataArray.spare_tyre_supporting_board == "" ? "" : checkOutDataArray.spare_tyre_supporting_board : pageOneArrayForCheckOut?.spareTyreSupporting}
                                onValueChange={(value, index) => setspareTyreSupporting((index - 1).toString())}
                                items={SPARE_TYPE_SUPPORTING}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Spare Tyres</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.spareTyres == "" || pageOneArrayForCheckOut?.spareTyres == undefined ? checkOutDataArray.spare_tyre == "" ? "" : checkOutDataArray.spare_tyre : pageOneArrayForCheckOut?.spareTyres}
                                onValueChange={(value, index) => setspareTyres((index - 1).toString())}
                                items={SPARE_TYRES}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Jack Tools/ Kit</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.jackToolKit == "" || pageOneArrayForCheckOut?.jackToolKit == undefined ? checkOutDataArray.tool_kit == "" ? "" : checkOutDataArray.tool_kit : pageOneArrayForCheckOut?.jackToolKit}
                                onValueChange={(value, index) => setjackToolKit((index - 1).toString())}
                                items={JACK_TOOLS_KIT}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Breakdown Sign</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.breakDownSign == "" || pageOneArrayForCheckOut?.breakDownSign == undefined ? checkOutDataArray.breakdown_sign == "" ? "" : checkOutDataArray.breakdown_sign : pageOneArrayForCheckOut?.breakDownSign}
                                onValueChange={(value, index) => setbreakDownSign((index - 1).toString())}
                                items={BREAK_DOWN_SIGN}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Rear boot remote /Latch</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckOut?.rearBootRemoteLatch == "" || pageOneArrayForCheckOut?.rearBootRemoteLatch == undefined ? checkOutDataArray.rear_boot_remote == "" ? "" : checkOutDataArray.rear_boot_remote : pageOneArrayForCheckOut?.rearBootRemoteLatch}
                                onValueChange={(value, index) => setrearBootRemoteLatch((index - 1).toString())}
                                items={REAR_BOOT_REMOTE_LATCH}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Add Remarks</Text>
                            {
                        Platform.OS === 'ios' ?
                            <TextInput
                                editable={!disableEdit}
                                multiline={true}
                                numberOfLines={5}
                                placeholderTextColor="#979797"
                                placeholder="Enter the remarks..."
                                onChangeText={text => setinteriorRemarks(text)}
                                backgroundColor="#fff"
                                autoCorrect={false}
                                style={styles.RemarkInput}
                                maxLength={150}
                            >
                             {pageOneArrayForCheckOut?.interiorRemarks == "" || pageOneArrayForCheckOut?.interiorRemarks == undefined ? checkOutDataArray.remarks == "" ? "" : checkOutDataArray.remarks : pageOneArrayForCheckOut?.interiorRemarks}
                            </TextInput>
                            :
                            <TextInput
                                //    {...preRemark}
                                editable={!disableEdit}
                                multiline={true}
                                style={{
                                    textAlignVertical: 'top', padding: 10, color: '#000', borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', borderRadius: 5, fontSize: 18, marginVertical: 10,
                                }}
                                // style={styles.RemarkInput}
                                numberOfLines={5}
                                onChangeText={text => setinteriorRemarks(text)}
                                placeholderTextColor="#979797"
                                placeholder="Enter the remarks..."
                                autoCorrect={false}
                                maxLength={150}
                                backgroundColor="#fff" >
                                 {pageOneArrayForCheckOut?.interiorRemarks == "" || pageOneArrayForCheckOut?.interiorRemarks == undefined ? checkOutDataArray.remarks == "" ? "" : checkOutDataArray.remarks : pageOneArrayForCheckOut?.interiorRemarks}
                            </TextInput>
                    }
                            {/* <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                onChangeText={text => setinteriorRemarks(text)}
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!disableEdit}
                            >
                                {pageOneArrayForCheckOut?.interiorRemarks == "" || pageOneArrayForCheckOut?.interiorRemarks == undefined ? checkOutDataArray.remarks == "" ? "" : checkOutDataArray.remarks : pageOneArrayForCheckOut?.interiorRemarks}
                            </TextInput> */}
                            {disableEdit == false ?
                                <FormButton buttonTitle="NEXT" onPress={() => {SaveInterior(); fillDetailSection()}} />
                                :
                                <FormButton buttonTitle="NEXT" onPress={() => {goNext(); fillDetailSection()}} />
                            }
                        </>
                        : page == 2 ?
                            <>


                                <View>
                                    <Text style={styles.TextColor} >Road Tax</Text>
                                    <RNPickerSelect
                                        // placeholder={{}}
                                        useNativeAndroidPickerStyle={false}
                                        itemKey={pageTwoArrayForCheckOut?.roadTax == "" || pageTwoArrayForCheckOut?.roadTax == undefined ? checkOutDataArray.road_tax == "" ? "" : checkOutDataArray.road_tax : pageTwoArrayForCheckOut?.roadTax}
                                        onValueChange={(value, index) => setroadTax((index - 1).toString())}
                                        items={ROAD_TAX}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Radio Antenna</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckOut?.radioAntenna == "" || pageTwoArrayForCheckOut?.radioAntenna == undefined ? checkOutDataArray.radio_antenna == "" ? "" : checkOutDataArray.radio_antenna : pageTwoArrayForCheckOut?.radioAntenna}
                                        onValueChange={(value, index) => setradioAntenna((index - 1).toString())}
                                        items={RADIO_ANTENA}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Speed Limit Label</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckOut?.speedLimitLabel == "" || pageTwoArrayForCheckOut?.speedLimitLabel == undefined ? checkOutDataArray.speed_limit_label == "" ? "" : checkOutDataArray.speed_limit_label : pageTwoArrayForCheckOut?.speedLimitLabel}
                                        onValueChange={(value, index) => setspeedLimitLabel((index - 1).toString())}
                                        items={SPEED_LIMIT_LABEL}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Door Alarm</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckOut?.doorAlarm == "" || pageTwoArrayForCheckOut?.doorAlarm == undefined ? checkOutDataArray.door_alarm == "" ? "" : checkOutDataArray.door_alarm : pageTwoArrayForCheckOut?.doorAlarm}
                                        onValueChange={(value, index) => setdoorAlarm((index - 1).toString())}
                                        items={DOOR_ALARM}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Centre Locking</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckOut?.centerLocking == "" || pageTwoArrayForCheckOut?.centerLocking == undefined ? checkOutDataArray.centre_locking == "" ? "" : checkOutDataArray.centre_locking : pageTwoArrayForCheckOut?.centerLocking}
                                        onValueChange={(value, index) => setcenterLocking((index - 1).toString())}
                                        items={CENTER_LOCKING}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                </View>
                                {disableEdit == false ?
                                    <FormButton buttonTitle="NEXT" onPress={() => {SaveExterior(); fillDetailSection()}} />
                                    :
                                    <FormButton buttonTitle="NEXT" onPress={() => {goNext(); fillDetailSection()}} />
                                }
                            </>
                            : page == 3 ?
                                mediaaLoading == true ? <Spinner style={{ height: windowHeight }} /> :

                                    <>
                                        <View style={styles.TotalMediaWrapper} >

                                            <Text style={styles.ImageHeadingText} >Upload Photos & Videos</Text>
                                            <View style={styles.ImageWrapper} >
                                                <View style={styles.ImageView} >
                                                    <FlatList
                                                        data={TotalArrayOfImages}
                                                        horizontal={true}
                                                        renderItem={ImageSection}
                                                        // numColumns={3}
                                                        keyExtractor={item => item.id}
                                                    />
                                                    {disableEdit == true ? null :
                                                        <View style={styles.addIMageView} >
                                                            <TouchableOpacity style={styles.ADDtouchImage} onPress={() => onSelectImage()} >
                                                                <Image style={styles.addImageStyle} source={Images.CameraImage} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                        </View>}
                                                </View>
                                            </View>
                                            {disableEdit == false ?
                                                <FormButton buttonTitle="NEXT" onPress={() => {SaveMedia(); fillDetailSection()}} />
                                                :
                                                <FormButton buttonTitle="NEXT" onPress={() => {goNext(); fillDetailSection()}} />
                                            }

                                        </View>

                                        {/* Here */}
                                    </>
                                : page == 4 ?

                                    loading === true ?
                                        <Spinner style={{ height: windowHeight / 2 }} />
                                        :

                                        loacalLoading === true ?
                                            <Spinner style={{ height: windowHeight / 2 }} /> :
                                            <>

                                                <View>
                                                    <Text style={styles.TextColor}>Mileage</Text>
                                                    <TextInput
                                                        style={styles.TextInputStyles}
                                                        placeholder="Enter the number"
                                                        onChangeText={text => setmileage(text)}
                                                        autoCorrect={false}
                                                        keyboardType="numeric"
                                                        autoCapitalize="none"
                                                        editable={!disableEdit}
                                                    >
                                                        {mileage === null ? checkOutDataArray.mileage :
                                                            mileage}
                                                    </TextInput>

                                                    <Text style={styles.TextColor} >Gasoline Level</Text>
                                                    <RNPickerSelect
                                                        useNativeAndroidPickerStyle={false}
                                                        // placeholder={{}}
                                                        itemKey={pageOtherItemArrayForCheckOut?.gasolineLevel == "" || pageOtherItemArrayForCheckOut?.gasolineLevel == undefined ? checkOutDataArray.gasoline_level == "" ? "" : checkOutDataArray.gasoline_level : pageOtherItemArrayForCheckOut?.gasolineLevel}
                                                        onValueChange={(value, index) => setgasolineLevel((index - 1).toString())}
                                                        items={GASOLINE_LEVEL}
                                                        disabled={disableEdit}
                                                        style={pickerSelectStyles}
                                                    />
                                                    <Pressable style={styles.CalenderToucableOpacity} disabled={disableEdit} activeOpacity={0.8} onPress={() => { disableEdit == true ? {} : showStartDatePicker() }} >
                                                        <FormInput
                                                            editable={false}
                                                            headingTextColor={"#000"}
                                                            iconType="calendar"
                                                            changedText={text => setStartDate(text)}
                                                            InputSubject="Service Date"
                                                            autoCapitalize="none"
                                                            autoCorrect={false}
                                                            userHeight={50}
                                                            fontsize={16}
                                                        >
                                                            {startDate === null ? moment(checkOutDataArray.check_in_date).format('YYYY-MM-DD') : moment(startDate).format('YYYY-MM-DD')}
                                                        </FormInput>
                                                    </Pressable>
                                                    {/* <View style={styles.dateStyle} >
                                                        <Text style={styles.TextColor} >Check In By</Text>
                                                        <RNPickerSelect
                                                            useNativeAndroidPickerStyle={false}
                                                            // placeholder={{}}
                                                            itemKey={pageOtherItemArrayForCheckOut?.checkInBy == "" || pageOtherItemArrayForCheckOut?.checkInBy == undefined ? checkOutDataArray.check_in_by == "" ? "" : checkOutDataArray.check_in_by : pageOtherItemArrayForCheckOut?.checkInBy}
                                                            onValueChange={(value, index) => setUserSuperVisor((index - 1).toString())}
                                                            items={supervisors}
                                                            disabled={disableEdit}
                                                            style={pickerSelectStyles}
                                                        />
                                                    </View> */}
                                                    <DateTimePickerModal
                                                        minimumDate={new Date()}
                                                        isVisible={isDatePickerVisible}
                                                        mode="date"
                                                        onConfirm={handelStartPicker}
                                                        onCancel={hideDatePicker}
                                                    />
                                                </View>
                                                {disableEdit == false ?
                                                    <FormButton buttonTitle="SUBMIT" onPress={() => SaveOtherItem()} />
                                                    :
                                                    <FormButton buttonTitle="DONE" onPress={() => navigation.goBack()} />
                                                }
                                                {/* <FormButton buttonTitle="SEND" onPress={() => finalSubmit()} /> */}
                                            </>

                                    : null
                    }


                </View>
            </>
        )
    }




    const goNext = async () => {
        if (page === 4) {
            // FinalDataSave()
            return;
        }
        setPage(page => page + 1);
        if (page === 1) {
            setActive(active + 1);
            // childRef.current.localRun()
        } else if (page === 2) {
            setActive(active + 1);
            // childTwoRef.current.saveDataTwoInRedux()
        } else if (page === 3) {
            setActive(active + 1);
        } else if (page === 4) {
            setActive(active + 4);
        }
    };

    const goToStepOne = () => {
        if (page === 2) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };

    const goToStepTwo = () => {
        if (page === 3) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };

    const goToStepThree = () => {
        if (page === 4) {
            setPage(page => page - 1);
            setActive(active - 1);
        } else {
            return;
        }
    };

    return (
        <View>
            <View style={styles.StepWiseWrapper} >
                {loacalLoading === true ? <Spinner style={{ height: windowHeight }} /> :

                    <View style={styles.StepProgressWrap} >
                        <View style={styles.ProgressLine}>
                            <View style={styles.StepLine}></View>

                            {active === 1 ? (
                                <View style={styles.StepNameAndCircle} >
                                    <View style={styles.StepCircleTouchActive} onPress={goToStepOne}>
                                        <View style={styles.UpperCircle} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                    </View>
                                    <Text style={styles.StepTextActive} >Interior</Text>

                                </View>
                            ) : (

                                <View style={styles.StepNameAndCircle} >
                                    <Pressable style={styles.StepCircleTouch} onPress={goToStepOne}>
                                        <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                    </Pressable>
                                    <Text style={styles.StepText} >Interior</Text>
                                </View>
                            )}
                            {active === 2 ? (
                                <View style={styles.StepNameAndCircle} >
                                    <View style={styles.StepCircleTouchActive} onPress={goToStepTwo}>
                                        <View style={styles.UpperCircle}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                    </View>
                                    <Text style={styles.StepTextActive} >Exterior</Text>
                                </View>
                            ) : (
                                <View style={styles.StepNameAndCircle} >
                                    <Pressable style={styles.StepCircleTouch} onPress={goToStepTwo}>
                                        <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                    </Pressable>
                                    <Text style={styles.StepText} >Exterior</Text>
                                </View>
                            )}
                            {active === 3 ? (
                                <View style={styles.StepNameAndCircle} >
                                    <View style={styles.StepCircleTouchActive} onPress={goToStepThree}>
                                        <View style={styles.UpperCircle} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                    </View>
                                    <Text style={styles.StepTextActive} >Media</Text>
                                </View>
                            ) : (
                                <View style={styles.StepNameAndCircle} >
                                    <Pressable style={styles.StepCircleTouch} onPress={goToStepThree}>
                                        <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                    </Pressable>
                                    <Text style={styles.StepText} >Media</Text>
                                </View>
                            )}
                            {active === 4 ? (
                                <View style={styles.StepNameAndCircle} >
                                    <View style={styles.StepCircleTouchActive} >
                                        <View style={styles.UpperCircle} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                    </View>
                                    <Text style={styles.StepTextActive} >Other Items</Text>
                                </View>
                            ) : (
                                <View style={styles.StepNameAndCircle} >
                                    <View style={styles.StepCircleTouch} >
                                        <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                    </View>
                                    <Text style={styles.StepText} >Other Items</Text>
                                </View>
                            )}
                        </View>

                    </View>
                }
                <ScrollView ref={scrollViewRef} onContentSizeChange={() => fillDetailSection} style={{ flex: 1, alignSelf: "stretch", marginBottom: 20, paddingBottom: 20 }}>

                    <View style={styles.StepContentView}>
                        <View style={styles.PageContent} >
                            {page === 1 &&
                                <StepWiseComponent />
                            }
                            {page === 2 &&
                                <StepWiseComponent />
                            }
                            {page === 3 &&
                                <StepWiseComponent />
                            }
                            {page === 4 &&
                                <StepWiseComponent />
                            }
                        </View>
                        {/* <PageButton>
                        </PageButton> */}
                    </View>
                </ScrollView>

            </View>

        </View>

    )
}

export default StepWiseForm

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,

    },

    inputAndroid: {
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
});


const styles = StyleSheet.create({
    CheckInWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    StepWiseWrapper: {
        marginBottom: 10,
        height: "100%",
    },
    StepProgressWrap: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "center",
        height: '15%',
        alignItems: "center",
    },
    ProgressLine: {
        flexDirection: "row",
        height: "70%",
        width: '85%',
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
        top: 0,
    },
    StepLine: {
        backgroundColor: "#000",
        height: "2%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        /* left: 90%, */
        width: "95%",
        top: "45%",
        // content: '',
    },
    StepLine: {
        backgroundColor: "#000",
        height: "2%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        /* left: 90%, */
        width: "95%",
        top: "45%",
        // content: '',
    },
    StepNameAndCircle: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
        /* width:25% , */
        height: "100%",
    },
    StepCircleTouchActive: {
        backgroundColor: "#AE282E",
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "5%",
        borderColor: '#FFF',
        borderWidth: 3,
    },
    UpperCircle: {
        // backgroundColor: "transparent",
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderColor: '#AE282E',
        borderWidth: 3,
    },
    StepTextActive: {
        position: "absolute",
        color: "#AE282E",
        fontSize: 16,
        width: "250%",
        alignSelf: "center",
        bottom: 0,
        textAlign: "center",
    },
    StepText: {
        color: "#004A7F",
        position: "absolute",
        fontSize: 16,
        width: "250%",
        alignSelf: 'center',
        bottom: 0,
        textAlign: 'center',
    },
    StepCircleTouch: {
        backgroundColor: "#004A7F",
        width: 40,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: '5%',
    },
    StepContentView: {
        height: "100%",
        paddingBottom: '15%',
        paddingHorizontal: '5%'
        // padding: 0 5% 15% 5%,
    },
    PageContent: {
        maxHeight: "100%",
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
    },
    MediaWrapper: {
        width: '100%',
        height: '100%',
    },
    ImageView: {
        width: '100%',
        justifyContent: 'space-around',
        height: '70%',
    },
    touchImage: {
        width: windowWidth / 2.2,
        height: '100%',
        marginRight: 10,
        borderRadius: 5,
    },
    addIMageView: {
        width: windowWidth / 2.2,
        height: '55%',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 5,
    },
    ADDtouchImage: {
        backgroundColor: '#E8EFF5',
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    addImageStyle: {
        backgroundColor: '#E8EFF5',
    },
    ImageWrapper: {
        width: '100%',
        flex: 1,
        height: windowHeight / 1.7,
    },
    TotalMediaWrapper: {
        width: '100%',
    },
    ImageHeadingText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 24,
        color: "#155B9F",
        paddingVertical: 10,
    },
    TextInputStyles: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
        color: '#000',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    TileView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: "80%",
      },
      TileText: {
        fontSize: 14,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 16,
        color: "#155B9F",
        paddingHorizontal: 10,
      },
      RemarkInput: {
        backgroundColor: "#fff",
        padding: 5,
        width: "100%",
        height: 100,
        fontSize: 18,
        color: "#000",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
    },


})

