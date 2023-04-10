import React, { useRef, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { iosOpacity, width } from '../../../../../assects/strings';
import CustomHeader from '../../../../../component/CustomHeader';
import TabViewComponent from '../../../../../component/TabViewComponent';
import {ButtonComponent} from '../../../../../component/index';

import { BorderDashedIcon, GuitarCompassIcon, GuitarIcon, PianoIcon, TrophyIcon } from '../../../assects/icons';
import routes from '../../../../../routes/routes';


function EventsDetails({ navigation, route }) {
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

    function RenderBasicDetails() {
        return (
            <HomeWorkBasicDetails navigation={navigation} />
        )
    }

    function RenderSubmissions() {
        return (
            <Submissions navigation={navigation} />
        )
    }
    function EventCardComponent({ title }) {
        return (
            <View style={{ padding: 15, alignItems: "center" }} >
                <Text style={{ alignSelf: "flex-start", color: colors.secondryMainColor, fontFamily: fonts.PoppinsSemiBold, fontSize: 15, marginBottom: 10 }} >{title}</Text>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, elevation: 2 }} >
                    <View style={{ height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <GuitarCompassIcon width={width / 12} height={width / 12} />
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {"9:00 to 10:00 am"}</Text>
                        </View>
                        <Text style={{ backgroundColor: "#FDF9F3", color: colors.lightGreen1, fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5 }} >{"Completed"}</Text>
                    </View>

                    <BorderDashedIcon width={width / 1.15} height={12} />

                    <View style={{ paddingLeft: width / 10, paddingRight: width / 20, paddingVertical: 10 }} >
                        {title != "Trophy" ?
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Year:"}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"2022"}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Date:"}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"25 Feb 2022"}</Text>
                                </View>
                            </View>

                            : null}

                        {title != "Trophy" ?
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 5 }} >
                                <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Mentor:"}</Text>

                                <View style={{ flexDirection: "row" }} >
                                    <Image style={{ width: width / 20, height: width / 20, borderRadius: 100, marginLeft: 10 }} source={{ uri: "https://i.pinimg.com/736x/0a/53/c3/0a53c3bbe2f56a1ddac34ea04a26be98.jpg" }} />
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"John Smith"}</Text>
                                </View>
                            </View>
                            :
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Year:"}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"2022"}</Text>
                                </View>

                                <TrophyIcon width={width/7} height={width/7} />
                            </View>
                        }

                    </View>

                    <BorderDashedIcon width={width / 1.15} height={12} />

                    <View style={{ marginTop: 10 }} >
                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 12, color: colors.B212529 }} >Remarks:</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, lineHeight: 20, fontSize: 12, color: colors.B212529 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit </Text>
                    </View>
                </View>

                {title != "Events" ?
                    <View style={{ width: width / 1.08, height: width / 2.8, padding: 10, backgroundColor: colors.white, elevation: 2, marginTop: 10, borderRadius: 10 }} >
                        <View style={{ height: width / 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                                <PianoIcon width={width / 12} height={width / 12} />
                                <View style={{ marginHorizontal: 5 }} >
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, }} > {"Piano Lesson"}</Text>
                                    <Text style={{ color: "#6C7470", fontFamily: fonts.PoppinsSemiBold, fontSize: 10 }} > {"Mock Test"}</Text>

                                </View>
                            </View>
                            <Text style={{ backgroundColor: "#FDF9F3", color: colors.lightGreen1, fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5 }} >{"Completed"}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", paddingLeft: width / 10 }}  >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Date:"}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"1 Mar 2022"}</Text>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Result:"}</Text>
                                    <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"Pass"}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                                <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsBold, borderRadius: 5 }} >{"Result:"}</Text>
                                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, }} > {"Pass"}</Text>
                            </View>

                        </View>
                    </View>
                    : null}
                    
            </View>
        )
    }
    
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.white, }} >
            <View style={{ alignItems: "center" }} >
                <EventCardComponent title={"Performance Record"} />
                <BorderDashedIcon width={width / 1.15} height={width / 10} />

                <EventCardComponent title={"Exams"} />
                <BorderDashedIcon width={width / 1.15} height={width / 10} />

                <EventCardComponent title={"Events"} />
                <BorderDashedIcon width={width / 1.15} height={width / 10} />

                <EventCardComponent title={"Trophy"} />

            </View>
            <ButtonComponent onPress={()=>navigation.navigate(routes.mockTest)} title={"Organize Mock Tests"} bgColor={colors.white} textColor={"#212529"}  style={{width:width/1.10,alignSelf:"center",borderColor:'#6C7470',borderWidth:1}}/>
            <ButtonComponent onPress={()=>navigation.navigate(routes.examRecommendations)} title={"Recommend For Exams"} bgColor={colors.primaryColor} textColor={colors.white}  style={{width:width/1.10,alignSelf:"center",borderColor:'#6C7470',borderWidth:1}}/>

        </ScrollView>
    )
}
export default EventsDetails;