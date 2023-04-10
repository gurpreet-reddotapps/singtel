import { View, Text, StatusBar, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable, Alert, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Spinner from '../../Components/Spinner'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission'
import ImagePreview from '../../Components/ImagePreview'
import RNPickerSelect from 'react-native-picker-select';
import FeIcon from 'react-native-vector-icons/Feather'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { useSelector, useDispatch } from 'react-redux';
import { CheckInDataStore, DeleteImageAPI, FetchSuperVisorAPI, UploadOrderImagesAPI } from '../../api'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import { setPageOneDataInRedux, setPageOtherItemDataInRedux, setPageTwoDataInRedux, setUploadOrderImage } from '../../../../redux/actions/CheckIn'
import FormButton from '../../Components/FormButton'
import FormInput from '../../Components/FormInput'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment'
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImageAction from '../../Components/ImageAction'
import Images from '../../assets/Images'
import AsyncStorage from '@react-native-async-storage/async-storage';










const StepWiseForm = (props) => {
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(props?.disableEdit);
    const { checkInDataArray, pageOneArrayForCheckIn, pageTwoArrayForCheckIn, orderImageArray, pageOtherItemArrayForCheckIn, reduxLoading } = useSelector(state => state.CheckInDetail);
    const { jobId, orderId, jobDetail } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(true);

    const scrollViewRef = useRef();
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const fillDetailSection = () => {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
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
        } else if (jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id) {
            setdisableEdit(true)
        }
    }, [])


    //HER THE MAIN RENDER OF STEPWISE START




    //   useEffect(() => {
    //     fillDetailSection()   
    //      }, [])






    const StepWiseComponent = () => {

        // Final API HIT FOR DATA SAVE 


        const finalSubmit = async () => {


            let data = {
                order_id: orderId,
                // Exterior 
                road_tax: pageTwoArrayForCheckIn?.speedLimitLabel,
                radio_antenna: pageTwoArrayForCheckIn?.roadTax,
                speed_limit_label: pageTwoArrayForCheckIn?.radioAntenna,
                door_alarm: pageTwoArrayForCheckIn?.doorAlarm,
                centre_locking: pageTwoArrayForCheckIn?.centerLocking,
                // Interior 
                vehicle_iu: pageOneArrayForCheckIn?.chooseData,
                fix_accessories: pageOneArrayForCheckIn?.fixAccessories,
                carpets: pageOneArrayForCheckIn?.numberOfCarpets,
                solar_film: pageOneArrayForCheckIn?.solarFilm,
                seat_leather: pageOneArrayForCheckIn?.seatLeatherPannel,
                safety_belts: pageOneArrayForCheckIn?.safteyBelts,
                dashboard: pageOneArrayForCheckIn?.dashBoard,
                radio_player: pageOneArrayForCheckIn?.radioCdDvd,
                ash_tray: pageOneArrayForCheckIn?.ashTray,
                warning_light: pageOneArrayForCheckIn?.warnigLight,
                indicate_light_on: pageOneArrayForCheckIn?.indicateLightOn,
                air_con: pageOneArrayForCheckIn?.airCon,
                horn: pageOneArrayForCheckIn?.horn,
                real_mirror: pageOneArrayForCheckIn?.realMirror,
                right_wing_mirror: pageOneArrayForCheckIn?.rightingMirror,
                power_window: pageOneArrayForCheckIn?.powerWindows,
                rear_booth_carpet: pageOneArrayForCheckIn?.crearBoothCarpet,
                spare_tyre_supporting_board: pageOneArrayForCheckIn?.spareTyreSupporting,
                spare_tyre: pageOneArrayForCheckIn?.spareTyres,
                tool_kit: pageOneArrayForCheckIn?.jackToolKit,
                breakdown_sign: pageOneArrayForCheckIn?.breakDownSign,
                rear_boot_remote: pageOneArrayForCheckIn?.rearBootRemoteLatch,
                remarks: pageOneArrayForCheckIn?.interiorRemarks,
                // Other Item 
                mileage: objectForOther.mileage,
                gasoline_level: objectForOther.gasolineLevel,
                check_in_date: moment(objectForOther.startDate).format('YYYY-MM-DD'),
                check_in_by: objectForOther.userSuperVisor,
                // photos: orderImageArray,
                photos: TotalArrayOfImages,
            }
            CheckInDataStore(data).then(async (res) => {
                console.log(res?.data, "This is the response after saving the Check In");
                if (res?.data?.success === true) {
                    ShowSuccessMessage("The Check In Data Was Saved")
                    try {
                        await AsyncStorage.setItem(`check_in_marking_${orderId}`, true.toString())
                    } catch (e) {
                        console.log(e);
                    }
                    navigation.goBack()
                } else {
                    ShowErrorMessage("Check In Data was not Saved")
                }
                return res?.data;
            }).catch(err => { return err; });
            setloacalLoading(false)


            props.checkInAPI()

        }





        const [chooseData, setchooseData] = useState(pageOneArrayForCheckIn?.chooseData == "" || pageOneArrayForCheckIn?.chooseData == undefined ? checkInDataArray.vehicle_iu == "" ? "" : checkInDataArray.vehicle_iu : pageOneArrayForCheckIn?.chooseData);
        const [fixAccessories, setfixAccessories] = useState(pageOneArrayForCheckIn?.fixAccessories == "" || pageOneArrayForCheckIn?.fixAccessories == undefined ? checkInDataArray.fix_accessories == "" ? "" : checkInDataArray.fix_accessories : pageOneArrayForCheckIn?.fixAccessories);
        const [numberOfCarpets, setnumberOfCarpets] = useState(pageOneArrayForCheckIn?.numberOfCarpets == "" || pageOneArrayForCheckIn?.numberOfCarpets == undefined ? checkInDataArray.carpets == "" ? "" : checkInDataArray.carpets : pageOneArrayForCheckIn?.numberOfCarpets);
        const [solarFilm, setsolarFilm] = useState(pageOneArrayForCheckIn?.solarFilm == "" || pageOneArrayForCheckIn?.solarFilm == undefined ? checkInDataArray.solar_film == "" ? "" : checkInDataArray.solar_film : pageOneArrayForCheckIn?.solarFilm);
        const [seatLeatherPannel, setseatLeatherPannel] = useState(pageOneArrayForCheckIn?.seatLeatherPannel == "" || pageOneArrayForCheckIn?.seatLeatherPannel == undefined ? checkInDataArray.seat_leather == "" ? "" : checkInDataArray.seat_leather : pageOneArrayForCheckIn?.seatLeatherPannel);
        const [safteyBelts, setsafteyBelts] = useState(pageOneArrayForCheckIn?.safteyBelts == "" || pageOneArrayForCheckIn?.safteyBelts == undefined ? checkInDataArray.safety_belts == "" ? "" : checkInDataArray.safety_belts : pageOneArrayForCheckIn?.safteyBelts);
        const [dashBoard, setdashBoard] = useState(pageOneArrayForCheckIn?.dashBoard == "" || pageOneArrayForCheckIn?.dashBoard == undefined ? checkInDataArray.dashboard == "" ? "" : checkInDataArray.dashboard : pageOneArrayForCheckIn?.dashBoard);
        const [radioCdDvd, setradioCdDvd] = useState(pageOneArrayForCheckIn?.radioCdDvd == "" || pageOneArrayForCheckIn?.radioCdDvd == undefined ? checkInDataArray.radio_player == "" ? "" : checkInDataArray.radio_player : pageOneArrayForCheckIn?.radioCdDvd);
        const [ashTray, setashTray] = useState(pageOneArrayForCheckIn?.ashTray == "" || pageOneArrayForCheckIn?.ashTray == undefined ? checkInDataArray.ash_tray == "" ? "" : checkInDataArray.ash_tray : pageOneArrayForCheckIn?.ashTray);
        const [warnigLight, setwarnigLight] = useState(pageOneArrayForCheckIn?.warnigLight == "" || pageOneArrayForCheckIn?.warnigLight == undefined ? checkInDataArray.warning_light == "" ? "" : checkInDataArray.warning_light : pageOneArrayForCheckIn?.warnigLight);
        const [indicateLightOn, setindicateLightOn] = useState(pageOneArrayForCheckIn?.indicateLightOn == "" || pageOneArrayForCheckIn?.indicateLightOn == undefined ? checkInDataArray.indicate_light_on == "" ? "" : checkInDataArray.indicate_light_on : pageOneArrayForCheckIn?.indicateLightOn);
        const [airCon, setairCon] = useState(pageOneArrayForCheckIn?.airCon == "" || pageOneArrayForCheckIn?.airCon == undefined ? checkInDataArray.air_con == "" ? "" : checkInDataArray.air_con : pageOneArrayForCheckIn?.airCon);
        const [horn, sethorn] = useState(pageOneArrayForCheckIn?.horn == "" || pageOneArrayForCheckIn?.horn == undefined ? checkInDataArray.horn == "" ? "" : checkInDataArray.horn : pageOneArrayForCheckIn?.horn);
        const [realMirror, setrealMirror] = useState(pageOneArrayForCheckIn?.realMirror == "" || pageOneArrayForCheckIn?.realMirror == undefined ? checkInDataArray.real_mirror == "" ? "" : checkInDataArray.real_mirror : pageOneArrayForCheckIn?.realMirror);
        const [rightingMirror, setrightingMirror] = useState(pageOneArrayForCheckIn?.rightingMirror == "" || pageOneArrayForCheckIn?.rightingMirror == undefined ? checkInDataArray.right_wing_mirror == "" ? "" : checkInDataArray.right_wing_mirror : pageOneArrayForCheckIn?.rightingMirror);
        const [powerWindows, setpowerWindows] = useState(pageOneArrayForCheckIn?.powerWindows == "" || pageOneArrayForCheckIn?.powerWindows == undefined ? checkInDataArray.power_window == "" ? "" : checkInDataArray.power_window : pageOneArrayForCheckIn?.powerWindows);
        const [crearBoothCarpet, setcrearBoothCarpet] = useState(pageOneArrayForCheckIn?.crearBoothCarpet == "" || pageOneArrayForCheckIn?.crearBoothCarpet == undefined ? checkInDataArray.rear_booth_carpet == "" ? "" : checkInDataArray.rear_booth_carpet : pageOneArrayForCheckIn?.crearBoothCarpet);
        const [spareTyreSupporting, setspareTyreSupporting] = useState(pageOneArrayForCheckIn?.spareTyreSupporting == "" || pageOneArrayForCheckIn?.spareTyreSupporting == undefined ? checkInDataArray.spare_tyre_supporting_board == "" ? "" : checkInDataArray.spare_tyre_supporting_board : pageOneArrayForCheckIn?.spareTyreSupporting);
        const [spareTyres, setspareTyres] = useState(pageOneArrayForCheckIn?.spareTyres == "" || pageOneArrayForCheckIn?.spareTyres == undefined ? checkInDataArray.spare_tyre == "" ? "" : checkInDataArray.spare_tyre : pageOneArrayForCheckIn?.spareTyres);
        const [jackToolKit, setjackToolKit] = useState(pageOneArrayForCheckIn?.jackToolKit == "" || pageOneArrayForCheckIn?.jackToolKit == undefined ? checkInDataArray.tool_kit == "" ? "" : checkInDataArray.tool_kit : pageOneArrayForCheckIn?.jackToolKit);
        const [breakDownSign, setbreakDownSign] = useState(pageOneArrayForCheckIn?.breakDownSign == "" || pageOneArrayForCheckIn?.breakDownSign == undefined ? checkInDataArray.breakdown_sign == "" ? "" : checkInDataArray.breakdown_sign : pageOneArrayForCheckIn?.breakDownSign);
        const [rearBootRemoteLatch, setrearBootRemoteLatch] = useState(pageOneArrayForCheckIn?.rearBootRemoteLatch == "" || pageOneArrayForCheckIn?.rearBootRemoteLatch == undefined ? checkInDataArray.rear_boot_remote == "" ? "" : checkInDataArray.rear_boot_remote : pageOneArrayForCheckIn?.rearBootRemoteLatch);
        const [interiorRemarks, setinteriorRemarks] = useState(pageOneArrayForCheckIn?.interiorRemarks == "" || pageOneArrayForCheckIn?.interiorRemarks == undefined ? checkInDataArray.remarks == "" ? "" : checkInDataArray.remarks : pageOneArrayForCheckIn?.interiorRemarks);


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
            if (checkInDataArray.vehicle_iu == "") {
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
                    dispatch(setPageOneDataInRedux(objectForOne))
                    goNext()
                } else {
                    ShowErrorMessage("Please Enter all the values")
                }
            } else {
                dispatch(setPageOneDataInRedux(objectForOne))
                goNext()
            }
        }



        // useEffect(() => {
        //     console.log(pageOneArrayForCheckIn?.chooseData, "THIS IS REDUX OBJ VALUE");
        // }, [])


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
        const [roadTax, setroadTax] = useState(pageOneArrayForCheckIn?.roadTax == "" || pageOneArrayForCheckIn?.roadTax == undefined ? checkInDataArray.road_tax == "" ? "" : checkInDataArray.road_tax : pageOneArrayForCheckIn?.roadTax)
        const [radioAntenna, setradioAntenna] = useState(pageOneArrayForCheckIn?.radioAntenna == "" || pageOneArrayForCheckIn?.radioAntenna == undefined ? checkInDataArray.radio_antenna == "" ? "" : checkInDataArray.radio_antenna : pageOneArrayForCheckIn?.radioAntenna)
        const [speedLimitLabel, setspeedLimitLabel] = useState(pageOneArrayForCheckIn?.speedLimitLabel == "" || pageOneArrayForCheckIn?.speedLimitLabel == undefined ? checkInDataArray.speed_limit_label == "" ? "" : checkInDataArray.speed_limit_label : pageOneArrayForCheckIn?.speedLimitLabel)
        const [doorAlarm, setdoorAlarm] = useState(pageOneArrayForCheckIn?.doorAlarm == "" || pageOneArrayForCheckIn?.doorAlarm == undefined ? checkInDataArray.door_alarm == "" ? "" : checkInDataArray.door_alarm : pageOneArrayForCheckIn?.doorAlarm)
        const [centerLocking, setcenterLocking] = useState(pageOneArrayForCheckIn?.centerLocking == "" || pageOneArrayForCheckIn?.centerLocking == undefined ? checkInDataArray.centre_locking == "" ? "" : checkInDataArray.centre_locking : pageOneArrayForCheckIn?.centerLocking)


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
            if (checkInDataArray?.road_tax == "") {
                if (roadTax !== "" &&
                    radioAntenna !== "" &&
                    speedLimitLabel !== "" &&
                    doorAlarm !== "" &&
                    centerLocking !== "") {
                    dispatch(setPageTwoDataInRedux(objectForTwo))
                    goNext()
                } else {
                    ShowErrorMessage("Please Enter all the values")
                }
            } else {
                dispatch(setPageTwoDataInRedux(objectForTwo))
                goNext()
            }
        }


        // MEDIA FUNCTION START 


        const [previousImage, setpreviousImage] = useState(null);
        const [imagesArray, setImagesArray] = useState();
        const [TotalArrayOfImages, setTotalArrayOfImages] = useState(checkInDataArray?.photos);
        const [mediaaLoading, setmediaaLoading] = useState(false);
        // const TotalArrayOfImages = checkInDataArray.photos;

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
            // console.log('data ---------', data);
            return data;
        };

        useEffect(() => {
            // console.log(pageTwoArrayForCheckIn, 'THIS IS THE EXTERIOR DATA');
            // console.log('RE RUN');
            let CheckInMediaImages = checkInDataArray.photos;
            setpreviousImage(CheckInMediaImages);
        }, []);

        useEffect(() => {
            let CheckInMediaImages = checkInDataArray.photos;
            setpreviousImage(CheckInMediaImages);
        }, [previousImage]);

        const onSelectImage = async () => {
            const permissionStatus = await androidCameraPermission();
            if (permissionStatus || Platform.OS == 'ios') {
                Alert.alert('Upload Order Image', 'Choose an option', [
                    { text: 'Camera', onPress: onCamera },
                    { text: 'Gallery', onPress: () => onGallery() },
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

        const onGallery = () => {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            }).then(image => {
                // console.log('selected Image', image);

                // setphoto(image.path);
                handleUploadPhoto(image.path);
            });
        };


        const handleUploadPhoto = (IMAGE_PATH) => {
            setmediaaLoading(true)
            // let userToken;
            // userToken = null;
            // try {
            //     userToken = await AsyncStorage.getItem('userToken');
            // } catch (error) {
            //     console.log(error);
            // }

            let data = createFormData(IMAGE_PATH, { order_id: orderId })

            console.log(data, "HERE IT IS Before");

            UploadOrderImagesAPI(data).then((res) => {
                console.log('response IS THIS', res);
                // console.log('response IS THIS', res?.data);
                if (res?.data?.success === true) {
                    dispatch(setUploadOrderImage(res?.data));
                    let setData = { url: res?.data?.url }
                    TotalArrayOfImages.push(setData)
                    let check = [setData]
                    console.log(TotalArrayOfImages, "Normal Data");
                    console.log(check, "CHECK DATA");
                    ShowSuccessMessage('fetched Success');
                    console.log(imagesArray, "<------");
                    setmediaaLoading(false)
                } else {
                    setmediaaLoading(false)
                    ShowErrorMessage('Not able to upload Image Try Again');
                }
                return res?.data;
            }).catch(err => { setmediaaLoading(false); return err; });

            setImagesArray(TotalArrayOfImages);
            console.log(TotalArrayOfImages, "HERE IT IS AFTER");
        };


        const tapForLog = () => {
            console.log(TotalArrayOfImages, "TotalArrayOfImages THIS IS VALUE");
        }



        const selectImage = (item) => {
            console.log(item);
            Alert.alert('Delete Order Image', 'Choose an option', [
                { text: 'Delete', onPress: () => deleteImage(item) },
                { text: 'Cancel', onPress: () => { } },
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
                return res?.data;
            }).catch(err => { setmediaaLoading(false); return err; });




            // await API('post', 'delete-order-images-mobile', data, userToken)
            //     .then(res => {
            //         console.log(res, "Data return from Image");
            //         return res;
            //     })
            //     .catch(err => { return err; });
        }


        const SaveMedia = () => {

            dispatch(setUploadOrderImage(TotalArrayOfImages))
            goNext()
        }

        const renderItem = ({ item }) => (
            <ImageAction imageURL={item?.url} />

        );

        const ImageSection = ({ item }) => {
            return (
                <>
                    {
                        disableEdit == false ?
                            <ImageAction imageURL={item?.url} onImageTouch={() => selectImage(item.url)} />
                            :
                            <ImageAction imageURL={item?.url} />
                    }
                </>
            )
        }



        // Media FUNCTION END 

        // Other FUNCTION START   
        const [mileage, setmileage] = useState(pageOtherItemArrayForCheckIn?.mileage == "" || pageOtherItemArrayForCheckIn?.mileage == undefined ? checkInDataArray.mileage == "" ? "" : checkInDataArray.mileage : pageOtherItemArrayForCheckIn?.mileage)
        const [gasolineLevel, setgasolineLevel] = useState(pageOtherItemArrayForCheckIn?.gasolineLevel == "" || pageOtherItemArrayForCheckIn?.gasolineLevel == undefined ? checkInDataArray.gasoline_level == "" ? "" : checkInDataArray.gasoline_level : pageOtherItemArrayForCheckIn?.gasolineLevel)
        const [startDate, setStartDate] = useState(pageOtherItemArrayForCheckIn?.startDate == "" || pageOtherItemArrayForCheckIn?.startDate == undefined ? checkInDataArray.check_in_date == "" ? "" : checkInDataArray.check_in_date : pageOtherItemArrayForCheckIn?.startDate)
        const [userSuperVisor, setUserSuperVisor] = useState(pageOtherItemArrayForCheckIn?.checkInBy == "" || pageOtherItemArrayForCheckIn?.checkInBy == undefined ? checkInDataArray.check_in_by == "" ? "" : checkInDataArray.check_in_by : pageOtherItemArrayForCheckIn?.checkInBy)
        const [checkInBy, setcheckInBy] = useState(checkInDataArray.check_in_by)
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
            // let userToken;
            // userToken = null;
            // try {
            //     userToken = await AsyncStorage.getItem('userToken');
            // } catch (error) {
            //     console.log(error);
            // }
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
            // console.log(orderImageArray, "THIS IS THE IMAGE ARRAY DATA");
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
        const SaveOtherItem = async () => {

            if (checkInDataArray?.mileage == "") {
                if (mileage !== "" &&
                    gasolineLevel !== "" &&
                    startDate !== "" &&
                    userSuperVisor !== "") {
                    dispatch(setPageOtherItemDataInRedux(objectForOther))
                    setloacalLoading(true)
                    setTimeout(() => {
                        finalSubmit()
                    }, 5000);

                } else {

                    ShowErrorMessage("Please Enter all the values")

                }
            } else {
                dispatch(setPageOtherItemDataInRedux(objectForOther))
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

                            <Text style={styles.TextColor} >Vehicle IU</Text>

                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{
                                //     label: 'Select any one',
                                // }}
                                onValueChange={(value, index) => setchooseData((index - 1).toString())}
                                itemKey={pageOneArrayForCheckIn?.chooseData == "" || pageOneArrayForCheckIn?.chooseData == undefined ? checkInDataArray.vehicle_iu == "" ? "" : checkInDataArray.vehicle_iu : pageOneArrayForCheckIn?.chooseData}
                                items={VEHICLE_IU}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />



                            <Text style={styles.TextColor} >Fix Accessories</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                itemKey={pageOneArrayForCheckIn?.fixAccessories == "" || pageOneArrayForCheckIn?.fixAccessories == undefined ? checkInDataArray.fix_accessories == "" ? "" : checkInDataArray.fix_accessories : pageOneArrayForCheckIn?.fixAccessories}
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
                                    ? checkInDataArray.carpets
                                    : numberOfCarpets}
                            </TextInput>



                            <Text style={styles.TextColor} >Solar Films</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.solarFilm == "" || pageOneArrayForCheckIn?.solarFilm == undefined ? checkInDataArray.solar_film == "" ? "" : checkInDataArray.solar_film : pageOneArrayForCheckIn?.solarFilm}
                                onValueChange={(value, index) => setsolarFilm((index - 1).toString())}
                                items={SOLAR_FILMS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Seat leather/panels</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.seatLeatherPannel == "" || pageOneArrayForCheckIn?.seatLeatherPannel == undefined ? checkInDataArray.seat_leather == "" ? "" : checkInDataArray.seat_leather : pageOneArrayForCheckIn?.seatLeatherPannel}
                                onValueChange={(value, index) => setseatLeatherPannel((index - 1).toString())}
                                items={SEAT_LEATHER_PANEL}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Safety Belts</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.safteyBelts == "" || pageOneArrayForCheckIn?.safteyBelts == undefined ? checkInDataArray.safety_belts == "" ? "" : checkInDataArray.safety_belts : pageOneArrayForCheckIn?.safteyBelts}
                                onValueChange={(value, index) => setsafteyBelts((index - 1).toString())}
                                items={SAFTEY_BELTS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />

                            <Text style={styles.TextColor} >Dashboard</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.dashBoard == "" || pageOneArrayForCheckIn?.dashBoard == undefined ? checkInDataArray.dashboard == "" ? "" : checkInDataArray.dashboard : pageOneArrayForCheckIn?.dashBoard}
                                onValueChange={(value, index) => setdashBoard((index - 1).toString())}
                                items={DASHBOARD}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Radio/CD/DVD player</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.radioCdDvd == "" || pageOneArrayForCheckIn?.radioCdDvd == undefined ? checkInDataArray.radio_player == "" ? "" : checkInDataArray.radio_player : pageOneArrayForCheckIn?.radioCdDvd}
                                onValueChange={(value, index) => setradioCdDvd((index - 1).toString())}
                                items={RADIO_CD_DVD}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Ash Tray/Cigarette Lighter</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.ashTray == "" || pageOneArrayForCheckIn?.ashTray == undefined ? checkInDataArray.ash_tray == "" ? "" : checkInDataArray.ash_tray : pageOneArrayForCheckIn?.ashTray}
                                onValueChange={(value, index) => setashTray((index - 1).toString())}
                                items={ASH_TRAY}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Warning Light</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.warnigLight == "" || pageOneArrayForCheckIn?.warnigLight == undefined ? checkInDataArray.warning_light == "" ? "" : checkInDataArray.warning_light : pageOneArrayForCheckIn?.warnigLight}
                                onValueChange={(value, index) => setwarnigLight((index - 1).toString())}
                                items={WARNIG_LIGHT}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Indicate light on</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.indicateLightOn == "" || pageOneArrayForCheckIn?.indicateLightOn == undefined ? checkInDataArray.indicate_light_on == "" ? "" : checkInDataArray.indicate_light_on : pageOneArrayForCheckIn?.indicateLightOn}
                                onValueChange={(value, index) => setindicateLightOn((index - 1).toString())}
                                items={INDICATE_LIGHT_ON}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Air Con</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.airCon == "" || pageOneArrayForCheckIn?.airCon == undefined ? checkInDataArray.air_con == "" ? "" : checkInDataArray.air_con : pageOneArrayForCheckIn?.airCon}
                                onValueChange={(value, index) => setairCon((index - 1).toString())}
                                items={AIR_CON}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Horn</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.horn == "" || pageOneArrayForCheckIn?.horn == undefined ? checkInDataArray.horn == "" ? "" : checkInDataArray.horn : pageOneArrayForCheckIn?.horn}
                                onValueChange={(value, index) => sethorn((index - 1).toString())}
                                items={HORN}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Real Mirror/ Clip On Mirror</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.realMirror == "" || pageOneArrayForCheckIn?.realMirror == undefined ? checkInDataArray.real_mirror == "" ? "" : checkInDataArray.real_mirror : pageOneArrayForCheckIn?.realMirror}
                                onValueChange={(value, index) => setrealMirror((index - 1).toString())}
                                items={REAL_MIRROR}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Right wing mirror folding motor/ Auto left</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.rightingMirror == "" || pageOneArrayForCheckIn?.rightingMirror == undefined ? checkInDataArray.right_wing_mirror == "" ? "" : checkInDataArray.right_wing_mirror : pageOneArrayForCheckIn?.rightingMirror}
                                onValueChange={(value, index) => setrightingMirror((index - 1).toString())}
                                items={RIGHT_WING_MIRRO_FOLDING_MOTOR}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Power Windows</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.powerWindows == "" || pageOneArrayForCheckIn?.powerWindows == undefined ? checkInDataArray.power_window == "" ? "" : checkInDataArray.power_window : pageOneArrayForCheckIn?.powerWindows}
                                onValueChange={(value, index) => setpowerWindows((index - 1).toString())}
                                items={POWER_WINDOWS}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Rear booth carpet / Mat</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.crearBoothCarpet == "" || pageOneArrayForCheckIn?.crearBoothCarpet == undefined ? checkInDataArray.rear_booth_carpet == "" ? "" : checkInDataArray.rear_booth_carpet : pageOneArrayForCheckIn?.crearBoothCarpet}
                                onValueChange={(value, index) => setcrearBoothCarpet((index - 1).toString())}
                                items={REAR_BOTH_CARPET}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Spare Tyre Supporting board</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.spareTyreSupporting == "" || pageOneArrayForCheckIn?.spareTyreSupporting == undefined ? checkInDataArray.spare_tyre_supporting_board == "" ? "" : checkInDataArray.spare_tyre_supporting_board : pageOneArrayForCheckIn?.spareTyreSupporting}
                                onValueChange={(value, index) => setspareTyreSupporting((index - 1).toString())}
                                items={SPARE_TYPE_SUPPORTING}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Spare Tyres</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.spareTyres == "" || pageOneArrayForCheckIn?.spareTyres == undefined ? checkInDataArray.spare_tyre == "" ? "" : checkInDataArray.spare_tyre : pageOneArrayForCheckIn?.spareTyres}
                                onValueChange={(value, index) => setspareTyres((index - 1).toString())}
                                items={SPARE_TYRES}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Jack Tools/ Kit</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.jackToolKit == "" || pageOneArrayForCheckIn?.jackToolKit == undefined ? checkInDataArray.tool_kit == "" ? "" : checkInDataArray.tool_kit : pageOneArrayForCheckIn?.jackToolKit}
                                onValueChange={(value, index) => setjackToolKit((index - 1).toString())}
                                items={JACK_TOOLS_KIT}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Breakdown Sign</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.breakDownSign == "" || pageOneArrayForCheckIn?.breakDownSign == undefined ? checkInDataArray.breakdown_sign == "" ? "" : checkInDataArray.breakdown_sign : pageOneArrayForCheckIn?.breakDownSign}
                                onValueChange={(value, index) => setbreakDownSign((index - 1).toString())}
                                items={BREAK_DOWN_SIGN}
                                disabled={disableEdit}
                                style={pickerSelectStyles} />
                            <Text style={styles.TextColor} >Rear boot remote /Latch</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                // placeholder={{}}
                                itemKey={pageOneArrayForCheckIn?.rearBootRemoteLatch == "" || pageOneArrayForCheckIn?.rearBootRemoteLatch == undefined ? checkInDataArray.rear_boot_remote == "" ? "" : checkInDataArray.rear_boot_remote : pageOneArrayForCheckIn?.rearBootRemoteLatch}
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
                               {interiorRemarks === ""
                                    ? checkInDataArray.remarks
                                    : interiorRemarks}
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
                                 {interiorRemarks === ""
                                    ? checkInDataArray.remarks
                                    : interiorRemarks}
                            </TextInput>
                    }
                            {/* <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                onChangeText={text => setinteriorRemarks(text)}
                                autoCorrect={false}
                                numberOfLines={10}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!disableEdit}
                            >
                                {interiorRemarks === ""
                                    ? checkInDataArray.remarks
                                    : interiorRemarks}
                            </TextInput> */}

                            {disableEdit == false ?
                                <FormButton buttonTitle="NEXT" onPress={() => { SaveInterior(); fillDetailSection() }} />
                                :
                                <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                            }

                        </>
                        : page == 2 ?
                            <>


                                <View>
                                    <Text style={styles.TextColor} >Road Tax</Text>
                                    <RNPickerSelect
                                        // placeholder={{}}
                                        useNativeAndroidPickerStyle={false}
                                        itemKey={pageTwoArrayForCheckIn?.roadTax == "" || pageTwoArrayForCheckIn?.roadTax == undefined ? checkInDataArray.road_tax == "" ? "" : checkInDataArray.road_tax : pageTwoArrayForCheckIn?.roadTax}
                                        onValueChange={(value, index) => setroadTax((index - 1).toString())}
                                        items={ROAD_TAX}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Radio Antenna</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckIn?.radioAntenna == "" || pageTwoArrayForCheckIn?.radioAntenna == undefined ? checkInDataArray.radio_antenna == "" ? "" : checkInDataArray.radio_antenna : pageTwoArrayForCheckIn?.radioAntenna}
                                        onValueChange={(value, index) => setradioAntenna((index - 1).toString())}
                                        items={RADIO_ANTENA}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Speed Limit Label</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckIn?.speedLimitLabel == "" || pageTwoArrayForCheckIn?.speedLimitLabel == undefined ? checkInDataArray.speed_limit_label == "" ? "" : checkInDataArray.speed_limit_label : pageTwoArrayForCheckIn?.speedLimitLabel}
                                        onValueChange={(value, index) => setspeedLimitLabel((index - 1).toString())}
                                        items={SPEED_LIMIT_LABEL}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Door Alarm</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckIn?.doorAlarm == "" || pageTwoArrayForCheckIn?.doorAlarm == undefined ? checkInDataArray.door_alarm == "" ? "" : checkInDataArray.door_alarm : pageTwoArrayForCheckIn?.doorAlarm}
                                        onValueChange={(value, index) => setdoorAlarm((index - 1).toString())}
                                        items={DOOR_ALARM}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                    <Text style={styles.TextColor} >Centre Locking</Text>
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}
                                        // placeholder={{}}
                                        itemKey={pageTwoArrayForCheckIn?.centerLocking == "" || pageTwoArrayForCheckIn?.centerLocking == undefined ? checkInDataArray.centre_locking == "" ? "" : checkInDataArray.centre_locking : pageTwoArrayForCheckIn?.centerLocking}
                                        onValueChange={(value, index) => setcenterLocking((index - 1).toString())}
                                        items={CENTER_LOCKING}
                                        disabled={disableEdit}
                                        style={pickerSelectStyles} />
                                </View>
                                {disableEdit == false ?
                                    <FormButton buttonTitle="NEXT" onPress={() => { SaveExterior(); fillDetailSection() }} />
                                    :
                                    <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                                }
                            </>
                            : page == 3 ?
                                mediaaLoading == true ? <Spinner style={{ height: windowHeight }} /> :

                                    <>
                                        <View style={styles.TotalMediaWrapper} >

                                            <Text style={styles.ImageHeadingText} >Upload Photos</Text>
                                            <View style={styles.ImageWrapper} >
                                                <View style={styles.ImageView} >
                                                    <FlatList
                                                        data={TotalArrayOfImages}
                                                        horizontal={true}
                                                        renderItem={ImageSection}
                                                        // numColumns={3}
                                                        keyExtractor={item => item.id}
                                                    />
                                                    {disableEdit == false ?
                                                        <View style={styles.addIMageView} >
                                                            <TouchableOpacity style={styles.ADDtouchImage} onPress={() => onSelectImage()} >
                                                                <Image style={styles.addImageStyle} source={Images.CameraImage} resizeMode="contain" />
                                                            </TouchableOpacity>
                                                        </View>
                                                        : null}
                                                </View>
                                            </View>
                                            {disableEdit == false ?
                                                <FormButton buttonTitle="NEXT" onPress={() => { SaveMedia(); fillDetailSection() }} />
                                                :
                                                <FormButton buttonTitle="NEXT" onPress={() => { goNext(); fillDetailSection() }} />
                                            }

                                        </View>

                                    </>
                                : page == 4 ?

                                    loading === true ?
                                        <Spinner style={{ height: windowHeight / 2 }} />
                                        :
                                        loacalLoading === true ?
                                            <Spinner style={{ height: windowHeight / 2 }} /> :
                                            <>
                                                <View>
                                                    <Text style={styles.TextColor} >Mileage</Text>
                                                    <TextInput
                                                        style={styles.TextInputStyles}
                                                        placeholder="Enter the number"
                                                        onChangeText={text => setmileage(text)}
                                                        autoCorrect={false}
                                                        keyboardType="numeric"
                                                        autoCapitalize="none"
                                                        editable={!disableEdit}
                                                    >
                                                        {/* {mileage === null ? c1heckInDataArray.mileage :
                                                            mileage} */}
                                                        {pageOtherItemArrayForCheckIn?.mileage == "" || pageOtherItemArrayForCheckIn?.mileage == undefined ? checkInDataArray.mileage == "" ? "" : checkInDataArray.mileage : pageOtherItemArrayForCheckIn?.mileage}
                                                    </TextInput>

                                                    <Text style={styles.TextColor} >Gasoline Level</Text>
                                                    <RNPickerSelect
                                                        useNativeAndroidPickerStyle={false}
                                                        // placeholder={{}}
                                                        itemKey={pageOtherItemArrayForCheckIn?.gasolineLevel == "" || pageOtherItemArrayForCheckIn?.gasolineLevel == undefined ? checkInDataArray.gasoline_level == "" ? "" : checkInDataArray.gasoline_level : pageOtherItemArrayForCheckIn?.gasolineLevel}
                                                        onValueChange={(value, index) => setgasolineLevel((index - 1).toString())}
                                                        items={GASOLINE_LEVEL}
                                                        disabled={disableEdit}
                                                        style={pickerSelectStyles}
                                                    />
                                                    <Pressable disabled={disableEdit} onPress={() => { showStartDatePicker() }} >
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
                                                            {startDate === null ? moment(checkInDataArray.check_in_date).format('YYYY-MM-DD') : moment(startDate).format('YYYY-MM-DD')}
                                                        </FormInput>
                                                    </Pressable>
                                                    {/* <View style={styles.dateStyle} >
                                                        <Text style={styles.TextColor} >Check In By</Text>
                                                        <RNPickerSelect
                                                            useNativeAndroidPickerStyle={false}
                                                            // placeholder={{}}
                                                            itemKey={pageOtherItemArrayForCheckIn?.checkInBy == "" || pageOtherItemArrayForCheckIn?.checkInBy == undefined ? checkInDataArray.check_in_by == "" ? "" : checkInDataArray.check_in_by : pageOtherItemArrayForCheckIn?.checkInBy}
                                                            onValueChange={(value, index) => setUserSuperVisor((index - 1).toString())}
                                                            items={supervisors}
                                                            disabled={disableEdit}
                                                            style={pickerSelectStyles}
                                                        />
                                                    </View> */}
                                                    <DateTimePickerModal
                                                        isVisible={isDatePickerVisible}
                                                        mode="date"
                                                        minimumDate={new Date()}
                                                        onConfirm={handelStartPicker}
                                                        onCancel={hideDatePicker}
                                                    />
                                                </View>
                                                {disableEdit == false ?
                                                    <FormButton buttonTitle="Submit" onPress={() => SaveOtherItem()} />
                                                    :
                                                    <FormButton buttonTitle="DONE" onPress={() => navigation.goBack()} />
                                                }

                                            </>

                                    : null
                    }


                </View>

            </>
        )
    }



    //HER THE MAIN RENDER OF STEPWISE END


    const goNext = async () => {
        if (page === 4) {
            // FinalDataSave()
            return;
        }
        setPage(page => page + 1);
        if (page === 1) {
            setActive(active + 1);
        } else if (page === 2) {
            setActive(active + 1);
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
                            <View style={styles.StepLine}>
                                <View style={[styles.StepLineOne,
                                { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }
                                ]}></View>
                                <View style={[styles.StepLineTwo,
                                { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }
                                ]}></View>
                                <View style={[styles.StepLineThree,
                                { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }

                                ]}></View>
                            </View>

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
                                    <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepOne}>
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
                                    <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepTwo}>
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
                                    <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepThree}>
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
                                    <View style={[styles.StepCircleTouch, { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }]} >
                                        <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                    </View>
                                    <Text style={styles.StepText} >Other Items</Text>
                                </View>
                            )}
                        </View>

                    </View>
                }
                <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1, alignSelf: "stretch", marginBottom: 20, paddingBottom: 20 }} ref={scrollViewRef} onContentSizeChange={() => fillDetailSection}>

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
    ProgressLine: {
        flexDirection: "row",
        height: "100%",
        width: '85%',
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "center",
        top: 0,
    },
    // StepLine: {
    //     backgroundColor: "#000",
    //     height: "2%",
    //     margin: 2,
    //     justifyContent: "center",
    //     alignSelf: "center",
    //     alignItems: "center",
    //     position: "absolute",
    //     /* left: 90%, */
    //     width: "95%",
    //     top: "45%",
    //     // content: '',
    // },
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
    StepLineOne: {
        backgroundColor: "red",
        height: "100%",
        margin: 2,
        justifyContent: "flex-start",
        alignSelf: "flex-start",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        // top: '100%',
        zIndex: 5,
    },
    StepLineTwo: {
        backgroundColor: "green",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        zIndex: 5,
    },
    StepLineThree: {
        backgroundColor: "purple",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        position: "absolute",
        width: "33%",
        zIndex: 5,
    },
    StepLineFour: {
        backgroundColor: "yellow",
        height: "100%",
        margin: 2,
        justifyContent: "center",
        alignSelf: "flex-end",
        alignItems: "center",
        position: "absolute",
        width: "25%",
        zIndex: 5,
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

