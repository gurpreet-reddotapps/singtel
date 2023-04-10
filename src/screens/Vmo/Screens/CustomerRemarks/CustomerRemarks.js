import { View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native'
import React, { useState ,useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import CustomButton from '../../Components/CustomButton'
import { useSelector, useDispatch } from 'react-redux';
import { GetCustomerRemark } from '../../api'

const CustomerRemark = () => {
    const [remarks, setRemarks] = useState()
    const [loading, setloading] = useState(false)
    const { orderId } = useSelector(state => state.JobDetails);


    const getCustomerRemark = async (data) => {
        setloading(true)
        GetCustomerRemark(data).then((res) => {
            console.log(res, "Customer Remark API");
            setRemarks(res?.data?.remarks)
            setloading(false)
            return res;
        }).catch(err => { return err; });
    }


    useEffect(() => {
        getCustomerRemark({
            order_id: orderId,
        })
    }, [])






    const renderItem = ({ item, index }) => (
        <>
            <View style={styles.reamrkContent}>
                <Text style={styles.reamrkText} >{index + 1}</Text>
                <Text style={styles.reamrkText} >{item.text}</Text>
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.CustomerRemarkWrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Customer Remarks"} backIcon />
            <View style={styles.CustomerRemarkContent} >
                <View style={styles.ImageText} >
                    <Text style={styles.ImageHeading} >Customer remarks</Text>
                </View>
                <View style={styles.ReamrkArea} >
                    <FlatList
                        data={remarks}
                        // data={[1, 2, 3]}
                        renderItem={renderItem}
                    // keyExtractor={item => item.text.toString()}
                    />
                    {/* <CustomButton title={"submit"} /> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CustomerRemark


const styles = StyleSheet.create({
    CustomerRemarkWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    CustomerRemarkContent: {
        flex: 1,
        paddingHorizontal: '3%',
    },
    ImageText: {
        width: '100%',
        height: '10%',
        paddingVertical: 20,
    },
    ImageHeading: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 24,
        color: "#155B9F",
    },
    ReamrkArea: {
        flex: 1,
        width: '100%',
        marginVertical: '5%',
    },
    reamrkContent: {
        padding: 20,
        color: "#000",
        fontSize: 12,
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'row',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        lineHeight: 20,
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
    reamrkText: {
        color: "#000",
        marginHorizontal: 5,
        fontSize: 15,
    },
})