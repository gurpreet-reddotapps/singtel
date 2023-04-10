import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import FeIcon from 'react-native-vector-icons/Feather'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import FormInput from '../../Components/FormInput';
import CustomButton from '../../Components/CustomButton';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { AssignJobsAPI, CompletedJobsAPI, ReAssignJobsAPI } from '../../api';
import { useNavigation } from '@react-navigation/native';
import { setJobClose } from '../../../../redux/actions/Job';


const AssignBottomSheet = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [worker, setWorker] = useState();
    const [mechanicObject, setmechanicObject] = useState();
    const [type, settype] = useState();
    const [startDate, setStartDate] = useState();
    const [EndDate, setEndDate] = useState();
    const { orderId } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    const navigation = useNavigation()

    const START_DATE = moment(startDate).format('YYYY-MM-DD HH:mm:ss')
    const END_DATE = moment(EndDate).format('YYYY-MM-DD HH:mm:ss')

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

    // const ValidateData = () => {
    //     if (END_DATE == null || START_DATE == null || worker == null || worker == "No Data") {
    //         ShowErrorMessage("Please Fill Detail Correct")
    //         return false;
    //     } else {
    //         console.log(type);

    //         if (type == 1) {
    //             setmechanicObject({
    //                 end_time: END_DATE,
    //                 job_desc: `Service-${orderId} - Mechanic Work`,
    //                 order_id: orderId,
    //                 start_time: START_DATE,
    //                 type: type,
    //                 user_id: worker,
    //             }
    //             )
    //         } else if (type == 2) {
    //             setmechanicObject({
    //                 end_time: END_DATE,
    //                 job_desc: `Service-${orderId} - QC Work`,
    //                 order_id: orderId,
    //                 start_time: START_DATE,
    //                 type: type,
    //                 user_id: worker,
    //             }
    //             )
    //         } else if (type == 3) {
    //             setmechanicObject({
    //                 end_time: END_DATE,
    //                 job_desc: `Service-${orderId} - Washer Work`,
    //                 order_id: orderId,
    //                 start_time: START_DATE,
    //                 type: type,
    //                 user_id: worker,
    //             }
    //             )
    //         } else {
    //             return ShowErrorMessage("SOMETHING WENT WRONG")
    //         }

    //     }
    // }

    const assainJobForWorker = async (type) => {
        // ValidateData()
        if (END_DATE == null || START_DATE == null || worker == null || worker == "No Data") {
            ShowErrorMessage("Please Fill Detail Correct")
            return false;
        } else {

            if (type == 1) {
                setmechanicObject({
                    end_time: END_DATE,
                    job_desc: `Service-${orderId} - Mechanic Work`,
                    order_id: orderId,
                    start_time: START_DATE,
                    type: type,
                    user_id: worker,
                }
                )
                return InternallyWorking(null)

            } else if (type == 2) {
                setmechanicObject({
                    end_time: END_DATE,
                    job_desc: `Service-${orderId} - QC Work`,
                    order_id: orderId,
                    start_time: START_DATE,
                    type: type,
                    user_id: worker,
                }
                )
                return InternallyWorking(1)
            } else if (type == 3) {
                setmechanicObject({
                    end_time: END_DATE,
                    job_desc: `Service-${orderId} - Washer Work`,
                    order_id: orderId,
                    start_time: START_DATE,
                    type: type,
                    user_id: worker,
                }
                )
                return InternallyWorking(2)
            } else if (type == 11) {
                setmechanicObject({
                    end_time: END_DATE,
                    job_desc: `Service-${orderId} - Mechanic Work`,
                    order_id: orderId,
                    start_time: START_DATE,
                    type: 1,
                    user_id: worker,
                }
                )
                return reAssignWorking()

            } else {
                return ShowErrorMessage("SOMETHING WENT WRONG")
            }
        }
        // console.log(mechanicObject);

        // console.log(worker, "worker");
        // let coseData = {
        //     order_id: orderId,
        //     type: 1
        // }
        // CompletedJobsAPI(coseData).then((res) => {
        //     console.log(res?.data, "CLOSED THE JOB");
        //     AssignJobsAPI(mechanicObject).then((res) => {
        //         console.log(res, "HERE UNDEFINED");
        //         if (res?.data?.success === true) {
        //             props.closeSheet()
        //             ShowSuccessMessage("Job Assigned")
        //             props?.SettingTheLocalStatus()
        //         }
        //         return res;
        //     }).catch(err => { return err; });
        // }).catch(err => { return err; });


    }


    const InternallyWorking = (typeClose) => {
        if (typeClose == null) {
            AssignJobsAPI(mechanicObject).then((res) => {
                console.log(res, "HERE UNDEFINED");
                if (res?.data?.success === true) {
                    console.log(res?.data, "HERE UNDEFINED");
                    props.closeSheet()
                    ShowSuccessMessage("Job Assigned")
                    props?.SettingTheLocalStatus()
                    // dispatch(setJobClose(true));
                }
                return res;
            }).catch(err => { return err; });

        } else {

            let closeData = {
                order_id: orderId,
                type: typeClose
            }
            CompletedJobsAPI(closeData).then((res) => {
                console.log(res, "RES ONLY CLOSED THE JOB");
                // cons ole.log(res?.data, "CLOSED THE JOB");
                AssignJobsAPI(mechanicObject).then((res) => {
                    console.log(res, "HERE UNDEFINED");
                    if (res?.data?.success === true) {
                        console.log(res?.data, "HERE UNDEFINED");
                        props.closeSheet()
                        navigation.goBack()
                        ShowSuccessMessage("Job Assigned")
                        props?.SettingTheLocalStatus()
                        dispatch(setJobClose(true));
                    }
                    return res;
                }).catch(err => { return err; });
            }).catch(err => { return err; });
        }

    }

    const reAssignWorking = () => {
                ReAssignJobsAPI(mechanicObject).then((res) => {
                console.log(res, "Mechnic Reaasign HERE UNDEFINED");
                if (res?.data?.success === true) {
                    console.log(res?.data, "Mechnic Reaasign HERE UNDEFINED");
                    props.closeSheet()
                    ShowSuccessMessage("Job reassign to Mechanic")
                    props?.SettingTheLocalStatus()
                }
                return res;
            }).catch(err => { return err; });

      

    }


    return (
        <>
            <View style={styles.BottomScrollViewWrapper} >
                <Text style={styles.TextColor} >{props.selectType}</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value, index) => { setWorker(value); console.log(value, "HRE") }}
                    style={pickerSelectStyles}
                    items={props.ArrayOfWorker}
                />

                <Pressable onPress={() => { showStartDatePicker() }} >
                    <FormInput
                        editable={false}
                        newHeading="Start Date"
                        headingTextColor={"#000"}
                        iconType="calendar"
                        changedText={text => setStartDate(text)}
                        // InputSubject=""
                        autoCapitalize="none"
                        autoCorrect={false}
                        userHeight={50}
                        fontsize={16}
                    >{START_DATE}
                    </FormInput>
                </Pressable>
                <Pressable onPress={() => { showEndaDatePicker() }} >
                    <FormInput
                        editable={false}
                        newHeading="End Date"
                        headingTextColor={"#000"}
                        iconType="calendar"
                        changedText={text => setEndDate(text)}
                        // InputSubject="Service Date"
                        autoCapitalize="none"
                        autoCorrect={false}
                        userHeight={50}
                        fontsize={16}
                    >{END_DATE}
                    </FormInput>
                </Pressable>

                {user?.user?.role === 1 ?
                    <CustomButton title={"Assign job"} style={{ width: '100%' }} onPress={() => { assainJobForWorker(2) }} />
                    : user?.user?.role === 3 ?
                        <CustomButton title={"Assign job"} style={{ width: '100%' }} onPress={() => { assainJobForWorker(props.assignType) }} />
                        :
                        null
                }


            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handelStartPicker}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDateEndPickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handelEndPicker}
                onCancel={hideDatePicker}
            />
        </>
    )
}

export default AssignBottomSheet


const styles = StyleSheet.create({
    BottomScrollViewWrapper: {
        backgroundColor: '#FFFFFF',
        width: "90%",
        alignSelf: 'center',
    },
    ContentView: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        paddingBottom: '15%',
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
        height: 100,
        textAlignVertical: 'top',

    },

}
)



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
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 0,
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
        height: 45,
        width: "100%",
        marginBottom: 10,

    },
});

