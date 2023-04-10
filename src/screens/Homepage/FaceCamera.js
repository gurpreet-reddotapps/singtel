/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator, Alert, Image, ImageBackground, Modal, Pressable, StyleSheet,
    Text,
    Vibration,
    View
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeDetails, getProfilePictureUrl, updateProfilePicture, userCheckIn, userCheckOut } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackWhiteIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import { setHomeData } from '../../redux/actions/Home';
import FaceSDK, { Enum, FaceCaptureResponse, LivenessResponse, MatchFacesResponse, MatchFacesRequest, MatchFacesImage, MatchFacesSimilarityThresholdSplit } from '@regulaforensics/react-native-face-api'
import RNFetchBlob from "react-native-blob-util";
import routes from '../../routes/routes';
import { useIsFocused } from '@react-navigation/native';
import CheckInConfirmModal from '../CheckInCheckOut/Modals/CheckInConfirmModal';
import Crop from '../../component/CircleImageCropper/crop';
import { saveLocationName } from '../../redux/actions/userLocation';
const fs = RNFetchBlob.fs;
var image1 = new MatchFacesImage()
var image2 = new MatchFacesImage()

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const landmarkSize = 2;

function CameraScreen({ navigation, route }) {

    const [loading, setLoading] = useState(false)
    const [previewImageModal, setPreviewImageModal] = useState(false)
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState("")
    const [imageData, setImageData] = useState("")
    const [canDetectFaces, setCanDetectFaces] = useState(true)
    const [faceDetected, setfaceDetected] = useState(false)
    const [profilePicBas64, setProfilePicBase64] = useState("")
    const [faces, setFaces] = useState([])
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { userLatLng, userCurrentRegion, locationName } = useSelector(state => state.userLocation);

    const [isDetector, setisDetector] = useState(route?.params?.flag != "rec" ? true : false);
    const [cameraReload, setCameraReload] = useState(true);
    const isFocused = useIsFocused();
    const [showLoader, setShowLoader] = useState(false);
    const [confirmatinModal, setConfirmationModal] = useState(false);


    console.log("SDLKSJDLKSJDKLJSDK", isFocused)

    useEffect(() => {
        ConvertProfilePicToBase64()
    }, [])

    // useEffect(() => {
    //     if (!isDetector) {
    //         if (faceDetected) {
    //             console.log("takePicturetakePicturetakePicturetakePicturetakePicturetakePicturetakePicturetakePicturetakePicturetakePicturetakePicture\ntakePicturetakePicture")
    //             takePicture()
    //         }
    //     }
    // }, [faceDetected])

    function ConvertProfilePicToBase64() {
        let imagePath = null;
        RNFetchBlob.config({
            fileCache: true
        })
            .fetch("GET", homeData?.user?.profile_pic)
            .then(resp => {
                imagePath = resp.path();
                return resp.readFile("base64");
            })
            .then(base64Data => {
                image1.bitmap = base64Data
                image1.imageType = Enum.ImageType.PRINTED
                return fs.unlink(imagePath);
            });
    }




    const takePicture = async function () {
        if (this.camera) {
            const data = await this.camera.takePictureAsync({
                mirrorImage: true,
                forceUpOrientation: true,
                width: width / 1.5,
                height: height / 1.5,
                // pauseAfterCapture: true,
                fixOrientation: true,
                base64: true
            });
            if (route?.params?.flag == "rec") {
                setLoading(true)
                image2.bitmap = data?.base64
                image2.imageType = Enum.ImageType.LIVE
                matchFaces()
            }
            else {
                setPreviewImage(data.uri)
                setPreviewImageModal(true)
                setImageData(data)
            }
        }
    };

    function matchFaces() {
        if (image1 == null || image1.bitmap == null || image1.bitmap == "" || image2 == null || image2.bitmap == null || image2.bitmap == "") {
            setLoading(false)
            return
        }
        else {
            request = new MatchFacesRequest()
            request.images = [image1, image2]
            FaceSDK.matchFaces(JSON.stringify(request), response => {
                response = MatchFacesResponse.fromJson(JSON.parse(response))
                FaceSDK.matchFacesSimilarityThresholdSplit(JSON.stringify(response.results), 0.75, str => {
                    var split = MatchFacesSimilarityThresholdSplit.fromJson(JSON.parse(str))
                    setLoading(false)
                    console.log("Similarity", split?.matchedFaces.length > 0 ? ((split.matchedFaces[0].similarity * 100).toFixed(2) + "%") : "error")

                    if (split?.matchedFaces?.length > 0) {
                        if (((split.matchedFaces[0]?.similarity * 100).toFixed(2)) > 80) {
                            ShowSuccessMessage("Authentication Succesfully")
                            GetUserAddress()
                            return
                        }
                    }
                    else {
                        ShowErrorMessage("Authentication failed\nPlease try again")
                        setLoading(false)
                        navigation.goBack()
                        return
                    }
                }, e => { 
                    ShowErrorMessage("Authentication failed\nPlease try again")
                    setLoading(false)
                    navigation.goBack()
                })

            }, e => { 
                ShowErrorMessage("Authentication failed\nPlease try again")
                setLoading(false)
                navigation.goBack()
            })
        }
    }


    function GetUserAddress() {
        setLoading(true)
        fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + userLatLng.latitude + '&lon=' + userLatLng.longitude + '&zoom=18&addressdetails=1', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json())
            .then((json) => {
                var address = json?.display_name
                setLoading(false)
                dispatch(saveLocationName(address))
                if (homeData?.is_checked_in) {
                    CheckOut(address)
                }
                else {
                    CheckIn(address)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }


    function CheckIn(addressComponent) {
        setShowLoader(true)

        const data = JSON.stringify({
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_in_remark": route?.params?.remark,
            "location_name": addressComponent,
            "selected_location_address":route?.params?.location_address

        })
        console.log("userCheckInPayload", data)

        userCheckIn(data).then((res) => {
            console.log("userCheckIn", res.data)

            if (res.data.success) {
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                // setRemark("")
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })

                setTimeout(() => {


                    setConfirmationModal(false)
                    navigation.navigate(routes.profile)
                }, 1500)
            }
            else {

                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review, location_address: route?.params?.location_address })
                setShowLoader(false)
                // setRemark("")
            }
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage(res.data.message)
        })
    }

    function CheckOut(addressComponent) {
        setShowLoader(true)

        const data = JSON.stringify({
            "start_time": homeData?.check_in_details?.check_in_time,
            "latitude": userLatLng.latitude,
            "longitude": userLatLng.longitude,
            "check_out_remark": route?.params?.remark,
            "location_name": addressComponent,
            "selected_location_address": route?.params?.location_address,

        })
        console.log("SDKFHNJKSHFJ", data)
        userCheckOut(data).then((res) => {
            if (res.data.success) {
                console.log("userCheckOut", res.data)
                Vibration.vibrate([50, 50]);
                setShowLoader(false)
                getHomeDetails().then((res) => {
                    dispatch(setHomeData(res.data))
                    navigation.navigate(routes.checkinmodalconfirm)
                })

                // setRemark("")
                setTimeout(() => {
                    // getHomeDetails().then((res) => dispatch(setHomeData(res.data)))
                    setConfirmationModal(false)
                    navigation.navigate(routes.profile)
                }, 1500)
            }
            else {
                navigation.navigate(routes.reviewmodalscreen, { message: res.data.mobile_msg, review: res.data.is_review, location_address: route?.params?.location_address })
                // ShowErrorMessage(res.data.message)
                setShowLoader(false)
                // setRemark("")
            }
        }).catch((err) => {
            console.log("Err", err)
            setShowLoader(false)
            ShowErrorMessage("ghjghj")
        })

    }







    async function getImageUrl(image) {
        const cropped = await crop();
        setLoading(true)
        const formData = new FormData();
        formData.append('file', {
            uri: cropped.uri,
            type: "image/jpeg",
            name: cropped.uri.split('/').pop()
        });

        console.log("DBHJSBDHJBSDHJBSHJDBHJSDB", formData)
        await getProfilePictureUrl(formData).then((res) => {
            if (res.data.success) {
                const data = {
                    profile_pic_url: res.data.url
                }
                console.log("DBHJSBDHJBSDHJBSHJDBHJSDB", res.data)

                updateProfilePicture(data).then((res) => {
                    if (res.data.success) {
                        setLoading(false)
                        getHomeDetails().then((res) => {
                            dispatch(setHomeData(res.data))
                        })
                        setPreviewImageModal(false)
                        navigation.goBack()
                        ShowSuccessMessage("Profile picture updated successfully")
                    }
                    else {
                        setLoading(false)
                        ShowErrorMessage("Profile picture updation failed")
                    }
                }).catch((res) => setLoading(false))
            }
            else {
                setLoading(false)
                ShowErrorMessage("Profile picture updation failed")
            }
        })
            .catch((err) => { setLoading(false) })
    }


    const DESIRED_RATIO = '16:9';
    



    const facesDetected = ({ faces }) => {
        setFaces(faces)
        if (!isDetector) {
            if (faces[0]?.bounds.origin.x.toFixed(0) > 50 && faces[0]?.bounds.origin.x.toFixed(0) < 130) {
                setCanDetectFaces(false);
                takePicture()
            }
        }
    };

    const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
        <View
            key={faceID}
            transform={[
                { perspective: 600 },
                { rotateZ: `${rollAngle.toFixed(0)}deg` },
                { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]}
            style={[
                styles.face,
                {
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                    borderColor:   (bounds.origin.x.toFixed(0) > 70 && bounds.origin.x.toFixed(0) < 100) &&
                        (bounds.origin.y.toFixed(0) > 200 && bounds.origin.y.toFixed(0) < 270) ? colors.darkGreen : colors.warningRed
                },
            ]}
        >

        </View>
    );

    function renderLandmarksOfFace(face) {
        const renderLandmark = position =>
            position && (
                <View
                    style={[
                        styles.landmark,

                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                            backgroundColor: (faces[0]?.bounds.origin.x.toFixed(0) > 70 && faces[0]?.bounds.origin.x.toFixed(0) < 100) &&
                                (faces[0]?.bounds.origin.y.toFixed(0) > 200 && faces[0]?.bounds.origin.y.toFixed(0) < 280)
                                ? colors.darkGreen : colors.warningRed
                        },
                    ]}
                />
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }

    const renderFaces = () => (
        <View style={styles.facesContainer}>
            {faces.map(renderFace)}
        </View>
    );

    const renderLandmarks = () => (
        <View style={styles.facesContainer}>
            {faces.map(renderLandmarksOfFace)}
        </View>
    );



    let crop = async (quality) => ({ uri: '', width: 0, height: 0 });

    function PreviewImage() {
        return (
            <Modal transparent={false} visible={previewImageModal} >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around", borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: colors.white, marginTop: width / 4 }} >
                    {/* <View style={{ width: width / 2, height: width / 2, overflow: "hidden", elevation: 1, borderRadius: width / 2 }} >
                        <Image style={{ width: width / 2, height: width / 2, borderRadius: 100 }} source={{ uri: previewImage }} />
                    </View> */}

                    <Crop
                        source={{ uri: previewImage }}
                        width={width / 1.3}
                        height={width / 1.3}
                        backgroundColor={"#ffffff"}
                        opacity={0}
                        cropArea={{ width: width / 1.5, height: width / 1.5 }}
                        onCrop={cropCallback => (crop = cropCallback)}
                    />

                    <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }} >
                        <Pressable onPress={() => { setPreviewImageModal(false) }} style={{ width: width / 2.5, height: width / 8, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }}  >
                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white }} >Change</Text>
                        </Pressable>

                        <Pressable onPress={() => getImageUrl(imageData)} style={{ width: width / 2.5, height: width / 8, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: colors.primaryColor }}  >
                            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white }} >Upload</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            {/* <RenderCamera /> */}
            {!previewImageModal && isFocused ? <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    //   justifyContent: 'space-between',
                }}
                type={"front"}
                zoom={0}
                // flashMode={this.state.flash}
                autoFocus={"on"}
                focusDepth={0}
                captureAudio={false}
                trackingEnabled
                ratio="16:9"
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                faceDetectionMode="accurate"
                faceDetectionLandmarks={
                    RNCamera.Constants.FaceDetection.Landmarks
                        ? RNCamera.Constants.FaceDetection.Landmarks.all
                        : undefined
                }
                faceDetectionClassifications={
                    RNCamera.Constants.FaceDetection.Classifications
                        ? RNCamera.Constants.FaceDetection.Classifications.all
                        : undefined
                }
                onFacesDetected={canDetectFaces ? facesDetected : null}
            >
                { !!canDetectFaces && renderFaces()}
                { !!canDetectFaces && renderLandmarks()}

                <Pressable onPress={() => navigation.goBack()} style={{ width: width, height: width / 5.5, alignItems: "flex-start", justifyContent: "center", paddingLeft: 15, backgroundColor: colors.black }} >
                    <ArrowBackWhiteIcon width={width / 20} height={width / 20} />
                </Pressable>

                <ImageBackground style={{ flex: 1, alignItems: "center", justifyContent: "space-between", paddingTop: 10, paddingBottom: 30 }} source={require('./9562.png')} >
                    <Text style={{ color: colors.white, textAlign: "center" }} >Please align your face in the center of the circle. </Text>

                    {isDetector ? (faces[0]?.bounds.origin.x.toFixed(0) > 70 && faces[0]?.bounds.origin.x.toFixed(0) < 100) &&
                        (faces[0]?.bounds.origin.y.toFixed(0) > 200 && faces[0]?.bounds.origin.y.toFixed(0) < 280) ?
                        <Pressable onPress={() => takePicture()}  >
                            <Image style={{ width: width / 7, height: width / 7, alignSelf: "center" }} source={require('./camera_img.png')} />
                        </Pressable>


                        : <View style={{ flexDirection: "row" }} >
                            <ActivityIndicator color={colors.primaryColor} size="large" />
                            <Text style={{ color: colors.white, textAlign: "center", fontFamily: fonts.PoppinsMedium, fontSize: 16, marginHorizontal: 5 }} >Please wait detecting face</Text>
                        </View> : null}

                    {/* <Pressable onPress={() => takePicture()}  >
                        <Image style={{ width: width / 7, height: width / 7, alignSelf: "center" }} source={require('./camera_img.png')} />
                    </Pressable> */}
                </ImageBackground>


            </RNCamera> : null}
            {/* <CheckInConfirmModal homeData={homeData} onClose={() => onCloseConfirmationModal()} visible={confirmatinModal} /> */}

            <PreviewImage />
            <LoaderComponet visible={loading} />
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        // position: 'absolute',
        bottom: 0,
        right: 80,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});
export default CameraScreen;
