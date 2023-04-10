import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { width } from '../../../assects/strings';
import { ButtonComponent } from '../../../component';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { GuitarIcon, MultiplyIcon } from '../../MySchoolManegment/assects/icons';

function InquiryFor({ navigation }) {
    const data = [{ title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    ]


    return (
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width, height: width / 1.5, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: colors.white }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Switch Learners</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>
                <View style={{ flex: 1 }} />
                <ButtonComponent onPress={()=>navigation.navigate(routes.studentInquiryDetails)} bgColor={colors.primaryColor} title="Slef" style={{ width: width / 1.20, alignSelf: "center" }} />
                <ButtonComponent onPress={()=>navigation.navigate(routes.studentInquiryDetails)} bgColor={colors.white} textColor={colors.primaryColor} title="Someone Else" style={{ width: width / 1.20, alignSelf: "center", borderColor: colors.primaryColor, borderWidth: 1 }} />


            </View>
        </View>
    )
}
export default InquiryFor;