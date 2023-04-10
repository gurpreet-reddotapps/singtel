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
import { getTrialDetails } from '../../../api';
import { useSelector } from 'react-redux';
import { LoaderComponet } from '../../../component';
import { MenuWhiteIcon } from '../../../assects/Icons/Vmo';
import Images from '../../../assects/Images';


function Trials({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [trialsDetails, setTrialsDetails] = useState([])
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(false)

    const teachingSlots = [
        { title: "Guitar Lessons", status: "Complete" },
        { title: "Guitar Lessons", status: "Complete" },
        { title: "Guitar Lessons", status: "Complete" },
        { title: "Guitar Lessons", status: "Complete" },

    ]
    useEffect(() => {
        navigation.addListener('focus', () => {
            getTrialsDetailsList();
        })
        getTrialsDetailsList();
    }, [])

    function getTrialsDetailsList() {
        setLoading(true)
        getTrialDetails(user?.user?.id).then((res) => {
            setLoading(false)
            setTrialsDetails(res.data?.result)
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
            <Pressable onPress={() => navigation.navigate(routes.trialsDetails, { item })} style={[{ width: width / 1.10, height: width / 2.50, padding: 10, borderRadius: 10, borderColor: '#0000000D', borderWidth: 1, backgroundColor: colors.white, marginVertical: 15 }, iosOpacity]} >
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
                    <BorderDashedIcon width={width} height={width / 20} />

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


    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height:height/1.5, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 4, resizeMode: "contain" }} source={Images.no_record_found} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: width/20 }} >No trial's found </Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader
                LeftIcon={MenuWhiteIcon}
                onLeftIconPress={() => navigation.openDrawer()}
                title={"Trials"} />
            <FlatList

                data={trialsDetails}
                style={{ alignSelf: "center" }}
                renderItem={SlotsCardComponent} 
                ListEmptyComponent={ListEmptyComponent}
                />
            <LoaderComponet visible={loading} />
        </View>
    )
}
export default Trials;