import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { getAllChatMessages } from '../../../api';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { MenuWhiteIcon } from '../../../assects/Icons/Vmo';
import Images from '../../../assects/Images';
import { height, width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';

function ChatsSchoolManage({ navigation }) {
    const [chatList, setChatList] = useState([]);


    useEffect(() => {
        const data = {
            chat_module: "chat"
        }
        getAllChatMessages(data).then((res) => {
            setChatList(res?.data?.chats?.data)
            console.log("SDLKJHSLKDJSLKDJLKDJKL", res?.data?.chats?.data)
        })
    }, [])
    const chatsData = [
        {
            name: "Jane Cooper",
            desc: "Loreum ipsum is dummy text. Loreum ipsum is dummy text.....",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: true
        },
        {
            name: "Jane Cooper",
            desc: "Loreum ipsum is dummy text. Loreum ipsum is dummy text.....",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: false

        },
        {
            name: "Jane Cooper",
            desc: "Loreum ipsum is dummy text. Loreum ipsum is dummy text.....",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: true

        }]
  
        const ListEmptyComponent = () => {
            return (
                <View style={{ width: width, height: height / 1.5, alignItems: "center", justifyContent: "center" }} >
                    <Image style={{ width: width, height: width / 4, resizeMode: "contain" }} source={Images.no_record_found} />
                    <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: width/20 }} >No chat's found </Text>
    
                </View>
            )
        }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader
                LeftIcon={MenuWhiteIcon}
                onLeftIconPress={() => navigation.openDrawer()}
                title={"Chat"} />
            <FlatList
                ListEmptyComponent={ListEmptyComponent}
                style={{ marginTop: 10 }}
                ItemSeparatorComponent={() => <View style={{ width: width / 1.10, alignSelf: "center", borderBottomColor: colors.DBDBDB, borderBottomWidth: 1 }} />}
                data={chatList}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => navigation.navigate(routes.chatsMessageScreen)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 20 }} >
                            <Image style={{ width: width / 8, height: width / 8, borderRadius: 100 }} source={{ uri: item.image }} />
                            <View style={{ width: width / 1.3 }} >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                    <Text style={{ fontFamily: fonts.PoppinsSemiBold }} >John Smith</Text>
                                    <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.D6D6D }} >10 mins ago</Text>
                                </View>
                                <Text numberOfLines={1} style={{ width: width / 2, fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.D6D6D }} >{item.desc}</Text>
                            </View>
                        </Pressable>
                    )
                }} />

        </View>
    )
}
export default ChatsSchoolManage;