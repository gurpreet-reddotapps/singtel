import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { createOrGetChat, getChatMessages, sendMessage, uploadChatDocument } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { PaperClipIcon, SendBtnBlueIcon } from '../../assects/Icons/leave';
import { hitSlop, iosOpacity, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';

const ChatSupport = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(false);
    const { userLatLng, userCurrentRegion, locationName } = useSelector(state => state.userLocation);
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState("");
    const [message, setMessage] = useState("");
    const [attachmentSelecterVisible, setAttachmentSelecterVisible] = useState(false);
    const pickerOption = [
        { title: "Camera", onpress: () => openCamera() },
        { title: "Photo Gallery", onpress: () => openGallery() },
    ]

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (route?.params?.id) {
                GetChatMessages(route?.params?.id)
                setChatId(route?.params?.id)
            }
            else {
                CreateChat()
            }
        })
    }, [])



    const CreateChat = (id, name) => {
        console.log("DD", name ? name : user?.user?.employee_code)
        const data = {
            "user_ids": [16],
            "chat_name": "SUPPORT - " + (name != undefined ? name : user?.user?.employee_code),
            "chat_type": "group",
            "chat_module": "ticket"
        }
        createOrGetChat(data).then(res => {
            console.log("res", res.data)
            setChatId(res.data.chat_id)
            GetChatMessages(res.data.chat_id)
        })
            .catch((err) => console.log("error", err))
    }

    const GetChatMessages = (chat_id) => {
        const data = {
            "chat_id": chat_id,
            "per_page": 50,
            "current_page": 1
        }
        console.log("ds", data)
        getChatMessages(data).then(res => {
            console.log("GetChatMessages", res.data)
            setMessages(res.data?.messages?.data)
        })
            .catch((err) => console.log("error", err))
    }

    const onMessageSend = (type, msg) => {
        const data = {
            "chat_id": route?.params?.id ? route?.params?.id : chatId,
            "chat_message": msg ? msg : message,
            "chat_message_type": type
        }
        sendMessage(data).then((res) => {
            if (res.data.success) {
                setMessage("")
                GetChatMessages(chatId)
            }
        })
    }

    const RenderChat = ({ item, index }) => {

        const time = moment(item.updated_at).utcOffset(240).format("HH:mm")
        if (item.user_id == user?.user?.id) {
            if (item.chat_message_type == "IMAGE") {
                return (
                    <View >
                        <Image style={{ width: width / 2, height: width / 2, alignSelf: "flex-end", borderRadius: 10 }} source={{ uri: item.chat_message }} />
                        <Text style={{ fontSize: 10, color: "#333", alignSelf: "flex-end", margin: 5 }} >{time}</Text>
                    </View>
                )

            }
            else {
                return (
                    <View style={[{ minWidth: width / 10, maxWidth: width / 1.50, minHeight: width / 10, maxHeight: width, paddingVertical: 5, elevation: 3, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", backgroundColor: colors.primaryColor, marginVertical: 5, alignSelf: item.user_id == user?.user?.id ? "flex-end" : "flex-start", borderRadius: 10, paddingHorizontal: 10 }, iosOpacity]} >
                        <Text style={{ color: "#eee", minWidth: width / 10, maxWidth: width / 2, minHeight: width / 10, textAlignVertical: "center" }} >{item.chat_message}</Text>
                        <Text style={{ fontSize: 10, marginTop: 10, color: "#c8c8c8", marginHorizontal: 5 }} >{time}</Text>
                    </View>
                )
            }
        }
        else {

            if (item.chat_message_type == "IMAGE") {
                return (
                    <View >
                        <Image style={{ width: width / 2, height: width / 2, alignSelf: "flex-start", borderRadius: 10 }} source={{ uri: item.chat_message }} />
                        <Text style={{ fontSize: 10, color: "#333", alignSelf: "flex-start", margin: 5 }} >{time}</Text>
                    </View>
                )

            }
            else {
                return (
                    <View style={[{ marginVertical: 10 }, iosOpacity]} >
                        <Text style={{ color: colors.primaryColor, alignSelf: "flex-start", fontSize: 11, fontFamily: fonts.PoppinsMedium }} >{item.name}</Text>
                        <View style={{ minWidth: width / 10, maxWidth: width / 1.50, minHeight: width / 10, maxHeight: width, paddingVertical: 5, elevation: 3, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", backgroundColor: colors.white, marginVertical: 5, alignSelf: "flex-start", borderRadius: 10, paddingHorizontal: 10 }} >
                            <Text style={{ color: colors.primaryColor, minWidth: width / 10, maxWidth: width / 2, minHeight: width / 10, textAlignVertical: "center" }} >{item.chat_message}</Text>
                            <Text style={{ fontSize: 10, marginTop: 10, color: "#888", marginHorizontal: 5 }} >{time}</Text>
                        </View>
                    </View>
                )
            }
        }

    }



    async function openGallery() {
        setTimeout(() => {
            ImagePicker.openPicker({
                mediaType: "photo",
            }).then(image => {
            setAttachmentSelecterVisible(false)
                getImageUrl(image)
            });
        }, 200)

    }


    async function openCamera() {
        setTimeout(() => {
            ImagePicker.openCamera({
                mediaType: "photo",
            }).then(image => {
            setAttachmentSelecterVisible(false)
                getImageUrl(image)
            });
        }, 200)
    }


    async function getImageUrl(image) {
        setAttachmentSelecterVisible(false)

        setLoading(true)
        const formData = new FormData();
        formData.append('file', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop()
        });
        await uploadChatDocument(formData).then((res) => {
            if (res.data?.success) {
                setLoading(false)
                onMessageSend("IMAGE", res.data.url)
            }
            else {
                setLoading(false)
                ShowErrorMessage("Profile picture updation failed")
            }
        })
            .catch((err) => { setLoading(false) })
    }







    function AttachmentSelector() {
        return (
            <Modal visible={attachmentSelecterVisible} transparent >
                <Pressable onPress={() => setAttachmentSelecterVisible(false)} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: 10, backgroundColor: "#00000099" }} >
                    <View style={{ width: width / 1.05, height: width / 3.5, overflow: "hidden", backgroundColor: colors.white, marginBottom: 7, borderRadius: 10 }} >
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




    const sheetRef = useRef();
    return (
        <View style={styles.container} >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} keyboardVerticalOffset={Platform.OS == "ios" ? width / 15 : -width / 1.50} >

                <CustomHeader fontSize={15} backIcon title={"SUPPORT - " + (route?.params?.chat_name ? route?.params?.chat_name : user?.user?.employee_code)} />
                <FlatList
                    inverted
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    data={messages}
                    renderItem={RenderChat}

                />
                <View style={{ width: width / 1.10, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignSelf: "center", borderColor: colors.transPrimary60, borderWidth: 1, borderRadius: 10, marginBottom: width / 10, marginTop: 5 }} >
                    <TextInput value={message} onChangeText={(data) => setMessage(data)} style={{ flex: 1, paddingLeft: 10, color: colors.B212529 }} placeholder="Send message ..." placeholderTextColor={colors.B8B8B} />
                    <View style={{ flexDirection: "row", paddingHorizontal: 10 }} hitSlop={hitSlop} >
                        <Pressable style={{ marginHorizontal: 10 }} onPress={() => setAttachmentSelecterVisible(true)} >
                            <Icon size={width / 15} color={colors.B212529} name='attach' />
                        </Pressable>
                        <Pressable onPress={() => onMessageSend("TEXT")}  >
                            <SendBtnBlueIcon width={width / 15} height={width / 15} />
                        </Pressable>
                    </View>
                </View>
                <AttachmentSelector />
                <LoaderComponet visible={loading} />
            </KeyboardAvoidingView>
        </View >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default ChatSupport;