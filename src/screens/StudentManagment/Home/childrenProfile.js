import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { ArrowDownIcon, ArrowForwardIcon } from '../../../assects/Icons';
import Images from '../../../assects/Images';
import { width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import { setLogOut } from '../../../redux/actions/users';
import routes from '../../../routes/routes';
import { DocumentRedIcon, LogoutRedIcon, NotificationRedIcon, ParentRedIcon, PrivacyRedIcon, SupportRedIcon } from '../assects/icons';
import { StudentManageImage } from '../assects/images';
function ChildrenProfile({ navigation }) {
    const [selectedItem, setSelectedItem] = useState("");
    const dispatch = useDispatch();
    const profileArray = [
        {
            icon: NotificationRedIcon,
            title: "Notifications",
            onPress:()=>{}
        },
        {
            icon: SupportRedIcon,
            title: "Chat Support",
            onPress:()=>{}

        },
        {
            icon: DocumentRedIcon,
            title: "Terms & Conditions",
            onPress:()=>{navigation.navigate(routes.studentTermsPolicy)}

        },
        {
            icon: PrivacyRedIcon,
            title: "Privacy Policy",
            onPress:()=>{navigation.navigate(routes.studentPrivacyPolicy)}

        },
        {
            icon: LogoutRedIcon,
            title: "Log out",
            onPress:()=>Logout()

        }
        ,
        {
            icon: ParentRedIcon,
            title: "Parental Access",
            onPress:()=>{}

        }
    ]

    const Logout = async () => {
        dispatch(setLogOut());
        // await AsyncStorage.removeItem("fcmtoken")
    }



    function SwitchBar({ status, onPress }) {
        return (
            <Pressable onPress={onPress} style={{ width: width / 11.5, height: width / 25, alignItems: status ? "flex-end" : "flex-start", justifyContent: "center", backgroundColor: status ? colors.warningRed : "#C7CCD0", borderRadius: 100 }} >
                <View style={{ width: width / 20, height: width / 19, borderRadius: 100, backgroundColor: colors.white, borderWidth: 1, borderColor: status ? colors.warningRed : "#C7CCD0" }} >

                </View>
            </Pressable>
        )
    }




    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Children's Profile"} />
            <View style={{ width: width, height: width / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width / 5, height: width / 5, borderRadius: 100 }} source={Images.an2} />
                <Pressable onPress={()=>navigation.navigate(routes.switchLearner)} style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }} >
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, marginHorizontal: 5 }} >John Smith</Text>
                    <ArrowDownIcon width={width / 20} height={width / 20} />
                </Pressable>
                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 14, color: colors.transBlack }} >johnsmith@gmail.com</Text>
            </View>
            <View style={{ backgroundColor: colors.white, elevation: 2, borderRadius: 20, width: width / 1.10, height: width + 20, paddingTop: 20, alignSelf: "center" }} >
                <FlatList style={{ backgroundColor: colors.white }} data={profileArray} renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={item.onPress} style={{ width: width / 1.20, height: width / 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignSelf: "center" }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <item.icon width={width / 15} height={width / 15} />
                                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 13, marginLeft: 10 }} >{item.title}</Text>
                            </View>
                            {index == 5 ? <SwitchBar status={true} /> :
                                <ArrowForwardIcon width={width / 23} height={width / 23} />}
                        </Pressable>
                    )
                }} />
            </View>
        </View>
    )
}
export default ChildrenProfile;