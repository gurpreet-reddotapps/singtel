import { View, Text, StyleSheet, ImageBackground, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'react-native-paper';
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { windowWidth } from '../../utils/Dimension';



const TyreCheckBox = ({ Value, stateFunction, TyreName }) => {
    const [checked, setChecked] = useState(Value);
    const [disableEdit, setdisableEdit] = useState(false);
    const { jobDetail } = useSelector(state => state.JobDetails);
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);


    const SetValue = (val) => {
        setChecked(val)
        stateFunction(!checked)
        console.log(val, 'Changed Value');
    }

    
    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisableEdit(true)
        }
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



    return (
        <View style={styles.SingleTyreWrapper} >
            <View style={styles.tyreImage} activeOpacity={0.6} >
                <ImageBackground
                    source={Images.TruckTyreNine}
                    style={styles.tyreImage}
                    resizeMode="contain">
                    <View style={styles.TextView} >
                        <Text style={styles.tyreText} >{TyreName}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.TyreCheck} >
                <Checkbox.Android
                    status={checked ? 'checked' : 'unchecked'}
                    color="#155B9F"
                    uncheckedColor="#155B9F"
                    onPress={() => {
                        SetValue(!checked);
                    }}
                    disabled={disableEdit}
                />
            </View>
        </View>

    )
}


export default TyreCheckBox

const styles = StyleSheet.create({
    TyreCheck: {
        borderRadius: 50,
        zIndex: 7,
        position: 'absolute',
        top: '-21%',
        right: '-10%',
        borderColor: "#3333",
        borderWidth: 2,
    },
    SingleTyreWrapper: {
        height: '100%',
        width: '35%',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'center',
        paddingBottom: 15,
        // backgroundColor: 'red',
    },
    tyreImage: {
        // flex: 1,
        justifyContent: "center",
        alignSelf: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        // transform: [{ rotate: '-90deg' }],
    },
    TextView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: Colors.primary_Blue,
        borderRadius: 50,
        width: 40,
        height: 40
    },
    tyreText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: 20,
        padding: 10,
        // backgroundColor: Colors.primary_Blue,
        // overflow: 'hidden',
    },
})