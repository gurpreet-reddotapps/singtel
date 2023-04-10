import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { IdentiCardIcon } from '../../../assects/Icons';
import CustomHeader from '../../../component/CustomHeader';
import CalendarStrip from 'react-native-calendar-strip';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, iosOpacity, width } from '../../../assects/strings';
import { AudioSquareIcon, BorderDashedIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../assects/icons';
import routes from '../../../routes/routes';




function MyCourse({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]



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
            <Pressable onPress={() => navigation.navigate(routes.studentExams, { item })} style={[{ width: width / 1.10, minHeight: width / 2.50, maxHeight: width, padding: 10, borderRadius: 10, borderColor: '#0000000D', borderWidth: 1, backgroundColor: colors.white, marginVertical: 15 }, iosOpacity]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <GuitarIcon width={width / 18} height={width / 15} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {item?.title}</Text>
                    </View>
                    <Text style={{
                        color: item?.status == "Complete" ? "#00AB6F" :
                            item?.status == "Pending" ? colors.yellow : colors.B212529, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{item?.status}</Text>
                </View>

                <View style={{ justifyContent: "center" }} >
                    <BorderDashedIcon width={width} height={width / 20} />

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={Person3Icon} title="Jhon Teo" />
                        <TextWithIconComponent IconE={WatchLaterIcon} title="Grade 1 / Term 1" />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={GuitarWhiteIcon} title="Guitar Lessons" />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title="Bedok Studio BDC 1" />
                    </View>
                </View>

                <Text style={{ fontFamily: fonts.PoppinsLight, color: "#756F6F", fontSize: 12, marginVertical: 10 }}  >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum </Text>
            </Pressable>
        )
    }




    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader title={"My Courses"} RightIcon={
                <Pressable onPress={()=>navigation.navigate(routes.examRecommendations)} >
                    <AudioSquareIcon width={width / 17} height={width / 17} />
                </Pressable>
            } />
            <FlatList
                data={teachingSlots}
                ListHeaderComponent={
                    <>
                        <CalendarStrip
                            ref={dateStripRef}
                            scrollable={true}
                            startingDate={allDate}
                            selectedDate={allDate}

                            showMonth={true}
                            onDateSelected={(data) => fetchHistory(moment(data).format("YYYY-MM-DD"))}
                            scrollToOnSetSelectedDate={true}
                            // onDateSelected={(date) => { dateSelection(date); showDate(date) }}
                            highlightDateContainerStyle={{ backgroundColor: colors.white, shouldAllowFontScaling: false, width: '70%', borderRadius: 0 }}
                            highlightDateNameStyle={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, fontSize: 12 }}
                            highlightDateNumberStyle={{ color: colors.white, fontFamily: fonts.PoppinsMedium, fontSize: 14 }}
                            dayComponentHeight={60}
                            highlightDateNumberContainerStyle={{ backgroundColor: colors.primaryColor, width: width / 10, height: width / 10, alignItems: "center", justifyContent: "center" }}
                            leftSelector={[]}
                            rightSelector={[]}

                            style={{ height: width / 5, shouldAllowFontScaling: true, marginTop: 15, width: width / 1.20, alignSelf: "center" }}
                            dayContainerStyle={{ borderRadius: 5, marginRight: 10 }}
                            calendarHeaderContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start', }}
                            calendarHeaderStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', color: colors.D6D6D, fontSize: 14, bottom: 5, fontFamily: fonts.PoppinsMedium, alignSelf: 'flex-start' }}
                            dateNumberStyle={{ color: '#000', height: width / 10, textAlignVertical: "center", textAlign: "center", fontSize: 14, fontWeight: '600' }}
                            dateNameStyle={{ color: colors.B212529, fontSize: 12, fontFamily: fonts.PoppinsMedium }}


                        // iconContainer={{ backgroundColor: 'red', width: 20, height: 50 }}
                        />

                        <View style={{ width: width / 1.20, height: 1, backgroundColor: colors.darkWhite, marginVertical: 10, alignSelf: "center" }} />

                    </>
                }

                style={{ alignSelf: "center" }}
                renderItem={SlotsCardComponent} />
        </View>
    )
}
export default MyCourse;