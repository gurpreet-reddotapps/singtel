import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { AudioSquareIcon, BorderDashedIcon, CertificateDegreeIcon, GradeIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../../assects/icons';
import { IdentiCardIcon } from '../../../../assects/Icons';
import CustomHeader from '../../../../component/CustomHeader';
import { colors } from '../../../../assects/colors';
import fonts from '../../../../assects/fonts';
import { height, iosOpacity, width } from '../../../../assects/strings';
import routes from '../../../../routes/routes';
import { GuitarCompassIcon, TrophyIcon } from '../../../MySchoolManegment/assects/icons';
import { ButtonComponent } from '../../../../component';


function StudentExams({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]





    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader title={"Exams"} />

            <Pressable  onPress={()=>navigation.navigate(routes.studentExamsDetails)} style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 2 }} >
                <View style={{ height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 5 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <GuitarCompassIcon width={width / 12} height={width / 12} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {"9:00 to 10:00 am"}</Text>
                    </View>
                    <Text style={{ backgroundColor: "#FDF9F3", color: colors.lightGreen1, fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5 }} >{"Completed"}</Text>
                </View>

                <BorderDashedIcon width={width / 1.15} height={12} />

                <View style={{ paddingLeft: width / 10, paddingRight: width / 20, paddingVertical: 10 }} >

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Year:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"2022"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Date:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"25 Mar 2022,10:00 Am"}</Text>
                        </View>
                    </View>






                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Term:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"1"}</Text>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Board:"}</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"ABC Board"}</Text>
                        </View>
                    </View>


                </View>

                <BorderDashedIcon width={width / 1.15} height={12} />

                <View style={{ marginTop: 10, paddingHorizontal: 10 }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.B212529 }} >Marks:<Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.lightGreen1 }} >   Distinction</Text> </Text>
                        <View style={{ flexDirection: "row" }} >
                            <Pressable style={{marginHorizontal:15}} >
                                <GradeIcon width={width / 25} height={width / 25} />
                            </Pressable>
                            <CertificateDegreeIcon width={width / 25} height={width / 25} />
                        </View>
                    </View>
                    <Text style={{ fontFamily: fonts.PoppinsLight, lineHeight: 20, fontSize: 12, color: "#756F6F" }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit </Text>
                </View>
            </Pressable>

            <View style={{ flex: 1 }} />
            <ButtonComponent title={"View Mock Exams"} bgColor={colors.primaryColor} style={{ width: width / 1.15, alignSelf: "center" }} />
        </View>
    )
}
export default StudentExams;