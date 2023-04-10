import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import ImagePreview from '../../Components/ImagePreview'
import Images from '../../assets/Images'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../routes/NavigationString'
import { useSelector, useDispatch } from 'react-redux';
import { FetchCustomerImagesAPI } from '../../api'
import Spinner from '../../Components/Spinner'


const CustomerImages = () => {
    const navigation = useNavigation();
    const [customerImages, setcustomerImages] = useState()
    const [loading, setloading] = useState(false)
    const [disableEdit, setdisableEdit] = useState(false);

    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const { orderId } = useSelector(state => state.JobDetails);


    const getCustomerImagesAPI = async (data) => {
        setloading(true)
        FetchCustomerImagesAPI(data).then((res) => {
            console.log(res, "Customer Images API");
            let imageUrl = res.customer_image;
            setcustomerImages(imageUrl)
            setloading(false)
            return res;
        }).catch(err => { setloading(false); return err; });
    }

    useEffect(() => {
        getCustomerImagesAPI({
            order_id: orderId
        })
    }, [])


    useEffect(() => {
        if (user?.user?.role === 2) {
            setdisableEdit(true)
        }
    }, [])


    const ImageSectionRender = ({ item }) => {
        return (
            <>
                <ImagePreview installerImages={item.url} />
            </>
        )
    }


    const ImageSection = () => {
        return (
            <>
                <TouchableOpacity style={styles.touchImage} >
                    <Text>No Images Found</Text>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <SafeAreaView style={styles.CustomerImagesWrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Customer Images"} backIcon />
            {loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <View style={styles.CustomerImagesContent} >
                    <View style={styles.ImageWrapper} >
                        <View style={styles.ImageText} >
                            <Text style={styles.ImageHeading} >Customer images</Text>
                        </View>
                        <View style={styles.ImageView} >
                            <FlatList
                                data={customerImages}
                                horizontal={true}
                                renderItem={ImageSectionRender}
                                // numColumns={3}
                                ListEmptyComponent={() => <ImageSection />}
                                keyExtractor={item => item.id}
                            />
                            {disableEdit === true ? null :
                                <View style={styles.addIMageView} >
                                    <TouchableOpacity style={styles.ADDtouchImage} >
                                        <Image style={styles.addImageStyle} source={Images.CameraImage} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    <Pressable style={styles.ImageText} onPress={() => navigation.navigate(NavigationString.CUSTOMER_REMARK)} >
                        <Text style={[styles.ImageHeading, { textDecorationLine: 'underline', }]} >Customer remarks</Text>
                    </Pressable>
                </View>
            }
        </SafeAreaView>
    )
}

export default CustomerImages


const styles = StyleSheet.create({
    CustomerImagesWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    CustomerImagesContent: {
        flex: 1,
        paddingHorizontal: '3%',
    },
    ImageWrapper: {
        // backgroundColor: 'red',
        width: '100%',
        height: windowHeight / 1.8,
    },
    ImageText: {
        // backgroundColor: 'pink',
        width: '100%',
        height: '20%',
        paddingVertical: 20,
    },
    ImageView: {
        // backgroundColor: 'green',
        width: '100%',
        justifyContent: 'space-around',
        height: '80%',
    },
    ImageHeading: {
        fontSize: 16,
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 24,
        color: "#155B9F",
    },
    ImageSubHeading: {
        fontSize: 12,
        fontFamily: fonts.PoppinsRegular,
        lineHeight: 18,
        color: "#739DC5",
        marginVertical: 10,
    },
    touchImage: {
        // backgroundColor: 'red',
        width: windowWidth / 1.2,
        height: '100%',
        marginRight: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIMageView: {
        // backgroundColor: 'red',
        width: windowWidth / 2.2,
        height: '55%',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 5,
    },
    ADDtouchImage: {
        backgroundColor: '#E8EFF5',
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    ImageStyling: {
        // backgroundColor: 'purple',
        width: '100%',
        height: '100%',
    },
    addImageStyle: {
        backgroundColor: '#E8EFF5',
    },
})