import { View, Text, ScrollView, StyleSheet, TextInput, Platform, TouchableOpacity, Pressable, Alert, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import DocumentPicker, { types } from 'react-native-document-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'
import { UploadCloud } from '../../assets/Icons';
import { useSelector, useDispatch } from 'react-redux';
import FormInput from '../../Components/FormInput';
import { colors } from '../../../../assects/colors';
import CustomButton from '../../Components/CustomButton';
import { androidCameraPermission } from '../../../../appPermission/androidCameraPermission';
import { AcceptQuotationAPI, ApproveMaterialAPI, FetchEstimateMaterailAPI, JobDetailAPI, UploadDocumnetAPI } from '../../api';
import Spinner from '../../Components/Spinner';
import { windowHeight } from '../../utils/Dimension';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import { saveJobDetail, setOrderStatus, setQuoteCreation } from '../../../../redux/actions/Job';



const ApproveQuotation = (props) => {
    const [remark, setRemark] = useState();
    const [startDate, setStartDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    const [Filename, setFilename] = useState();
    const [docName, setdocName] = useState();
    const [docFileUrl, setdocFileUrl] = useState();
    const [loading, setloading] = useState(false);
    const [Smallloading, setSmallloading] = useState(false);
    const [estimateMaterial, setEstimateMaterial] = useState([]);
    const { orderId } = useSelector(state => state.JobDetails);
    const dispatch = useDispatch();



    const showStartDatePicker = () => {
        setDatePickerVisibility(true);
        setStartDate(null)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handelStartPicker = (date) => {
        console.log("A date has been picked: ", date);
        ShowSuccessMessage(`A date has been picked:${date} `)
        hideDatePicker();
        setStartDate(moment(date).format('YYYY-MM-DD'))
    };


    // File Selection Logic Start


    const createFormData = async (FileData) => {
        const data = new FormData();
        let FileDataArray = [FileData];
        FileData.map(FileData => {
            data.append('file', {
                uri: Platform.OS === 'ios' ? FileData.uri.replace('file://', '') : FileData.uri,
                name: FileData.name,
                fileName: 'File',
                type: FileData.type,
            });
            setdocName(FileData.name)
        })
        return data;
    };

    const onSelecFile = async () => {
        const permissionStatus = await androidCameraPermission();
        if (permissionStatus || Platform.OS == 'ios') {
            Alert.alert('Upload Sign Copy', 'Choose an option', [
                { text: 'Files', onPress: handleDocumentSelection },
                { text: 'Cancel', onPress: () => { } },
            ]);
        }
    };

    useEffect(() => {

        fileResponse.map(item => {
            console.log(item, "ALL THE DATA !!");
            console.log(item.name, "ALL THE DATA !!");
            setFilename(item.name)
        })
    }, [fileResponse])



    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf ],
            });
            let arrayReponse = [response]
            setFileResponse(arrayReponse);
            getUrl(arrayReponse)
            fileResponse.map(item => {
                console.log(item, "ALL THE DATA !!");
                console.log(item.name, "ALL THE DATA !!");
                setFilename(item.name)
            })

        } catch (err) {
            console.warn(err);
        }
    }, []);


    const getUrl = async (response) => {
        setSmallloading(true)

        let data = await createFormData(response)
        // console.log(data, "DATA");
        await
            UploadDocumnetAPI(data).then((res) => {
                console.log(res.data.url, "AGAIN HERE");
                console.log(res.data, "AGAIN HERE");
                if (res?.data?.success === true) {
                    setdocFileUrl(res?.data?.url)
                    setSmallloading(false)

                }
            }).catch(err => { return err; });

    }

    useEffect(() => {

    }, [docFileUrl])


    // Hitting The API 

    const ApproveIT = async () => {

        if (startDate == undefined || docFileUrl == undefined || remark == undefined) {
            ToastAndroid.show(`ENTER ALL THE DETAILS CORRECT`, ToastAndroid.SHORT);
        } else if (startDate !== undefined || docFileUrl !== undefined || remark !== undefined) {
            setloading(true)
            let data = {
                approval_remark: remark,
                customer_quote_id: props.QuotationID,
                doc: docFileUrl,
                order_id: orderId,
                service_start_date: startDate,
            }
            console.log(data, "DATA");
            AcceptQuotationAPI(data).then((res) => {
                console.log(res, "RES");
                console.log(res?.data, "RES DATA");
                if (res?.data?.success == true) {
                    props.refreshListData()
                    setloading(false)
                    ApproveMateraial()
                    props.closeIt()
                    dispatch(setQuoteCreation(true))
                } else {
                    ToastAndroid.show(res?.data?.message, ToastAndroid.LONG);
                    setloading(false)
                }
                return res;
            }).catch(err => { setloading(false); return err; });
        }

    }

    const MaterialSet = () => {
        let data = {
            order_id: orderId,
          }
          FetchEstimateMaterailAPI(data).then(async (res) => {
            console.log(res?.data?.materials, "HERE IS ESTIMATE MATERAIL !!!!!!!!!!!!");
            const newdata = [];
            await res?.data && res?.data?.materials && res?.data?.materials.map(item => {
              const obj = {
                material_type: item.material_type,
                product_id: item.product_id,
                product_name: item.product_name,
                price: item.price,
                selling_price: item.selling_price,
                quantity: item.quantity,
                amount: item.amount,
                status: 1,
                created_by: item.created_by,
                time: item.time,
              }
      
              newdata.push(obj)
      
            })
            setEstimateMaterial(newdata)
            console.log('newdata', newdata);        
          }).catch(err => { return err; });
      
    }

    useEffect(() => {
        MaterialSet()
    }, [])
    


    const ApproveMateraial = () => {
          let stringMaterial = JSON.stringify(estimateMaterial)
        let data = {
            materials : stringMaterial,
            order_id: orderId,
        }
        ApproveMaterialAPI(data).then((res) => {
            console.log(res?.data, "APPROVED !!!!!!!!!!!!!!!!!! ?");
        }).catch(err => { return err; });

    }

    return (
        loading === true ?
            <Spinner style={{ height: windowHeight / 2 }} />
            :
            <View  style={styles.BottomScrollScrollViewWrapper} >

                <Pressable style={{ backgroundColor: '#FFFFFF' }} onPress={showStartDatePicker} >
                    <FormInput
                        newHeading={"Service Start Date"}
                        editable={false}
                        iconType="calendar"
                        changedText={text => setStartDate(text)}
                        // InputSubject="Service Start Date"
                        autoCapitalize="none"
                        autoCorrect={false}
                        headingTextColor={colors.black}
                        fontsize={16}
                    >{startDate}
                    </FormInput>
                </Pressable>

                <Text style={styles.TextColor} >Attached Sign Copy</Text>
                <View style={styles.UploadDocumnet} >
                    <Pressable style={styles.UploadArea} onPress={() => { onSelecFile() }} >
                        <UploadCloud width={20} height={20} />
                        <Text style={{ color: '#000' }} >Upload File</Text>
                    </Pressable>
                    {Filename &&

                        <>
                            {Smallloading === true ?
                                <Spinner color={colors.green} /> :
                                <>
                                    <View style={styles.fileNameText} >
                                        <Text style={styles.DocName} >{Filename} </Text>
                                    </View>
                                    <MaterialIcon
                                        name="cloud-done"
                                        size={20}
                                        color={colors.green}
                                    />
                                </>
                            }
                        </>

                    }
                </View>

                <Text style={styles.TextColor} >Remarks</Text>
                {
                    Platform.OS === 'ios' ?
                        <TextInput
                            style={styles.iOSTextInput}
                            editable={true}
                            multiline={true}
                            numberOfLines={5} s
                            placeholderTextColor="#000"
                            placeholder="Write in brief about accessories,warning lights on etc."
                            onChangeText={(remark) => setRemark(remark)}
                            backgroundColor="#fff"
                        ></TextInput>
                        :
                        <TextInput
                            editable={true}
                            multiline={true}
                            style={styles.TextInputStyles}
                            numberOfLines={15}
                            placeholderTextColor="#979797"
                            placeholder="Write in brief about accessories,warning lights on etc."
                            onChangeText={(remark) => setRemark(remark)}
                            backgroundColor="#fff">

                        </TextInput>
                }


                <CustomButton
                    onPress={ApproveIT}
                    title="Save"
                    style={{ width: '100%', marginBottom: 10, }}
                />


                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={handelStartPicker}
                    onCancel={hideDatePicker}
                />


            </View>
    )
}

export default ApproveQuotation


const styles = StyleSheet.create({
    BottomScrollViewWrapper: {
        backgroundColor: '#FFFFFF',
        width: "90%",
        alignSelf: 'center',
    },
    BottomScrollScrollViewWrapper: {
        paddingHorizontal: "5%",
    },
    ContentView: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        paddingBottom: '15%',
    },
    TextColor: {
        fontSize: 14,
        paddingVertical: 10,
        color: "#000000",
        fontFamily: fonts.PoppinsMedium,
    },
    DocName: {
        fontSize: 16,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.green,
        paddingHorizontal: 10,
    },
    UploadArea: {
        width: '40%',
        height: 40,
        borderRadius: 5,
        borderWidth: 0.3,
        borderColor: colors.lightBlack,
        flexDirection: "row",
        backgroundColor: colors.white,
        alignItems: "center",
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        justifyContent: "space-evenly",
    },
    fileNameText: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 5,
        minWidth: "20%",
        maxWidth: '50%',
        marginHorizontal: 10,
    },
    UploadDocumnet: {
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadingStyle: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    iOSTextInput: {
        backgroundColor: "#fff",
        padding: 5,
        width: "100%",
        height: 100,
        color: "#979797",
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        fontSize: 16,
        marginTop: 10,
        shadowOpacity: 0.5,
        elevation: 3,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    TextInputStyles: {
        height: 50,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10,
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
        height: 100,
        textAlignVertical: 'top',

    },

}
)

