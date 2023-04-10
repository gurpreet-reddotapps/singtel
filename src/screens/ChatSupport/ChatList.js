import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { createOrGetChat, getAllChatMessages, getChatMessages, sendMessage, uploadChatDocument } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { PaperClipIcon, SendBtnBlueIcon } from '../../assects/Icons/leave';
import { hitSlop, iosOpacity, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import routes from '../../routes/routes';

const ChatList = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(false);
    const { userLatLng, userCurrentRegion, locationName } = useSelector(state => state.userLocation);
    const [chatId, setChatId] = useState("");
    const [messages, setMessages] = useState("");
    const [getAllUser, setAllUser] = useState([]);
    const [attachmentSelecterVisible, setAttachmentSelecterVisible] = useState(false);
    const pickerOption = [
        { title: "Camera", onpress: () => openCamera() },
        { title: "Photo Gallery", onpress: () => openGallery() },
    ]

    useEffect(() => {
        navigation.addListener('focus',()=>{
            const data = {
                "chat_module": "ticket" 
            }
            getAllChatMessages(data).then((res)=>{
                console.log("SDSDSDSDSDSDD",res.data.chats)
             setAllUser(res.data.chats.data) })
        })
        
    }, [])

    

    const sheetRef = useRef();
    return (
        <View style={styles.container} >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"} keyboardVerticalOffset={Platform.OS == "ios" ? width / 15: -width / 1.50} >

            <CustomHeader backIcon title={"CHAT LIST"} />
            <FlatList data={getAllUser} renderItem={({item,index})=>{
                return(
                    <Pressable onPress={()=>navigation.navigate(routes.chatSupport,{id:item.id,chat_name:item.chat_name})} style={[{flex:1,height:width/7,justifyContent:"center",backgroundColor:colors.white,paddingHorizontal:10,elevation:3,marginVertical:1},iosOpacity]} >
                        <Text style={{fontFamily:fonts.PoppinsBold,color:colors.primaryColor}} >{item.chat_name}</Text>
                        <View style={{width:width/1.1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}} >
                        <Text style={{fontSize:11}} >{item.last_message}</Text>
                       {item.unread_messages!=0?  <Text style={{color:colors.green,fontFamily:fonts.PoppinsSemiBold}} >{item.unread_messages}</Text>:null}
                        </View>
                        </Pressable>
                )
            }} />
            
            <LoaderComponet visible={loading} />
</KeyboardAvoidingView>
        </View >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default ChatList;