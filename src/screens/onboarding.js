import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, NativeModules } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { colors } from '../assects/colors';
import fonts from '../assects/fonts';
import { OnBoard1Icon, OnBoard2Icon, OnBoard3Icon } from '../assects/Icons';
import { width } from '../assects/strings';
import routes from '../routes/routes';

const OnBoardingScreen = ({ navigation }) => {
    console.log("Native Module",NativeModules.RNConfig)
    const [lang, setLang] = useState('sp');
    const [accType, setAccType] = useState("customer");
    const [visible, setVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [widthT, setWi] = useState(width);
    const scrollRef = useRef();

  
    const slides = [
        {
            key: 'one',
            title: 'Easy Time Management',
            text: 'With management based on priority and daily tasks, it will give you convenience in managing and determining the tasks that must be done first ',
            image: OnBoard1Icon,
            backgroundColor: '#59b2ab',
        },
        {
            key: 'two',
            title: 'Increase Work Effectiveness',
            text: 'Time management and the determination of more important tasks will give your job statistics better and always improve',
            image: OnBoard2Icon,
            backgroundColor: '#febe29',
        },
        {
            key: 'three',
            title: 'Reminder Notification',
            text: "The advantage of this application is that it also provides reminders for you so you don't forget to keep doing your assignments well and according to the time you have set",
            image: OnBoard3Icon,
            backgroundColor: '#22bcb5',
        }
    ];

    function RenderItems({ item, index }) {
        return (
            <View style={styles.boxContainer} >

                <View style={styles.imgContainer} >
                    <item.image width={width / 1.10} height={width / 1.20} />
                </View>
                <Text style={styles.boxTitle} >{item.title}</Text>
                <Text style={styles.boxDesc} >{item.text}</Text>
            </View>
        )
    }


    const RenderPaginations = ({ activeIndex }) => {
        console.log("activeIndex", activeIndex)
        return (
            <View style={{ width: width, height: 50, position: "absolute" }} >
                <View style={styles.scrollIndicator} >
                    <View style={styles.indicatorView} >
                        <View style={[styles.activeIndicator, { backgroundColor: activeIndex == 0 ? colors.primaryColor : colors.lightBlue }]} />
                        <View style={[styles.activeIndicator, { backgroundColor: activeIndex == 1 ? colors.primaryColor : colors.lightBlue }]} />
                        <View style={[styles.activeIndicator, { backgroundColor: activeIndex == 2 ? colors.primaryColor : colors.lightBlue }]} />
                    </View>
                    <Text onPress={() => navigation.navigate(routes.login)} style={styles.skipText} >skip</Text>
                    

                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            <AppIntroSlider
                data={slides}
                renderItem={RenderItems}
                showSkipButton={true}
                ref={scrollRef}
                onSlideChange={(index, lastIndex) => setCurrentIndex(index)}
                renderPagination={(activeIndex) => <RenderPaginations activeIndex={activeIndex} />}

            />

            <Pressable onPress={currentIndex == 2 ? () => navigation.navigate(routes.login) : () => { scrollRef.current.goToSlide(currentIndex + 1), setCurrentIndex(currentIndex + 1) }} style={styles.btnContainer} >
                <Text style={styles.btnText} >{currentIndex == 2 ? "Get Started" : "Next"}</Text>
            </Pressable>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 },
    scrollIndicator: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, marginTop: 15 },
    indicatorView: { flexDirection: "row" },
    activeIndicator: { width: 10, height: 10, margin: 2, borderRadius: 100 },
    skipText: { fontFamily: fonts.PoppinsMedium, fontSize: 12, color: colors.primaryColor },
    btnContainer: { width: width / 1.10, height: width / 7.5, alignItems: "center", justifyContent: "center", alignSelf: "center", borderRadius: 10, backgroundColor: colors.primaryColor, marginBottom: width / 15 },
    btnText: { fontFamily: fonts.PoppinsRegular, color: colors.white, },
    boxTitle: { color: "#212529CC", fontFamily: fonts.PoppinsSemiBold, fontSize: 16 },
    boxDesc: { color: "#212529CC", fontFamily: fonts.PoppinsRegular, fontSize: 14, width: width / 1.20, height: width / 3.5, marginTop: width / 15, textAlign: "center" },
    imgContainer: { width: width, height: width / 1.10, alignItems: "center" },
    boxContainer: { flex: 1, alignItems: "center", justifyContent: "center" }
})
export default OnBoardingScreen;