import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ImageBackground, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getStudentsListByTeacherId } from '../../../api';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { SearchIconIcon } from '../../../assects/Icons';
import { MenuWhiteIcon } from '../../../assects/Icons/Vmo';
import Images from '../../../assects/Images';
import { height, iosOpacity, width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { FemaleFaceIcon, FilterIcon, MaleFaceIcon, MusicNoteIcon } from '../assects/icons';

function Students({ navigation }) {
    const { user } = useSelector(state => state.userDetails);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudentsListByTeacherId(user?.user?.id).then((res) => {
            console.log("SHJDKSHDJKHSDJKHSJKDHSJKDHJKSHDJKSHDKJ", res?.data?.result?.data)
            setStudents(res?.data?.result?.data)
        })
    }, [])

    const userdData = [
        {
            name: "John Smith",
            image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
            id: "#123-Crew"
        },
        {
            name: "Jane Cooper",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            id: "#123-Crew"
        },
        {
            name: "Jane Cooper",
            image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            id: "#123-Crew"
        },
        {
            name: "Jane Cooper",
            image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
            id: "#123-Crew"
        },
    ]


    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 4, resizeMode: "contain" }} source={Images.no_record_found} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: width/20 }} >No student's found </Text>

            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader
                LeftIcon={MenuWhiteIcon}
                onLeftIconPress={() => navigation.openDrawer()}
                title={"Students"} />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: width / 20 }} >
                <Pressable onPress={() => navigation.navigate(routes.sortScreen)} >
                    <FilterIcon width={width / 15} height={width / 15} />
                </Pressable>
                <View style={{ width: width / 1.25, height: width / 9, flexDirection: "row", alignItems: "center", justifyContent: "flex-end", borderWidth: 1, borderColor: colors.black, borderRadius: 100 }} >
                    <TextInput placeholder='Search' placeholderTextColor={colors.placeHolderTextColor} style={{ flex: 1, paddingLeft: 15, color: colors.B212529 }} />
                    <View style={{ width: width / 7, height: width / 9, alignItems: "center", justifyContent: "center", backgroundColor: colors.primaryColor, borderTopRightRadius: 100, borderBottomRightRadius: 100 }} >
                        <SearchIconIcon width={width / 20} height={width / 20} />
                    </View>
                </View>
            </View>

            <FlatList
                ListEmptyComponent={ListEmptyComponent}
                style={{ alignSelf: "center", marginTop: 15 }} numColumns={2} data={students} renderItem={({ item, index }) => {
                    var years = moment().diff(item?.dob, 'years', false);
                    return (
                        <Pressable onPress={() => navigation.navigate(routes.studentDetails, { id: item?.student_id })} style={{ width: width / 2.40, height: width / 1.9, flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, elevation: 1, borderRadius: 15, margin: 8 }} >
                            <ImageBackground borderRadius={100} style={{ width: width / 4.5, height: width / 4.5, alignItems: "flex-end", justifyContent: "flex-start" }} source={{ uri: item.profile }} >
                            </ImageBackground>
                            <View  >
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 14, textAlign: "center" }} >{item.student_name}</Text>
                                <View style={{ width: width / 3, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                                        {item?.gender == "male" ? <MaleFaceIcon width={width / 20} height={width / 20} /> :
                                            <FemaleFaceIcon width={width / 20} height={width / 20} />}
                                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 14, color: "#22215B", marginLeft: 4 }} >{years}</Text>
                                    </View>
                                    <View style={{ width: 2, height: width / 20, backgroundColor: colors.darkWhite }} />
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }} >
                                        <MusicNoteIcon width={width / 20} height={width / 20} />
                                        <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 14, color: "#22215B" }} >{" 20"}</Text>
                                    </View>
                                </View>
                            </View>

                        </Pressable>
                    )

                }} />



        </View>
    )
}
export default Students;