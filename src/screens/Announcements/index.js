import { useTheme } from '@react-navigation/native';
import { useCardAnimation } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, ImageBackground, Animated, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { AbsentIcon, ArrowBackIcon, ArrowForwardIcon, CommentOutlineIcon, HeartOutlineIcon, MoonIcon, NotificationBellIcon, StaticsIcon, SunIcon, TaskCompleteIcon, WeekOffIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import routes from '../../routes/routes';

const Announcements = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [activeTab, SetActiveTab] = useState("0");
    const [ArrayData, setArray] = useState([{ image: Images.an1, like: "1.1k", cmt: "59" },
    { image: Images.an2, like: "1.1k", cmt: "59" },
    { image: Images.an3, like: "1.1k", cmt: "59" },
    { image: Images.an4, like: "1.1k", cmt: "59" },
    { image: Images.an5, like: "1.1k", cmt: "59" },
    { image: Images.an6, like: "1.1k", cmt: "59" },
    { image: Images.an7, like: "1.1k", cmt: "59" },
    { image: Images.an8, like: "1.1k", cmt: "59" }
    ]);
    function renderAnnouncment({ item, index }) {
        return (
            <Pressable onPress={() => navigation.navigate(routes.announcementsPage)} style={{ width: width / 2.43, height: width / 2.40, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, overflow: "hidden" }} >
                <ImageBackground style={{ flex: 1 }} source={item.image}  >
                    <ImageBackground style={{ flex: 1, alignItems: "center", justifyContent: "center" }} source={Images.opacity10} >
                        <View style={{ width: width / 2.43, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingHorizontal: 10 }} >
                            <HeartOutlineIcon width={width / 20} height={width / 20} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{item.like}</Text>
                            <View style={{ width: 1, height: width / 20, backgroundColor: colors.white }} />
                            <CommentOutlineIcon width={width / 20} height={width / 20} />
                            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.white }} >{item.cmt}</Text>
                        </View>
                    </ImageBackground>
                </ImageBackground>
            </Pressable>
        )
    }
    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Announcements"} />
            <FlatList 
            style={{ alignSelf: "center", paddingTop: 10 }} 
            numColumns={2} 
            data={ArrayData} 
            keyExtractor={item=>item.like}
            renderItem={renderAnnouncment} />
        </View>




    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
})
export default Announcements;