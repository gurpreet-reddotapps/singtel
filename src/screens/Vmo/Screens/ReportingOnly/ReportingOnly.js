import { View, Text, StatusBar, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable } from 'react-native'
import React, { useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import Spinner from '../../Components/Spinner'
import { windowHeight } from '../../utils/Dimension'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission'
import ImagePreview from '../../Components/ImagePreview'
import RNPickerSelect from 'react-native-picker-select';
import FeIcon from 'react-native-vector-icons/Feather'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'




const ReportingOnly = () => {

    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);

    //COMPONENT FOR STEP WISE FORM START

    const StepWiseComponet = () => {
        return (
            <View>
                <Text style={styles.TextColor} >Vehicle Reg. No.</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    Icon={() => { return <FeIcon name='chevron-down' size={20} color={"#505050"} /> }}
                    style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12, }, }}
                    onValueChange={(itemVal) => { setCustomerID(itemVal) }}
                    items={[{ label: 'No Data', value: 'No Data' },]}
                />
                <Text style={styles.TextColor} >Vehicle Reg. No.</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    Icon={() => { return <FeIcon name='chevron-down' size={20} color={"#505050"} /> }}
                    style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12, }, }}
                    onValueChange={(itemVal) => { setCustomerID(itemVal) }}
                    items={[{ label: 'No Data', value: 'No Data' },]}
                />
                <Text style={styles.TextColor} >Vehicle Reg. No.</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    Icon={() => { return <FeIcon name='chevron-down' size={20} color={"#505050"} /> }}
                    style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12, }, }}
                    onValueChange={(itemVal) => { setCustomerID(itemVal) }}
                    items={[{ label: 'No Data', value: 'No Data' },]}
                />
                <Text style={styles.TextColor} >Vehicle Reg. No.</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    Icon={() => { return <FeIcon name='chevron-down' size={20} color={"#505050"} /> }}
                    style={{ ...pickerSelectStyles, iconContainer: { top: 10, right: 12, }, }}
                    onValueChange={(itemVal) => { setCustomerID(itemVal) }}
                    items={[{ label: 'No Data', value: 'No Data' },]}
                />
                <CustomButton title={"Next"} style={{ width: '100%' }} onPress={goNext} />
            </View>
        )
    }

    //COMPONENT FOR STEP WISE FORM END



    const goNext = async () => {
        if (page === 4) {
            // FinalDataSave()
            return;
        }
        setPage(page => page + 1);
        if (page === 1) {
            setActive(active + 1);
            // childRef.current.localRun()
            showSuccess(" CheckOut Interior Data was saved")
        } else if (page === 2) {
            setActive(active + 1);
            // childTwoRef.current.saveDataTwoInRedux()
            showSuccess(" CheckOut Exterior Data was saved")
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
        <SafeAreaView style={styles.CheckInWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Check in markings"} backIcon />
            <View>
                <View style={styles.StepWiseWrapper} >
                    {loacalLoading === true ? <Spinner style={{ height: windowHeight }} /> :

                        <View style={styles.StepProgressWrap} >
                            <View style={styles.ProgressLine}>
                                <View style={styles.StepLine}></View>

                                {active === 1 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepOne}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Customer details</Text>

                                    </View>
                                ) : (

                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={styles.StepCircleTouch} onPress={goToStepOne}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Customer details</Text>
                                    </View>
                                )}
                                {active === 2 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepTwo}>
                                            <View style={styles.UpperCircle}>
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Files</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={styles.StepCircleTouch} onPress={goToStepTwo}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Files</Text>
                                    </View>
                                )}
                                {active === 3 ? (
                                    <View style={styles.StepNameAndCircle} >
                                        <View style={styles.StepCircleTouchActive} onPress={goToStepThree}>
                                            <View style={styles.UpperCircle} >
                                                <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                            </View>
                                        </View>
                                        <Text style={styles.StepTextActive} >Customer remarks</Text>
                                    </View>
                                ) : (
                                    <View style={styles.StepNameAndCircle} >
                                        <Pressable style={styles.StepCircleTouch} onPress={goToStepThree}>
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </Pressable>
                                        <Text style={styles.StepText} >Customer remarks</Text>
                                    </View>
                                )}
                                {/* {active === 4 ? (
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
                                        <View style={styles.StepCircleTouch} >
                                            <IonIcon name="ios-checkmark-sharp" size={25} style={{ fontWeight: 'bold' }} color={'#fff'} />
                                        </View>
                                        <Text style={styles.StepText} >Other Items</Text>
                                    </View>
                                )} */}
                            </View>

                        </View>
                    }
                    <ScrollView style={{ flex: 1, alignSelf: "stretch", marginBottom: 20, paddingBottom: 20 }}>

                        <View style={styles.StepContentView}>
                            <View style={styles.PageContent} >
                                {page === 1 &&
                                    <StepWiseComponet />
                                }
                                {page === 2 &&
                                    <View>
                                        <Text>Nick</Text>
                                    </View>
                                }
                                {page === 3 &&
                                    <View>
                                        <Text>Nick</Text>
                                    </View>
                                }
                                {page === 4 &&
                                    <View>
                                        <Text>Nick</Text>
                                    </View>
                                }
                            </View>
                            {/* <PageButton>
                            </PageButton> */}
                        </View>
                    </ScrollView>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default ReportingOnly

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
