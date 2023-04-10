import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, StyleSheet, View, Image, Text, Pressable, TouchableOpacity, FlatList, TextInput, Modal, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, AnnualLeaveIcon, ArrowBackIcon, ArrowForwardIcon, BlueCalenderIcon, MoonIcon, NotificationBellIcon, SickLeaveIcon, StaticsIcon, SunIcon, TaskCompleteIcon, WeekOffIcon } from '../../assects/Icons';
import { height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import routes from '../../routes/routes';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { applyForLeaveAPI, getLeaveBalanceDetails, getLeaveCategoryDocuments, getLeaveDayCount, getOrganizationHoliday } from '../../api';
import { SvgUri } from 'react-native-svg';

const ApplyNewLeave = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [selectedCategory, SetselectedCategory] = useState("");
    const [visible, setVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calendarDateChanged, setCalenderDateChanged] = useState(false);
    const [reason, setReason] = useState("");
    const [desc, setDesc] = useState("");
    const [leaveType, setLeaveType] = useState("paid");
    // 0 =  full  , 1= half
    const [applicationType, setApplicationType] = useState(0);

    const [leaveName, setLeaveName] = useState("");
    const [requiredDoc, setRequiredDoc] = useState("");
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [selectHalfVisible, setSelectHalfVisible] = useState(false);
    const [selectShiftHalf, setSelectShiftHalf] = useState("First Half");


    const flatlistRef = useRef();
    const [no_of_days_leave, setNo_of_days_leave] = useState(null);
    const [leaveBalanceDetails, setLeaveBalanceDetails] = useState([]);
    const [notValidToApplyLeave, setNotValidToApplyLeave] = useState(false);


    useEffect(() => {
        navigation.addListener('focus', () => {
            if (route?.params?.flag == "unpaid") {
                setTimeout(() => {
                    setLeaveType("unpaid")
                }, 500)

            }
        })
        getLeaveBalanceDetails().then((res) => {
            setLeaveBalanceDetails(res.data.leaves_details)
            let index = res.data.available_leaves_details.findIndex((item) => item.id == route?.params?.category);
            const item = {
                id:route?.params?.category
            }
            onSelectLeaveCategory(item, index)

        })

    }, [])


    useEffect(() => {
        if (endDate) {
            const data = {
                start_date: START_DATE_API,
                end_date: END_DATE_API
            }
            getLeaveDayCount(data).then((res) => {
                setNo_of_days_leave(res?.data?.days)

            })
            setNotValidToApplyLeave(true)
            // all_days.push(i.format("YYYY-MM-DD"));
            // getOrganizationHoliday().then((res) => {
            //     console.log("SDSJOKDJSJFD",res.data.organization_holidays)
            //     let organization_holidays = res.data.organization_holidays;
            //     let shift_days = res.data.shift_days;
            //     let all_days = [];

            //     const start_date = moment(startDate).clone();
            //     const end_date = moment(endDate)

            //     for (let i = moment(start_date); i <= moment(end_date); i = moment(i).add(1, "days")) {
            //         // if (organization_holidays.map((item) => item.date).includes(moment(i).format('YYYY-MM-DD'))) {
            //         //     setNotValidToApplyLeave(false)
            //         //     continue;
            //         // }
            //         // if (!shift_days.includes(moment(i).weekday())) {
            //         //     setNotValidToApplyLeave(false)
            //         //     continue;
            //         // }
            //         setNotValidToApplyLeave(true)
            //         all_days.push(i.format("YYYY-MM-DD"));
            //     }
            //     const days = all_days.length;
            //     setNo_of_days_leave(days)
            // })
        }
    }, [endDate])

    useEffect(() => {
        setEndDate(null)
        setNotValidToApplyLeave(null)
    }, [startDate])


    const START_DATE = startDate ? moment(startDate).format('DD-MMM-YYYY') : "From"
    const END_DATE = endDate ? moment(endDate).format('DD-MMM-YYYY') : "To"

    const START_DATE_API = startDate ? moment(startDate).format('YYYY-MM-DD') : "From"
    const END_DATE_API = endDate ? moment(endDate).format('YYYY-MM-DD') : "To"


    const showStartDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showEndaDatePicker = () => {
        setDateEndPickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setDateEndPickerVisibility(false);
    };

    const handelStartPicker = (date) => {
        console.log("A date has been picked: ", moment().add(3, 'days'));
        setStartDate(date)

        hideDatePicker();
    };

    const handelEndPicker = (date) => {
        console.log("A date has been picked: ", date);
        const enddate = date;
        setEndDate(date)

        hideDatePicker();
    };


    const applyForPaidLeave = async (data) => {
        setLoaderVisible(true)
        const formData = {
            reason: data.reason,
            leave_category_id: data.selectedCategory,
            start_date: data.startDate,
            end_date: data.endDate == "To" ? data.startDate : data.endDate,
            description: data.desc,
            is_half_day: applicationType,
            shift_half: selectShiftHalf,
            files: []
        }

        console.log("applyForPaidLeave", formData);

        await applyForLeaveAPI(formData).then((res) => {
            console.log("---->", res.data)
            if (res?.data?.success === true) {
                setVisible(true)
                setLoaderVisible(false)

            } else {
                ShowErrorMessage(res.data.message)
                setLoaderVisible(false)
            }
        }).catch((err) => { setLoaderVisible(false), ShowErrorMessage(err) })
    }


    const applyForUnpaidLeave = async (data) => {
        setLoaderVisible(true)
        const formData = {
            reason: data.reason,
            leave_category_id: data.selectedCategory,
            start_date: data.startDate,
            end_date: data.endDate == "To" ? data.startDate : data.endDate,
            description: data.desc,
            is_half_day: applicationType,
            shift_half: selectShiftHalf,
            files: []
        }

        console.log("applyForUnPaidLeave", data);
        await applyForLeaveAPI(formData).then((res) => {
            console.log("---->", res.data)
            if (res?.data?.success === true) {
                setVisible(true)
                setLoaderVisible(false)
            }
        })
    }


    const ValidatingInputs = () => {
        if ((!startDate && !endDate) || reason == "") {
            ShowErrorMessage("Please select all feilds")
        }
        else {
            const data = {
                startDate: START_DATE_API,
                endDate: END_DATE_API,
                reason: reason,
                desc: desc,
                selectedCategory: selectedCategory,
                leaveName: leaveName,
                requiredDoc: requiredDoc
            }
            console.log("SDSDSDSDSD", data)
            if (requiredDoc.length == 0) {
                if (leaveType == "paid") {
                    applyForPaidLeave(data)
                }
                else {
                    applyForUnpaidLeave(data)

                }
            }
            else {
                leaveType == "paid" ? navigation.navigate(routes.uploadDocuments, { data: data }) :
                    navigation.navigate(routes.uploadDocuments, { data: data, flag: "unpaid" })
            }

        }

    }

    function UnpaidLeaveConfirmModal({ visible }) {
        return (
            <Modal visible={visible} transparent  >
                <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 25, backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.15, height: width / 1.50, justifyContent: "flex-end", paddingBottom: 10, alignItems: "center", elevation: 5, borderRadius: 10, backgroundColor: colors.white }, iosOpacity]} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center", paddingHorizontal: 15 }} >Unpaid leaves are deducted directly from employees payroll.
                            Are you sure you would like to apply for an unpaid leave</Text>
                        <ButtonComponent onPress={() => setVisible(false)} title={"Continue"} bgColor={colors.primaryColor} style={{ width: width / 1.30 }} />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
    function onSelectLeaveCategory(item, index) {
        setLoaderVisible(true)
        const data = {
            leave_category_id: item.id
        }
        console.log("FS", data)
        getLeaveCategoryDocuments(data).then((res) => {
            console.log("ASKNDJKSDNJKSNDJKSNDJK", res.data)
            setRequiredDoc(res.data.documents_required)
            setLoaderVisible(false)

            if (route?.params?.category && selectedCategory == "") {
                // flatlistRef.current.scrollToIndex({
                //     animated: true,
                //     index: index,
                //     viewPosition: 0
                // })
                SetselectedCategory(route?.params?.category), setLeaveName(route?.params?.title)
            }
            else {
                SetselectedCategory(item.id), setLeaveName(item.title)
            }

        }).catch((err) => console.log("error", err))

    }

    const SelectHalfModalView = () => {
        const data = ["First Half", "Second Half"]
        return (
            //             <Modal transparent visible={true}  >
            //                 <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end",backgroundColor:colors.transBlack}} >
            //                     <View style={[{ width: width , height: "20%", elevation: 3, alignItems: "center", alignSelf: "center",backgroundColor:colors.white, borderTopLeftRadius: 15,borderTopRightRadius: 15 }, iosOpacity]} >
            //                         <FlatList data={data} renderItem={({item,index})=>{
            //                             return(
            //                                 <View style={{width:width,height:width/8,alignItems:"center",justifyContent:"center",backgroundColor:'red'}} >
            //                                     <Text>{item}</Text>
            // </View>
            //                             )
            //                         }}  />
            //                     </View>
            //                 </View>
            //             </Modal>

            <Modal visible={selectHalfVisible} transparent >
                <Pressable style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, backgroundColor: "#00000099" }} >
                    <View style={{ width: width / 1.05, height: width / 3.5, overflow: "hidden", backgroundColor: colors.white, marginBottom: 7, borderRadius: 10 }} >
                        <FlatList ItemSeparatorComponent={() => <View style={{ width: width / 1.05, height: 1, backgroundColor: colors.B212529, opacity: 0.2 }} />} data={data} renderItem={({ item, index }) => {
                            return (
                                <Pressable onPress={() => { setSelectShiftHalf(item), setSelectHalfVisible(false) }} style={{ width: width / 1.05, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }} >
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor }} >{item}</Text>
                                </Pressable>
                            )
                        }} />
                    </View>

                    <Pressable onPress={() => { setSelectHalfVisible(false) }} style={{ width: width / 1.05, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderRadius: 10 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 14 }} >Cancel</Text>
                    </Pressable>
                </Pressable>

            </Modal>
        )
    }

    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Apply new leave"} />
            <ScrollView style={{ flex: 1 }} >
                <KeyboardAvoidingView behavior="position" style={{ flex: 1 }} >

                    <SelectHalfModalView />
                    <View style={{ alignSelf: "center", marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Select Leave Application Type</Text>
                        <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderRadius: 5, backgroundColor: colors.B212529 }} >
                            <Pressable onPress={() => setApplicationType(0)} style={[{ flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: !applicationType ? colors.primaryColor : colors.white, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }, iosOpacity]} >
                                <Text style={{ fontFamily: !applicationType ? fonts.PoppinsBold : fonts.PoppinsRegular, color: !applicationType ? colors.white : colors.black }} >Full Day</Text>

                            </Pressable>
                            <Pressable onPress={() => setApplicationType(1)} style={[{ flex: 2, alignItems: "center", justifyContent: "center", backgroundColor: applicationType ? colors.primaryColor : colors.white, borderTopRightRadius: 5, borderBottomRightRadius: 5 }, iosOpacity]} >
                                <Text style={{ fontFamily: applicationType ? fonts.PoppinsBold : fonts.PoppinsRegular, color: applicationType ? colors.white : colors.black }} >Half Day</Text>

                            </Pressable>
                        </View>
                        {/* <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput onChangeText={(text) => setReason(text)} value={reason} style={{ flex: 1, paddingLeft: 15, color: colors.black }} placeholder='Work Out' />
                    </View> */}
                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 15 }} >
                        <View>
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >{applicationType == 0 ? "Start" : "Date"}</Text>
                            <Pressable onPress={showStartDatePicker} style={{ width: width / 2.35, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                                <BlueCalenderIcon width={width / 20} height={width / 20} />
                                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.black, marginLeft: 10 }} >{START_DATE}</Text>
                            </Pressable>

                        </View>

                        <View>
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >{applicationType == 0 ? "Ends" : "Select Half"}</Text>
                            {applicationType == 0 ?
                                <Pressable disabled={!startDate} onPress={showEndaDatePicker} style={{ width: width / 2.35, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                                    <BlueCalenderIcon width={width / 20} height={width / 20} />
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.black, marginLeft: 10 }} >{END_DATE}</Text>
                                </Pressable> :
                                <Pressable onPress={() => setSelectHalfVisible(true)} style={{ width: width / 2.35, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                                    {/* <BlueCalenderIcon width={width / 20} height={width / 20} /> */}
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.black, marginLeft: 10 }} >{selectShiftHalf}</Text>
                                </Pressable>}
                        </View>
                    </View>


                    <View style={{ alignSelf: "center", marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Reason</Text>
                        <View style={{ width: width / 1.10, height: width / 5, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                            <TextInput onChangeText={(text) => setReason(text)} value={reason} style={{ flex: 1, paddingLeft: 15, color: colors.black }} placeholder='Work Out' />
                        </View>
                    </View>


                    <View style={{ width: width / 1.10, alignSelf: "center", marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Category</Text>
                        <FlatList ref={flatlistRef} showsHorizontalScrollIndicator={false} horizontal data={leaveBalanceDetails.filter((item) => selectedCategory == item.id)} renderItem={({ item, index }) => {
                            console.log("SDLPJSKLDJSKL:DJLKSJDLKSJLKDSJLK",leaveBalanceDetails)
                            var ext = item.image.split('.').pop();
                            return (
                                <Pressable onPress={() => { onSelectLeaveCategory(item, index) }} style={{ minWidth: width / 2.77, maxWidth: width / 2, height: width / 3.64, alignItems: "center", justifyContent: "center", borderRadius: 10, marginHorizontal: 5, backgroundColor: selectedCategory == item.id ? "#155B9F99" : "#155B9F0D", paddingHorizontal: 5 }} >
                                    {ext == "svg" ? <SvgUri width={width / 7.5} height={width / 7.5} uri={item.image} /> : <Image style={{ width: width / 7.5, height: width / 7.5 }} source={{ uri: item.image }} />}

                                    {/* <SvgUri width={width / 9} height={width / 9} uri={item.image} /> */}
                                    <Text numberOfLines={1} style={{ color: selectedCategory == item.id ? colors.white : colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 13 }} >{item.title}</Text>
                                    <Text style={{ color: selectedCategory == item.id ? colors.white : colors.B212529, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >(Balance: {item?.available})</Text>
                                </Pressable>
                            )
                        }} />
                    </View>

                    {/* <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Description</Text>
                    <View style={{ width: width / 1.10, height: width /5, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput returnKeyType="done" onSubmitEditing={() => Keyboard.dismiss()} onChangeText={(text) => setDesc(text)} value={desc} multiline style={{ flex: 1, paddingLeft: 15, color: colors.B212529, textAlign: "left", textAlignVertical: "top" }} placeholder='write the description here...' placeholderTextColor={colors.placeHolderTextColor} />
                    </View>
                </View> */}
                </KeyboardAvoidingView>

            </ScrollView>

            {notValidToApplyLeave ? <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsRegular, textAlign: "left", alignSelf: "center" }} >{leaveName} for {no_of_days_leave} days from {START_DATE} to {END_DATE} </Text> : null}
            <ButtonComponent disabled={applicationType == 0 ? !notValidToApplyLeave : false} onPress={() => ValidatingInputs()} title={requiredDoc.length == 0 ? "Request for approval" : "Next"} bgColor={applicationType == 0 ? notValidToApplyLeave ? colors.primaryColor : colors.gray : colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center", }} />
            <Modal visible={visible} transparent >
                <Pressable onPress={() => { setVisible(false), navigation.navigate(routes.leaveManegment) }} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 25, backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.15, height: width / 1.50, justifyContent: "flex-end", paddingBottom: 10, alignItems: "center", elevation: 5, borderRadius: 10, backgroundColor: colors.white }, iosOpacity]} >

                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center", paddingHorizontal: 15 }} >Your leave request has been received successfully. Please track status under my leave request section. Thank you.</Text>
                        <ButtonComponent onPress={() => { setVisible(false), navigation.navigate(routes.leaveManegment) }} title={"Continue"} bgColor={colors.primaryColor} style={{ width: width / 1.30 }} />
                    </View>
                </Pressable>
            </Modal>

            <LoaderComponet visible={loaderVisible} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handelStartPicker}
                onCancel={hideDatePicker}
            // minimumDate={new Date(moment().year(), moment().month(), moment().date() + 3)}
            />


            <DateTimePickerModal
                isVisible={isDateEndPickerVisible}
                onChange={() => setCalenderDateChanged(true)}
                mode="date"
                onConfirm={handelEndPicker}
                onCancel={hideDatePicker}
            // minimumDate={new Date(moment(startDate).year(), moment(startDate).month(), moment(startDate).date())}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default ApplyNewLeave;