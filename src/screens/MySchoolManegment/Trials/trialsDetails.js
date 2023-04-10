import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { IdentiCardIcon } from '../../../assects/Icons';
import CustomHeader from '../../../component/CustomHeader';
import CalendarStrip from 'react-native-calendar-strip';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { height, iosOpacity, width } from '../../../assects/strings';
import { BorderDashedIcon, EditIconIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../assects/icons';
import routes from '../../../routes/routes';
import { getSingleTrialDetails } from '../../../api';
import { LoaderComponet } from '../../../component';




function TrialsDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [trialsDetails, setTrialsDetails] = useState({})
    const [loading, setLoading] = useState(false)

    const teachingSlots = [
        { title: "Guitar Lessons", status: "Complete" },
    ]

    useEffect(() => {
        navigation.addListener('focus', () => {
            GetTrialsDetails();
        })
        GetTrialsDetails();
    }, [])

    function GetTrialsDetails() {
        setLoading(true)
        getSingleTrialDetails(route?.params?.item?.trial_id).then((res) => {
            setTrialsDetails(res.data?.result)
            setLoading(false)
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
        return (
            <Pressable style={[{ width: width / 1.10, height: width / 2.50, padding: 10, borderRadius: 10, borderColor: '#0000000D', borderWidth: 1, backgroundColor: colors.white, marginVertical: 15, alignSelf: "center" }, iosOpacity]} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                        <GuitarIcon width={width / 18} height={width / 15} />
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {item?.category_name}</Text>
                    </View>
                    <Text style={{
                        color: item?.status == "Complete" ? "#00AB6F" :
                            item?.status == "Pending" ? colors.yellow : colors.B212529, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{item?.status}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }} >
                    <BorderDashedIcon width={width / 1.20} height={width / 20} />

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={Person3Icon} title={item?.teacher_name} />
                        <TextWithIconComponent IconE={WatchLaterIcon} title={item?.trial_start_time + ",  " + item?.trial_end_time} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={GuitarWhiteIcon} title={`Grade ${item?.course_name}`} />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title={item?.location_name} />
                    </View>
                </View>
            </Pressable>
        )
    }




    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader title={"Trials Details"} />
            <FlatList
                data={teachingSlots}
                style={{ alignSelf: "center" }}
                renderItem={() => {
                    return (
                        <SlotsCardComponent item={trialsDetails} />
                    )
                }}
                ListFooterComponent={
                    <>
                        <Pressable onPress={() => navigation.navigate(routes.trialsRemarks, { id: trialsDetails?.trial_id })} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: width / 25, paddingHorizontal: 15 }} >
                            <Text style={{ fontFamily: fonts.PoppinsMedium }} >Teacher’s Remarks</Text>
                            <EditIconIcon width={width / 22} height={width / 22} />
                        </Pressable>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.D6D6D, fontSize: 12, paddingHorizontal: 15, marginTop: 5, marginBottom: width / 20 }} >{!trialsDetails?.remark ? "No remark's found" : trialsDetails?.remark}</Text>
                    </>
                }
            />
            <LoaderComponet  visible={loading} />
        </View>
    )
}
export default TrialsDetails;