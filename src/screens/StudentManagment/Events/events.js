import React from 'react';
import { View, Text, FlatList, Image, TextInput, Pressable } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, width, iosOpacity } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { GuitarIcon, MicIcon, AddIconIcon, BorderDashedIcon, Person3Icon, WatchLaterIcon, GuitarWhiteIcon, LocationWhiteIcon } from '../../MySchoolManegment/assects/icons';
import { MusicIcon } from '../assects/icons';

function Events({ navigation }) {
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

        },
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
            type: true

        },
        {
            name: "Jane Cooper",
            desc: "Loreum ipsum is dummy text. Loreum ipsum is dummy text.....",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: true

        }
    ]


    function RenderSendMessages({ message, time }) {
        return (
            <View style={{ width: width, minHeight: width / 8, marginVertical: 10, flexDirection: "row", paddingHorizontal: 15, justifyContent: "flex-end", maxHeight: height }} >
                <View >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, width: width / 1.5, backgroundColor: colors.lightGreen1, color: colors.white, marginLeft: 10, lineHeight: 20, fontSize: 12, padding: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderBottomLeftRadius: 15 }} >{message}</Text>
                    <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.textColor, marginLeft: 10, marginTop: 5, textAlign: "right" }} >{time}</Text>
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


    function TextWithIconComponent({ IconE, title }) {
        return (
            <View style={{ minWidth: width / 2, maxWidth: width / 1.5, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", marginVertical: 5 }} >
                <View style={{ backgroundColor: colors.cEB4747, alignItems: "center", justifyContent: "center", borderRadius: 100, width: width / 22, height: width / 22 }} >
                    <IconE width={width / 28} height={width / 28} />
                </View>
                <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, marginLeft: 5 }} >{title}</Text>
            </View>
        )
    }

    function SlotsCardComponent({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate(routes.studentLessonInquiryDetails, { item })} style={[{ width: width / 1.10, height: width / 2, alignSelf: "center", padding: 10, borderRadius: 10, borderColor: '#0000000D', borderWidth: 1, backgroundColor: colors.white, marginVertical: 15 }, iosOpacity]} >

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <View style={{ width: width / 12, height: width / 12, alignItems: "center", justifyContent: "center", backgroundColor: colors.secondryMainColor, borderRadius: 100 }} >
                            <MusicIcon width={width / 20} height={width / 20} />
                        </View>
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {"Piano Lessons"}</Text>
                    </View>
                    <Text style={{
                        color: colors.cFEB23F, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{"Pending"}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }} >
                    <BorderDashedIcon width={width / 1.20} height={width / 20} />

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Year:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"2022"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Date:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"25 Feb 2022"}</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, fontFamily: fonts.PoppinsRegular, marginVertical: 10 ,color:"#756F6F"}}  >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum </Text>
                </View>
            </Pressable>
        )
    }





    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Events"} titleImage="https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6" />

            <FlatList data={["",""]} renderItem={SlotsCardComponent} />


        </View>
    )
}
export default Events;