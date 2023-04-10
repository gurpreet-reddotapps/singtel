import { Alert, Image, Modal, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Images from '../assets/Images';
import { windowWidth } from '../utils/Dimension';
import { colors } from '../../../assects/colors';


const StringImagePreview = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableOpacity style={styles.fileNameText} onPress={() => { setModalVisible(true) }} >
                <Text style={styles.DocName} >{props?.title}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Pressable
                        style={styles.presstextStyle}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <AntDesign name="closecircle" size={20} color="#FFFFFF" />
                        <Text style={styles.textStyle} >Close</Text>
                    </Pressable>
                    <View style={styles.modalView}>
                        {/* <Image style={styles.InstallerImagePreview} source={{ uri: props.installerIMG }} resizeMode="contain" /> */}
                        <Image style={styles.InstallerImagePreview} source={{ uri: props.installerImages }} resizeMode="cover" />
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default StringImagePreview


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        // padding: 35,
        height: '65%',
        width: '100%',
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
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        paddingHorizontal: 5,
    },
    presstextStyle: {
        position: 'absolute',
        top: "6%",
        right: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    InstallerImagePreview: {
        height: "100%",
        width: "100%",
        borderRadius: 2,
    },
    touchImage: {
        // backgroundColor: 'red',
        width: windowWidth / 2.2,
        height: '100%',
        marginRight: 10,
        borderRadius: 5,

    },
    ImageStyling: {
        // backgroundColor: 'purple',
        width: '100%',
        height: '100%',
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
    DocName: {
        fontSize: 16,
        // textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.green,
        paddingHorizontal: 10,
    },
});