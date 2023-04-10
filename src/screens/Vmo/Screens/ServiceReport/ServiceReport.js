import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import ServicceStepWiseForm from './ServiceStepWiseForm'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { FetchServiceReportAPI } from '../../api'
import { useSelector, useDispatch } from 'react-redux';
import HeaderCheckIn from '../../Components/HeaderCheckIn'
import { setStepFourDataInRedux, setStepOneDataInRedux, setStepThreeDataInRedux, setStepTwoDataInRedux } from '../../../../redux/actions/ServiceReport'
import { useFocusEffect } from '@react-navigation/native'
import Spinner from '../../Components/Spinner'



const ServiceReport = (props) => {
    const { orderId } = useSelector(state => state.JobDetails);
    const [ServiceInfo, setServiceData] = useState()
    const [loading, setloading] = useState(false)
    const [disableEdit, setdisableEdit] = useState(false);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);


    const dispatch = useDispatch();

    const ServiceData = () => {
        setloading(true)
        FetchServiceReportAPI({ order_id: orderId }).then((res) => {
            console.log(res?.data?.service_report, "THAT IS THE DATA");
            setServiceData(res?.data?.service_report)
            return setloading(false)
        }).catch(err => { return err; });
    }


    useEffect(() => {
        ServiceData()
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
                dispatch(setStepOneDataInRedux([]))
                dispatch(setStepTwoDataInRedux([]))
                dispatch(setStepThreeDataInRedux([]))
                dispatch(setStepFourDataInRedux([]))
            }
        }, [])
    );

    const backForCheckIn = () => {
        dispatch(setStepOneDataInRedux([]))
        dispatch(setStepTwoDataInRedux([]))
        dispatch(setStepThreeDataInRedux([]))
        dispatch(setStepFourDataInRedux([]))
    }


    return (
        <>
            <SafeAreaView style={styles.ServiceReportWrapper} >
                <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
                {disableEdit === true ?
                    <VMOCustomHeader title={"Service Report"} backIcon />
                    :
                    <HeaderCheckIn title={"Service Report"} backIcon onPressBack={backForCheckIn} />
                }
                {loading == true ?
                    <Spinner style={{ height: '100%' }} />
                    :
                    <ServicceStepWiseForm ServiceInfo={ServiceInfo} ServiceData={ServiceData} disableEdit={disableEdit} />
                }
            </SafeAreaView>
        </>
    )
}

export default ServiceReport


const styles = StyleSheet.create({
    ServiceReportWrapper: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
