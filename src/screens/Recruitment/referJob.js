import React, { useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, Modal, StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { SingapurFlagIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import { RecruitmentImages } from './assects/images';
import DocumentPicker, { types } from 'react-native-document-picker';
import { openCamera, openPicker} from 'react-native-image-crop-picker';
import { androidCameraPermission } from '../../appPermission/androidCameraPermission';
// import Signature from 'react-native-signature-panel';
import PdfThumbnail from "react-native-pdf-thumbnail";
import { getFileUrl, referJobMobile, uploadApplicantDocument } from '../../api';
import { DeleteBlueIcon, DocBlackIcon, PdfRedIcon } from '../../assects/Icons/leave';
import JobDetails from './jobDetails';
import { LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';

const ReferJob = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const array = ["#F0A500", "#EB4747", "#155F7F", "#155F7F"]
    const [TabData] = useState([{ key: "myjobs", title: "My Jobs", data: "0", color: colors.progressColor },
    { key: "openjobs", title: "Open Jobs", data: "0", color: colors.blue },

    ])
    const [name, setName] = useState("");
    const [relation, setRelation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [reasonForRec, setReasonForRec] = useState("");
    const [document, setDocument] = useState("");
    const [attachmentSelecterVisible, setAttachmentSelecterVisible] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [docFileUrl, setdocFileUrl] = useState();
    const [pdfThumb, setPdfThunb] = useState(null);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [docName, setdocName] = useState(null);
    const [pickerType, setPickerType] = useState(null);



    function BorderView() {
        return (
            <View style={{ width: width, height: 1, backgroundColor: colors.primaryColor, opacity: 0.2, marginVertical: 10 }} />
        )
    }
    const pickerOption = [
        { title: "Camera", onpress: () => onOpenCamera() },
        { title: "Photo Gallery", onpress: () => onSelecFile() },
        { title: "Documents", onpress: () => onDocumentPick() },

    ]




    const onSelecFile = async () => {


        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            const response = openPicker({
            
            }).then(response => {
                setAttachmentSelecterVisible(false)
                console.log("FileData.uri", response)
                setFileResponse(response.path);
                setPickerType("Gallery")
                getUrl(response, "Gallery")
            }).catch(() => {
                setAttachmentSelecterVisible(false)
            })
        }


        // setPickerType("Gallery")

        // setTimeout(async () => {
        //     const permissionStatus = await androidCameraPermission();
        //     if (permissionStatus || Platform.OS == 'ios') {
        //         try {
        //             const response = await DocumentPicker.pick({
        //                 presentationStyle: 'fullScreen',
        //                 type: [DocumentPicker.types.allFiles]
        //             }).then((response) => {
        //                 if (response) {
        //                     setFileResponse(response);
        //                     getUrl(response, "Gallery")

        //                 }
        //             });



        //         } catch (err) {
        //             setAttachmentSelecterVisible(false)
        //             console.warn(err);
        //         }
        //     }
        // }, 500)
    };
    const onOpenCamera = async () => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            const response = openCamera({
            
            }).then(response => {
                setAttachmentSelecterVisible(false)
                console.log("FileData.uri", response)
                setFileResponse(response.path);
                setPickerType("Camera")
                getUrl(response, "Camera")
            }).catch(() => {
                setAttachmentSelecterVisible(false)
            })
        }
    };

    const onDocumentPick = async () => {
        setPickerType("Doc")
        setTimeout(async () => {
            const permissionStatus = await androidCameraPermission();
            if (permissionStatus || Platform.OS == 'ios') {
                try {
                    const response = await DocumentPicker.pick({
                        presentationStyle: 'fullScreen',

                        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText, DocumentPicker.types.csv]
                    }).then((response) => {
                        if (response) {
                            getPdfThumd(response)
                            setFileResponse(response);
                            getUrl(response, "Doc")
                            // setAttachmentSelecterVisible(false)

                        }

                    })

                    console.log(response);
                } catch (err) {
                    console.warn(err);
                }
            }
        }, 500)
    };

    async function getPdfThumd(response) {
        try {
            const filePath = response.uri;
            const page = 0;
            const { uri, width, height } = await PdfThumbnail.generate(filePath, page);
            setPdfThunb(uri)
        } catch (error) {
            console.log("error", error)
        }
    }





    const getUrl = async (response, type) => {
        setAttachmentSelecterVisible(false)
        setLoaderVisible(true)

        let data = await createFormData(response, type)
        console.log("DDD", data)
        await uploadApplicantDocument(data).then((res) => {
            console.log("SDJOKSDJ", res?.data)
            // changeDesc(docType, res?.data?.url)
            setdocFileUrl(res?.data?.url)
            setLoaderVisible(false)
        }).catch((err) => console.log("error", err))
    }

    const createFormData = async (FileData, pickerType) => {
        const data = new FormData();
        // FileData.map(FileData => {
        //     data.append('file', {
        //         uri: Platform.OS === 'ios' ? FileData.uri.replace('file://', '') : FileData.uri,
        //         name: FileData.name,
        //         fileName: 'File',
        //         type: FileData.type,
        //     });
        //     setdocName(FileData.name)
        // })
        if (pickerType == "Camera" || pickerType == "Gallery" ) {
            let filename = FileData.path.substring(FileData.path.lastIndexOf('/') + 1, FileData.path.length)
            data.append('file', {
                uri: Platform.OS === 'ios' ? FileData.path.replace('file://', '') : FileData.path,
                name: filename,
                fileName: 'File',
                type: FileData.mime,
            });
            setdocName(filename)

            return data;
        }
        else {
            console.log("FileData", FileData)
            data.append('file', {
                uri: Platform.OS === 'ios' ? FileData.uri.replace('file://', '') : FileData.uri,
                name: FileData.name,
                fileName: 'File',
                type: FileData.type,
            });


            setdocName(FileData.name)

            return data;
        }

    };




    function AttachmentSelector() {
        return (
            <Modal visible={attachmentSelecterVisible} transparent >
                <Pressable onPress={() => setAttachmentSelecterVisible(false)} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 10, backgroundColor: "#00000099" }} >
                    <View style={{ width: width / 1.05, height: width / 2.5, overflow: "hidden", backgroundColor: colors.white, marginBottom: 7, borderRadius: 10 }} >
                        <FlatList ItemSeparatorComponent={() => <View style={{ width: width / 1.05, height: 1, backgroundColor: colors.B212529, opacity: 0.2 }} />} data={pickerOption} renderItem={({ item, index }) => {
                            return (
                                <Pressable onPress={item.onpress} style={{ width: width / 1.05, height: width / 7.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.white }} >
                                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor }} >{item.title}</Text>
                                </Pressable>
                            )
                        }} />
                    </View>

                    <Pressable onPress={() => setAttachmentSelecterVisible(false)} style={{ width: width / 1.05, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderRadius: 10 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsBold, fontSize: 14 }} >Cancel</Text>
                    </Pressable>
                </Pressable>

            </Modal>
        )
    }

    function clearAll() {
        setName("");
        setRelation("");
        setPhoneNumber("");
        setEmail("");
        setReasonForRec("");
        setdocName(null)
        setdocFileUrl("")
        setFileResponse([])

    }

    const ReferJob = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        console.log("ReferJob", route?.params?.item?.id, name, email, phoneNumber, reasonForRec, relation, docFileUrl)

        if (name && email && phoneNumber && reasonForRec && relation && docFileUrl) {
            console.log("ReferJob", route?.params?.item?.id, name, email, phoneNumber, reasonForRec, relation, docFileUrl)

            if(reg.test(email)== false){
                ShowErrorMessage("Please enter correct email address")
            }
            else if(phoneNumber.length!=8){
                ShowErrorMessage("Please enter correct phone number")
            }
            else{
            const data = {
                job_id: route?.params?.item?.id,
                name: name,
                email: email,
                phone: phoneNumber,
                refer_relation: relation,
                refer_reason: reasonForRec,
                resume: docFileUrl
            }
            referJobMobile(data).then((res) => {
                if (res.data.success) {
                    ShowSuccessMessage("Job referred successfully")
                    navigation.goBack()
                }
                else{
                    ShowErrorMessage("Something went wrong")
                }
            }).catch(()=>ShowErrorMessage("Something went wrong"))
        }
        }
        else {
            ShowErrorMessage("Please fill all details")
        }
    }
    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Refer job"} />
            <ScrollView style={{ flex: 1 }} behavior='padding' >
                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginTop: 10, marginHorizontal: 15, fontSize: 16 }} >Referred to</Text>

                <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Name</Text>
                    <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput value={name} onChangeText={(text) => setName(text)} style={{ flex: 1, paddingLeft: 15, color: colors.black }} />
                    </View>
                </View>


                <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Relation</Text>
                    <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput value={relation} onChangeText={(text) => setRelation(text)} style={{ flex: 1, paddingLeft: 15, color: colors.black }} />
                    </View>
                </View>

                <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Phone Number</Text>
                    <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row" }} >
                        <View style={{ width: width / 5, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                            <SingapurFlagIcon width={20} height={20} />
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >65</Text>
                            <Icon name='caret-down' color={"#C2CFE0"} />
                        </View>
                        <TextInput keyboardType='phone-pad' maxLength={8}  value={phoneNumber} onChangeText={(text) => setPhoneNumber(text)} style={{ flex: 1, paddingLeft: 15, color: colors.black, marginLeft: 10, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} />
                    </View>
                </View>


                <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Email</Text>
                    <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput keyboardType='email-address' value={email} onChangeText={(text) => setEmail(text)} style={{ flex: 1, paddingLeft: 15, color: colors.black }} />
                    </View>
                </View>

                <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Reason for Recommednation</Text>
                    <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <TextInput value={reasonForRec} onChangeText={(text) => setReasonForRec(text)} style={{ flex: 1, paddingLeft: 15, color: colors.black }} />
                    </View>
                </View>

                <View style={{ width: width / 1.10, alignSelf: "center", marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >Upload cv/resume </Text>
                    {!docName ? <Pressable onPress={() => setAttachmentSelecterVisible(true)} style={{ width: width / 1.10, height: width / 3.5, alignItems: "center", justifyContent: "center", borderColor: colors.primaryColor, borderWidth: 1, borderRadius: 16, borderStyle: "dashed" }} >
                        <Image style={{ width: width / 10, height: width / 10 }} source={Images.add_circle} />
                    </Pressable> : null}
                </View>









                {fileResponse.length != 0 && pickerType == "Gallery" ? <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <View style={{ width: width / 1.10, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <Image style={{ width: width, height: width / 1.85, resizeMode: "contain" }} source={{uri: fileResponse}} />
                    </View>
                    <View style={{ width: width / 1.10, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <DocBlackIcon width={width / 18} height={width / 18} />
                        <Text style={{ width: width / 1.50, color: colors.B212529, fontFamily: fonts.PoppinsRegular, marginVertical: 10, paddingHorizontal: 10 }} >{docName ? docName : "certificate"}</Text>
                        <Pressable onPress={() => { setdocName(""), setFileResponse([]), setdocFileUrl("") }} style={{ flexDirection: "row", alignItems: "center" }} >
                            <DeleteBlueIcon width={12} height={12} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, fontSize: 12, top: 1.5, marginHorizontal: 5 }} >Delete</Text>
                        </Pressable>
                    </View>
                </View> : null}

                {fileResponse.length != 0 && pickerType == "Doc" ? <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <View style={{ width: width / 1.10, flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "center", paddingHorizontal: 20, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <Image style={{ width: width, height: width / 1.85, resizeMode: "contain" }} source={{ uri: pdfThumb }} />
                    </View>
                    <View style={{ width: width / 1.10, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        {docName?.split('.').pop() == "pdf" ? <PdfRedIcon width={width / 18} height={width / 18} /> : <DocBlackIcon width={width / 18} height={width / 18} />}
                        <Text style={{ width: width / 1.50, color: colors.B212529, fontFamily: fonts.PoppinsRegular, marginVertical: 10, paddingHorizontal: 10 }} >{docName ? docName : "certificate"}</Text>
                        <Pressable onPress={() => { setdocName(""), setFileResponse([]), setdocFileUrl("") }} style={{ flexDirection: "row", alignItems: "center" }} >
                            <DeleteBlueIcon width={12} height={12} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, fontSize: 12, top: 1.5, marginHorizontal: 5 }} >Delete</Text>
                        </Pressable>
                    </View>

                </View> : null}

                {fileResponse.length != 0 && pickerType == "Camera" ? <View style={{ alignSelf: "center", marginTop: 15 }} >
                    <View style={{ width: width / 1.10, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                        <Image style={{ width: width, height: width / 1.85, resizeMode: "contain" }} source={{ uri: fileResponse }} />
                    </View>
                    <View style={{ width: width / 1.10, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <DocBlackIcon width={width / 18} height={width / 18} />
                        <Text style={{ width: width / 1.50, color: colors.B212529, fontFamily: fonts.PoppinsRegular, marginVertical: 10, paddingHorizontal: 10 }} >{docName ? docName : "certificate"}</Text>
                        <Pressable onPress={() => { setdocName(""), setFileResponse([]), setdocFileUrl("") }} style={{ flexDirection: "row", alignItems: "center" }} >
                            <DeleteBlueIcon width={12} height={12} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, fontSize: 12, top: 1.5, marginHorizontal: 5 }} >Delete</Text>
                        </Pressable>
                    </View>
                </View> : null}
                <View style={{ flex: 1 }} />



            </ScrollView>
            <View style={{ width: width, height: 50, paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 10 }} >
                <Pressable onPress={() => clearAll()} style={{ width: width / 2.25, height: width / 8, alignItems: "center", justifyContent: "center", borderColor: colors.primaryColor, borderWidth: 0.5, borderRadius: 10 }} >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.primaryColor }} >Clear all</Text>
                </Pressable>
                <Pressable onPress={() => ReferJob()} style={{ width: width / 2.25, height: width / 8, borderRadius: 10, backgroundColor: colors.primaryColor, alignItems: "center", justifyContent: "center" }} >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.white }} >Refer job</Text>
                </Pressable>
            </View>
            <AttachmentSelector />
            <LoaderComponet visible={loaderVisible} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default ReferJob;