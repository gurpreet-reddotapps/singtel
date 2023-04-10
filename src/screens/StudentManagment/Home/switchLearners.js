import React, { useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { ArrowDownIcon, ArrowForwardIcon } from '../../../assects/Icons';
import Images from '../../../assects/Images';
import { width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import { MultiplyIcon } from '../../MySchoolManegment/assects/icons';
import { DocumentRedIcon, LogoutRedIcon, NotificationRedIcon, ParentRedIcon, PrivacyRedIcon, SupportRedIcon } from '../assects/icons';
import { StudentManageImage } from '../assects/images';
function SwitchLearner({ navigation }) {
    const [selectedItem, setSelectedItem] = useState("");
    const data = [
        {
            title: "John Smith",
            email: "johnsmith@gmail.com",
            image: Images.an2
        },
        {
            title: "John Smith",
            email: "johnsmith@gmail.com",
            image: Images.an2
        }
    ]

    return (
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width, height: width / 1.5, borderRadius: 10, backgroundColor: colors.white }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Switch Learners</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: width / 1.10, height: width / 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, borderRadius: 10, marginVertical: 5, alignSelf: "center", backgroundColor: colors.CB7B7B733 }} >
                            <View style={{ flexDirection: "row" }} >
                                <Image style={{ width: width / 8, height: width / 8, borderRadius: 100 }} source={item.image} />
                                <View style={{ marginLeft: 10 }} >
                                    <Text style={{ fontFamily: fonts.PoppinsBold, color: colors.B212529 }} >{item.title}</Text>
                                    <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.B212529 }} >{item.email}</Text>
                                </View>
                            </View>

                            <View style={{ width: width / 20, height: width / 20, alignItems: "center", justifyContent: "center", borderRadius: 100, borderWidth: 2, borderColor: colors.warningRed }} >
                                <View style={{width:width/32,height:width/32,borderRadius:100,backgroundColor:colors.warningRed}} >
                                </View>
                            </View>

                        </View>
                    )
                }} />
            </View>
        </View>
    )
}
export default SwitchLearner;