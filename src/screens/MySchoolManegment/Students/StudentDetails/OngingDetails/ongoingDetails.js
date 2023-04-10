import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { iosOpacity, width } from '../../../../../assects/strings';
import CustomHeader from '../../../../../component/CustomHeader';
import TabViewComponent from '../../../../../component/TabViewComponent';
import routes from '../../../../../routes/routes';
import { GuitarIcon } from '../../../assects/icons';


function OngoingDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "Guitar Lessons", status: "James Smith", term: "June 01, 2022", grade: "Grade 1" },
        { title: "Guitar Lessons", status: "James Smith", term: "June 01, 2022", grade: "Grade 2" },
        { title: "Guitar Lessons", status: "James Smith", term: "June 01, 2022", grade: "Grade 3" },
        { title: "Guitar Lessons", status: "James Smith", term: "June 01, 2022", grade: "Grade 4" },
    ]


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

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <FlatList style={{ marginTop: 20 }} data={teachingSlots} renderItem={({ item, index }) => {
                return (
                    <Pressable onPress={() => navigation.navigate(routes.ongoingLessonDetails)} style={{ width: width / 1.10, height: width / 3.5, flexDirection: "column", justifyContent: "space-evenly", padding: 10, backgroundColor: colors.white, borderRadius: 10, elevation: 1, alignSelf: "center", marginVertical: 10 }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <GuitarIcon width={width / 25} height={width / 25} />
                                <Text style={{ fontFamily: fonts.PoppinsMedium, marginLeft: 10 }} >Guiter Lessons</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.D6D6D, fontSize: 12 }}  >{item.term}</Text>
                        </View>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, marginLeft: 10 }} >{item.status}</Text>
                    </Pressable>
                )
            }} />

        </View>
    )
}
export default OngoingDetails;