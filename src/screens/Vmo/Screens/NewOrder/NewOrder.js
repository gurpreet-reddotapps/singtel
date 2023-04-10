import { View, Text, SafeAreaView, TextInput, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState, } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Spinner from '../../Components/Spinner'
import { Colors } from '../../Constant/Colors'
import FormInput from '../../Components/FormInput';
import FormButton from '../../Components/FormButton'

import FeIcon from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign'
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { CheckOrderExistAPI, FetchAllCustomersAPI, FetchCustomerVehicleAPI, NewOrderAPI } from '../../api'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'



const NewOrder = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateEndPickerVisible, setDateEndPickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [ShowReamrkInput, setShowReamrkInput] = useState(false);
    const [reamrkIndex, setreamrkIndex] = useState(1);
    const [allCustomerDetail, setAllCustomerDetail] = useState(false);
    const [vehicleList, setvehicleList] = useState(false);
    const [arrayForPicker, setarrayForPicker] = useState();
    const [arrayForVehiclePicker, setarrayForVehiclePicker] = useState();
    const [CustomerID, setCustomerID] = useState();
    const [VehicleID, setVehicleID] = useState();
    const [CustomerName, setCustomerName] = useState();
    const [CustomerContact, setCustomerContact] = useState();
    const [vehicleMake, setvehicleMake] = useState();
    const [vehicleModel, setvehicleModel] = useState();
    const [LengthOfRemark, setLengthOfRemark] = useState([0])
    const [reamrkText, setreamrkText] = useState([0])
    const [loading, setloading] = useState(false)
    const [transparentLoading, settransparentLoading] = useState(false)
    const [reamrkTextArray, setreamrkTextArray] = useState([])
    const navigation = useNavigation();

    //DATE PICKER 
    const START_DATE = moment(startDate).format('YYYY-MM-DD')
    const END_DATE = moment(endDate).format('YYYY-MM-DD')

    useEffect(() => {
        FetchAllCustomersAPI({}).then((res) => {
            setAllCustomerDetail(res?.data?.all_customers)
        }).catch(err => { return err; });
    }, [])

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

    const createOrder = () => {
        console.log(CustomerID, "HERE")
        if (CustomerID == undefined) {
            ShowErrorMessage("Please Select The Customer")
            alert("Please Select The Customer")
            return false;
        }

        if (VehicleID == undefined) {
            ShowErrorMessage("Please Select Any Vehicle")
            return false;
        }


        let arrayForRemark = []
        reamrkTextArray.map(item => {
            let newTextObj = { text: item.text }
            arrayForRemark = [...arrayForRemark, newTextObj]
        })
        const stringRemarks = JSON.stringify(reamrkTextArray);

        let data = {
            type: 0,
            vehicle_id: VehicleID,
            customer_id: CustomerID,
            booking_date: START_DATE,
            check_in_date: END_DATE,
            status: 0,
            remarks: stringRemarks,
            service_booking_id: -1
            // service_booking_id: serviceBoookID ?? -1
        }
        setloading(true)
        NewOrderAPI(data).then((res) => {
            console.log(res?.data, "<------");
            if (res.status === 200) {
                ShowSuccessMessage("NEW ORDER CREATED")
                setloading(false)
                navigation.goBack()
            }
            console.log(res.status, "<------");
        }).catch(err => { setloading(false);
            //  ShowErrorMessage("Something Went Wrong");
             console.log("Something went wrong New Order");
              return err; });

    }


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

    const checkTheData = async () => {

        console.log(CustomerName, "NAME OF THE CUSTOMER");
    }

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



    return (
        <SafeAreaView style={styles.NewOrderStyle} >
            <VMOCustomHeader title={"New order"} backIcon />
            {loading === true ? <Spinner style={{ height: '100%' }} /> :
                <>
                    {transparentLoading === null ? <Spinner style={{ height: windowHeight * 1.5, width: windowWidth, zIndex: 5, backgroundColor: 'rgba(52, 52, 52, 0.8)', position: 'absolute' }} /> : null}
                    <ScrollView style={styles.scrollPadding} >
                        <View style={styles.downShow} >
                            <Text style={styles.BLueHeading} >Customer Details</Text>
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
                                <FeIcon name='calendar' size={25} color="#000" />
                                <Text style={styles.textCal} >
                                    {START_DATE}
                                    {/* {vehicleMFG} */}
                                    {/* {START_DATE ? START_DATE : vehicleMFG ? moment(vehicleMFG).format('YYYY-MM-DD') : null} */}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.TextColor} >Check in Date</Text>
                            <TouchableOpacity style={styles.TouchableDate} activeOpacity={0.5}
                                onPress={showEndaDatePicker}
                            >
                                <FeIcon name='calendar' size={25} color="#000" />
                                <Text style={styles.textCal} >
                                    {END_DATE}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.TextColor} >Link Booking (If Any)</Text>
                            <RNPickerSelect
                                style={{
                                    ...pickerSelectStyles, iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    // { label: 'Football', value: 'football' },
                                ]}
                            />
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
                            {/* <FormButton buttonTitle="CREATE"
                                onPress={() => createOrder()}
                            /> */}
                            <CustomButton title={"Create Order"} onPress={() => createOrder()} style={{ width: '100%' }} />

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
                    </ScrollView>
                </>

            }

        </SafeAreaView>
    )
}

export default NewOrder



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

    }
})

