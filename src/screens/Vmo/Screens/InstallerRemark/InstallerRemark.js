import { View, Text, SafeAreaView, StyleSheet, StatusBar, Platform, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import CustomButton from '../../Components/CustomButton'
import FormButton from '../../Components/FormButton'
import { GetInstallerRemarkAPI, SaveInstallerRemarkAPI } from '../../api'
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Spinner from '../../Components/Spinner'
import { windowHeight } from '../../utils/Dimension'
import AsyncStorage from '@react-native-async-storage/async-storage';

const InstallerRemark = () => {
    const [remark, setRemark] = useState(preRemark)
    const [preRemark, setPreRemark] = useState()
    const [loading, setloading] = useState(false)
    const [disable, setdisable] = useState(false)
    const [disableEdit, setdisableEdit] = useState(false);
    const { orderId, jobDetail } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);


    const navigation = useNavigation();

    const getInstallerRemark = async (data) => {
        setloading(true)
        GetInstallerRemarkAPI(data).then((res) => {
            console.log(res?.data, 'Heres');
            setPreRemark(res?.data?.installer_remarks);
            setloading(false)
            return res;
        }).catch(err => { return err; });

    }

    const saveInstallerRemark = async (data) => {
        SaveInstallerRemarkAPI(data).then(async (res) => {
            setloading(true)
            if (res?.data?.success === true) {
                ShowSuccessMessage("Remark Saved ")
                try {
                    await AsyncStorage.setItem(`installer_remarks_${orderId}`, true.toString())
                } catch (e) {
                    console.log(e);
                }
                navigation.goBack()
                setloading(false)
            } else {
                setloading(false)
                ShowErrorMessage("No new thing to save !")
            } return res;
        }).catch(err => { return err; });
    }



    useEffect(() => {
        getInstallerRemark({
            order_id: orderId,
        })

    }, [])





    // useEffect(() => {
    //     if (user?.user?.role === 3) {
    //         if (jobDetail.job_status == 1) {
    //             return setdisableEdit(true)
    //         } else {
    //             return setdisableEdit(false)
    //         }
    //     } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
    //         if (jobDetail.job_status == 1) {
    //             return setdisableEdit(true)
    //         } else {
    //             return setdisableEdit(false)
    //         }
    //     } else if (user?.user?.role === 2 && jobDetail.job_status == 1) {
    //         setdisableEdit(true)
    //     } else if (user?.user?.role == 1 && user?.user?.id == jobDetail?.mechanic_id) {
    //         if (jobDetail.job_status == 1) {
    //             console.log("UNDER PRIMARY ");
    //             return setdisableEdit(true)
    //         } else {
    //             console.log("UNDER Secondry");
    //             return setdisableEdit(false)
    //         }
    //     }else if(user?.user?.role == 1 && user?.user?.id !== jobDetail?.mechanic_id){
    //         setdisableEdit(true)
    //     }
    // }, [])


    useEffect(() => {
        if (jobDetail?.job_type === 3) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if ((user?.user?.role === 0 || user?.user?.role === 4) && jobDetail.job_status == 1) {
            if (jobDetail.job_status == 1) {
                return setdisableEdit(true)
            } else {
                return setdisableEdit(false)
            }
        } else if (jobDetail?.job_type === 2 && jobDetail.job_status == 1) {
            setdisableEdit(true)
        } else if (user?.user?.id == jobDetail?.mechanic_id) {
            if (jobDetail.job_status == 1) {
                console.log("UNDER PRIMARY ");
                return setdisableEdit(true)
            } else {
                console.log("UNDER Secondry");
                return setdisableEdit(false)
            }
        }else if(jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id){
            setdisableEdit(true)
        }
    }, [])
    
    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisable(true)
        }
    }, [])




    return (
        <SafeAreaView style={styles.InstallerRemarkWrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Installer remarks"} backIcon />
            {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <View style={styles.InstallerRemarkContent} >
                    {
                        Platform.OS === 'ios' ?
                            <TextInput
                                editable={!disable}
                                multiline={true}
                                numberOfLines={10}
                                placeholderTextColor="#979797"
                                placeholder="Write in brief about accessories,warning lights on etc."
                                onChangeText={(remark) => setRemark(remark)}
                                backgroundColor="#fff"
                                style={styles.RemarkInput}
                            >
                                {preRemark}
                            </TextInput>
                            :
                            <TextInput
                                //    {...preRemark}
                                editable={!disable}
                                multiline={true}
                                style={{
                                    textAlignVertical: 'top', padding: 10, color: '#000', borderWidth: 1, borderStyle: 'solid', borderColor: '#ddd', borderRadius: 5, fontSize: 18, marginVertical: 10,
                                }}
                                // style={styles.RemarkInput}
                                numberOfLines={10}
                                onChangeText={(remark) => setRemark(remark)}
                                placeholderTextColor="#979797"
                                placeholder="Write in brief about accessories,warning lights on etc."
                                backgroundColor="#fff" >
                                {preRemark}
                            </TextInput>
                    }
                    {disableEdit === false ?
                        <CustomButton title={"Submit"} style={{ width: '100%' }} onPress={() => {
                            saveInstallerRemark({
                                order_id: orderId,
                                installer_remarks: remark,
                            })
                        }} />

                        : null
                    }
                </View>
            }
        </SafeAreaView>
    )
}

export default InstallerRemark


const styles = StyleSheet.create({
    InstallerRemarkWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    InstallerRemarkContent: {
        flex: 1,
        paddingHorizontal: '3%',
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    RemarkInput: {
        backgroundColor: "#fff",
        padding: 5,
        width: "100%",
        height: 300,
        fontSize: 18,
        color: "#000",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginVertical: 10,
    },
})