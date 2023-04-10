import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import { ElectricPlugIcon, HighlighterIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const ServicesDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const arrayData = [
        { title: "Request Id", data: "12345" },
        { title: "Service type", data: "Electrical" },
        { title: "Dormitory number", data: "D-5689C4" },
        { title: "Room number", data: "#123" },
        { title: "Status", data: "Pending" },
        { title: "Image uploaded", data: [DormitoryImages.buttons, DormitoryImages.buttons, DormitoryImages.buttons] },



    ]


    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: "center" }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Services details"} />
            <FlatList
                style={{ marginTop: 15 }}
                ItemSeparatorComponent={() => <View style={{ borderColor: colors.transPrimary60, borderTopWidth: 0.5 }} />}
                data={arrayData}
                renderItem={({ item, index }) => {
                    return (
                        <View  >
                            <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 20, paddingHorizontal: 15 }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.title}</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529 }} >{item.data}</Text>
                            </View>
                            {item.title == "Image uploaded" ?
                                <FlatList style={{ alignSelf: "center" }} numColumns={3} data={item.data} renderItem={({ item, index }) => {
                                    return (
                                        <Image style={{ width: width / 3 - 15, height: width / 4.50, marginHorizontal: 5 }} source={item} />)
                                }} />
                                : null}
                        </View>
                    )
                }} />
            <ButtonComponent title={"Track your service"} bgColor={colors.primaryColor} style={{ width: width / 1.10 }} />

        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default ServicesDetails;