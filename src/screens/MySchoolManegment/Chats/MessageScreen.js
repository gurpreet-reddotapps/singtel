import React from 'react';
import { FlatList, Image, Pressable, StatusBar, Text, TextInput, View } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import { AddIconIcon, MicIcon } from '../assects/icons';

function MessageScreen() {



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


    function RenderSendMessages({ message, time }) {
        return (
            <View style={{ width: width, minHeight: width / 8, marginVertical: 10, flexDirection: "row", paddingHorizontal: 15, justifyContent: "flex-end", maxHeight: height }} >
                <View >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, width: width / 1.5, backgroundColor: colors.lightGreen, color: colors.white, marginLeft: 10, lineHeight: 20, fontSize: 12, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15 }} >{message}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.textColor, marginLeft: 10, marginTop: 5 ,textAlign:"right"}} >{time}</Text>
                </View>
            </View>
        )
    }
    function RenderReciveMessages({ message, time, image }) {
        return (
            <View style={{ width: width, minHeight: width / 8, marginVertical: 10, flexDirection: "row", paddingHorizontal: 15, justifyContent: "flex-start", maxHeight: height }} >
                <Image style={{ width: width / 10, height: width / 10, borderRadius: 100 }} source={{ uri: image }} />
                <View >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, width: width / 1.5, backgroundColor: "#F5F5F5", marginLeft: 10, lineHeight: 20, fontSize: 12, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomRightRadius: 15 }} >{message}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.textColor, marginLeft: 10, marginTop: 5 }} >{time}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Jane Cooper"} titleImage="https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6" />
            <FlatList inverted data={chatsData} renderItem={({ item, index }) => {
                if (item.type) {
                    return (
                        <RenderReciveMessages message={item.desc} time="08:01 AM" image={item.image} />
                    )
                }
                else {
                    return (
                        <RenderSendMessages message={item.desc} time="08:02 AM" image={item.image} />
                    )
                }

            }} />

            <View style={{ width: width, height: width / 5,paddingHorizontal:10,flexDirection:"row",alignItems:"center", backgroundColor: colors.messageBG }} >
                <AddIconIcon width={width / 18} height={width / 18} />
                <View style={{flex:1,marginHorizontal:10}} >
                    <TextInput multiline style={{width:width/1.30,minHeight:width/10,maxHeight:width/5,paddingLeft:10,color:colors.B212529,backgroundColor:colors.white,borderRadius:5}} placeholder='Write a message…' placeholderTextColor={colors.placeHolderTextColor} />
                </View>
                <MicIcon width={width / 18} height={width / 18} />

            </View>
        </View>
    )
}

export default MessageScreen;