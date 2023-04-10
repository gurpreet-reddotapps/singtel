import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Pressable, Alert, TextInput } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import fonts from '../../../../assects/fonts'
import RBSheet from "react-native-raw-bottom-sheet";
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { setJobId } from '../../../../redux/actions/Job'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import BottomSheet from '../BottomSheet'
import { windowHeight, windowWidth } from '../../utils/Dimension';
import { EditIcon, TrashIcon } from '../../assets/Icons';
import { DeleteInsuranceAPI, EditInsuranceCompanyAPI } from '../../api';
import CustomButton from '../CustomButton';



const InsuranceCard = (props) => {
    const [data, setdata] = useState(props?.data)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const refRBSheet = useRef();
    const EditSheet = useRef();
    const [ID, setID] = useState(props?.data?.id)
    const [name, setname] = useState(props?.data?.company_name)
    const [number, setnumber] = useState(props?.data?.contact_person)
    const [persoon, setpersoon] = useState(props?.data?.contact_number)
    const [email, setemail] = useState(props?.data?.email)
    const [phoneval, setphoneval] = useState(false)
    const [emailval, setemailval] = useState(false)

    const [emailValidError, setEmailValidError] = useState('');
    const [phoneValidError, setphoneValidError] = useState('');



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



    const EditInsuraceCompany = () => {
        if (name == undefined || number == undefined || persoon == undefined || email == undefined) {
            ShowErrorMessage("Plese Enter the feild all fields")
            // } else if (emailval === true && phoneval === true) {
            ShowErrorMessage("Plese Enter all the details correct")
        } else {
            let data = {
                company_name: name,
                contact_number: number,
                contact_person: persoon,
                email: email,
                insurance_company_id: ID,
            }
            console.log(data, "RESPONES NEW");
            EditInsuranceCompanyAPI(data).then((res) => {
                console.log(res?.data, "RESPONES NEW");
                if (res?.data?.success == true) {
                    props?.Insurance({})
                    props?.setdeleteVal(true)
                    EditSheet.current.close()
                }
            }).catch(err => { return err; });
        }
    }



    const handleValidPhone = val => {
        const reg = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

        if (val.length === 0) {
            setphoneValidError('Name must be enter');
        } else if (reg.test(val) === false) {
            setphoneValidError('enter valid Name');
        } else if (reg.test(val) === true) {
            setphoneValidError('');
            setphoneval(true)
        }
    };



    const formattedStartDate = moment(props?.data?.created_at).format('DD-MM-YY')

    const alertOnPress = (val) => {
        Alert.alert('Delete Item', 'Choose an option', [
            { text: 'Delete', onPress: () => deleteThis(val) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }
    const deleteThis = async (val) => {
        let data = {
            insurance_company_id: val
        }
        DeleteInsuranceAPI(data).then(async (res) => {
            console.log(res?.data?.success);
            if (res?.data?.success == true) {
                ShowSuccessMessage("Deleted Successfully")
                props.Insurance({})
                props?.setdeleteVal(true)
            }
            return res;
        }).catch(err => { return err; });

    }


    return (
        <Pressable style={styles.cardWrapper} activeOpacity={0.8} onPress={() => refRBSheet.current.open()} >
            <ImageBackground source={Images.darkGreen} style={styles.UpperCardArea} >
                <Text style={styles.CardHeading} >{props?.data?.company_name}</Text>
            </ImageBackground>
            <View style={styles.JobDetail}>
                <View style={styles.JobDate} >
                    <View style={styles.StartDate} >
                        <View style={styles.upperText} >
                            <View style={styles.makeItrow} >
                                <View style={styles.TextForRow} >
                                    <Text style={styles.cardTextGrey} >Company ID</Text>
                                    <Text style={styles.cardTextBlack} >{props?.data?.id}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.DownText} >
                        <Text style={styles.cardTextGrey} >Created on</Text>
                        <Text style={styles.cardTextBlack} >{formattedStartDate}</Text>
                    </View>
                </View>
                <View style={styles.JobOtherDetail}>
                    <View style={[styles.upperText]}>
                        <Text style={styles.cardTextGrey}>Contact person</Text>
                        <Text style={styles.cardTextBlack}>{props?.data?.contact_person}</Text>
                    </View>
                    <View style={styles.DownText}>
                        <Text style={styles.cardTextGrey}>Contact No</Text>
                        <Text style={styles.cardTextBlack}>{props?.data?.contact_number}</Text>
                    </View>
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
                height={windowHeight / 4}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    },
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }

                }}
            >
                <BottomSheet Heading={`Company ID #${props?.data?.id}`} CloseIT={() => refRBSheet.current.close()} children={
                    <>
                        <View style={styles.TrashView} >
                            <Pressable style={styles.TileView} onPress={() => {
                                // navigation.navigate(NavigationString.EDIT_INSAURANCE)
                                EditSheet.current.open()
                            }} >
                                <View style={styles.IconArea} >
                                    <EditIcon width={windowWidth / 20} height={windowHeight / 20} />
                                </View>
                                <Text style={styles.TileText} >Edit</Text>
                            </Pressable>
                            <Pressable style={styles.TileView} onPress={() => alertOnPress(props?.data?.id)} >
                                <View style={styles.IconArea} >
                                    <TrashIcon width={windowWidth / 20} height={windowHeight / 20} />
                                </View>
                                <Text style={styles.TileText} >Delete</Text>
                            </Pressable>
                        </View>
                    </>
                }
                />
            </RBSheet>


            <RBSheet
                ref={EditSheet}
                height={windowHeight / 1.4}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(32, 32, 32, 0.5)'
                    },
                    draggableIcon: {
                        backgroundColor: "#DADCE5",
                        width: 100,
                    },
                    container: {
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }

                }}
            >
                <BottomSheet Heading={`Company ID #${props?.data?.id}`} CloseIT={() => EditSheet.current.close()} children={
                    <>
                        <View style={styles.EditBottom} >
                            <Text style={styles.TextColor} >Company Name</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                onChangeText={text => setname(text)}
                                autoCorrect={false}
                                // editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            >
                                {props?.data?.company_name}
                            </TextInput>

                            <Text style={styles.TextColor} >Contact Person</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                onChangeText={text => { setpersoon(text); handleValidPhone(text) }}
                                // editable={false}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            >
                                {props?.data?.contact_person}
                            </TextInput>
                            {phoneValidError && phoneValidError ? <Text style={styles.validationstyle} >{phoneValidError}</Text> : null}

                            <Text style={styles.TextColor} >Contact Number</Text>
                            <TextInput
                                style={styles.TextInputStyles}
                                placeholder="Enter the number"
                                autoCorrect={false}
                                onChangeText={text => {
                                    setnumber(text);
                                    // handleValidPhone(text);
                                }
                                }
                                maxLength={10}
                                // editable={false}
                                keyboardType="numeric"
                                autoCapitalize="none"
                            >
                                {props?.data?.contact_number}
                            </TextInput>
                            {/* {phoneValidError && phoneValidError ? <Text style={styles.validationstyle} >{phoneValidError}</Text> : null} */}

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
                                {props?.data?.email}
                            </TextInput>
                            {emailValidError && emailValidError ? <Text style={styles.validationstyle} >{emailValidError}</Text> : null}


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <CustomButton title={"Save"} style={{ width: '100%', }} onPress={() => EditInsuraceCompany()} />
                            </View>


                        </View>
                    </>
                }
                />
            </RBSheet>
        </Pressable>
    )
}

export default InsuranceCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        // marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: '2%',
        // marginBottom: '5%',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    semiCircle: {
        backgroundColor: '#FFB326',
        position: 'absolute',
        height: '50%',
        width: '50%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderRadius: 500,
        right: '-12%',
        bottom: '26%',
        overflow: 'hidden',
        transform: [{ rotate: "90deg" }],
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        // right: '-20%',
        zIndex: 3,
    },
    validationstyle: {
        fontSize: 14,
        color: "red",
        fontFamily: fonts.PoppinsMedium,
    },
    UpperCardArea: {
        backgroundColor: '#1F8B88',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    EditBottom: {
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    StatusView: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        borderRadius: 5,

    },
    CardStatus: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
        color: Colors.Pure_White,
    },
    dashArea: {
        position: 'absolute',
        left: '40%',
        top: '10%',
    },
    makeItrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    LineForRow: {
        marginTop: '5%',
    },
    TextForRow: {
        maxWidth: '50%',
    },
    TextAndLine: {
        // flexDirection: 'row',
        paddingVertical: 5,
    },
    TextAndLine: {
        flexDirection: 'row',
    },
    JobDetail: {
        // backgroundColor: 'pink',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        zIndex: 5,
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
    JobDate: {
        justifyContent: 'space-between',
        width: '60%',
    },
    StartDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    upperText: {
        width: '95%',
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    cardTextGrey: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: fonts.PoppinsRegular,
        color: '#777',
    },
    cardTextBlack: {
        fontSize: 14,
        lineHeight: 16,
        fontFamily: fonts.PoppinsMedium,
        color: '#000',
        marginVertical: 8,
    },
    DownText: {
        marginVertical: 5,
        paddingHorizontal: 5,

    },
    JobOtherDetail: {
        justifyContent: "space-between",
        width: '40%',
    },
    TrashView: {
        width: '100%',
        height: '100%',
        padding: '2%',
        // backgroundColor: 'red',
    },
    TileView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink',
        paddingVertical: 10,
    },
    TileText: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 19,
        color: "#155B9F",
        paddingHorizontal: 10,
        width: '80%',
    },
    IconArea: {
        width: '15%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 5,
    },
})