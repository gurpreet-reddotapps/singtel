import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { ArrowDownIcon, ArrowForwardIcon } from '../../../assects/Icons';
import Images from '../../../assects/Images';
import { width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { DocumentRedIcon, LogoutRedIcon, NotificationRedIcon, ParentRedIcon, PrivacyRedIcon, SupportRedIcon } from '../assects/icons';
import { StudentManageImage } from '../assects/images';
function StudentPrivacyPolicy({ navigation }) {
    const [selectedItem, setSelectedItem] = useState("");
    const profileArray = [
        {
            icon: NotificationRedIcon,
            title: "Notifications",
        },
        {
            icon: SupportRedIcon,
            title: "Chat Support",
        },
        {
            icon: DocumentRedIcon,
            title: "Terms & Conditions",
        },
        {
            icon: PrivacyRedIcon,
            title: "Privacy Policy",
        },
        {
            icon: LogoutRedIcon,
            title: "Log out",
        }
        ,
        {
            icon: ParentRedIcon,
            title: "Parental Access",
        }
    ]



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
            <CustomHeader backIcon title={"Terms & Conditions"} />
            <Text style={{ marginTop: 15, textAlign: "center", fontFamily: fonts.PoppinsLight, color: colors.transBlack60 }} >Last updated on 1/12/2021</Text>
            <Text style={{ paddingHorizontal: 15, marginTop: 10, textAlign: "left", fontFamily: fonts.PoppinsLight, color: colors.black }} >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard  </Text>

        </View>
    )
}
export default StudentPrivacyPolicy;