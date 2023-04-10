import React, { useRef, useState } from 'react';
import { View ,FlatList,Text,Pressable} from 'react-native';
import { colors } from '../../../../../../assects/colors';
import fonts from '../../../../../../assects/fonts';
import { CalendarActiveIcon } from '../../../../../../assects/Icons/TabIcons';
import { height, iosOpacity, width } from '../../../../../../assects/strings';
import CustomHeader from '../../../../../../component/CustomHeader';
import TabViewComponent from '../../../../../../component/TabViewComponent';
import { BorderDashedIcon, GuitarIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../../../../assects/icons';
import OngoingAttendance from './Attendance/ongoingAttendance';
import OngoingHomework from './Homework/ongoingHomeworks';





function OngoingLessionDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]

    const [TabData] = useState([{ key: "attendance", title: "Attendance", data: "0", color: colors.progressColor },
    { key: "homework", title: "Homework's", data: "0", color: colors.blue },
   
    ])


    function RenderTab({ item, index, data }) {
        return (
            <Pressable onPress={() => data.jumpTo(item.key)} style={{
                width: width / 2.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                borderTopLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                borderBottomLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                alignItems: "center",
                justifyContent: "center",

            }} >
                <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
            </Pressable>

        )
    }
    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => <RenderTab data={data} item={item} index={index} />} />
            </View>
        )
    }

    function RenderOngoingAttendance(){
        return(
            <OngoingAttendance navigation={navigation} />
        ) 
    }

    function RenderHomeWorks(){
        return(
            <OngoingHomework navigation={navigation} />
        )
    }

    function TextWithIconComponent({ IconE, title }) {
        return (
            <View style={{ width: width / 2.5, flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", marginVertical: 5 }} >
                <View style={{ backgroundColor: colors.cEB4747, alignItems: "center", justifyContent: "center", borderRadius: 100, width: width / 22, height: width / 22 }} >
                    <IconE width={width / 28} height={width / 28} />
                </View>
                <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, marginLeft: 5 }} >{title}</Text>
            </View>
        )
    }


    function SlotsCardComponent({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate(routes.lessionDetails, { item })} style={[{ width: width / 1.10, height: width / 4.5, alignSelf: "center", padding: 10, borderRadius: 10, backgroundColor: colors.white, marginVertical: 15 }]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <GuitarIcon width={width / 18} height={width / 15} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {"9:00 to 10:00 am"}</Text>
                    </View>
                    <Text style={{
                        color: item?.status == "Complete" ? "#00AB6F" :
                            item?.status == "Pending" ? colors.yellow : colors.B212529, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{"Upcoming"}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "flex-start" }} >

                    <View style={{ flexDirection: "column", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={WatchLaterIcon} title="Start Date: " />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title="Bedok Studio: " />

                    </View>

                    {/* <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={GuitarWhiteIcon} title="Guitar Lessons" />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title="Bedok Studio BDC 1" />
                    </View> */}
                </View>
            </Pressable>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Guitar Lessons (G-G1-2)"} />
            <SlotsCardComponent/>
            <TabViewComponent
                Screens={{ attendance: RenderOngoingAttendance, homework: RenderHomeWorks }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} />

        </View>
    )
}
export default OngoingLessionDetails;