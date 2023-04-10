import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, ToastAndroid, Alert, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { windowHeight, windowWidth } from '../../utils/Dimension'
import Spinner from '../../Components/Spinner'
import CustomButton from '../../Components/CustomButton'
import RNPickerSelect from 'react-native-picker-select';
import FeIcon from 'react-native-vector-icons/Feather'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CheckOrderExistAPI, FetchAllCustomersAPI, FetchCustomerVehicleAPI, NewOrderAPI, UploadDocumnetAPI } from '../../api'
import AntIcon from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import FormInput from '../../Components/FormInput'
import { Calender, UploadCloud } from '../../assets/Icons'
import { CalendarActiveIcon } from '../../../../assects/Icons/TabIcons'
import { Checkbox } from 'react-native-paper';
import { colors } from '../../../../assects/colors'
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission'
import DocumentPicker from 'react-native-document-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import { useSelector, useDispatch } from 'react-redux';
import { setReportingStepFourDataInRedux, setReportingStepOneDataInRedux, setReportingStepThreeDataInRedux, setReportingStepTwoDataInRedux } from '../../../../redux/actions/NewReporting'




const SETTLEMENT_TYPE = [
    { label: 'Reporting Only', value: 'Reporting Only' },
    { label: `Private Settlement - At Fault`, value: `Private Settlement - At Fault` },
    { label: 'Private Settlement - Not At Fault', value: 'Private Settlement - Not At Fault' },
]


const NewReporting = () => {
    const { pageOneDataValueReporting, pageTwoDataValueReporting, pageThreeDataValueReporting, pageFourDataValueReporting } = useSelector(state => state.NewReportingDetail);
    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch()



    // COMPONENT 

    const StepWiseComponent = () => {
        const [accidentalDateVisible, setaccidentalDateVisible] = useState(false);
        const [timePickerVisible, settimePickerVisible] = useState(false);
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
        const [ShowReamrkInput, setShowReamrkInput] = useState(false);
        const [reamrkIndex, setreamrkIndex] = useState(1);
        const [allCustomerDetail, setAllCustomerDetail] = useState(false);
        const [vehicleList, setvehicleList] = useState(false);
        const [arrayForPicker, setarrayForPicker] = useState();
        const [arrayForVehiclePicker, setarrayForVehiclePicker] = useState();
        const [LengthOfRemark, setLengthOfRemark] = useState([0])
        const [reamrkText, setreamrkText] = useState([0])
        const [loading, setloading] = useState(false)
        const [transparentLoading, settransparentLoading] = useState(false)
        const [reamrkTextArray, setreamrkTextArray] = useState([])

        const [Smallloading, setSmallloading] = useState(false);
        const [docName, setdocName] = useState();

        // Step One 
        const [startDate, setStartDate] = useState();
        const [endDate, setEndDate] = useState();
        const [CustomerID, setCustomerID] = useState();
        const [VehicleID, setVehicleID] = useState();
        const [CustomerName, setCustomerName] = useState();
        const [CustomerContact, setCustomerContact] = useState();
        const [vehicleMake, setvehicleMake] = useState();
        const [vehicleModel, setvehicleModel] = useState();
        const [settleMentType, setsettleMentType] = useState();


        // Step Two 
        const [fileResponse, setFileResponse] = useState([]);
        const [docFileUrl, setdocFileUrl] = useState();
        const [Filename, setFilename] = useState();
        const [QuotationfileResponse, setQuotationFileResponse] = useState([]);
        const [QuotationUrl, setQuotationUrl] = useState();
        const [QuoteFileName, setQuoteFileName] = useState();
        const [PTEfileResponse, setPTEFileResponse] = useState([]);
        const [PTEdoc, setPTEdoc] = useState();
        const [PTEFileName, setPTEFileName] = useState();
        const [NRIC_EP_SP_WPResponse, setNRIC_EP_SP_WPResponse] = useState([]);
        const [NRIC_EP_SP_WP_Url, setNRIC_EP_SP_WP_Url] = useState();
        const [NRIC_EP_SP_WP, setNRIC_EP_SP_WP] = useState();
        const [CertificatefileResponse, setCertificateFileResponse] = useState([]);
        const [Certificate, setCertificate] = useState();
        const [certificateFileName, setcertificateFileName] = useState();

        // Step Three
        const [AccidentalDate, setAccidentalDate] = useState();
        const [AccidentalTime, setAccidentalTime] = useState();
        const [Driver, setDriver] = useState();
        const [location, setlocation] = useState();
        const [NRICNumber, setNRICNumber] = useState();
        const [EPval, setEPval] = useState();
        const [SPval, setSPval] = useState();
        const [WPval, setWPval] = useState();
        const [DamageStatus, setDamageStatus] = useState();
        const [ThirdParty, setThirdParty] = useState();
        const [CostRepair, setCostRepair] = useState();
        const [RecivedAmount, setRecivedAmount] = useState();
        const [DetailsOfAccident, setDetailsOfAccident] = useState();

        //DATE PICKER 
        const START_DATE = moment(startDate).format('YYYY-MM-DD')
        const END_DATE = moment(endDate).format('YYYY-MM-DD')
        const ACCIDENT_DATE = moment(AccidentalDate).format('YYYY-MM-DD')
        const ACCIDENTA_TIME = moment(AccidentalTime).format('hh:mm:ss')


        const SaveCustomerDetail = () => {
            let objectForOne = {
                CustomerID,
                VehicleID,
                CustomerName,
                CustomerContact,
                vehicleMake,
                vehicleModel,
                settleMentType,
                START_DATE,
                END_DATE,
            }

            console.log(objectForOne, "ITS LOCAL")

            if (CustomerID !== undefined &&
                VehicleID !== undefined &&
                CustomerName !== undefined &&
                CustomerContact !== undefined &&
                vehicleMake !== undefined &&
                vehicleModel !== undefined &&
                settleMentType !== undefined &&
                START_DATE !== undefined &&
                END_DATE !== undefined) {
                dispatch(setReportingStepOneDataInRedux(objectForOne))
                goNext()
            } else {
                ShowErrorMessage("Please Enter all the values")
            }
        }

        const SaveFiles = () => {
            let objectForTwo = {
                docFileUrl,
                QuotationUrl,
                PTEdoc,
                NRIC_EP_SP_WP_Url,
                Certificate,
            }

            console.log(objectForTwo, "ITS LOCAL")

            if (docFileUrl !== undefined ||
                QuotationUrl !== undefined ||
                PTEdoc !== undefined ||
                NRIC_EP_SP_WP_Url !== undefined ||
                Certificate !== undefined
            ) {
                dispatch(setReportingStepTwoDataInRedux(objectForTwo))
                goNext()
            } else {
                ShowErrorMessage("Please Enter all the values")
            }
        }

        const SaveOtherDetail = () => {
            let objectForThree = {
                Driver,
                ACCIDENT_DATE,
                ACCIDENTA_TIME,
                location,
                NRICNumber,
                EPval,
                SPval,
                WPval,
                DamageStatus,
                ThirdParty,
                CostRepair,
                RecivedAmount,
                DetailsOfAccident,
            }

            // console.log(objectForThree, "ITS LOCAL")

            if (AccidentalDate !== undefined &&
                AccidentalTime !== undefined &&
                Driver !== undefined &&
                location !== undefined &&
                DamageStatus !== undefined &&
                ThirdParty !== undefined &&
                CostRepair !== undefined &&
                RecivedAmount !== undefined &&
                DetailsOfAccident !== undefined
                // NRICNumber !== undefined &&
                // EPval !== undefined &&
                // SPval !== undefined &&
                // WPval !== undefined &&
            ) {
                dispatch(setReportingStepThreeDataInRedux(objectForThree))
                // dispatch( setReportingStepFourDataInRedux (objectForOne))
                goNext()
            } else {
                ShowErrorMessage("Please Enter all the values")
            }
        }


        const CreateOrder = () => {

            let arrayForRemark = []
            reamrkTextArray.map(item => {
                let newTextObj = { text: item.text }
                arrayForRemark = [...arrayForRemark, newTextObj]
            })
            const stringRemarks = JSON.stringify(reamrkTextArray);

            // console.log(stringRemarks, "stringRemarks")

            let OtherData = {
                driver: pageThreeDataValueReporting?.Driver,
                accident_date: pageThreeDataValueReporting?.ACCIDENT_DATE,
                accident_time: pageThreeDataValueReporting?.ACCIDENTA_TIME,
                details_of_accident: pageThreeDataValueReporting?.DetailsOfAccident,
                location: pageThreeDataValueReporting?.location,
                claim_type: "",
                damage_status: pageThreeDataValueReporting?.DamageStatus,
                third_party_vehicle_number: pageThreeDataValueReporting?.ThirdParty,
                cost_of_repair: "",
                received_amount: "",
                nric_number: pageThreeDataValueReporting?.NRIC_EP_SP_WP_Url,
                ep_number: pageThreeDataValueReporting?.EPval,
                sp_number: pageThreeDataValueReporting?.SPval,
                wp_number: pageThreeDataValueReporting?.WPval,
                ci_file: pageTwoDataValueReporting?.Certificate,
                pictures: [],
                incident_number: "",
                employee_name: "",
                dept_name: "",
                event_type: "",
                date: null,
                recorded_by: "",
                details_of_incident: "",
                status: "",
            }

            const OtherStringData = JSON.stringify(OtherData);

            let data = {
                booking_date: pageOneDataValueReporting?.START_DATE,
                customer_id: pageOneDataValueReporting?.CustomerID,
                gia_report: pageTwoDataValueReporting?.docFileUrl,
                is_incident_only: false,
                other_details: OtherStringData,
                pte_settlement_form: pageTwoDataValueReporting?.PTEdoc,
                quotation_report: pageTwoDataValueReporting?.QuotationUrl,
                remarks: stringRemarks,
                settlement_type_report: pageOneDataValueReporting?.settleMentType,
                status: 12,
                type: 2,
                vehicle_id: pageOneDataValueReporting?.VehicleID,
            }

            console.log(data, "FULL DATA")

            NewOrderAPI(data).then((res) => {
                console.log(res, "<------");
                if (res.status === 200) {
                    ShowSuccessMessage("NEW ORDER CREATED")
                    setloading(false)
                    goNext()
                    navigation.goBack()
                }
                console.log(res.status, "<------");
            }).catch(err => { setloading(false); ShowErrorMessage("Something Went Wrong"); return err; });
        }




        useEffect(() => {
            setloading(true)
            FetchAllCustomersAPI({}).then((res) => {
                setAllCustomerDetail(res?.data?.all_customers)
                setloading(false)
            }).catch(err => { return err; });
        }, [])

        useFocusEffect(
            React.useCallback(() => {
                tapfForLog()
                return () => tapForLog()
            }, [allCustomerDetail])
        );

        const tapfForLog = async () => {
            allCustomerDetail && setarrayForPicker(allCustomerDetail.map(
                item => ({ label: `${item.customer_name} # ${item.id}`, value: item.id, key: item.id })
            ))
            console.log(arrayForPicker, "WHAT !!!!");
        }

        const tapForLog = async () => {
            console.log(arrayForPicker, "WHAT !!!!");
        }

        useEffect(() => {
            let data = { customer_id: CustomerID }
            settransparentLoading(true)
            FetchCustomerVehicleAPI(data).then((res) => {
                setvehicleList(res.data.customer_vehicles); if (success === true) {
                    settransparentLoading(false);
                }
                console.log(res.data.customer_vehicles, "<------");
            }).catch(err => { return err; });

            CustomerID && allCustomerDetail.map(item => {
                if (CustomerID === item.id) {
                    setCustomerName(item.customer_name)
                    setCustomerContact(item.phone)
                }
                else {
                    null
                }
            })
        }, [CustomerID])


        useEffect(() => {
            VehicleID && vehicleList.map(item => {
                if (VehicleID === item.id) {
                    setvehicleMake(item.make)
                    setvehicleModel(item.model)
                    setStartDate(item.mfg_date)
                }
            })
            let data = {
                vehicle_id: VehicleID,
            }
            CheckOrderExistAPI(data).then((res) => {
                if (res.data.success === false) {

                    // ToastAndroid.show(` ${res.data.message}`, ToastAndroid.SHORT);
                    ToastAndroid.show(`Last order for this vehicle number was created on 01-01-2008 and is not closed yet`, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(` ${res.data.message}`, ToastAndroid.SHORT);
                }
                console.log(res.data, "<------");
            }).catch(err => { return err; });

        }, [VehicleID])


        useFocusEffect(
            React.useCallback(() => {
                setingArrayForPicker()
                return () => tapForLogs()
            }, [vehicleList])
        );

        const setingArrayForPicker = async () => {
            vehicleList && setarrayForVehiclePicker(vehicleList.map(
                item => ({ label: item.vehicle_number, value: item.id, key: item.id })
            ))
            console.log(arrayForPicker, "WHAT !!!!");
        }

        const tapForLogs = async () => {
            console.log(arrayForPicker, "WHAT !!!!");
        }

        const showStartDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const showEndaDatePicker = () => {
            setDateEndPickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const handelStartPicker = (date) => {
            console.log("A date has been picked: ", date);
            // showSuccess(`A date has been picked:${date} `)
            setStartDate(date)
            hideDatePicker();
        };

        const handelEndPicker = (date) => {
            console.log("A date has been picked: ", date);
            const enddate = date;
            setEndDate(enddate)
            setDateEndPickerVisibility(false)
            hideDatePicker();
        };


        //STEP 3 DATE AND TIME START        
        const showAccidentalDatePicker = () => {
            setaccidentalDateVisible(true);
        };

        const hideAccidentalDatePicker = () => {
            setaccidentalDateVisible(false);
        };

        const handelAccidentaPicker = (date) => {
            console.log("A Accidental date  picked: ", date);
            const newDate = date;
            setAccidentalDate(newDate)
            setDateEndPickerVisibility(false)
            hideAccidentalDatePicker();
        };

        const showTimePicker = () => {
            settimePickerVisible(true);
        };

        const hideTimePicker = () => {
            settimePickerVisible(false);
        };

        const handleAccidentalTime = (time) => {
            console.log("A Accidetnal Time picked: ", time);
            const newTime = time;
            setAccidentalTime(newTime)
            settimePickerVisible(false)
            hideTimePicker();
        };

        //STEP 3 DATE AND TIME END

        //STEP 2


        const createFormData = async (FileData) => {
            const data = new FormData();
            let FileDataArray = [FileData];
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

        const onSelecFile = async (val) => {
            const permissionStatus = await androidCameraPermission();
            if (permissionStatus || Platform.OS == 'ios') {
                Alert.alert('Upload Sign Copy', 'Choose an option', [
                    { text: 'Files', onPress: handleDocumentSelection(val) },
                    { text: 'Cancel', onPress: () => { } },
                ]);
            }
        };

        useEffect(() => {

            fileResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setFilename(item.name)
            })
        }, [fileResponse])

        useEffect(() => {

            QuotationfileResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setQuoteFileName(item.name)
            })
        }, [QuotationfileResponse])

        useEffect(() => {

            PTEfileResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setPTEFileName(item.name)
            })
        }, [PTEfileResponse])

        useEffect(() => {

            NRIC_EP_SP_WPResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setNRIC_EP_SP_WP(item.name)
            })
        }, [NRIC_EP_SP_WPResponse])

        useEffect(() => {

            CertificatefileResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setcertificateFileName(item.name)
            })
        }, [CertificatefileResponse])



        const handleDocumentSelection = useCallback(async (val) => {
            try {
                const response = await DocumentPicker.pick({
                    presentationStyle: 'fullScreen',
                    type: [DocumentPicker.types.allFiles]
                });
                let arrayReponse = [response]
                {
                    val == 1 ?
                        setFileResponse(arrayReponse)
                        : val == 2 ?
                            setQuotationFileResponse(arrayReponse)
                            : val == 3 ?
                                setPTEFileResponse(arrayReponse)
                                : val == 4 ?
                                    setCertificateFileResponse(arrayReponse)
                                    : val == 5 ?
                                        setNRIC_EP_SP_WPResponse(arrayReponse)
                                        : setFileResponse(arrayReponse)
                }

                getUrl(arrayReponse, val)
                fileResponse.map(item => {
                    console.log(item, "ALL THE DATA !!");
                    console.log(item.name, "ALL THE DATA !!");
                    console.log(val, "val");
                    {
                        val == 1 ?
                            setFilename(res?.data?.url)
                            : val == 2 ?
                                setQuoteFileName(res?.data?.url)
                                : val == 3 ?
                                    setPTEFileName(res?.data?.url)
                                    : val == 4 ?
                                        setcertificateFileName(res?.data?.url)
                                        : val == 5 ?
                                            setNRIC_EP_SP_WP(res?.data?.url)
                                            : setFilename(res?.data?.url)
                    }

                })

            } catch (err) {
                console.warn(err);
            }
        }, []);


        const getUrl = async (response, val) => {
            setSmallloading(true)

            let data = await createFormData(response)
            // console.log(data, "DATA");
            await
                UploadDocumnetAPI(data).then((res) => {
                    console.log(res.data.url, "AGAIN HERE");
                    console.log(res.data, "AGAIN HERE");
                    if (res?.data?.success === true) {
                        val == 1 ?
                            setdocFileUrl(res?.data?.url)
                            : val == 2 ?
                                setQuotationUrl(res?.data?.url)
                                : val == 3 ?
                                    setPTEdoc(res?.data?.url)
                                    : val == 4 ?
                                        setCertificate(res?.data?.url)
                                        : val == 5 ?
                                            setNRIC_EP_SP_WP_Url(res?.data?.url)
                                            : setdocFileUrl(res?.data?.url)
                    }
                    setSmallloading(false)
                }).catch(err => { return err; });

        }

        useEffect(() => {

        }, [docFileUrl])






        //REMARK


        const addReamrk = () => {
            setShowReamrkInput(true)
            if (ShowReamrkInput === true) {
                setreamrkIndex(reamrkIndex + 1)
                setLengthOfRemark(oldArray => [...oldArray, reamrkIndex])
                console.log(LengthOfRemark, "after");
            }
        }

        const removeRemark = (i) => {
            let newArray = [...LengthOfRemark]
            newArray.splice(i, 1)
            setLengthOfRemark(newArray)
        }

        const remarkTextFunction = (text, index) => {
            let textObject = { text: text };
            let getIndex = reamrkTextArray.findIndex((item, ind) => ind == index)
            if (getIndex === -1) {
                setreamrkTextArray(oldTextWithID => [...oldTextWithID, textObject])
                console.log("Not mached")
            } else {
                console.log("Not mached")
                reamrkTextArray[getIndex] = textObject;
            }
            console.log(reamrkTextArray, "reamrkTextArray");
        }


        const TapForConsole = () => {
            // console.log(Filename, "Filename");
            // console.log(QuoteFileName, "QuoteFileName");
            // console.log(PTEFileName, "PTEFileName");
            // console.log(certificateFileName, "certificateFileName");

            console.log(ACCIDENT_DATE, "ACCIDENTA_DATE");
            console.log(ACCIDENTA_TIME, "ACCIDENTA_TIME");
            // console.log(pageOneDataValueReporting, "pageOneDataValueReporting");
            // console.log(pageTwoDataValueReporting, "pageTwoDataValueReporting");
            console.log(pageThreeDataValueReporting, "pageThreeDataValueReporting");
            // console.log(pageFourDataValueReporting, "pageFourDataValueReporting");
        }
        return (
            <View>
                {page === 1 ?
                    <>
                        <View style={styles.downShow} >
                            <Text style={styles.TextColor} >Customer ID</Text>
                            {
                                arrayForPicker &&
                                    arrayForPicker ?
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}

                                        Icon={() => {
                                            return <FeIcon name='chevron-down' size={20} color={"#505050"} />

                                        }}
                                        style={{
                                            ...pickerSelectStyles, iconContainer: {
                                                top: 10,
                                                right: 12,
                                            },
                                        }}
                                        onValueChange={(itemVal) => {
                                            setCustomerID(itemVal)
                                        }}
                                        items={arrayForPicker}
                                    />
                                    :
                                    <RNPickerSelect
                                        useNativeAndroidPickerStyle={false}

                                        Icon={() => {
                                            return <FeIcon name='chevron-down' size={20} color={"#505050"} />

                                        }}
                                        style={{
                                            ...pickerSelectStyles, iconContainer: {
                                                top: 10,
                                                right: 12,
                                            },
                                        }}
                                        onValueChange={(itemVal) => {
                                            setCustomerID(itemVal)
                                        }}
                                        items={[
                                            { label: 'No Data', value: 'No Data' },
                                        ]}
                                    />
                            }
                            <Text style={styles.TextColor} >Customer Name</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                // onChangeText={text => setnumberOfCarpets(text)}
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {CustomerName}
                            </TextInput>

                            <Text style={styles.TextColor} >Vehicle Reg. No.</Text>
                            {arrayForVehiclePicker ?
                                <RNPickerSelect
                                    style={{
                                        ...pickerSelectStyles, iconContainer: {
                                            top: 10,
                                            right: 12,
                                        },
                                    }}

                                    // onValueChange={(value) => console.log(value)}
                                    onValueChange={(itemVal) => {
                                        setVehicleID(itemVal)
                                        console.log(itemVal)
                                    }}
                                    items={arrayForVehiclePicker}
                                    useNativeAndroidPickerStyle={false}

                                    Icon={() => {
                                        return <FeIcon name='chevron-down' size={20} color={"#505050"} />

                                    }}
                                />
                                :
                                <RNPickerSelect
                                    style={{
                                        ...pickerSelectStyles, iconContainer: {
                                            top: 10,
                                            right: 12,
                                        },
                                    }}

                                    onValueChange={(value) => console.log(value)}
                                    items={[
                                        { label: 'No Data', value: 'No Data' },
                                    ]}
                                    useNativeAndroidPickerStyle={false}

                                    Icon={() => {
                                        return <FeIcon name='chevron-down' size={20} color={"#505050"} />
                                    }}
                                />
                            }
                            <Text style={styles.TextColor} >Customer Contact No.</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                // onChangeText={text => setnumberOfCarpets(text)}
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {CustomerContact}
                            </TextInput>

                            <Text style={styles.TextColor} >Vehicle Make</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {vehicleMake}
                            </TextInput>

                            <Text style={styles.TextColor} >Vehicle Model</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={false}
                            >
                                {vehicleModel}
                            </TextInput>


                            <Text style={styles.TextColor} >Registration Year</Text>
                            <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5} onPress={showStartDatePicker} >
                                <Text style={styles.textCal} >

                                    {START_DATE}
                                    {/* {vehicleMFG} */}
                                    {/* {START_DATE ? START_DATE : vehicleMFG ? moment(vehicleMFG).format('YYYY-MM-DD') : null} */}
                                </Text>
                                <CalendarActiveIcon width={20} height={20} />

                            </TouchableOpacity>

                            {/* <Text style={styles.TextColor} >Check in Date</Text>
                            <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                onPress={showEndaDatePicker}
                            >
                                <Text style={styles.textCal} >
                                    {END_DATE}
                                </Text>
                                <CalendarActiveIcon width={20} height={20} />
                            </TouchableOpacity> */}

                            <Text style={styles.TextColor} >Settlement Type</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles, iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}

                                onValueChange={(value) => setsettleMentType(value)}
                                items={SETTLEMENT_TYPE}
                                useNativeAndroidPickerStyle={false}

                                Icon={() => {
                                    return <FeIcon name='chevron-down' size={20} color={"#505050"} />
                                }}
                            />

                            <CustomButton title={"NEXT"} onPress={() => SaveCustomerDetail()} style={{ width: '100%' }} />
                        </View>
                        {/* DATE PCIKER  */}

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handelStartPicker}
                            onCancel={hideDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isDateEndPickerVisible}
                            mode="date"
                            onConfirm={handelEndPicker}
                            onCancel={hideDatePicker}
                        />

                    </>
                    : page === 2 ?
                        <>
                            {/* 
                            <Pressable onPress={() => TapForConsole()} >
                                <Text>SHOW CONSOLE</Text>
                            </Pressable> */}

                            <View style={{ marginBottom: 50, }} >
                                <Text style={styles.TextColor} >GIA report</Text>
                                <View style={styles.UploadDocumnet} >
                                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile(1) }} >
                                        <UploadCloud width={20} height={20} />
                                        <Text style={{ color: "#000" }} >Upload File</Text>
                                    </Pressable>
                                    {Filename &&
                                        <>
                                            <View style={styles.fileNameText} >
                                                <Text style={styles.DocName} >{Filename} </Text>
                                            </View>
                                            <MaterialIcon name="cloud-done" size={20} color={colors.green} />
                                        </>
                                    }
                                </View>

                                <Text style={styles.TextColor} >Quotation</Text>
                                <View style={styles.UploadDocumnet} >
                                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile(2) }} >
                                        <UploadCloud width={20} height={20} />
                                        <Text style={{ color: "#000" }} >Upload File</Text>
                                    </Pressable>
                                    {QuoteFileName &&
                                        <>
                                            <View style={styles.fileNameText} >
                                                <Text style={styles.DocName} >{QuoteFileName} </Text>
                                            </View>
                                            <MaterialIcon name="cloud-done" size={20} color={colors.green} />
                                        </>
                                    }
                                </View>

                                <Text style={styles.TextColor} >PTE Settlement Form</Text>
                                <View style={styles.UploadDocumnet} >
                                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile(3) }} >
                                        <UploadCloud width={20} height={20} />
                                        <Text style={{ color: "#000" }} >Upload File</Text>
                                    </Pressable>
                                    {PTEFileName &&
                                        <>
                                            <View style={styles.fileNameText} >
                                                <Text style={styles.DocName} >{PTEFileName} </Text>
                                            </View>
                                            <MaterialIcon name="cloud-done" size={20} color={colors.green} />
                                        </>
                                    }
                                </View>

                                <Text style={styles.TextColor} >NRIC/EP/SP/WP</Text>
                                <View style={styles.UploadDocumnet} >
                                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile(5) }} >
                                        <UploadCloud width={20} height={20} />
                                        <Text style={{ color: "#000" }} >Upload File</Text>
                                    </Pressable>
                                    {NRIC_EP_SP_WP &&
                                        <>
                                            <View style={styles.fileNameText} >
                                                <Text style={styles.DocName} >{NRIC_EP_SP_WP} </Text>
                                            </View>
                                            <MaterialIcon name="cloud-done" size={20} color={colors.green} />
                                        </>
                                    }
                                </View>


                                <Text style={styles.TextColor} >Certificate of insurance</Text>
                                <View style={styles.UploadDocumnet} >
                                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile(4) }} >
                                        <UploadCloud width={20} height={20} />
                                        <Text style={{ color: "#000" }} >Upload File</Text>
                                    </Pressable>
                                    {certificateFileName &&
                                        <>
                                            <View style={styles.fileNameText} >
                                                <Text style={styles.DocName} >{certificateFileName} </Text>
                                            </View>
                                            <MaterialIcon name="cloud-done" size={20} color={colors.green} />
                                        </>
                                    }
                                </View>
                            </View>
                            <CustomButton title={"NEXT"} onPress={() => SaveFiles()} style={{ width: '100%' }} />

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handelStartPicker}
                                onCancel={hideDatePicker}
                            />
                        </>
                        : page === 3 ?
                            <>

                                {/* <Pressable onPress={() => TapForConsole()} >
                                    <Text>SHOW CONSOLE</Text>
                                </Pressable> */}
                                <Text style={styles.TextColor} >Driver</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setDriver(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <Text style={styles.TextColor} >Accident Date</Text>
                                <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                    onPress={showAccidentalDatePicker}
                                >
                                    <Text style={styles.textCal} >
                                        {ACCIDENT_DATE}
                                    </Text>
                                    <Calender width={20} height={20} />
                                </TouchableOpacity>

                                <Text style={styles.TextColor} >Accident Time</Text>
                                <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                    onPress={showTimePicker}
                                >
                                    <Text style={styles.textCal} >
                                        {ACCIDENTA_TIME}
                                    </Text>
                                    <Calender width={20} height={20} />
                                </TouchableOpacity>


                                <Text style={styles.TextColor} >Location</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setlocation(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                {/* 
                                <Text style={styles.TextColor} >NRIC number</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setNRICNumber(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >EP</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setEPval(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >SP</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setSPval(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >WP</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setWPval(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>
 */}

                                <Text style={styles.TextColor} >Damage Status</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setDamageStatus(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Third Party Vehicle Number</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setThirdParty(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <Text style={styles.TextColor} >Cost of Repair</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setCostRepair(text)}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <Text style={styles.TextColor} >Received Amount</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setRecivedAmount(text)}
                                    keyboardType='numeric'
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <Text style={styles.TextColor} >Details of Accident</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    onChangeText={text => setDetailsOfAccident(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <CustomButton title={"NEXT"} onPress={() => SaveOtherDetail()} style={{ width: '100%' }} />
                                <DateTimePickerModal
                                    isVisible={accidentalDateVisible}
                                    mode="date"
                                    minimumDate={new Date()}
                                    onConfirm={handelAccidentaPicker}
                                    onCancel={hideAccidentalDatePicker}
                                />

                                <DateTimePickerModal
                                    isVisible={timePickerVisible}
                                    mode="time"
                                    minimumDate={new Date()}
                                    onConfirm={handleAccidentalTime}
                                    onCancel={hideTimePicker}
                                />
                            </>
                            : page === 4 ?
                                <>
                                    <View style={styles.addRemark} >
                                        <Text style={styles.BLueHeading} >Customer Remarks </Text>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => addReamrk()} >
                                            <AntIcon name='plussquareo' size={20} color={Colors.primary_Blue} />
                                        </TouchableOpacity>
                                    </View>
                                    {ShowReamrkInput === true ?

                                        LengthOfRemark?.map((item, index) => (
                                            <View style={styles.reamrkView} key={item} >
                                                <View style={styles.remarkIndex} >
                                                    <FormInput
                                                        InputSubject="ID"
                                                        editable={false}
                                                        // placeholderText="Enter the number"
                                                        keyboardType="email-address"
                                                        autoCapitalize="none"
                                                        backgroundColor="transparent"
                                                        headingTextColor={'#000'}
                                                        autoCorrect={false}>
                                                        {index + 1}
                                                    </FormInput>
                                                </View>
                                                <View style={styles.ramrkInput} >
                                                    <FormInput
                                                        changedText={text => remarkTextFunction(text, index)}
                                                        InputSubject="Remarks"
                                                        placeholderText="Enter the number"
                                                        keyboardType="email-address"
                                                        autoCapitalize="none"
                                                        headingTextColor={'#000'}
                                                        autoCorrect={false}>
                                                    </FormInput>
                                                </View>
                                                <TouchableOpacity activeOpacity={0.7} style={styles.deleteIcon} onPress={() => removeRemark(index)} >
                                                    <AntIcon name='closesquareo' size={20} color={Colors.primary_Red} />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                        : null
                                    }
                                    <CustomButton title={"NEXT"} onPress={() => CreateOrder()} style={{ width: '100%' }} />

                                </>
                                : null
                }
            </View>
        )
    }


    const goNext = async () => {
        if (page === 4) {
            //  FinalDataSave()
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
        <SafeAreaView style={styles.NewOrderStyle} >
            <VMOCustomHeader title={"New Reporting"} backIcon />
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
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepTextActive} >Customer Details</Text>
                                        </View>
                                    </View>
                                ) : (

                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepOne}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepText} >Customer Details</Text>
                                        </View>
                                    </View>
                                )}
                                {active === 2 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepTwo}>
                                            <View style={styles.UpperCircle}>
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepTextActive} >Files</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepTwo}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepText} >Files</Text>
                                        </View>
                                    </View>
                                )}
                                {active === 3 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepThree}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepTextActive} >Other Details</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepThree}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepText} >Other Details</Text>
                                        </View>
                                    </View>
                                )}
                                {active === 4 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} >
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepTextActive} >Customer Remarks</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={[styles.StepCircleTouch, { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }]} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                        <View style={styles.StepTextActiveView} >
                                            <Text style={styles.StepText} >Customer Remarks</Text>
                                        </View>
                                    </View>
                                )}
                            </View>

                        </View>
                    }
                    <ScrollView style={{ flex: 1, alignSelf: "stretch", marginBottom: 20, paddingBottom: 20 }}>

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
        </SafeAreaView>
    )
}


export default NewReporting



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


export const styles = StyleSheet.create({

    NewOrderStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    newOrderWrapper: {
        flex: 1,
    },
    scrollPadding: {
        paddingHorizontal: "5%",
    },
    downShow: {
        paddingBottom: "20%",
    },
    BLueHeading: {
        color: Colors.primary_Color,
        fontSize: 16,
        lineHeight: 24,
        marginVertical: "4%",
        fontFamily: fonts.PoppinsSemiBold,
        paddingVertical: 10,
    },
    TouchableDate: {
        backgroundColor: "#ffffff",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
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
    textCal: {
        color: "#000",
        paddingHorizontal: 10,
        fontSize: 18,
    },
    addRemark: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    reamrkView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: 'red',
    },
    remarkIndex: {
        // backgroundColor: 'pink',
        marginHorizontal: "2%",
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    ramrkInput: {
        flex: 12,
        marginHorizontal: "2%",
        // backgroundColor: 'green',
    },
    deleteIcon: {
        marginHorizontal: "2%",
    },
    imageCircleNew: {
        height: windowHeight / 2,
        width: windowWidth,
        borderRadius: 50,
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
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
    StepWiseWrapper: {
        marginBottom: 10,
        height: "100%",
        height: windowHeight,
    },
    StepProgressWrap: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: "center",
        height: '15%',
        height: windowHeight / 7,
        alignItems: "center",
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
        height: "100%",
        // width:"25%", 
        // backgroundColor: "pink",
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
        width: 45,
        height: 45,
        borderRadius: 30,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderColor: '#AE282E',
        borderWidth: 3,
        // backgroundColor: "transparent",
    },
    StepTextActiveView: {
        position: "absolute",
        width: "200%",
        height: windowHeight / 25,
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        bottom: 0,
        // marginTop: 20,
        // backgroundColor: "yellow",
    },
    StepTextActive: {
        color: "#AE282E",
        fontSize: 16,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 15,
        fontFamily: fonts.PoppinsSemiBold,
        // bottom: 0,
        // marginTop: 20,
        // position: "absolute",
    },
    StepText: {
        color: "#004A7F",
        width: "100%",
        fontSize: 14,
        lineHeight: 15,
        fontFamily: fonts.PoppinsSemiBold,
        alignSelf: 'center',
        bottom: 0,
        textAlign: 'center',
        // position: "absolute",
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        // height: "35%",
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
    UploadDocumnet: {
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    UploadArea: {
        width: '40%',
        height: 40,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: colors.lightBlack,
        flexDirection: "row",
        backgroundColor: colors.white,
        alignItems: "center",
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        justifyContent: "space-evenly",
    },
    fileNameText: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        minWidth: "20%",
        maxWidth: '50%',
        marginHorizontal: 10,
    },
    DocName: {
        fontSize: 16,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.green,
        paddingHorizontal: 10,
    },
})

