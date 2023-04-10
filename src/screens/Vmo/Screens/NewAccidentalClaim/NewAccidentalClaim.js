import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { AllInsuranceCompanyAPI, CheckOrderExistAPI, FetchAllCustomersAPI, FetchCustomerVehicleAPI, FetchSurveyorAPI, NewOrderAPI } from '../../api'
import AntIcon from 'react-native-vector-icons/AntDesign'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import FormInput from '../../Components/FormInput'
import { Calender } from '../../assets/Icons'
import { CalendarActiveIcon } from '../../../../assects/Icons/TabIcons'
import { Checkbox } from 'react-native-paper';
import NavigationString from '../../routes/NavigationString'
import { setAccidentalStepOneDataInRedux, setAccidentalStepTwoDataInRedux, setAccidentalStepThreeDataInRedux, setAccidentalStepFourDataInRedux } from '../../../../redux/actions/NewAccidental'
import { useSelector, useDispatch } from 'react-redux';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'





const NewAccidentalClaim = () => {

    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);
    const dispatch = useDispatch()
    const { pageOneDataValueAccidental, pageTwoDataValueAccidental, pageThreeDataValueAccidental, pageFourDataValueAccidental } = useSelector(state => state.NewAccidentalDetail);


    const SETTLEMENT_TYPE = [
        { label: 'Own Damage', value: 'Own Damage' },
        { label: 'Third Party', value: 'Third Party' },
        { label: 'Reporting Only', value: 'Reporting Only' },
        { label: `Private Settlement - At Fault`, value: `Private Settlement – At Fault` },
        { label: 'Private Settlement - Not At Fault', value: 'Private Settlement – Not At Fault' },
    ]


    // COMPONENT 

    const StepWiseComponent = () => {
        const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
        const [accidentalDateVisible, setaccidentalDateVisible] = useState(false);
        const [timePickerVisible, settimePickerVisible] = useState(false);
        const [STRPickerVisible, setSTRPickerVisible] = useState(false);
        const [SurveyDateTimeVisible, setSurveyDateTimeVisible] = useState(false);

        const [ShowReamrkInput, setShowReamrkInput] = useState(false);
        const [reamrkIndex, setreamrkIndex] = useState(1);
        const [allCustomerDetail, setAllCustomerDetail] = useState(false);
        const [AllSurveyorDetail, setAllSurveyorDetail] = useState(false);
        const [Company, setCompany] = useState(false);
        const [vehicleList, setvehicleList] = useState(false);
        const [arrayForPicker, setarrayForPicker] = useState();
        const [arrayForSurveyor, setarrayForSurveyor] = useState();
        const [arrayForVehiclePicker, setarrayForVehiclePicker] = useState();
        const [SurveyorID, setSurveyorID] = useState();
        const [LengthOfRemark, setLengthOfRemark] = useState([0])
        const [reamrkText, setreamrkText] = useState([0])
        const [loading, setloading] = useState(false)
        const [transparentLoading, settransparentLoading] = useState(false)
        const [reamrkTextArray, setreamrkTextArray] = useState([])

        const [CustomerID, setCustomerID] = useState();
        const [settleMentType, setsettleMentType] = useState();
        const [CustomerName, setCustomerName] = useState();
        const [CustomerContact, setCustomerContact] = useState();
        const [vehicleMake, setvehicleMake] = useState();
        const [vehicleModel, setvehicleModel] = useState();
        const [CompanyVal, setCompanyVal] = useState();
        const [InsurabeCompName, setInsurabeCompName] = useState();
        const [VehicleID, setVehicleID] = useState();
        const [startDate, setStartDate] = useState();
        const [endDate, setEndDate] = useState();

        const [surveyorID, setsurveyorID] = useState();
        const [SurveyorName, setSurveyorName] = useState();
        const [companyName, setcompanyName] = useState();
        const [contactNumber, setcontactNumber] = useState();
        const [SurveyDateTime, setSurveyDateTime] = useState();


        const [AccidentalDate, setAccidentalDate] = useState();
        const [AccidentalTime, setAccidentalTime] = useState();
        const [StrDate, setStrDate] = useState();
        const [IncidentNumber, setIncidentNumber] = useState();
        const [Driver, setDriver] = useState();
        const [TypeOfAccident, setTypeOfAccident] = useState();
        const [AreaOfFocus, setAreaOfFocus] = useState();
        const [Location, setLocation] = useState();
        const [ClaimType, setClaimType] = useState();
        const [CostOfRepair, setCostOfRepair] = useState();
        const [Deduction, setDeduction] = useState();
        const [VehicleRepairedStatus, setVehicleRepairedStatus] = useState();
        const [SIRStatus, setSIRStatus] = useState();
        const [AccidentalRemark, setAccidentalRemark] = useState();
        const [DetailsOfAccident, setDetailsOfAccident] = useState();


        const navigation = useNavigation();

        //DATE PICKER 
        const START_DATE = moment(startDate).format('YYYY-MM-DD')
        const END_DATE = moment(endDate).format('YYYY-MM-DD')
        const SURVEY_DATE_TIME = moment(endDate).format('hh:mm:ss')
        const ACCIDENT_DATE = moment(endDate).format('YYYY-MM-DD')
        const ACCIDENTA_TIME = moment(endDate).format('hh:mm:ss')
        const STR_DATE = moment(endDate).format('hh:mm:ss')


        const SaveExterior = () => {
            let objectForOne = {
                CustomerID,
                CustomerName,
                VehicleID,
                CustomerContact,
                vehicleMake,
                vehicleModel,
                CompanyVal,
                START_DATE,
                END_DATE,
                settleMentType,
            }

            // console.log(objectForOne, "ITS LOCAL")

            if (CustomerID !== undefined ||
                CustomerName !== undefined ||
                CustomerContact !== undefined ||
                vehicleMake !== undefined ||
                vehicleModel !== undefined ||
                CompanyVal !== undefined ||
                VehicleID !== undefined) {
                dispatch(setAccidentalStepOneDataInRedux(objectForOne))
                goNext()
            } else {
                ShowErrorMessage("Please Enter all the values")
            }

        }


        const saveSurveyorDetail = () => {
            let objectForTwo = {
                surveyorID,
                SurveyorName,
                companyName,
                contactNumber,
                SURVEY_DATE_TIME,
            }

            // console.log(objectForOne, "ITS LOCAL")

            if (surveyorID !== undefined ||
                SurveyorName !== undefined ||
                companyName !== undefined ||
                contactNumber !== undefined ||
                SURVEY_DATE_TIME !== undefined
            ) {
                dispatch(setAccidentalStepTwoDataInRedux(objectForTwo))
                goNext()
            } else {
                ShowErrorMessage("Please Enter all the values")
            }

        }

        const saveAccidentalDetail = () => {
            let objectForThree = {
                ACCIDENT_DATE,
                ACCIDENTA_TIME,
                STR_DATE,
                IncidentNumber,
                Driver,
                TypeOfAccident,
                AreaOfFocus,
                Location,
                ClaimType,
                CostOfRepair,
                Deduction,
                VehicleRepairedStatus,
                SIRStatus,
                AccidentalRemark,
                DetailsOfAccident,
            }

            // console.log(objectForOne, "ITS LOCAL")

            if (ACCIDENT_DATE !== undefined ||
                ACCIDENTA_TIME !== undefined ||
                STR_DATE !== undefined ||
                IncidentNumber !== undefined ||
                Driver !== undefined ||
                TypeOfAccident !== undefined ||
                AreaOfFocus !== undefined ||
                Location !== undefined ||
                ClaimType !== undefined ||
                CostOfRepair !== undefined ||
                Deduction !== undefined ||
                VehicleRepairedStatus !== undefined ||
                SIRStatus !== undefined ||
                AccidentalRemark !== undefined ||
                DetailsOfAccident !== undefined
            ) {
                dispatch(setAccidentalStepThreeDataInRedux(objectForThree))
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

            let OtherData = {
                incident_number: pageThreeDataValueAccidental?.IncidentNumber,
                accident_date: pageThreeDataValueAccidental?.AccidentalDate,
                accident_time: pageThreeDataValueAccidental?.AccidentalTime,
                driver: pageThreeDataValueAccidental?.Driver,
                type_of_accident: pageThreeDataValueAccidental?.TypeOfAccident,
                area_of_focus: pageThreeDataValueAccidental?.AreaOfFocus,
                details_of_accident: pageThreeDataValueAccidental?.DetailsOfAccident,
                location: pageThreeDataValueAccidental?.Location,
                claim_type: pageThreeDataValueAccidental?.ClaimType,
                cor: pageThreeDataValueAccidental?.CostOfRepair,
                deduction: pageThreeDataValueAccidental?.Deduction,
                vehicle_repaired_status: pageThreeDataValueAccidental?.VehicleRepairedStatus,
                str_date: pageThreeDataValueAccidental?.StrDate,
                sir_status: pageThreeDataValueAccidental?.SIRStatus,
                accident_remarks: pageThreeDataValueAccidental?.AccidentalRemark,
            }

            const OtherStringData = JSON.stringify(OtherData);

            let data = {
                booking_date: pageOneDataValueAccidental?.START_DATE,
                check_in_date: pageOneDataValueAccidental?.END_DATE,
                customer_id: pageOneDataValueAccidental?.CustomerID,
                insurance_company_id: pageOneDataValueAccidental?.CompanyVal,
                insurancing_company: pageTwoDataValueAccidental?.companyName,
                other_details: OtherStringData,
                remarks: stringRemarks,
                settlement_type: pageOneDataValueAccidental?.settleMentType,
                status: 0,
                survey_date_time: pageTwoDataValueAccidental?.SURVEY_DATE_TIME,
                surveyor_id: pageTwoDataValueAccidental?.surveyorID,
                type: 1,
                vehicle_id: pageOneDataValueAccidental?.VehicleID,
            }

            console.log(data, "FULL DATA")

            NewOrderAPI(data).then((res) => {
                console.log(res, "<------");
                console.log(res?.data, "<------");
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
            // console.log(arrayForPicker, "WHAT !!!!");
        }

        // useEffect(() => {
        //     setloading(true)
        //     FetchSurveyorAPI({}).then((res) => {
        //         console.log(res?.data?.all_surveyors, "SURVEYOR DATA");
        //         let filterData = res?.data?.all_surveyors.filter(item => item.insurance_company_id === pageOneDataValueAccidental.CompanyVal)
        //         console.log(filterData,"filterData")

        //         setAllSurveyorDetail(filterData)
        //         setloading(false)
        //     }).catch(err => { return err; });
        // }, [])

        const AfterCompanyVal = () => {
            setloading(true)
            FetchSurveyorAPI({}).then((res) => {
                console.log(res?.data?.all_surveyors, "SURVEYOR DATA");
                let filterData = res?.data?.all_surveyors.filter(item => item.insurance_company_id == pageOneDataValueAccidental.CompanyVal)
                console.log(filterData, "FUNC FILTER DATA")
                setAllSurveyorDetail(filterData)
                setloading(false)
            }).catch(err => { return err; });
        }

        useEffect(() => {
            if (active == 2) {
                console.log("TRUE HAI BHAI");
                AfterCompanyVal()
            }
        }, [active == 2])

        useFocusEffect(
            React.useCallback(() => {
                convertSurveyorData()
                return () => tapForLog()
            }, [AllSurveyorDetail])
        );

        const convertSurveyorData = async () => {
            AllSurveyorDetail && setarrayForSurveyor(AllSurveyorDetail.map(
                item => ({ label: `${item.surveyor_name} # ${item.id}`, value: item.id, key: item.id })
            ))
            console.log(arrayForSurveyor, "WHAT !!!!");
        }

        const tapForLog = async () => {
            // console.log(arrayForPicker, "WHAT !!!!");
            console.log(arrayForSurveyor, "WHAT !!!!");
        }

        useEffect(() => {
            let data = { customer_id: CustomerID }
            settransparentLoading(true)
            FetchCustomerVehicleAPI(data).then((res) => {
                setvehicleList(res.data.customer_vehicles); if (success === true) {
                    settransparentLoading(false);
                }
                // console.log(res.data.customer_vehicles, "<------");
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

                    ToastAndroid.show(` ${res.data.message}`, ToastAndroid.SHORT);

                } else {
                    ToastAndroid.show(` ${res.data.message}`, ToastAndroid.SHORT);
                }
                // console.log(res.data, "<------");
            }).catch(err => { return err; });

        }, [VehicleID])


        useFocusEffect(
            React.useCallback(() => {
                setingArrayForPicker()
                return () => console.log("check")
            }, [vehicleList])
        );


        const setingArrayForPicker = async () => {
            vehicleList && setarrayForVehiclePicker(vehicleList.map(
                item => ({ label: item.vehicle_number, value: item.id, key: item.id })
            ))
        }

        const showStartDatePicker = () => {
            setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
            setDatePickerVisibility(false);
        };

        const showEndaDatePicker = () => {
            setDateEndPickerVisibility(true);
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

        const showSurveyDatePicker = () => {
            setSurveyDateTimeVisible(true);
        };

        const hideSurveyDatePicker = () => {
            setSurveyDateTimeVisible(false);
        };

        const handelSurveyDatePicker = (date) => {
            console.log("A Accidental date  picked: ", date);
            const newDate = date;
            setSurveyDateTime(newDate)
            setSurveyDateTimeVisible(false)
            hideSurveyDatePicker();
        };

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

        const showSTRDate = () => {
            setSTRPickerVisible(true);
        };

        const hideSTRDate = () => {
            setSTRPickerVisible(false);
        };

        const handelSTRDatePicker = (date) => {
            console.log("A Accidental date  picked: ", date);
            const newDate = date;
            setStrDate(newDate)
            setSTRPickerVisible(false)
            hideSTRDate();
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
            console.log(index, "INDEX ALLTIME")
            let textObject = { text: text, id: index }
            let getIndex = reamrkTextArray.findIndex(e => e.id === index)
            if (getIndex === -1) {
                setreamrkTextArray(oldTextWithID => [...oldTextWithID, textObject])
            } else {
                reamrkTextArray[getIndex] = textObject;
            }
        }


        const setSurveyorDetail = (val, index) => {
            console.log(val, "UNDER THE SET");
            console.log(AllSurveyorDetail, "VALUE OF SURVEYOR");
            AllSurveyorDetail.map(item => {
                if (item.id === val) {
                    setSurveyorName(item.surveyor_name)
                    setcompanyName(item.surveyor_company)
                    setcontactNumber(item.surveyor_contact_no)
                    console.log(item.insurance_company_id, "insurance_company_id")
                    console.log(item.surveyor_company, "surveyor_company")
                    console.log(item.surveyor_contact_no, "surveyor_contact_no")
                    console.log(item.surveyor_name, "surveyor_name")
                } else {
                    return -1
                }
            })
        }



        const getComapny = (data) => {
            setloading(true)
            AllInsuranceCompanyAPI(data).then((res) => {
                let trying = null
                let setingObect = (res?.data?.all_insurance_companies.map((comp, index) => {
                    return trying = { label: comp.company_name.toString(), value: comp.id.toString(), key: index.toString() }
                }))
                setCompany(setingObect)
                setloading(false)
                return res;
            }).catch(err => { return err; });
        }

        useEffect(() => {
            getComapny({})
        }, [])



        const setCompanyDetail = (val, index) => {
            console.log(val, "UNDER THE SET");
            console.log(Company, "VALUE OF SURVEYOR");
            Company.map(item => {
                if (item.id === val) {
                    setInsurabeCompName(item.id)
                    console.log(item.id, "insurance_company_id")
                    console.log(item.company_name, "surveyor_company")
                } else {
                    return -1
                }
            })
        }


        const tapForValue = () => {
            console.log(CompanyVal, "CompanyVal");
            console.log(pageTwoDataValueAccidental, "pageTwoDataValueAccidental");
            console.log(pageTwoDataValueAccidental.companyName, "ARRAY REDUX ");
        }



        return (
            <View>
                {page === 1 ?
                    <>
                        {/* <Pressable onPress={() => tapForValue()} >
                            <Text style={styles.TextColor} >SHOW VALUE</Text>
                        </Pressable> */}
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

                            <Text style={styles.TextColor} >Check in Date</Text>
                            <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                onPress={showEndaDatePicker}
                            >
                                <Text style={styles.textCal} >
                                    {END_DATE}
                                </Text>
                                <CalendarActiveIcon width={20} height={20} />
                            </TouchableOpacity>

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
                            <Text style={styles.TextColor} >Insurancing Company</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles, iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}

                                onValueChange={(value) => { setCompanyVal(value); console.log(value) }}
                                items={Company}
                                useNativeAndroidPickerStyle={false}

                                Icon={() => {
                                    return <FeIcon name='chevron-down' size={20} color={"#505050"} />
                                }}
                            />


                            <CustomButton title={"NEXT"} onPress={() => SaveExterior()} style={{ width: '100%' }} />
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
                            {/* <Pressable onPress={() => tapForValue()} >
                                <Text style={styles.TextColor} >SHOW VALUE</Text>
                            </Pressable> */}

                            <Text style={styles.TextColor} >Surveyor ID</Text>
                            {
                                arrayForSurveyor &&
                                    arrayForSurveyor ?
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
                                            setsurveyorID(itemVal); setSurveyorDetail(itemVal)
                                        }}
                                        items={arrayForSurveyor}
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

                            <Pressable onPress={() => { navigation.navigate(NavigationString.SURVEYOR_TAB) }} style={styles.AddNew} >
                                <Text style={[styles.TextColor]} >Add New Surveyor </Text>
                                <FeIcon name='plus' size={15} color={Colors.primary_Blue} />
                            </Pressable>


                            <Text style={styles.TextColor} >Surveyor Name</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            // editable={false}
                            >
                                {SurveyorName}
                            </TextInput>


                            <Text style={styles.TextColor} >Company</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            // editable={false}
                            >
                                {companyName}
                            </TextInput>

                            <Text style={styles.TextColor} >Contact No.</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            // editable={false}
                            >
                                {contactNumber}
                            </TextInput>

                            <Text style={styles.TextColor} >Survey Date Time</Text>
                            <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                onPress={showStartDatePicker}
                            >
                                {/* <FeIcon name='calendar' size={25} color=" /> */}
                                <Text style={styles.textCal} >
                                    {END_DATE}
                                </Text>
                                <Calender width={20} height={20} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} >

                                <Text style={styles.TextColor} >Send surveyor invitation on email</Text>
                                {Platform.OS === 'ios' ?

                                    <View style={styles.CheckBoxView}>
                                        <Checkbox.Android
                                            status={false == true ? 'checked' : 'unchecked'}
                                            color="#FFFFFF"
                                            onPress={() => {}}
                                            // onPress={() => sendIdWithCheck(props.index)}
                                        />
                                    </View>
                                    :
                                    <Checkbox.Android
                                        status={false == true ? 'checked' : 'unchecked'}
                                        color="#FFFFFF"
                                        onPress={() => {}}
                                        // onPress={() => sendIdWithCheck(props.index)}
                                    />
                                }

                            </View>
                            <CustomButton title={"NEXT"} onPress={() => saveSurveyorDetail()} style={{ width: '100%' }} />

                            <DateTimePickerModal
                                isVisible={SurveyDateTimeVisible}
                                mode="date"
                                onConfirm={handelSurveyDatePicker}
                                onCancel={hideSurveyDatePicker}
                            />
                        </>
                        : page === 3 ?
                            <>
                                {/* <Pressable onPress={() => tapForValue()} >
                                    <Text style={styles.TextColor} >SHOW VALUE</Text>
                                </Pressable> */}
                                <Text style={styles.TextColor} >Incident Number</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setIncidentNumber(text)}
                                    autoCorrect={false}
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

                                <Text style={styles.TextColor} >Driver</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setDriver(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Type of Accident</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    onChangeText={text => setTypeOfAccident(text)}
                                    placeholder="Enter the number"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Area of focus</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setAreaOfFocus(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Location</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setLocation(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Claim Type</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setClaimType(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Cost of Repair</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setCostOfRepair(text)}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Deduction</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setDeduction(text)}
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Vehicle Repaired Status</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setVehicleRepairedStatus(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <Text style={styles.TextColor} >STR Date</Text>
                                <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                    onPress={showSTRDate}
                                >
                                    {/* <FeIcon name='calendar' size={25} color=" /> */}
                                    <Text style={styles.textCal} >
                                        {END_DATE}
                                    </Text>
                                    <Calender width={20} height={20} />
                                </TouchableOpacity>

                                <Text style={styles.TextColor} >SIR Status</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setSIRStatus(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Accident Remarks</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setAccidentalRemark(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>


                                <Text style={styles.TextColor} >Details of Accident</Text>
                                <TextInput
                                    style={styles.TextInputStyles}
                                    placeholder="Enter the number"
                                    onChangeText={text => setDetailsOfAccident(text)}
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                >
                                    {vehicleMake}
                                </TextInput>

                                <CustomButton title={"NEXT"} onPress={() => saveAccidentalDetail()} style={{ width: '100%' }} />


                                <DateTimePickerModal
                                    isVisible={accidentalDateVisible}
                                    mode="date"
                                    onConfirm={handelAccidentaPicker}
                                    onCancel={hideAccidentalDatePicker}
                                />

                                <DateTimePickerModal
                                    isVisible={timePickerVisible}
                                    mode="time"
                                    onConfirm={handleAccidentalTime}
                                    onCancel={hideTimePicker}
                                />

                                <DateTimePickerModal
                                    isVisible={STRPickerVisible}
                                    mode="date"
                                    onConfirm={handelSTRDatePicker}
                                    onCancel={hideSTRDate}
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
            <VMOCustomHeader title={"New Accidental claim"} backIcon />
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
                                        <Text style={styles.StepTextActive} >Customer Details</Text>
                                    </View>
                                ) : (

                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepOne}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Customer Details</Text>
                                    </View>
                                )}
                                {active === 2 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepTwo}>
                                            <View style={styles.UpperCircle}>
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Surveyor details</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 1 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepTwo}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Surveyor details</Text>
                                    </View>
                                )}
                                {active === 3 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepThree}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Accident Details</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={[styles.StepCircleTouch, { backgroundColor: active > 2 ? Colors.primary_Blue : "#C1C1C1" }]} onPress={goToStepThree}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Accident Details</Text>
                                    </View>
                                )}
                                {active === 4 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} >
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Customer Remarks</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={[styles.StepCircleTouch, { backgroundColor: active > 3 ? Colors.primary_Blue : "#C1C1C1" }]} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                        <Text style={styles.StepText} >Customer Remarks</Text>
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

export default NewAccidentalClaim




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
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
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
        // width:"25%", 
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
        marginTop: 10,
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
    AddNew: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        width: '50%',
        borderWidth: 1,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderRadius: 10,
    }
})

