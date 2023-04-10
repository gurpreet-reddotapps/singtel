import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { colors } from '../../../assects/colors';
import { useSelector, useDispatch } from 'react-redux';


const CustomCheckBox = ({ HeadingName, Value, stateFunction }) => {
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
        <View style={styles.CheckAreaView} >
            <Text style={styles.TextColor} >{HeadingName}</Text>

            <Checkbox.Android
                status={checked ? 'checked' : 'unchecked'}
                color="#155B9F"
                onPress={() => {
                    SetValue(!checked);
                }}
                disabled={disableEdit}
            />
        </View>
    )
}

export default CustomCheckBox


const styles = StyleSheet.create({
    TextColor: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.black,
    },
    CheckAreaView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        // padding: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 50,
        borderRadius: 5,
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

});

