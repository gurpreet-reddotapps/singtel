import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '../../../../../../assects/colors';
import fonts from '../../../../../../assects/fonts';
import { UploadBtnIcon } from '../../../../../../assects/Icons';
import { width } from '../../../../../../assects/strings';
import { ButtonComponent } from '../../../../../../component';
import CustomHeader from '../../../../../../component/CustomHeader';
import routes from '../../../../../../routes/routes';
import { AddIconPurpleIcon } from '../../../../assects/icons';


function MockTest({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]

    const [TabData] = useState([{ key: "basicDetails", title: "Basic Details", data: "0", color: colors.progressColor },
    { key: "submissions", title: "Submissions", data: "0", color: colors.blue },

    ])



    return (
        <View style={{ flex: 1, backgroundColor: colors.white, }} >
            <CustomHeader title={"Mock Test"} backIcon />
            <ScrollView style={{ flex: 1,marginTop:10 }} >
                <View style={{ alignItems: "center" }} >
                    <View style={{ width: width / 1.15, marginTop: 10 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Student Name</Text>
                        <TextInput value='John Smith' style={{ color: colors.B212529 }} editable={false} />
                    </View>
                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Exam Name</Text>
                        <TextInput style={{ color: colors.B212529, paddingLeft: 10, width: width / 1.10, height: width / 8, borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                    </View>
                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Mock Test Date</Text>
                        <TextInput style={{ color: colors.B212529, paddingLeft: 10, width: width / 1.10, height: width / 8, borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                    </View>

                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Mock Exam Instructions</Text>
                        <TextInput style={{ color: colors.B212529, paddingLeft: 10, width: width / 1.10, height: width / 4, textAlign: "left", textAlignVertical: "top", borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                    </View>

                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Mock Test Questions</Text>
                        <View style={{ width: width / 1.20, height: width / 4, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#D9D9D9", alignSelf: "center", marginTop: 10, borderStyle: "dashed", borderRadius: 20 }} >
                            <UploadBtnIcon width={width / 15} height={width / 15} />
                            <Text style={{ color: colors.black, fontFamily: fonts.PoppinsRegular }} >Upload File</Text>
                        </View>
                    </View>

                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold, marginVertical: 10 }} >Or</Text>

                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Add Questions Below</Text>
                    </View>

                    <View style={{ width: width / 1.15, marginTop: 15 }} >
                        <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Question 1</Text>
                        <TextInput style={{ color: colors.B212529, paddingLeft: 10, width: width / 1.10, height: width / 8, textAlign: "left", textAlignVertical: "top", borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                    </View>

                    <Pressable onPress={() => navigation.navigate(routes.addHomeworkFeedback)} style={{ flexDirection: "row",alignSelf:"flex-start",marginLeft:width/20,marginBottom:20, marginTop: 20 }} >
                        <AddIconPurpleIcon width={width / 20} height={width / 20} />
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#5768FA", fontSize: 12, marginLeft: 10 }} >{"Add New"}</Text>
                    </Pressable>

                    <ButtonComponent onPress={() => navigation.navigate(routes.mockTestSuccess)} title={"Submit"} bgColor={colors.primaryColor} textColor={colors.white} style={{ width: width / 1.10, alignSelf: "center", borderColor: '#6C7470', borderWidth: 1 }} />
                </View>
            </ScrollView>
        </View>
    )
}
export default MockTest;