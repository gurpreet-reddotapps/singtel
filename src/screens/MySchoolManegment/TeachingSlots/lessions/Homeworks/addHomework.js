import React, { useRef, useState } from 'react';
import { View, FlatList, Text, Pressable, Image, TextInput, Keyboard, ScrollView } from 'react-native';
import { createHomeWork } from '../../../../../api';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { width } from '../../../../../assects/strings';
import { ButtonComponent, LoaderComponet, ShowErrorMessage } from '../../../../../component';
import CustomHeader from '../../../../../component/CustomHeader';
import routes from '../../../../../routes/routes';

import { BorderDashedIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, Person3Icon, WatchLaterIcon } from '../../../assects/icons';


function AddHomeWork({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")



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
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsSemiBold, marginHorizontal: 5 }} > {"9:00 to 10:00 am"}</Text>
                    </View>
                    <Text style={{
                        color: item?.status == "Complete" ? "#00AB6F" :
                            item?.status == "Pending" ? colors.yellow : colors.B212529, backgroundColor: "#FDF9F3", fontSize: 12, fontFamily: fonts.PoppinsBold, paddingHorizontal: 10, borderRadius: 5
                    }} >{"Upcoming"}</Text>
                </View>

                <View style={{ flex: 1, justifyContent: "center" }} >
                    <BorderDashedIcon width={width / 1.20} height={width / 20} />

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={Person3Icon} title="Jhon Teo" />
                        <TextWithIconComponent IconE={WatchLaterIcon} title="Grade 1 / Term 1" />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }} >
                        <TextWithIconComponent IconE={GuitarWhiteIcon} title="Guitar Lessons" />
                        <TextWithIconComponent IconE={LocationWhiteIcon} title="Bedok Studio BDC 1" />
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
    function AddHomeWork() {
        if (title && desc) {
            setLoading(true)
            const data = {
                title: title,
                desc: desc,
                class: route?.params?.classData?.class_id,
            }
            console.log("createHomeWork", data)
            createHomeWork(data).then((res) => {
                console.log("createHomeWork", res.data)

                setLoading(false)
                navigation.goBack();
            }).catch(() => setLoading(false))
        }
        else {
            ShowErrorMessage("please fill all details")
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={"Add Homework"} />
            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, margin: 20 }} >Homework Title</Text>
            <TextInput
                style={{ width: width / 1.10, height: width / 8, paddingLeft: 15, color: colors.B212529, borderRadius: 10, alignSelf: "center", borderWidth: 1, borderColor: colors.CB7B7B733 }}
                placeholder="Homework 1"
                placeholderTextColor={colors.placeHolderTextColor}
                onChangeText={(text) => setTitle(text)}
                value={title}
            />

            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, margin: 20 }} >Description</Text>
            <TextInput
                multiline
                style={{ width: width / 1.10, minHeight: width / 3, maxHeight: width, textAlign: "left", textAlignVertical: "top", paddingLeft: 15, color: colors.B212529, borderRadius: 10, alignSelf: "center", borderWidth: 1, borderColor: colors.CB7B7B733 }}
                placeholder="Write some description here..."
                returnKeyType='next'
                placeholderTextColor={colors.placeHolderTextColor}
                onChangeText={(text) => setDesc(text)}
                value={desc}
            />
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }} />
            <ButtonComponent onPress={() => AddHomeWork()} title={"Save"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
export default AddHomeWork;