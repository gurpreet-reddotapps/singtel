import React, { useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '../../../../../../assects/colors';
import fonts from '../../../../../../assects/fonts';
import { width } from '../../../../../../assects/strings';
import { ButtonComponent } from '../../../../../../component';
import CustomHeader from '../../../../../../component/CustomHeader';
import routes from '../../../../../../routes/routes';


function ExamRecommendations({ navigation, route }) {
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
            <CustomHeader title={"Exam Recommendations"} backIcon />
            <View style={{ flex: 1, alignItems: "center", paddingTop: width / 15 }} >
                <View style={{ width: width / 1.20, marginTop: 10 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Student Name</Text>
                    <TextInput value='John Smith' style={{ color: colors.B212529 }} editable={false} />
                </View>
                <View style={{ width: width / 1.20, marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Exam Name</Text>
                    <TextInput style={{ color: colors.B212529,paddingLeft:10, width: width / 1.10, height: width / 8, borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                </View>
                <View style={{ width: width / 1.20, marginTop: 15 }} >
                    <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsSemiBold }} >Exam Period</Text>
                    <TextInput style={{ color: colors.B212529,paddingLeft:10, width: width / 1.10, height: width / 8, borderWidth: 1, borderColor: colors.CB7B7B733, borderRadius: 10 }} placeholder='John Smith' placeholderTextColor={colors.placeHolderTextColor} />
                </View>
            </View>
            <ButtonComponent onPress={()=>navigation.navigate(routes.examRecommendationsSuccess)} title={"Submit"} bgColor={colors.primaryColor} textColor={colors.white} style={{ width: width / 1.10, alignSelf: "center", borderColor: '#6C7470', borderWidth: 1 }} />
        </View>
    )
}
export default ExamRecommendations;