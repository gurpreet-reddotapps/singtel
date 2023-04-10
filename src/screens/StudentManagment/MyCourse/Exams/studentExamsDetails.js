import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { AudioSquareIcon, BorderDashedIcon, BronzeMedalIcon, CertificateDegreeIcon, GradeIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, SchoolIcon, TermIcon, WatchLaterIcon, YearIcon } from '../../assects/icons';
import { IdentiCardIcon } from '../../../../assects/Icons';
import CustomHeader from '../../../../component/CustomHeader';
import { colors } from '../../../../assects/colors';
import fonts from '../../../../assects/fonts';
import { height, iosOpacity, width } from '../../../../assects/strings';
import routes from '../../../../routes/routes';
import { GuitarCompassIcon, TrophyIcon } from '../../../MySchoolManegment/assects/icons';
import { ButtonComponent } from '../../../../component';


function StudentExamsDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]

    const data = [
        {
            icon: YearIcon,
            title: "2022",
            type: "Year"
        },
        {
            icon: TermIcon,
            title: "ABC Board",
            type: "Board"
        },
        {
            icon: SchoolIcon,
            title: "1",
            type: "Term"
        }
    ]





    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader title={"Exam Details"} />
            <View style={{ width: width / 1.10, height: width / 2.5, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderRadius: 10, elevation: 2, alignSelf: "center", marginVertical: width / 10 }} >
                <BronzeMedalIcon width={width / 10} height={width / 10} />
                <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 16, color: colors.EB934C, backgroundColor: "#FCF5EF", paddingHorizontal: 20, borderRadius: 5, marginTop: 10 }} >Distinction</Text>

                <View style={{ width: width / 1.10, height: width / 8.5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, marginTop: width / 20, borderTopColor: '#E9EEF8', borderTopWidth: 1 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                        <GuitarIcon width={width / 17} height={width / 17} />
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#2D3142", marginLeft: 10 }} >Guitar Lesson </Text>
                    </View>
                    <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 14, color: colors.lightGreen1, backgroundColor: "#FCF5EF", paddingHorizontal: 10, borderRadius: 5, marginTop: 10 }} >Completed</Text>
                </View>
            </View>
            <FlatList style={{ alignSelf: "center" }} horizontal data={data} renderItem={({ item, index }) => {
                return (
                    <View style={{ width: width / 3 - 20, height: width / 2.8, alignItems: "center", justifyContent: "space-between", backgroundColor: colors.white, elevation: 2, borderRadius: 15, marginHorizontal: 5 }} >
                        <View style={{ width: width / 7.5, height: width / 6, alignItems: "center", justifyContent: "center", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#7ACEFA26" }} >
                            <item.icon width={width / 10} height={width / 10} />
                        </View>
                        <View style={{ alignItems: "center" }} >
                            <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 15 }} >{item.title}</Text>
                            <Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 12, color: "#6C7470" }} >{item.type}</Text>
                        </View>
                    </View>
                )
            }} />

        </View>
    )
}
export default StudentExamsDetails;