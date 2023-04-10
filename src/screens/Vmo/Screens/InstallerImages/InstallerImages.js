import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { ScrollView } from 'react-native-gesture-handler'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import ImagePreview from '../../Components/ImagePreview'
import CustomButton from '../../Components/CustomButton'
import { DeleteImageAPI, FetchInstallerImagesAPI, SaveInstallerImagesAPI, UploadOrderAPI } from '../../api'
import { useSelector, useDispatch } from 'react-redux';
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component'
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from '../../Components/Spinner'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../routes/NavigationString'
import ImageAction from '../../Components/ImageAction'
import * as Animatable from 'react-native-animatable';


const InstallerImages = () => {
    const [arrayImage, setArrayImage] = useState()
    const [arrayAfterImage, setArrayAfterImage] = useState()
    const [userType, setuserType] = useState()
    const [photos, setphoto] = useState(null);
    const [photosAfter, setphotoAfter] = useState(null);
    const [imagesArray, setImagesArray] = useState();
    const [imagesArrayAfter, setImagesArrayAfter] = useState();
    const [Loading, setLoading] = useState(false);
    const [disableEdit, setdisableEdit] = useState(false);
    const [previousImage, setpreviousImage] = useState(null);
    const [AfterpreviousImage, setAfterpreviousImage] = useState(null);

    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const { orderId, jobDetail } = useSelector(state => state.JobDetails);

    const navigation = useNavigation()


    const TotalArrayOfImagesBefore = arrayImage;
    const TotalArrayOfImagesAfter = arrayAfterImage;


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
        } else if (jobDetail?.job_type == 1 && user?.user?.id !== jobDetail?.mechanic_id) {
            setdisableEdit(true)
        }
    }, [])


    const getImagesAPI = async (data) => {
        setLoading(true)

        FetchInstallerImagesAPI(data).then((res) => {
            console.log(res?.data, "Installer Images API");
            let imageUrl = res?.data?.before_installer_images;
            let afterImageUrl = res?.data?.after_installer_images;
            setArrayImage(imageUrl)
            setArrayAfterImage(afterImageUrl)
            setLoading(false)
            return res;
        }).catch(err => { setLoading(false); return err; });
    }

    const createFormData = (imagePath, body = {}) => {
        const data = new FormData();

        data.append('file', {
            uri: Platform.OS === 'ios' ? imagePath.replace('file://', '') : imagePath,
            name: 'image.png',
            fileName: 'image',
            type: 'image/png',
        });

        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };


    const onSelectImage = async () => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert('Upload Order Image', 'Choose an option', [
                { text: 'Camera', onPress: onCamera },
                { text: 'Gallery', onPress: onGallery },
                { text: 'Cancel', onPress: () => { } },
            ]);
        }
    };

    const onCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setphoto(image.path);
            getUrlOfImage(image.path);
        });
    };

    const onGallery = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log('selected Image', image);
            console.log('selected Image', image.path);
            setphoto(image.path);
            getUrlOfImage(image.path);
        });
    };

    const getUrlOfImage = async (IMAGE_DATA) => {

        let data = createFormData(IMAGE_DATA, { order_id: orderId })
        setLoading(true)
        UploadOrderAPI(data).then((res) => {
            console.log(res, "here")
            // console.log(res);
            // console.log(res?.data, "RESPONES");
            if (res?.data?.success === true) {
                let setData = { url: res?.data?.url }
                TotalArrayOfImagesBefore.push(setData)
                setImagesArray([setData]);
                ShowSuccessMessage('fetched Success');
                setLoading(false)
                return res.success;
            } else {
                setLoading(false)
                ShowErrorMessage('Not able to upload Image Try Again');
            }
        }).catch(err => { console.log(err, 'ERROR'); return err; });


    }

    // AFTER IMAGES METHOD 

    const onSelectImageAfter = async () => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert('Upload Order Image', 'Choose an option', [
                { text: 'Camera', onPress: onCameraAfter },
                { text: 'Gallery', onPress: onGalleryAfter },
                { text: 'Cancel', onPress: () => { } },
            ]);
        }
    };


    const onCameraAfter = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setphotoAfter(image.path);
            getUrlOfImageAfter(image.path);
        });
    };

    const onGalleryAfter = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log('selected Image', image);
            console.log('selected Image', image.path);
            setphotoAfter(image.path);
            getUrlOfImageAfter(image.path);
        });
    };



    const getUrlOfImageAfter = async (IMAGE_DATA) => {
        setLoading(true)

        let data = createFormData(IMAGE_DATA, { order_id: orderId })

        setLoading(true)
        UploadOrderAPI(data).then((res) => {
            if (res?.data?.success === true) {
                let setData = { url: res?.data?.url }
                TotalArrayOfImagesAfter.push(setData)
                setImagesArrayAfter([setData]);
                ShowSuccessMessage('fetched Success');
                setLoading(false)
            } else {
                ShowErrorMessage('Not able to upload Image Try Again');
            }
        }).catch(err => { return err; });

    }
    const uploadTHeAfterBeforeImages = async () => {
        let uploadData = {
            order_id: orderId,
            before_installer_images: TotalArrayOfImagesBefore,
            after_installer_images: TotalArrayOfImagesAfter,
        }
        SaveInstallerImagesAPI(uploadData).then(async (res) => {
            setLoading(true)
            if (res?.data?.success == true) {
                try {
                    await AsyncStorage.setItem(`installer_images_${orderId}`, true.toString())
                } catch (e) {
                    console.log(e);
                }
                setLoading(false)
                ShowSuccessMessage('Uploaded Success');
            }
            navigation.goBack()
            return res;

        }).catch(err => { return err; });

    }


    useEffect(() => {
        getImagesAPI({
            order_id: orderId,
        })
    }, [])




    const selectImage = (item) => {
        console.log(item);
        Alert.alert('Delete Order Image', 'Choose an option', [
            { text: 'Delete', onPress: () => deleteImage(item) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }




    const deleteImage = async (image) => {

        setLoading(true)

        console.log(TotalArrayOfImagesBefore, "Array Before Deletion");

        index = TotalArrayOfImagesBefore.findIndex(x => x.url === image);

        console.log(index);

        TotalArrayOfImagesBefore.splice(index, 1);

        setpreviousImage(TotalArrayOfImagesBefore);

        ShowSuccessMessage("Image Deleted", image)

        setLoading(false)

        let data = {
            file_name: image,
        }

        DeleteImageAPI(data).then((res) => {
            console.log(res?.data, "Data return from Image");
            return res?.data;

        }).catch(err => { return err; });
    }

    useEffect(() => {
        let BeforeInstallerMediaImage = arrayImage;
        setpreviousImage(BeforeInstallerMediaImage);
    }, []);

    useEffect(() => {
        let BeforeInstallerMediaImage = arrayImage;
        setpreviousImage(BeforeInstallerMediaImage);
    }, [previousImage]);

    // END THE DELETE FUNCTIONALITY FOR BEFORE 

    // STARTED THE DELETE FUNCTIONALITY FOR BEFORE 

    const selectImageAfter = (item) => {
        console.log(item);
        Alert.alert('Delete Order Image', 'Choose an option', [
            { text: 'Delete', onPress: () => deleteImageAfter(item) },
            { text: 'Cancel', onPress: () => { } },
        ]);
    }




    const deleteImageAfter = async (image) => {

        setLoading(true)

        console.log(TotalArrayOfImagesAfter, "Array Before Deletion");

        index = TotalArrayOfImagesAfter.findIndex(x => x.url === image);

        console.log(index);

        TotalArrayOfImagesAfter.splice(index, 1);

        setAfterpreviousImage(TotalArrayOfImagesAfter);

        ShowSuccessMessage("Image Deleted", image)

        setLoading(false)

        let data = {
            file_name: image,
        }

        DeleteImageAPI(data).then((res) => {
            console.log(res?.data, "Data return from Image");
            return res?.data;

        }).catch(err => { return err; });
    }

    useEffect(() => {
        let AfterInstallerMediaImage = arrayAfterImage;
        setAfterpreviousImage(AfterInstallerMediaImage);
    }, []);

    useEffect(() => {
        let AfterInstallerMediaImage = arrayAfterImage;
        setAfterpreviousImage(AfterInstallerMediaImage);
    }, [AfterpreviousImage]);

    // END THE DELETE FUNCTIONALITY FOR BEFORE 



    const ImageSectionFlat = ({ item }) => {
        return (
            <>
                {disableEdit === true ?
                    <ImagePreview installerImages={item.url} />
                    :
                    <ImageAction imageURL={item?.url} onImageTouch={() => selectImage(item.url)} />
                }
            </>
        )
    }

    const ImageSectionFlatAfter = ({ item }) => {
        return (
            <>
                {disableEdit === true ?
                    <ImagePreview installerImages={item.url} />
                    :
                    <ImageAction imageURL={item?.url} onImageTouch={() => selectImageAfter(item.url)} />
                }
            </>
        )
    }


    const ImageSection = () => {
        return (
            <>
                <TouchableOpacity style={styles.touchImage} >
                    <Text style={styles.BlackText} >No Images Found</Text>
                </TouchableOpacity>
            </>
        )
    }


    return (
        <SafeAreaView style={styles.InstallerImagesWrapper}>
            <StatusBar barStyle="dark-content" backgroundColor="#155B9F" translucent={false} />
            <VMOCustomHeader title={"Installer Images"} backIcon />
            {Loading == true ? <Spinner style={{ height: windowHeight }} /> :
                <FlatList
                    renderItem={() => {
                        return <View />
                    }}
                    ListHeaderComponent={
                        <>
                            <View style={styles.InstallerImageContent} >
                                <View style={styles.ImageWrapper} >
                                    <View style={styles.ImageText} >
                                        <Text style={styles.ImageHeading} >Before marking</Text>
                                        <Text style={styles.ImageSubHeading} >(Condition of body work/ wheels/tyres)</Text>
                                    </View>
                                    <Animatable.View style={styles.ImageView} animation="fadeIn">
                                        <FlatList
                                            data={arrayImage}
                                            style={{ color: "red",  padding: 10, }}
                                            horizontal
                                            showsHorizontalScrollIndicator={true}
                                            renderItem={ImageSectionFlat}
                                            // numColumns={3}
                                            ListEmptyComponent={() => <ImageSection />}
                                        />
                                        {disableEdit === true ? null :
                                            <View style={styles.addIMageView} >
                                                <TouchableOpacity style={styles.ADDtouchImage} onPress={onSelectImage} >
                                                    <Image style={styles.addImageStyle} source={Images.CameraImage} resizeMode="contain" />
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </Animatable.View>
                                </View>
                                <View style={styles.ImageWrapper} >
                                    <View style={styles.ImageText} >
                                        <Text style={styles.ImageHeading} >After marking</Text>
                                        <Text style={styles.ImageSubHeading} >(Condition of body work/ wheels/tyres)</Text>
                                    </View>
                                    <Animatable.View style={styles.ImageView} animation="fadeIn">
                                        <FlatList
                                            data={arrayAfterImage}
                                            style={{ color: "red",  padding: 10, }}
                                            // data={[1, 2, 3,]}
                                            horizontal={true}
                                            renderItem={ImageSectionFlatAfter}
                                            ListEmptyComponent={() => <ImageSection />}
                                            keyExtractor={item => item.id}
                                        />
                                        {disableEdit === true ? null :
                                            <View style={styles.addIMageView} >
                                                <TouchableOpacity style={styles.ADDtouchImage} onPress={onSelectImageAfter} >
                                                    <Image style={styles.addImageStyle} source={Images.CameraImage} resizeMode="contain" />
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        </Animatable.View>
                                </View>
                                {disableEdit === true ? null :
                                    <CustomButton title={"Submit"}
                                        onPress={uploadTHeAfterBeforeImages}
                                    />}
                            </View>
                        </>
                    }
                // ListFooterComponent={getFooter}
                />
            }
        </SafeAreaView>
    )
}

export default InstallerImages


const styles = StyleSheet.create({
    InstallerImagesWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    InstallerImageContent: {
        flex: 1,
        paddingHorizontal: '3%',
        paddingVertical: '3%',
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
        // backgroundColor: 'pink',
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
    BlackText: {
        color: "#000"
    },
})