import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, Image } from 'react-native';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { iosOpacity, width } from '../../../../../assects/strings';
import CustomHeader from '../../../../../component/CustomHeader';
import TabViewComponent from '../../../../../component/TabViewComponent';

function RemarksDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const chatsData = [
        {
            name: "Jane Cooper",
            desc: "Mon, 9 Jan 2022",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: true,
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur"
        },
        {
            name: "Jane Cooper",
            desc: "Mon, 9 Jan 2022",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: false,
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur"


        },
        {
            name: "Jane Cooper",
            desc: "Mon, 9 Jan 2022",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            type: true,
            msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur"


        }]

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >

            <FlatList style={{ marginTop: 10 }} data={chatsData} renderItem={({ item, index }) => {
                return (
                    <View style={{ marginBottom: width / 15 }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginVertical: 10 }} >
                            <Image style={{ width: width / 10, height: width / 10, borderRadius: 100 }} source={{ uri: item.image }} />
                            <View style={{ width: width / 1.3 }} >
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12 }} >John Smith</Text>
                                <Text numberOfLines={1} style={{ width: width / 2, fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.D6D6D }} >{item.desc}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.D6D6D, paddingHorizontal: 20 }} >{item.msg}</Text>
                    </View>
                )
            }} />
        </View>
    )
}
export default RemarksDetails;