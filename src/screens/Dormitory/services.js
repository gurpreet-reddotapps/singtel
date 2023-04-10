import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon } from '../../assects/Icons';
import { height, iosOpacity, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { ElectricPlugIcon, HighlighterIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const Services = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [TabData] = useState([{ key: "approved", title: "Approved", data: "0", color: colors.progressColor },
    { key: "pending", title: "Pending", data: "0", color: colors.blue },
    { key: "rejected", title: "Rejected", data: "0", color: colors.blue },
    ])
    function ServiceCard({ item, index }) {


        return (
            <Pressable onPress={() => navigation.navigate(routes.servicesDetails)} style={[{ width: width / 1.10, height: width / 2.5, backgroundColor: colors.white, borderRadius: 10, alignSelf: "center", elevation: 5, overflow: "hidden" },iosOpacity]} >
                <ImageBackground style={{ width: width / 1.10, height: width / 6, flexDirection: "row", alignItems: "center", paddingHorizontal: 20 }} source={DormitoryImages.card_green_bg} >
                    <ElectricPlugIcon width={width / 12} height={width / 12} />
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, paddingHorizontal: 10 }} >Electrical services</Text>
                </ImageBackground>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }} >
                    <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                    <View style={{ width: width / 5.28, height: 3, backgroundColor: colors.primaryColor, marginHorizontal: 12 }} />
                    <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                    <View style={{ width: width / 5.28, height: 3, backgroundColor: colors.primaryColor, marginHorizontal: 12 }} />
                    <CheckmarkGreenIcon width={width / 18} height={width / 18} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: width / 1.10, paddingHorizontal: 20, borderTopColor: colors.DBDBDB, borderTopWidth: 1, alignSelf: "center" }} >
                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >D-5689c4</Text>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.primaryColor, marginRight: 10 }} >#123</Text>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.placeHolderTextColor }} >2 Days ago </Text>
                </View>
            </Pressable>
        )
    }
    function Approved() {

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <ServiceCard />
            </View>
        )
    }

    function Pending() {

        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <ServiceCard />
            </View>
        )
    }
    function Rejected() {
        return (
            <View style={{ flex: 1, paddingTop: 20 }} >
                <ServiceCard />
            </View>
        )
    }

    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, width: width / 1.10, elevation: 1, alignSelf: "center", borderRadius: 20 },iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    console.log("KDFJKSLD", index)
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: width / 3.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                            borderTopLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                            borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            alignItems: "center",
                            justifyContent: "center",

                        }} >
                            <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                        </Pressable>

                    )
                }} />
            </View>
        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: "center" }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Services"} />
            <TabViewComponent
                Screens={{ approved: Approved, pending: Pending, rejected: Rejected }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} />
            <ButtonComponent onPress={()=>navigation.navigate(routes.applyForService)} title={"Apply for service"} bgColor={colors.primaryColor} style={{ width: width / 1.10 }} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default Services;