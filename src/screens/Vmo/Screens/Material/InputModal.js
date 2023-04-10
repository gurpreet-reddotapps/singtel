import React, { useState, useEffect } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { ShowErrorMessage, ShowSuccessMessage } from '../../../../component';
import { MarkMaterailCollectedAPI, MarkMaterailReturnAPI } from '../../api';
import FormInput from '../../Components/FormInput';
import { windowHeight } from '../../utils/Dimension';
import fonts from '../../../../assects/fonts';


const InputModal = props => {
    const [modalVisible, setModalVisible] = useState(false);
    const [collectPrompt, setCollectPrompt] = useState(false);
    const [collecctQuantity, setCollecctQuantity] = useState(null);
    const [quantity, setQuantity] = useState();
    const { materialDetail } = useSelector(state => state.MateralDetail);
    const { orderId } = useSelector(state => state.JobDetails);


    const dispatch = useDispatch();

    const enableCollect = () => {
        setCollectPrompt(true);
        setModalVisible(true);
        setCollecctQuantity(null);
    };

    const enablereturn = () => {
        setCollectPrompt(false);
        setModalVisible(true);
        setQuantity(null);
    };

    const runForStatus = () => {
        console.log('RUN FOr Status');
        props.updateStatus();
    };

    const materialCollect = async productID => {
        const numQuantity = parseInt(collecctQuantity);
        console.log(productID);
        console.log(props.request_quantity, "props.request_quantity");
        console.log(props.collected_quantity, "props.collected_quantity");
        let maxVal = props.request_quantity - props.collected_quantity
        console.log(maxVal, "maxVal");
        if (numQuantity > props.request_quantity || numQuantity > maxVal) {
            ShowErrorMessage("Please enter the right quantity ")
        }
        else if (numQuantity <= 0) {
            ShowErrorMessage("Can not take less than 1 ")
        } else {

            let data = {
                order_id: orderId,
                quantity_collection_request: numQuantity,
                product_id: productID,
            }

            console.log(data, "DATA FOR PAYLOAD");
            MarkMaterailCollectedAPI(data).then((res) => {
                console.log(res?.data, 'COLECTION DONE !!!!!!!!!!!!');
                console.log(res?.data?.success, 'COLECTION DONE !!!!!!!!!!!!');
                runForStatus();
                if (res?.data?.success === true) {
                    setModalVisible(!modalVisible);
                    ShowSuccessMessage('Material Collected');
                    props.updateStatus();
                    props.checkStatus();
                    props.updateButton();
                } else if(res?.data?.quantity_error) {
                    ShowErrorMessage('You do not have enough stock for this product.');
                }else{
                    ShowErrorMessage('Something went wrong.');
                }
                setCollecctQuantity(null);

            }).catch(err => { return err; });
        }
    };

    const materialReturn = async productID => {
        console.log(productID, "Here IT is PID");
        const numReturnQuantity = parseInt(quantity);
        console.log(numReturnQuantity, "numReturnQuantity");
        let maxVal = props.request_quantity - props.collected_quantity
        if (numReturnQuantity > props.collected_quantity) {
            ShowErrorMessage("Please enter the right quantity ")
        }
        else if (numReturnQuantity <= 0 || numReturnQuantity == NaN) {
            ShowErrorMessage("Can not take less than 1 ")
        } else {

            let data = {
                order_id: orderId,
                quantity_return_request: numReturnQuantity,
                product_id: productID,
            }
            console.log(data, "data");

            MarkMaterailReturnAPI(data).then((res) => {
                console.log(res, 'DATA DONE !!!!!!!!!!!!');
                console.log(res?.data?.success, 'RETURN DONE !!!!!!!!!!!!');

                if (res?.data?.success === true) {
                    setQuantity(null);
                    setModalVisible(!modalVisible);
                    props.updateStatus()
                    props.checkStatus();
                    props.updateButton();
                    ShowSuccessMessage('Material Returned');
                } else {
                    ShowErrorMessage('Something went Wrong');
                }
            }).catch(err => { return err; });

            console.log('function DOne');
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    ShowErrorMessage('Prompt had been closed');
                    setModalVisible(!modalVisible);
                }}>
                {collectPrompt === false ? (
                    <View style={styles.MaterialModalView}>
                        <TouchableOpacity style={styles.ModalCloseTouch} onPress={() => setModalVisible(!modalVisible)}>
                            <AntIcon name="close" size={20} color="#666" />
                        </TouchableOpacity>
                        <View style={styles.ModalContentView} >
                            <FormInput
                                changedText={text => setQuantity(text)}
                                newHeading="Enter quantity to return"
                                newHeadingColor="#AE282E"
                                placeholderText="Quantity"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                            />

                            <TouchableOpacity style={[styles.JobPromptButton]}
                                bgColor={'#AE282E'}
                                onPress={() => {
                                    materialReturn(props.PRODUCT_ID);
                                }}>
                                <Text style={[styles.JobButtonText, { color: "#AE282E" }]}>Return</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.MaterialModalView} >
                        <TouchableOpacity style={styles.ModalCloseTouch} onPress={() => setModalVisible(!modalVisible)}>
                            <AntIcon name="close" size={20} color="#666" />
                        </TouchableOpacity>
                        <View style={styles.ModalContentView} >
                            <FormInput
                                changedText={text => setCollecctQuantity(text)}
                                newHeading="Enter quantity to collect"
                                placeholderText="Quantity"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                            />
                            <TouchableOpacity style={[styles.JobPromptButton]}
                                bgColor={'#004A7F'}
                                onPress={() => {
                                    materialCollect(props.PRODUCT_ID);
                                }}>
                                <Text style={[styles.JobButtonText, { color: "#004A7F" }]}>Collect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Modal>
            <View style={styles.JobButtonArea} >
                {props.statusCollect === 'Collected' ? (
                    <TouchableOpacity style={[styles.JobButton]}
                        bgColor={'#AE282E'}
                        onPress={() => enablereturn(props.PRODUCT_ID)}>
                        <Text style={[styles.JobButtonText, { color: "#AE282E" }]}>Return</Text>
                    </TouchableOpacity>
                ) : props.statusCollect === 'To Collect' ? (
                    <TouchableOpacity style={[styles.JobButton]}
                        bgColor={'#004A7F'} onPress={() => enableCollect()}>
                        <Text style={[styles.JobButtonText, { color: "#004A7F" }]}>Collect</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity style={[styles.JobButton]}
                            bgColor={'#004A7F'} onPress={() => enableCollect()}>
                            <Text style={[styles.JobButtonText, { color: "#004A7F" }]}>Collect</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.JobButton]}
                            bgColor={'#AE282E'} onPress={() => enablereturn()}>
                            <Text style={[styles.JobButtonText, { color: "#AE282E" }]}>Return</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
    },
    MaterialModalView: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        // alignItems: "center",
        padding: "10%",

    },
    ModalContentView: {
        backgroundColor: "#FFFFFF",
        // backgroundColor: "red",
        width: "100%",
        justifyContent: "center",
        height: '100%',
        height: windowHeight / 4,
        borderRadius: 10,
        padding: 20,
    },
    ModalCloseTouch: {
        // backgroundColor: "pink",
        alignItems: "flex-end",
        top: "5%",
        right: "5%",
        zIndex: 2,

    },
    JobPromptButton: {
        // backgroundColor: "#000000",
        borderRadius: 20,
        padding: 10,
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",

    },
    JobButtonText: {
        color: "#000000",
        // fontFamily: "DMSans-Regular",
        fontSize: 16,
        lineHeight: 20,
        fontFamily: fonts.PoppinsSemiBold,
    },
    JobButtonArea: {
        /* background: pink, */
        flexDirection: "row",
        padding: 5,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        margin: 0,
        // bottom: "-5%",


    },
    JobButton: {
        // backgroundColor: "#000000",
        // borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

});

export default InputModal;
