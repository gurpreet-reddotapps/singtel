import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { IdentiCardIcon, MenuIcon } from '../../../assects/Icons';
import CustomHeader from '../../../component/CustomHeader';
import CalendarStrip from 'react-native-calendar-strip';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, iosOpacity, width } from '../../../assects/strings';
import { BorderDashedIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../assects/icons';
import routes from '../../../routes/routes';
import { getTeachingSlots, getTrialDetails } from '../../../api';
import { useSelector } from 'react-redux';
import { LoaderComponet } from '../../../component';
import Images from '../../../assects/Images';
import moment from 'moment';
import { MenuWhiteIcon } from '../../../assects/Icons/Vmo';




function TeachingSlots({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [trialsDetails, setTrialsDetails] = useState([])
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.userDetails);

    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]



    useEffect(() => {
       fetchTeachingSlots();
    }, [])

    function fetchTeachingSlots(filterDate){
        const data = {
            id:user?.user?.id,
            date:filterDate?filterDate:moment().format("YYYY-MM-DD")
        }
        console.log("SSDJSDS",data)
        setLoading(true)
        getTeachingSlots(data).then((res) => {
            setLoading(false)
            console.log("getTeachingSlots", res.data?.result?.data)
            setTrialsDetails(res.data?.result?.data)
        })
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
        console.log("DSDD",item?.status)
        return (
            <Pressable onPress={() => navigation.navigate(routes.lessionDetails, { item })} style={[{ width: width / 1.10, height: width / 2.50, padding: 10, borderRadius: 10, borderColor: '#0000000D', borderWidth: 1, backgroundColor: colors.white, marginVertical: 15 }, iosOpacity]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <GuitarIcon width={width / 18} height={width / 15} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {item?.start_time} to {item?.end_time}</Text>
                    </View>
                    <Text style={{
                        color: item?.status == "complete" ? "#00AB6F" :
                            item?.status == "pending" ? colors.yellow : colors.B212529, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{item?.status}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }} >
                    <BorderDashedIcon width={width} height={width / 20} />

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={Person3Icon} title={item?.teacher} />
                        <TextWithIconComponent IconE={WatchLaterIcon} title={item?.course_name + "/" + item?.terms_enrol_for} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={GuitarWhiteIcon} title={item?.category_name} />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title={item?.location_name} />
                    </View>
                </View>
            </Pressable>
        )
    }


    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 4, resizeMode: "contain" }} source={Images.no_record_found} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: width/20 }} >No data found </Text>

            </View>
        )
    }
    console.log("sdfd",trialsDetails.filter((a)=>a.class_details?.length !=0))

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader 
            LeftIcon={MenuWhiteIcon} 
            onLeftIconPress={()=>navigation.openDrawer()}
            title={"Teaching Slots"} 
            />
            <FlatList
                data={trialsDetails.filter((a)=>a.class_details?.length !=0)}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={
                    <>
                        <CalendarStrip
                            ref={dateStripRef}
                            scrollable={true}
                            startingDate={allDate}
                            selectedDate={allDate}

                            showMonth={true}
                            onDateSelected={(data) => fetchTeachingSlots(moment(data).format("YYYY-MM-DD"))}
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
            <LoaderComponet visible={loading} />
        </View>
    )
}
export default TeachingSlots;