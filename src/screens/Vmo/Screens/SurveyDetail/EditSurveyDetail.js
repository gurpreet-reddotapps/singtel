import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { Colors } from '../../Constant/Colors'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import FeIcon from 'react-native-vector-icons/Feather'
import CustomButton from '../../Components/CustomButton';
import moment from 'moment'
import { Calender } from '../../assets/Icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString';
import { AdminGetOrderDetailAPI, FetchSurveyorAPI } from '../../api';
import { useSelector } from 'react-redux'




const EditSurveyDetail = (props) => {
    const [arrayForPicker, setarrayForPicker] = useState();
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [SurveyorID, setSurveyorID] = useState();
    const [surveyorName, setsurveyorName] = useState();
    const [company, setcompany] = useState();
    const [conatcNumber, setconatcNumber] = useState();
    const [ApprovaalType, setApprovaalType] = useState();
    const [ApprovalLabourDays, setApprovalLabourDays] = useState();
    const [AllSurveyorDetail, setAllSurveyorDetail] = useState(false);
    const [arrayForSurveyor, setarrayForSurveyor] = useState();
    const [loading, setloading] = useState(false)
    const [surveyDetail, setsurveyDetail] = useState();
    const { orderId } = useSelector(state => state.JobDetails);


    const APPROVAL_TYPE = [
        { label: 'Lum sum', value: 'Lum sum' },
        { label: 'Item by item', value: 'Item by item' },
    ]

    console.log(props?.route?.params, "ROUTE");
    const { item } = props?.route?.params;

    useFocusEffect(
        React.useCallback(() => {
            convertSurveyorData()
            return () => tapForLog()
        }, [AllSurveyorDetail])
    );



    useEffect(() => {
        setsurveyDetail(item)
    }, []);


    useEffect(() => {
        setloading(true)
        FetchSurveyorAPI({}).then((res) => {
            console.log(res?.data?.all_surveyors);
            setAllSurveyorDetail(res?.data?.all_surveyors)
            setloading(false)
        }).catch(err => { return err; });
    }, [])


    const tapForLog = async () => {
        console.log(arrayForPicker, "WHAT !!!!");
        console.log(arrayForSurveyor, "WHAT !!!!");
    }

    const navigation = useNavigation()

    const showStartDatePicker = () => {
        setDatePickerVisibility(true);
        setStartDate(null)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handelStartPicker = (date) => {
        console.log("A date has been picked: ", date);
        ShowSuccessMessage(`A date has been picked:${date} `)
        hideDatePicker();
        setStartDate(moment(date).format('YYYY-MM-DD hh:mm:ss'))
    };

    const convertSurveyorData = async () => {
        AllSurveyorDetail && setarrayForSurveyor(AllSurveyorDetail.map(
            item => ({ label: `${item.surveyor_name} # ${item.id}`, value: item.id, key: item.id })
        ))
        console.log(arrayForSurveyor, "WHAT !!!!");
    }

    const setCompanyDetail = (val, index) => {
        console.log(val, "UNDER THE SET");
        console.log(AllSurveyorDetail, "VALUE OF SURVEYOR");
        AllSurveyorDetail.map(item => {
            if (item.id === val) {
                setsurveyorName(item.surveyor_name)
                setcompany(item.surveyor_company)
                setconatcNumber(item.surveyor_contact_no)
            } else {
                return -1
            }
        })
    }

    const takeDataNext = () => {
        
        let APPOROVALLABOURDAY = ApprovalLabourDays == undefined ? surveyDetail?.approval_labour_days : ApprovalLabourDays
        if (SurveyorID !== undefined && surveyorName !== undefined && company !== undefined && conatcNumber !== undefined && startDate !== undefined && ApprovaalType !== undefined) {
            let nextObject = {
                SurveyorID: SurveyorID,
                surveyorName: surveyorName,
                company: company,
                conatcNumber: conatcNumber,
                startDate: startDate,
                ApprovaalType: ApprovaalType,
                ApprovalLabourDays: APPOROVALLABOURDAY,
                item: item,
            }
            console.log(APPOROVALLABOURDAY, "APPOROVALLABOURDAY");
            navigation.navigate(NavigationString.EDIT_NEXT_SURVEY_DETAIL, nextObject)
        } else {
            ShowErrorMessage("Please FIll the details Correctly")
            return -1;
        }
    }

    return (
        <>
            <SafeAreaView style={styles.NewSurveyDetailWrapper} >
                <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
                <VMOCustomHeader title={"Edit survey report"} backIcon />
                <ScrollView style={styles.NewSurveyDetailContent} >

                    <Text style={styles.TextColor} >Surveyor ID</Text>
                    {/* <Text style={styles.TextColor} >{surveyDetail.surveyor_id}</Text> */}
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
                                    setSurveyorID(itemVal); setCompanyDetail(itemVal)
                                }}
                                items={arrayForSurveyor}
                                value={SurveyorID == undefined ? surveyDetail?.surveyor_id : SurveyorID}

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



                    <Text style={styles.TextColor} >Surveyor Name</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setsurveyorName(text)}
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={false}
                    >
                        {surveyorName}
                    </TextInput>

                    <Text style={styles.TextColor} >Company</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setcompany(text)}
                        autoCorrect={false}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={false}
                    >
                        {company}
                    </TextInput>

                    <Text style={styles.TextColor} >Contact No.</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setconatcNumber(text)}
                        autoCorrect={false}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        editable={false}
                    >
                        {conatcNumber}
                    </TextInput>

                    <Text style={styles.TextColor} >Service Start Date</Text>
                    <Pressable style={styles.TouchableDate} onPress={showStartDatePicker} >
                        <Text style={styles.textCal} >
                            {startDate}
                        </Text>
                        <Calender width={20} height={20} />
                    </Pressable>

                    <Text style={styles.TextColor} >Approval Type</Text>

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
                            setApprovaalType(itemVal)
                        }}
                        items={APPROVAL_TYPE}
                        value={ApprovaalType == undefined ? surveyDetail?.approval_type : ApprovaalType}
                    />


                    <Text style={styles.TextColor} >Approval Labour Days</Text>
                    <TextInput
                        style={styles.TextInputStyles}
                        placeholder="Enter the number"
                        onChangeText={text => setApprovalLabourDays(text)}
                        autoCorrect={false}
                        keyboardType="numeric"
                        autoCapitalize="none"
                    // editable={false}
                    >
                        {ApprovalLabourDays == undefined ? surveyDetail?.approval_labour_days : ApprovalLabourDays}
                    </TextInput>

                    <CustomButton title={"Next"} onPress={() => takeDataNext()} style={{ width: '100%', marginBottom: 15 }} />

                </ScrollView>
            </SafeAreaView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handelStartPicker}
                onCancel={hideDatePicker}
            />
        </>
    )
}

export default EditSurveyDetail



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
    NewSurveyDetailWrapper: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    NewSurveyDetailContent: {
        paddingHorizontal: 15,
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
    textCal: {
        color: "#000",
        paddingHorizontal: 10,
        fontSize: 18,
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
})