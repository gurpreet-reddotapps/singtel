import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, TextInput, Modal, Alert, Image, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { androidCameraPermission } from '../../appPermission/androidCameraPermission';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, AnnualLeaveIcon, ArrowBackIcon, ArrowForwardIcon, BlueCalenderIcon, MoonIcon, MyRequestIcon, NotificationBellIcon, SickLeaveIcon, StaticsIcon, SunIcon, TaskCompleteIcon, UploadBtnIcon, WeekOffIcon } from '../../assects/Icons';
import { height, hitSlop, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage, ShowSuccessMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import DocumentPicker, { types } from 'react-native-document-picker';
import { openCamera, openPicker } from 'react-native-image-crop-picker';

import { applyForLeaveAPI, getFileUrl } from '../../api';
import routes from '../../routes/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '../../assects/Images';
import PdfThumbnail from "react-native-pdf-thumbnail";
import { DeleteBlueIcon, DocBlackIcon, PdfRedIcon } from '../../assects/Icons/leave';
import { showMessage } from 'react-native-flash-message';
const UploadDocuments = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [selectedCategory, SetselectedCategory] = useState(0);
    const [docName, setdocName] = useState(null);
    const [fileResponse, setFileResponse] = useState([]);
    const [docFileUrl, setdocFileUrl] = useState();

    const [visible, setVisible] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(false);
    const [attachmentSelecterVisible, setAttachmentSelecterVisible] = useState(false);
    const [leaveType, setLeaveType] = useState("paid");
    const [pickerType, setPickerType] = useState(null);
    const [pdfThumb, setPdfThunb] = useState(null);
    const [requiredDoc, setRequiredDoc] = useState(route.params.data.requiredDoc);
    const [docType, setDocType] = useState("");

    console.log("route?.params?.flag", route?.params?.flag)

    useEffect(() => {
        navigation.addListener('focus', () => {
            setFileResponse([])
            if (route?.params?.flag == "unpaid") {
                setLeaveType("unpaid")
            }
        })
    }, [])





    const [ArrayData, setArray] = useState([
        { title: "Sick Leave", icon: SickLeaveIcon, desc: "(2 remaining)", bgColor: '#155B9F99' },
        { title: "Annual Leave", icon: AnnualLeaveIcon, desc: "(2 remaining)", bgColor: '#155B9F0D' },

    ]);



    const onSelecFile = async () => {

        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            const response = openPicker({
                width: width,
                height: height,
            }).then(response => {
        setPickerType("Gallery")
                setAttachmentSelecterVisible(false)
                console.log("FileData.uri", response)
                setFileResponse(response.path);
                getUrl(response, "Gallery") 
            });
        }

    //     setAttachmentSelecterVisible(false)
    //     setPickerType("Gallery")
    //     setTimeout(async ()=>{
    //     const permissionStatus = await androidCameraPermission();
    //     if (permissionStatus || Platform.OS == 'ios') {
    //         try {
    //             const response = await DocumentPicker.pick({
    //                 presentationStyle: 'fullScreen',
    //                 type: [DocumentPicker.types.images]
    //             }).then((response) => {
    //                 if(response){
    //                     setFileResponse(response);
    //                 getUrl(response, "Gallery")
                  
    //                 }
    //             });



    //         } catch (err) {
    //             setAttachmentSelecterVisible(false)
    //             console.warn(err);
    //         }
    //     }
    // },500)
    };
    const onOpenCamera = async () => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            const response = openCamera({
                width: width,
                height: height,
            }).then(response => {
        setPickerType("Camera")
                setAttachmentSelecterVisible(false)
                console.log("FileData.uri", response)
                // setFileResponse(response.path);
                getUrl(response, "Camera")
            });
        }
    };

    const onDocumentPick = async () => {
        setAttachmentSelecterVisible(false)
        setPickerType("Doc")
setTimeout(async ()=>{
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            try {
                const response = await DocumentPicker.pick({
                    presentationStyle: 'fullScreen',

                    type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText, DocumentPicker.types.csv]
                }).then((response)=>{
                    if(response){
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
    },500)
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
        await getFileUrl(data).then((res) => {
            console.log("SDJOKSDJ",res.data)
            changeDesc(docType, res?.data?.url)
            setdocFileUrl(res?.data?.url)
            setLoaderVisible(false)
        }).catch((err)=>console.log("error",err))
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
        if (pickerType == "Camera" || pickerType == "Gallery") {
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
            console.log("FileData",FileData)
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


    const applyForPaidLeave = async () => {
        setLoaderVisible(true)
        const data = route.params.data;
        const formData = {
            reason: data.reason,
            leave_category_id: data.selectedCategory,
            start_date: data.startDate,
            end_date: data.endDate,
            description: data.desc,
            files:requiredDoc.filter((a)=> a?.url!="")
        }
        console.log("applyForPaidLeave", data);
        await applyForLeaveAPI(formData).then((res) => {
            console.log("---->", res.data)
            if (res?.data?.success === true) {
                setVisible(true)
                setLoaderVisible(false)
                // ShowSuccessMessage(res?.data?.message)

                // ShowSuccessMessage("Leave application applied")
                // setLoaderVisible(false)
                // navigation.navigate(routes.leaveManegment)
            }
            else{
                setLoaderVisible(false)
                ShowErrorMessage(res?.data?.message)
            }
        }).catch((err) => { setLoaderVisible(false), ShowErrorMessage("something wenr wrong") })


    }

console.log("SDL:KJSLKDJHSKD",requiredDoc.filter((a)=> a?.url!=""))
    const applyForUnpaidLeave = async () => {
        setLoaderVisible(true)
        const data = route.params.data;
        const formData = {
            reason: data.reason,
            leave_category_id: data.selectedCategory,
            start_date: data.startDate,
            end_date: data.endDate,
            description: data.desc,
            files:requiredDoc.filter((a)=> a?.url!="")  
        }
        console.log("applyForUnpaidLeave", data);


        await applyForLeaveAPI(formData).then((res) => {
            console.log("---->", res.data)
            if (res?.data?.success === true) {
                setVisible(true)
                setLoaderVisible(false)
            }
            else{
                setLoaderVisible(false)
                ShowErrorMessage(res?.data?.message)
            }
        }).catch((e)=>{setLoaderVisible(false),ShowErrorMessage("something wenr wrong")})
    }




    const pickerOption = [
        { title: "Camera", onpress: () => onOpenCamera() },
        { title: "Photo Gallery", onpress: () => onSelecFile() },
        { title: "Documents", onpress: () => onDocumentPick() },

    ]

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
    function changeDesc(value, desc) {
        setLoaderVisible(true)
        for (var i in requiredDoc) {
            if (requiredDoc[i].document_name == value) {
                requiredDoc[i].url = desc;
                setTimeout(() => {
                    setLoaderVisible(false)

                    setRequiredDoc(requiredDoc)
                }, 500)


                break; //Stop this loop, we found it!
            }
        }
    }
    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Upload documents"} />
            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, marginVertical: 10, marginHorizontal: 10 }} >Documents Required </Text>

            <FlatList style={{ alignSelf: "center" }} data={requiredDoc} renderItem={({ item, index }) => {
                return (
                    <View style={{ width: width / 1.10, height: width / 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginVertical: 10, backgroundColor: colors.DBDBDB, borderRadius: 5 }} >
                        <Text style={{ color: colors.black }} >{item.document_name}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <Pressable onPress={() => { setDocType(item.document_name), setAttachmentSelecterVisible(true) }} style={{ flexDirection: "row", paddingHorizontal: 10, height: 20, backgroundColor: colors.darkWhite, borderRadius: 5 }} >
                                <Text style={{ color: item.url != "" ? colors.green : colors.primaryColor }} >{item.url != "" ? "Uploaded" : "Upload"}</Text>
                            </Pressable>
                            {item.url != "" ?
                                <Pressable hitSlop={hitSlop} onPress={() => { changeDesc(item.document_name, ""), setRequiredDoc(requiredDoc) }} style={{ marginLeft: 10 }} >
                                    <DeleteBlueIcon width={width / 20} height={width / 20} />
                                </Pressable>
                                : null}
                        </View>
                    </View>
                )
            }} />



            {/* {fileResponse.length != 0 && pickerType == "Gallery" ? <View style={{ alignSelf: "center", marginTop: 15 }} >
                <View style={{ width: width / 1.10, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 20, borderColor: colors.transPrimayColor, borderWidth: 1, borderRadius: 10 }} >
                    <Image style={{ width: width, height: width / 1.85, resizeMode: "contain" }} source={fileResponse} />
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
            <View style={{ flex: 1 }} /> */}


            <Modal visible={visible} transparent >
                <Pressable onPress={() => { setVisible(false), navigation.navigate(routes.leaveManegment) }} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 25, backgroundColor: colors.transBlack }} >
                    <View style={[{ width: width / 1.15, height: width / 1.50, justifyContent: "flex-end", paddingBottom: 10, alignItems: "center", elevation: 5, borderRadius: 10, backgroundColor: colors.white }, iosOpacity]} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 16, textAlign: "center", paddingHorizontal: 15 }} >Your leave request has been received successfully. Please track status under my leave request section. Thank you.</Text>
                        <ButtonComponent onPress={() => { setVisible(false), navigation.navigate(routes.leaveManegment) }} title={"Continue"} bgColor={colors.primaryColor} style={{ width: width / 1.30 }} />
                    </View>
                </Pressable>
            </Modal>


            <ButtonComponent
                onPress={leaveType == "paid" ? () => applyForPaidLeave() : () => applyForUnpaidLeave() }
                title={"Request for approval"}
                bgColor={colors.primaryColor}
                style={{ width: width / 1.10, height: width / 7, alignSelf: "center", marginVertical: 10 }} />

            <LoaderComponet visible={loaderVisible} />
            <AttachmentSelector />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default UploadDocuments;