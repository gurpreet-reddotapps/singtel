import React, { useRef, useState } from 'react';
import { View, FlatList, Text, Pressable, Image } from 'react-native';
import { updateAttendance } from '../../../../api';
import { colors } from '../../../../assects/colors';
import fonts from '../../../../assects/fonts';
import { height, iosOpacity, width } from '../../../../assects/strings';
import CustomHeader from '../../../../component/CustomHeader';
import routes from '../../../../routes/routes';
import { BorderDashedIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../../assects/icons';


function BasicDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [classDetails, setClassDetails] = useState(route?.params?.item);
    const [radioBtn, setRadioBtn] = useState(false);


    const teachingSlots = [
        { title: "Jane Cooper", status: "#122", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "John Smith", status: "#124", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "Jane Cooper", status: "#125", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },
        { title: "John Smith", status: "#126", image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" },

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
            <Pressable onPress={() => navigation.navigate(routes.lessionDetails, { item })} style={[{ width: width / 1.10, height: width / 2.50, alignSelf: "center", padding: 10, borderRadius: 10, backgroundColor: colors.white, marginVertical: 15 }]} >
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
                    <BorderDashedIcon width={width / 1.20} height={width / 20} />

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





    function SwitchBar({ status, onPress }) {
        return (
            <Pressable onPress={onPress} style={{ width: width / 11.5, height: width / 25, alignItems: status ? "flex-end" : "flex-start", justifyContent: "center", backgroundColor: status ? colors.lightGreen1 : "#C7CCD0", borderRadius: 100 }} >
                <View style={{ width: width / 20, height: width / 19, borderRadius: 100, backgroundColor: colors.white, borderWidth: 0.5, borderColor: status ? colors.lightGreen1 : "#C7CCD0" }} >

                </View>
            </Pressable>
        )
    }

    console.log("classDetails?.student_ids",classDetails?.student_ids)

    function UpdateAtt(id){
        setRadioBtn(!radioBtn)
        const data = {
            attendance:!radioBtn?"present":"absent"
        }
        updateAttendance(id,data).then((res)=>{
            console.log("SPDJKSJDKLSJDLKSJLKD",res)
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >

            <FlatList

                ListHeaderComponent={
                    <View>
                        <SlotsCardComponent item={classDetails} />
                        {/* <View style={{ width: width / 1.20, height: 1, backgroundColor: colors.cE6EBF1, alignSelf: "center", marginTop: 5 }} />
                        <Text style={{ fontFamily: fonts.PoppinsMedium, marginLeft: 20, marginTop: width / 20 }} >Teacher’s Remarks</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.D6D6D, fontSize: 12, marginLeft: 20, marginTop: 5, marginBottom: width / 20 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum </Text> */}
                    </View>
                }
                data={classDetails?.student_ids}
                ItemSeparatorComponent={() => <View style={{ width: width / 1.15, borderBottomWidth: 0.5, borderBottomColor: colors.placeHolderTextColor, alignSelf: "center" }} />}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable  style={{ width: width, height: width / 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <Image style={{ width: width / 8, height: width / 8, borderRadius: 100 }} source={{ uri: item.image ? item.image : "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" }} />
                                <View style={{ paddingLeft: 15 }} >
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529 }} >{item.student_name}</Text>
                                    <Text style={{ fontFamily: fonts.PoppinsLight, color: colors.D6D6D, fontSize: 12 }} >#{index+1}</Text>
                                </View>
                            </View>
                                <SwitchBar onPress={()=>UpdateAtt(item?.student_id)} status={radioBtn} />
                        </Pressable>
                    )
                }} />
        </View>
    )
}
export default BasicDetails;