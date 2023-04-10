import { View, Text, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { windowHeight } from '../../utils/Dimension'
import Spinner from '../../Components/Spinner'
import RNPickerSelect from 'react-native-picker-select';
import { AllInsuranceCompanyAPI, NewSurveyorAPI } from '../../api'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { newSurveyorCreated } from '../../../../redux/actions/Insurance'


const NewSurveyor = () => {
    const [loading, setloading] = useState(false)
    const [name, setname] = useState()
    const [number, setnumber] = useState()
    const [Company, setCompany] = useState()
    const [CompanyVal, setCompanyVal] = useState()
    const [CompanyName, setCompanyName] = useState()
    const [phoneval, setphoneval] = useState(false)
    const [email, setemail] = useState()
    const [emailval, setemailval] = useState(false)
    const [emailValidError, setEmailValidError] = useState('');
    const [phoneValidError, setphoneValidError] = useState('');
    const navigation = useNavigation()
    const dispatch = useDispatch()





    const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('email address must be enter');
        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
            setemailval(true)
        }
    };

    const handleValidPhone = val => {
        const reg = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

        if (val.length === 0) {
            setphoneValidError('Full Name must be enter');
        } else if (reg.test(val) === false) {
            setphoneValidError('enter valid Name');
        } else if (reg.test(val) === true) {
            setphoneValidError('');
            setphoneval(true)
        }
    };

    const setCompanyDetail = (val, index) => {
        setCompanyVal(val);
        console.log(Company, "VALUE OF COMPANY");
        Company.map(item => {
            if (item.value === val) {
                setCompanyName(item.label)
            } else {
                return -1
            }
        })
    }

    const NewInsuranceCompAdd = () => {
        if (CompanyVal == undefined || CompanyName == undefined || number == undefined || email == undefined || CompanyVal == undefined) {
            ShowErrorMessage("Plese Enter the feild all fields")
        } else if (emailval === true && phoneval === true) {

            let data = {
                insurance_company_id: CompanyVal,
                surveyor_company: CompanyName,
                surveyor_contact_no: number,
                surveyor_email: email,
                surveyor_id: 0,
                surveyor_name: name,
            }

            console.log(data, "RESPONES NEW");
            NewSurveyorAPI(data).then((res) => {
                console.log(res?.data, "RESPONES NEW");
                if (res?.data?.success == true) {
                    dispatch(newSurveyorCreated(true))
                    navigation.goBack()
                }
            }).catch(err => { return err; });
        } else {
            ShowErrorMessage("Plese Enter all the details correct")

        }

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



    return (
        <SafeAreaView style={styles.Wrapper} >
            <VMOCustomHeader title={"Surveyor"} backIcon />
            {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <View style={styles.AssignJobs} >
                    <View>




                        <Text style={styles.TextColor} >Surveyor Name</Text>
                        <TextInput
                            style={styles.TextInputStyles}
                            placeholder="Enter the number"
                            onChangeText={text => { setname(text); handleValidPhone(text) }}
                            autoCorrect={false}
                            // editable={false}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        >
                        </TextInput>
                        {phoneValidError && phoneValidError ? <Text style={styles.validationstyle} >{phoneValidError}</Text> : null}


                        <Text style={styles.TextColor} >Contact Number</Text>
                        <TextInput
                            style={styles.TextInputStyles}
                            placeholder="Enter the number"
                            autoCorrect={false}
                            onChangeText={text => {
                                setnumber(text);
                            }
                            }
                            maxLength={10}
                            // editable={false}
                            keyboardType="numeric"
                            autoCapitalize="none"
                        >
                        </TextInput>

                        <Text style={styles.TextColor} >Email</Text>
                        <TextInput
                            style={styles.TextInputStyles}
                            placeholder="Enter the number"
                            autoCorrect={false}
                            onChangeText={value => {
                                setemail(value);
                                handleValidEmail(value);
                            }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        >
                        </TextInput>
                        {emailValidError && emailValidError ? <Text style={styles.validationstyle} >{emailValidError}</Text> : null}


                        <Text style={styles.TextColor} >Company</Text>
                        {Company && Company ?
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value, index) => { setCompanyDetail(value, index); console.log(index) }}
                                items={Company}
                                style={pickerSelectStyles} />
                            :
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                style={{
                                    ...pickerSelectStyles, iconContainer: {
                                        top: 10,
                                        right: 12,
                                    },
                                }}
                                onValueChange={(itemVal) => {
                                    setCompanyVal(itemVal)
                                }}
                                items={[
                                    { label: 'No Data', value: 'No Data' },
                                ]}
                            />
                        }
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <CustomButton title={"Save"} style={{ width: '100%', }} onPress={() => NewInsuranceCompAdd()} />
                    </View>

                </View>
            }
        </SafeAreaView>
    )
}

export default NewSurveyor


const styles = StyleSheet.create({
    Wrapper: {
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
    validationstyle: {
        fontSize: 14,
        color: "red",
        fontFamily: fonts.PoppinsMedium,
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
