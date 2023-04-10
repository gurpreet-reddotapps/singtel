import { View, Text, SafeAreaView, StyleSheet, StatusBar, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import RNPickerSelect from 'react-native-picker-select';
import FormInput from '../../Components/FormInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import fonts from '../../../../assects/fonts';
import { Colors } from '../../Constant/Colors';
import FeIcon from 'react-native-vector-icons/Feather'
import CustomButton from '../../Components/CustomButton';
import { AssignJobsAPI, FetchMechanicAPI, FetchQCAPI, FetchWasherAPI } from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import { useSelector, useDispatch } from 'react-redux';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';




const AssignJobs = () => {
    const [startDate, setStartDate] = useState()
    const [EndDate, setEndDate] = useState()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [userType, setUserType] = useState();
    const [type, settype] = useState();
    const [mechanic, setMechanic] = useState()
    const [qcs, setQCS] = useState()
    const [washer, setwasher] = useState()
    const [worker, setWorker] = useState();
    const [loading, setloading] = useState(false)
    const [mechanicObject, setmechanicObject] = useState();

    const { orderId, orderStatus, jobDetail } = useSelector(state => state.JobDetails);



    const START_DATE = moment(startDate).format('YYYY-MM-DD')
    const END_DATE = moment(EndDate).format('YYYY-MM-DD')

    const setTypes = (val) => {
        setUserType(val)
        if (val == "Mechanic") {
            return settype(1)
        } else if (val == "Washer") {
            return settype(2)
        } else if (val == "QC") {
            return settype(3)
        }
    }

    // useEffect(() => {
    // }, [type])



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


    // Getting Drop Down 


    const getDropDownData = async (data) => {


        FetchMechanicAPI(data).then((res) => {
            let trying = null
            let setingObect = (res?.data?.mechanics.map((superVisor, index) => {
                return trying = { label: superVisor.name.toString(), value: superVisor.id.toString(), key: index.toString() }
            }))
            setMechanic(setingObect)
            setloading(false)
            return res;
        }).catch(err => { return err; });

        FetchQCAPI(data).then((res) => {
            let trying = null
            let setingObect = (res?.data?.qcs.map((superVisor, index) => {
                return trying = { label: superVisor.name, value: superVisor.id.toString(), key: index.toString() }
            }))
            setQCS(setingObect)
            setloading(false)
            return res
        }).catch(err => { return err; });

        FetchWasherAPI(data).then((res) => {
            let trying = null
            let setingObect = (res?.data?.washers.map((superVisor, index) => {
                return trying = { label: superVisor.name, value: superVisor.id.toString(), key: index.toString() }
            }))
            setwasher(setingObect)
            setloading(false)
            return res?.data;
        }).catch(err => { return err; });

    }

    useEffect(() => {
        setloading(true)
        getDropDownData({})
    }, [])


    const assainJobForWorker = async (type) => {

        if (END_DATE == null || START_DATE == null || worker == null || worker == "No Data") {
            ShowErrorMessage("Please Fill Detail Correct")
            return false;
        } else if (orderStatus < 2) {
            ShowErrorMessage("Jobs can only be assigned after a quotation is accepted!")
            return false;
        }
        else {

            if (type === 1) {
                if (jobDetail.mechanic_job_id !== null) {
                    return ShowErrorMessage("Mechanic is already assigned")
                } else {
                    setmechanicObject({
                        end_time: END_DATE,
                        job_desc: `Service-${orderId} - Mechanic Work`,
                        order_id: orderId,
                        start_time: START_DATE,
                        type: type,
                        user_id: worker,
                    }
                    )
                    return assignAPI()
                }
            } else if (type === 2) {
                // if (jobDetail.washer_job_id !== null) {
                //     return ShowErrorMessage("Washer is already assigned")
                // } else {
                //     if (jobDetail.mech_done == 0) {
                //         return ShowErrorMessage("QC work is not done yet!")
                //     } else if (jobDetail.qc_done == 1) {
                // return ShowErrorMessage("Reached")
                setmechanicObject({
                    end_time: END_DATE,
                    job_desc: `Service-${orderId} - Washer Work`,
                    order_id: orderId,
                    start_time: START_DATE,
                    type: type,
                    user_id: worker,
                }
                )
                return assignAPI()
                //     }
                // }
            } else if (type === 3) {
                if (jobDetail.qc_job_id !== null) {
                    return ShowErrorMessage("QC is already assigned")
                } else {
                    if (jobDetail.mech_done == 0) {
                        return ShowErrorMessage("Mechanic work is not done yet!")
                    } else if (jobDetail.mech_done == 1) {
                        setmechanicObject({
                            end_time: END_DATE,
                            job_desc: `Service-${orderId} - QC Work`,
                            order_id: orderId,
                            start_time: START_DATE,
                            type: type,
                            user_id: worker,
                        }
                        )
                        return assignAPI()
                    }
                }
            } else {
                return ShowErrorMessage("SOMETHING WENT WRONG")
            }

            console.log(worker, "worcfvdrker");


        }
    }

    const assignAPI = () => {
        console.log("COMES");
        AssignJobsAPI(mechanicObject).then((res) => {
            console.log(res);
            if (res?.data?.success === true) {
                ShowSuccessMessage("Job Assigned")
            }
            return res;
        }).catch(err => { return err; });
    }



    return (
        <>
            <SafeAreaView style={styles.MaterialWrapper} >
                <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
                <VMOCustomHeader title={"Assign Jobs"} backIcon />
                {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                    <View style={styles.AssignJobs} >
                        <View>
                            <Text style={styles.TextColor} >Assign to {userType}</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                placeholder={{
                                    label: 'Select a role',
                                }}
                                onValueChange={(value, index) => { setTypes(value); console.log(value) }}
                                items={[
                                    { label: 'Mechanic', value: 'Mechanic' },
                                    { label: 'QC', value: 'QC' },
                                    { label: 'Washer', value: 'Washer' },
                                ]}
                                style={pickerSelectStyles} />

                            {userType == undefined ? null :
                                <>
                                    <Text style={styles.TextColor} > Selcect a {userType} </Text>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: `Select a ${userType}`,
                                        }}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={(value, index) => { setWorker(value); console.log(value) }}
                                        items={userType == "Mechanic" ? mechanic : userType == "QC" ? qcs : userType == "Washer" ? washer : [
                                            { label: 'No Data', value: 'No Data' },
                                        ]}
                                        style={pickerSelectStyles} />
                                </>
                            }

                            <Pressable onPress={() => { showStartDatePicker() }} disabled={userType == undefined ? true : false} >
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
                            <Pressable onPress={() => { showEndaDatePicker() }} disabled={userType == undefined ? true : false}>
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

                            {/* <Text style={styles.TextColor} >Estimated Time (Hrs)</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            // editable={false}
                            >
                            </TextInput>
                             */}
                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <CustomButton title={"Assign job"} style={{ width: '100%', }} onPress={() => { assainJobForWorker(type) }} />
                            {/* <CustomButton title={"Close Jobs"} Textstyle={{ color: Colors.primary_Color }} style={{ width: '48%', backgroundColor: '#FFFFFF', borderColor: Colors.primary_Color, borderWidth: 1, }} onPress={() => { assainJobForWorker(type) }} /> */}
                        </View>

                    </View>
                }
            </SafeAreaView>
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

export default AssignJobs


const styles = StyleSheet.create({
    MaterialWrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    AssignJobs: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        flex: 1,
        justifyContent: 'space-between',
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
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: Colors.primary_Color,
        fontFamily: fonts.PoppinsMedium,
    },
    TouchableDate: {
        backgroundColor: "#ffffff",
        padding: 10,
        justifyContent: "flex-start",
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
})



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

