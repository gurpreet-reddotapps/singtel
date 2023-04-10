import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, TextInput, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, ArrowBackIcon, ArrowForwardIcon, MoonIcon, NotificationBellIcon, SearchIconIcon, StaticsIcon, SunIcon, TaskCompleteIcon, WeekOffIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import { FloatingAction } from "react-native-floating-action";
import VMOCustomHeader from './Components/VMOCustomHeader';
import ImagePath from './Constant/ImagePath';
const Vmo = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [ArrayData, setArray] = useState([{ title: "General servicing  & Repairs", status: "In progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#FFA600" },
    { title: "General servicing  & Repairs", status: "Overdue", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#FF6161" },
    { title: "General servicing  & Repairs", status: "in progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#1F8B88" },
    { title: "General servicing  & Repairs", status: "in progress", sDate: "9/10/21", eDate: "10/10/21", vReg: "YQ308C", vType: "Car", bgColor: "#1F8B88" }]);


    const actions = [
        {
            text: "Reporting only",
            icon: { uri: "https://png.pngtree.com/png-clipart/20190918/ourmid/pngtree-pink-watercolor-brushes-171474-png-image_1733978.jpg" },
            name: "bt_accessibility",
            position: 1,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "Accidental claims",
            icon: Images.reportOnly,
            name: "bt_language",
            position: 2,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "General servicing & repair",
            icon: Images.claim,
            name: "bt_room",
            position: 3,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        }
    ];



    return (
        <View style={styles.container} >
            <VMOCustomHeader title={"VMO"} menuIcon />
            <View style={{ width: width, height: width / 3, borderBottomColor: colors.transPrimary60, borderBottomWidth: 0.5 }} >

            </View>
            <View style={{ width: width / 1.10, height: width / 8, marginTop: width / 15, alignSelf: "center", paddingHorizontal: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderColor: colors.transPrimary60, borderWidth: 1, borderRadius: 100 }} >
                <TextInput style={{ flex: 1, fontSize: 12, paddingLeft: 15 }} placeholder="Search for jobs" placeholderTextColor={"#1E293BCC"} />
                <View style={{ width: width / 9, height: width / 9, alignItems: "center", justifyContent: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: 100, borderBottomRightRadius: 100, backgroundColor: colors.primaryColor }} >
                    <SearchIconIcon width={width / 25} height={width / 25} />
                </View>
            </View>

            <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: width / 20, marginLeft: 15 }} ><Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsBold, fontSize: 18 }} >Jobs</Text> (0 jobs available)</Text>
            <View style={{ flex: 1 }} >
                {/* <FlatList data={ArrayData} renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: width / 1.05, height: width / 2.2, elevation: 2, borderRadius: 5, backgroundColor: colors.white, overflow: "hidden", marginVertical: 10, alignSelf: "center" }} >
                            <View style={{ height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: item.bgColor }} >
                                <Text style={{ color: colors.white, fontFamily: fonts.PoppinsMedium }} >{item.title}</Text>
                                <Text>{item.status}</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 5 }} >
                                <View style={{ height: width / 8, justifyContent: "space-between", paddingHorizontal: 10 }} >
                                    <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{"Start Date"}</Text>
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium }}>{item.sDate}</Text>
                                </View>
                                <View style={{ height: width / 8, marginLeft: width / 4, justifyContent: "space-between", paddingHorizontal: 10 }} >
                                    <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{"End date"}</Text>
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium }} >{item.eDate}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", padding: 5 }} >
                                <View style={{ height: width / 8, justifyContent: "space-between", paddingHorizontal: 10 }} >
                                    <Text style={{ color: colors.placeHolderTextColor, textAlign: "left", fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{"Vehicle Registration No."}</Text>
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium }}>{item.sDate}</Text>
                                </View>
                                <View style={{ height: width / 8, marginLeft: 10, justifyContent: "space-between", paddingHorizontal: 10 }} >
                                    <Text style={{ color: colors.placeHolderTextColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }} >{"Vehicle Type"}</Text>
                                    <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium }} >{item.eDate}</Text>
                                </View>
                            </View>


                        </View>
                    )
                }} /> */}
                <View style={styles.imageBackground} >
                    <ImageBackground source={ImagePath.home_gif} style={{ flex: 1, height: '100%', width: '100%', alignSelf: 'center' }}  >


                    </ImageBackground>
                </View>
            </View>

            {/* <FloatingAction
            animated
            position='right'
            actionsPaddingTopBottom={5}
            distanceToEdge={{horizontal:15}}
            buttonSize={width/8}
                actions={actions}
                onPressItem={name => {
                    console.log(`selected button: ${name}`);
                }}
            /> */}

            <View style={{ width: width / 10, height: width / 10, marginTop: height / 1.35, alignSelf: "flex-end", right: 10, alignItems: "center", justifyContent: "center", position: "absolute", backgroundColor: colors.primaryColor, borderRadius: 100 }} >
                <Text style={{ color: colors.white, fontSize: 25, fontFamily: fonts.PoppinsMedium, alignSelf: "center" }} >+</Text>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageBackground: {
        flex: 1,
        height: '90%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
})
export default Vmo;