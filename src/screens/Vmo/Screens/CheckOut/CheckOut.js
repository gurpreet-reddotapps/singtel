import { View, Text, StatusBar, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { windowHeight } from '../../utils/Dimension'
import IonIcon from 'react-native-vector-icons/Ionicons';
import HeaderCheckIn from '../../Components/HeaderCheckIn';
import { setCheckOutPageOneDataInRedux, setCheckOutPageOtherItemDataInRedux, setCheckOutUploadOrderImage, setPageCheckOutTwoDataInRedux, storeCheckOutData } from '../../../../redux/actions/CheckOut';
import { useSelector, useDispatch } from 'react-redux';
import StepWiseForm from './StepWiseForm';
import { Colors } from '../../Constant/Colors';
import { CheckInFetchDataAPI, FetchCheckoutAPI } from '../../api';
import { useFocusEffect } from '@react-navigation/native';
import Spinner from '../../Components/Spinner';



const CheckOut = () => {

    const [page, setPage] = useState(1);
    const [active, setActive] = useState(1);
    const [loacalLoading, setloacalLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);
    const { checkOutDataArray } = useSelector(state => state.CheckOutDetail);
    const { orderId } = useSelector(state => state.JobDetails);
    const [allCheckOutData, setAllCheckOutData] = useState()
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.userDetails);
    const { homeData } = useSelector(state => state.homeDetails);


    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisableEdit(true)
        }
    }, [])



    const checkOutAPI = async () => {
        setloading(true)
        let data = {
            order_id: orderId,
        }
        FetchCheckoutAPI(data).then((res) => {
            console.log(res?.data, 'AXIOS');
            console.log(res?.data?.check_out_materials, '||||||||||||| !!!!!!!!!');
            console.log(res?.data?.check_out_materials.carpets, '||||||||||||| CARPET');
            dispatch(storeCheckOutData(res?.data?.check_out_materials))
            setAllCheckOutData(res?.data?.check_out_materials)
            setloading(false)
            return res?.data;

        }).catch(err => { return err; });

    }


    useEffect(() => {
        checkOutAPI()
    }, [])

    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisableEdit(true)
        }
    }, [])

    const CheckInAPIData = () => {
        setloading(true)
        let data = {
            order_id: orderId,
        }
        CheckInFetchDataAPI(data).then((res) => {
            dispatch(storeCheckOutData(res?.data?.check_in_materials))
            setAllCheckOutData(res?.data?.check_in_materials)
            setloading(false)
            return res?.data;
        }).catch(err => { setloading(false); return err; });
    }


    useFocusEffect(
        React.useCallback(() => {
            console.log("Here It First");
            return () => {
                dispatch(setCheckOutPageOneDataInRedux([]))
                dispatch(setPageCheckOutTwoDataInRedux([]))
                dispatch(setCheckOutUploadOrderImage([]))
                dispatch(setCheckOutPageOtherItemDataInRedux([]))
            }
        }, [])
    );


    const backForCheckOut = () => {
        console.log("Back For Checkout");
        dispatch(setCheckOutPageOneDataInRedux([]))
        dispatch(setPageCheckOutTwoDataInRedux([]))
        dispatch(setCheckOutUploadOrderImage([]))
        dispatch(setCheckOutPageOtherItemDataInRedux([]))
    }



    return (
        <SafeAreaView style={styles.CheckInWrapper} >
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            {disableEdit === true ?
                <VMOCustomHeader title={"Check out markings"} backIcon />
                :
                <HeaderCheckIn title={"Check out markings"} backIcon onPressBack={backForCheckOut} />
            }
            {loading === true ?
                <Spinner style={{ height: '100%' }} />
                :
                <StepWiseForm allCheckOutData={allCheckOutData} checkOutAPI={checkOutAPI} disableEdit={disableEdit} CheckInAPIData={CheckInAPIData} />
            }
        </SafeAreaView>

    )
}

export default CheckOut

const styles = StyleSheet.create({
    CheckInWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,

    },
    StepWiseWrapper: {
        padding: 5,
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
})