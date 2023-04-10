import { View, Text, StatusBar, StyleSheet, SafeAreaView, ScrollView, Platform, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import StepWiseForm from './StepWiseForm'
import { useSelector, useDispatch } from 'react-redux';
import { CheckInFetchDataAPI } from '../../api'
import { setPageOneDataInRedux, setPageOtherItemDataInRedux, setPageTwoDataInRedux, setUploadOrderImage, storeCheckInData } from '../../../../redux/actions/CheckIn'
import HeaderCheckIn from '../../Components/HeaderCheckIn'
import { useFocusEffect } from '@react-navigation/native'






const CheckIn = () => {

    const [allCheckInData, setAllCheckInData] = useState()
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);
    const [loading, setloading] = useState(true)
    const { checkInDataArray, ShowCheckInData, pageOneArrayForCheckIn, pageTwoArrayForCheckIn, orderImageArray, pageOtherItemArrayForCheckIn, reduxLoading } = useSelector(state => state.CheckInDetail);
    const { orderId } = useSelector(state => state.JobDetails);
    const dispatch = useDispatch()
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);


    const CheckInAPI = () => {
        setloading(true)
        let data = {
            order_id: orderId,
        }
        CheckInFetchDataAPI(data).then((res) => {
            dispatch(storeCheckInData(res?.data?.check_in_materials))
            setAllCheckInData(res.check_in_materials)
            setloading(false)
        }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        CheckInAPI()
    }, [])

    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisableEdit(true)
        }
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            console.log("Here It First");
            return () => {
                dispatch(setPageOneDataInRedux([]))
                dispatch(setPageTwoDataInRedux([]))
                dispatch(setUploadOrderImage([]))
                dispatch(setPageOtherItemDataInRedux([]))
            }
        }, [])
    );





    const backForCheckIn = () => {
        dispatch(setPageOneDataInRedux([]))
        dispatch(setPageTwoDataInRedux([]))
        dispatch(setUploadOrderImage([]))
        dispatch(setPageOtherItemDataInRedux([]))
    }


    return (
        <SafeAreaView style={styles.CheckInWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />

            {disableEdit === true ?
                <VMOCustomHeader title={"Check in markings"} backIcon />
                :
                <HeaderCheckIn title={"Check in markings"} backIcon onPressBack={backForCheckIn} />
            }

            {loading === true ?
                <Spinner style={{ height: '100%' }} />
                :
                <StepWiseForm allCheckInData={allCheckInData} checkInAPI={CheckInAPI} disableEdit={disableEdit} />
            }
        </SafeAreaView>
    )
}

export default CheckIn

const styles = StyleSheet.create({
    CheckInWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
});
