import React from 'react';
import { View, Text, FlatList, Pressable, TextInput } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, width } from '../../../assects/strings';
import { ButtonComponent } from '../../../component';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { GuitarIcon, MultiplyIcon } from '../../MySchoolManegment/assects/icons';
import { AgeIconStrokeIcon, GenderStrokeIcon, LearnerStrokeIcon, PeopleStrokeIcon } from '../assects/icons';

function InquiryDetails({ navigation }) {
    const data = [{ title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    ]


    function InputText({placeholder,Icons}) {
        return (
            <View style={{ width: width / 1.20, height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, borderRadius: 10, borderColor: "#006EE933", borderWidth: 1, marginVertical: 10 }} >
                <Icons width={width / 20} height={width / 20} />
                <TextInput style={{ flex: 1, color: colors.black, paddingLeft: 10 }} placeholder={placeholder} placeholderTextColor={colors.placeHolderTextColor} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width, height: height / 1.8, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: colors.white }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Inquiry Details</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>
                <View style={{ flex: 1, alignItems: "center", paddingHorizontal: width / 10 }} >
                    <Text style={{ alignSelf: "flex-start", fontFamily: fonts.PoppinsMedium, color: "#403F3F" }} >Learners Particulars</Text>
                    <InputText Icons={LearnerStrokeIcon} placeholder="Learner’s Name" />
                    <InputText Icons={PeopleStrokeIcon} placeholder="Relations to Learner" />
                    <InputText Icons={AgeIconStrokeIcon} placeholder="Age" />
                    <InputText Icons={GenderStrokeIcon} placeholder="Gender" />

                </View>

                <ButtonComponent onPress={()=>navigation.navigate(routes.studentInquirySent)} bgColor={colors.primaryColor} title="Continue" style={{ width: width / 1.20, alignSelf: "center" }} />


            </View>
        </View>
    )
}
export default InquiryDetails;