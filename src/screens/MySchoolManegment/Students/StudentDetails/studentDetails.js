import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Text, Pressable, Image } from 'react-native';
import { getClassListByStudentId } from '../../../../api';
import { colors } from '../../../../assects/colors';
import fonts from '../../../../assects/fonts';
import { height, iosOpacity, width } from '../../../../assects/strings';
import CustomHeader from '../../../../component/CustomHeader';
import TabViewComponent from '../../../../component/TabViewComponent';
import CompletedDetails from './CompletedDetails/completedDetails';
import EventsDetails from './EventsDetails/eventsDetails';
import OngoingDetails from './OngingDetails/ongoingDetails';
import RemarksDetails from './RemarksDetails/remarksDetails';



function StudentDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]

    const [TabData] = useState([{ key: "ongoing", title: "Ongoing ", data: "0", color: colors.progressColor },
    { key: "completed", title: "Completed", data: "0", color: colors.blue },
    { key: "events", title: "Events", data: "0", color: colors.blue },
    { key: "remarks", title: "Remarks", data: "0", color: colors.blue },


    ])
    useEffect(()=>{
        console.log("route?.params?.id",route?.params?.id)
        getClassListByStudentId(route?.params?.id).then((res)=>{
            console.log("SDLK:JSKLDJSLKDJSLKDJKLD",res?.data)
        })
    },[])


    function RenderTab({ item, index, data }) {
        return (
            <Pressable onPress={() => data.jumpTo(item.key)} style={{
                width: width / 4.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                borderTopLeftRadius: (data.navigationState.index != 3) && data.navigationState.index == index ? 5 : 0,
                borderBottomLeftRadius: (data.navigationState.index != 3) && data.navigationState.index == index ? 5 : 0,
                borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                alignItems: "center",
                justifyContent: "center",
            }} >
                <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.title}</Text>
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

    function RenderOngoingDetails() {
        return (
            <OngoingDetails navigation={navigation} />
        )
    }

    function RenderCompletedDetails() {
        return (
            <CompletedDetails navigation={navigation} />
        )
    }

    function RenderEventsDetails() {
        return (
            <EventsDetails navigation={navigation} />
        )
    }

    function RenderRemarksDetails() {
        return (
            <RemarksDetails navigation={navigation} />
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Student Details"} />
            <View style={{ width: width, height: width / 1.4, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", paddingTop: 15 }} >
                <Image style={{ width: width / 3, height: width / 3, borderRadius: 100 }} source={{ uri: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg" }} />
                <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: "#22215B", fontSize: 16, marginVertical: 10 }} >John Smith</Text>
                <View style={{ width: width, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
                    <View>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: "#AFAFB5" }} >Gender</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#22215B" }}>Male</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: "#AFAFB5" }}>Age</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#22215B" }}>20</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: "#AFAFB5" }}>Terms</Text>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#22215B" }}>02</Text>
                    </View>
                </View>
            </View>
            <View style={{width:width/1.20,height:1,backgroundColor:colors.DBDBDB,marginVertical:10,alignSelf:"center"}} />
            <TabViewComponent
                Screens={{ ongoing: RenderOngoingDetails, completed: RenderCompletedDetails, events: RenderEventsDetails, remarks: RenderRemarksDetails }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} />

        </View>
    )
}
export default StudentDetails;