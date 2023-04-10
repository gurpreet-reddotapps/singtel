import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ImageBackground, Image } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { NotificationBellIcon, SearchIconIcon } from '../../../assects/Icons';
import { NotificationActiveIcon } from '../../../assects/Icons/TabIcons';
import Images from '../../../assects/Images';
import { iosOpacity, width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { GuitarWhiteIcon } from '../../MySchoolManegment/assects/icons';
import { DrumGrayIcon, DrumWhiteIcon, FemaleFaceIcon, FilterIcon, GuitarGrayIcon, MaleFaceIcon, MusicCombGrayIcon, MusicCombWhiteIcon, MusicFilesGrayIcon, MusicNoteIcon, MusicYellowIcon, NotificationWhiteIcon, TransLogoIcon, ViolinGrayIcon, ViolinWhiteIcon } from '../assects/icons';
import { StudentManageImage } from '../assects/images';
import { ButtonComponent } from '../../../component/index'
function StudentsHome({ navigation }) {
    const [selectedItem, setSelectedItem] = useState("#121-Crew");

    const userdData = [
        {
            name: "John Smith",
            image: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
            id: "#121-Crew",
            iconActive: GuitarWhiteIcon,
            iconInActive: GuitarGrayIcon,
            image: StudentManageImage.guitar

        },
        {
            name: "Jane Cooper",
            image: "https://us.123rf.com/450wm/fizkes/fizkes2011/fizkes201102042/fizkes201102042.jpg?ver=6",
            id: "#122-Crew",
            iconActive: MusicCombWhiteIcon,
            iconInActive: MusicCombGrayIcon,
            image: StudentManageImage.piano

        },
        {
            name: "Jane Cooper",
            image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            id: "#123-Crew",
            iconActive: ViolinWhiteIcon,
            iconInActive: ViolinGrayIcon,
            image: StudentManageImage.violin

        },
        {
            name: "Jane Cooper",
            image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
            id: "#124-Crew",
            iconActive: DrumWhiteIcon,
            iconInActive: DrumGrayIcon,
            image: StudentManageImage.guitar

        },
        {
            name: "Jane Cooper",
            image: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
            id: "#125-Crew",
            iconActive: MusicCombWhiteIcon,
            iconInActive: MusicFilesGrayIcon,
            image: StudentManageImage.guitar

        },
    ]

    const contentData = [
        {
            id: "#121-Crew",
            title_desc: "Unlock your child’s potential with CRISTOFORI’S guitar lessons",
            title: "Guitar Lessons",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum por Lorem ipsum dolor sit amet, consectetur ",
            image: StudentManageImage.guitar
        },
        {
            id: "#122-Crew",
            title_desc: "Unlock your child’s potential with CRISTOFORI’S guitar lessons",
            title: "Piano Lessons",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum por Lorem ipsum dolor sit amet, consectetur ",
            image: StudentManageImage.piano
        },
        {
            id: "#123-Crew",
            title_desc: "Unlock your child’s potential with CRISTOFORI’S guitar lessons",
            title: "Violin Lessons",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum por Lorem ipsum dolor sit amet, consectetur ",
            image: StudentManageImage.violin
        },
        {
            id: "#124-Crew",
            title_desc: "Unlock your child’s potential with CRISTOFORI’S guitar lessons",
            title: "Guitar Lessons",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum por Lorem ipsum dolor sit amet, consectetur ",
            image: StudentManageImage.guitar
        },
        {
            id: "#125-Crew",
            title_desc: "Unlock your child’s potential with CRISTOFORI’S guitar lessons",
            title: "Guitar Lessons",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum por Lorem ipsum dolor sit amet, consectetur ",
            image: StudentManageImage.guitar
        }
    ]


    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <ImageBackground style={{ width: width, height: width / 3, justifyContent: "center", paddingHorizontal: 20 }} source={StudentManageImage.header} >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                    <TransLogoIcon width={width / 7} height={width / 7} />
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <Pressable onPress={() => navigation.navigate(routes.childrenProfile)}  >
                            <Image style={{ width: width / 11, height: width / 11, marginHorizontal: 15, borderRadius: 100, borderWidth: 1, borderColor: colors.white }} source={Images.dummy1} />
                        </Pressable>
                        <NotificationWhiteIcon width={width / 15} height={width / 15} />
                    </View>
                </View>
            </ImageBackground>
            <View style={{ flex: 1 }} >
                <View style={{ flexDirection: "row", alignItems: "center",padding:15 }} >
                    <MusicYellowIcon width={width / 15} height={width / 15} />
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.B212529, marginLeft: 10 }} >Music Lessons </Text>
                </View>
                <View>
                    <FlatList style={{ marginVertical: width / 25 }} horizontal data={userdData} renderItem={({ item, index }) => {
                        return (
                            <Pressable onPress={() => setSelectedItem(item.id)} style={{ width: width / 7.8, height: width / 7.8, marginHorizontal: 10, alignItems: "center", justifyContent: "center", backgroundColor: selectedItem == item.id ? colors.cFEB23F : colors.cf7f9fd, borderRadius: 100 }} >
                                {item.id == selectedItem ? <item.iconActive width={width / 13} height={width / 13} /> :
                                    <item.iconInActive width={width / 13} height={width / 13} />}
                            </Pressable>
                        )
                    }} />
                </View>
                <FlatList data={contentData.filter((a) => a.id == selectedItem)} renderItem={({ item, index }) => {
                    return (
                        <View style={{ width: width }} >
                            <Text style={{ width: width / 1.5, alignSelf: "center", textAlign: "center", fontFamily: fonts.PoppinsLight, marginTop: 10, fontSize: 12 }} >{item.title_desc}</Text>
                            <Text style={{ width: width / 1.5, alignSelf: "center", textAlign: "center", fontFamily: fonts.PoppinsBold, marginTop: 10, fontSize: 24 }} >{item.title}</Text>
                            <Text style={{ width: width / 1.5, alignSelf: "center", textAlign: "center", fontFamily: fonts.PoppinsLight, marginTop: 10, fontSize: 12 }} >{item.desc}</Text>
                            <Image style={{ width: width, height: width / 1.8, resizeMode: "contain", marginTop: 15 }} source={item.image} />
                            <View style={{ padding: 15 }} >
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.B212529 }} >Lesson Details</Text>
                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.B212529, marginTop: width / 15 }} >1. Fundamental Guitar Lessons</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, marginTop: 10, color: "#756F6F", fontSize: 12, lineHeight: 20 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit ameLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit </Text>

                                <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.B212529, marginTop: width / 10 }} >2. Classical Music Approach</Text>
                                <Text style={{ fontFamily: fonts.PoppinsRegular, marginTop: 10, color: "#756F6F", fontSize: 12, lineHeight: 20 }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit ameLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ipsumLorem ipsum dolor sit </Text>
                            </View>
                            <ButtonComponent onPress={() => navigation.navigate(routes.studentInquiryFor)} title={"Inquire Now"} bgColor={colors.primaryColor} style={{ width: width / 1.2, alignSelf: "center", marginRight: 20 }} />
                        </View>
                    )
                }} />
            </View>

        </View>
    )
}
export default StudentsHome;