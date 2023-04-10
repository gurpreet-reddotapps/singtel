import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, View, Text, Pressable, FlatList, TextInput, ImageBackground, Image, ScrollView, SafeAreaView, Animated } from 'react-native'

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { FloatingAction } from "react-native-floating-action";
import { Colors } from '../../Constant/Colors';
import fonts from '../../../../assects/fonts';
import VMOCustomHeader from '../../Components/VMOCustomHeader';
import ImagePath from '../../Constant/ImagePath';
import CustomSearch from '../../Components/CustomSeach';
import Images from '../../assets/Images';
import FloatingButton from '../../Components/FloatingButton';
import JobsCard from '../../Components/Cards/JobsCard';
import NavigationCard from '../../Components/Cards/NavigationCard';
import RNPickerSelect from 'react-native-picker-select';
// import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import NavigationString from '../../routes/NavigationString';
import { HomeJobData } from '../../api';
import Spinner from '../../Components/Spinner';
import DropDown, { Dropdown } from '../NewOrder/DropDown';
import { useSelector, useDispatch } from 'react-redux';
import HomeSearch from '../../Components/HomeSearch';
import { windowHeight, windowWidth } from '../../utils/Dimension';
import { colors } from '../../../../assects/colors';
import { getCloser } from './utils';
import { width } from '../../../../assects/strings';
import { setJobClose } from '../../../../redux/actions/Job';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const { diffClamp } = Animated;
const headerHeight = windowWidth / 1.15;



const Home = () => {

    const [renderdata, setRenderData] = useState();
    const [DataLength, setDataLength] = useState();
    const [loading, setloading] = useState(false);
    const [HeaderDate, setHeaderDate] = useState();
    const [TOdayOnlyDate, setTOdayOnlyDate] = useState(new Date());
    const [showCalander, setshowCalander] = useState(false);


    const navigation = useNavigation();
    const ForOnlyDate = useRef();
    const dispatch = useDispatch();
    const { jobClosed } = useSelector(state => state.JobDetails);

    const { homeData } = useSelector(state => state.homeDetails);

    const HomeAPI = (data) => {
        setloading(true)
        HomeJobData(data).then((res) => { console.log(res?.data); setRenderData(res.data); setloading(false); }).catch(err => { setloading(false); return err; });
    }


    useEffect(() => {
        showDate(allDate)
        HomeAPI({ start_date: startDate, end_date: endDate, })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setshowCalander(false)
            setshowCalander(true)
        }, 10);
    }, [])

    useEffect(() => {
        setTOdayOnlyDate(new Date())
        if (jobClosed == true) {
            showDate(allDate)
            HomeAPI({ start_date: startDate, end_date: endDate, })
            dispatch(setJobClose(false));
        }
    }, [])

    const emptySearch = () => {
        showDate(allDate)
        HomeAPI({ start_date: startDate, end_date: endDate, })
    }

    useEffect(() => {
        setDataLength(renderdata?.length)
    }, [renderdata])


    const allDate = new Date()
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);

    const startDate = moment(allDate).format('YYYY-MM-DD')
    const endDate = moment(allDate).format('YYYY-MM-DD')
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    const SelectedDate = (year + '-' + month + '-' + date);

    const showDate = (formatDate) => {
        let date = moment(formatDate).format('DD');
        let day = moment(formatDate).format('ddd ');
        let month = moment(formatDate).format('MMM');
        let year = moment(formatDate).format('YYYY');
        let objForDate = {
            date: date,
            day: day,
            month: month,
            year: year,
        }
        setHeaderDate(objForDate)
    }


    const dateSelection = (date) => {
        let BothDate = moment(date).format('YYYY-MM-DD');
        let data = {
            start_date: BothDate,
            end_date: BothDate,
        }
        HomeAPI(data)
    }

    useFocusEffect(
        React.useCallback(() => {
            HomeAPI({ start_date: startDate, end_date: endDate, });
            console.log("BACK Beforoe")
            return () => {
                setshowCalander(false)
                setTimeout(() => {
                    setshowCalander(true)
                }, 10);
                showDate(allDate); HomeAPI({ start_date: startDate, end_date: endDate, }); setTOdayOnlyDate(new Date())
            }


        }, [])
    );

    // Action Button

    const actions = [
        {
            text: "Reporting only",
            icon: require("../../assets/Images/reportOnly.png"),
            name: "bt_accessibility",
            position: 1,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "Accidental claims",
            icon: Images.reportOnly,
            name: "bt_language",
            position: 2,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        },
        {
            text: "General servicing & repair",
            icon: Images.claim,
            name: "bt_room",
            position: 3,
            margin: 0,
            textStyle: { fontFamily: fonts.PoppinsRegular, fontSize: 12 },
            size: 10
        }
    ];

    const renderDataFlatList = ({ item }) => (
        <>
            <JobsCard jobStatus={'IP'} data={item} />
        </>
    )

    const tapForLog = () => {
        console.log(homeData?.user?.role_name, "IT IS HOME DATA");
    }




    const ref = useRef(null);

    const scrollY = useRef(new Animated.Value(0));
    const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);

    const translateY = scrollYClamped.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0, -(headerHeight / 2)],
    });
    const translateYNumber = useRef();

    translateY.addListener(({ value }) => {
        translateYNumber.current = value;
    });

    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
        },
    );

    const handleSnap = ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        if (
            !(
                translateYNumber.current === 0 ||
                translateYNumber.current === -headerHeight / 2
            )
        ) {
            if (ref.current) {
                ref.current.scrollToOffset({
                    offset:
                        getCloser(translateYNumber.current, -headerHeight / 2, 0) ===
                            -headerHeight / 2
                            ? offsetY + headerHeight / 2
                            : offsetY - headerHeight / 2,
                });
            }
        }
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: width, height: 40, backgroundColor: 'yellow', zIndex: 999 }} >
                <VMOCustomHeader menuIcon title={"VMO"} />
            </View>
            <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
                {/* <Header {...{headerHeight}} /> */}
                <View style={{ width: width, height: headerHeight / 2, backgroundColor: '#FFFFFF' }} >
                    <View style={styles.calenderWrapper} >
                        <View style={styles.headerDateWrapper} >
                            <Text style={styles.DateText} >{HeaderDate?.date}</Text>
                            <View style={styles.subDateWrapper} >
                                <Text style={styles.yearDayText} >{HeaderDate?.day}</Text>
                                <Text style={styles.yearDayText} >{HeaderDate?.month} {HeaderDate?.year}</Text>
                            </View>
                        </View>
                        <View style={styles.CalenderArea} >
                            {showCalander == true ?
                                <CalendarStrip
                                    scrollable={true}
                                    startingDate={TOdayOnlyDate}
                                    selectedDate={TOdayOnlyDate}
                                    showMonth={false}
                                    startDate={false}
                                    updateWeekView={moment(new Date())}
                                    onWeekChange={moment(new Date())}
                                    useIsoWeekday={false}
                                    scrollToOnSetSelectedDate={true}
                                    onDateSelected={(date) => { dateSelection(date); showDate(date); }}
                                    highlightDateContainerStyle={{ backgroundColor: '#004A7F', shouldAllowFontScaling: false, width: '70%', borderRadius: 10 }}
                                    highlightDateNameStyle={{ color: '#fff', }}
                                    highlightDateNumberStyle={{ color: '#fff', }}
                                    dayComponentHeight={60}
                                    leftSelector={[]}
                                    rightSelector={[]}
                                    style={{ height: 100, justifyContent: 'center', shouldAllowFontScaling: true, }}
                                    dayContainerStyle={{ borderRadius: 5, marginRight: 10, }}
                                    calendarHeaderContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                    calendarHeaderStyle={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'flex-start' }}
                                    dateNumberStyle={{ color: '#000', fontSize: 16, fontWeight: '600' }}
                                    dateNameStyle={{ color: '#BCC1CD', fontSize: 12, fontWeight: '500' }}
                                    iconContainer={{ backgroundColor: 'red', width: 0, height: 0 }}
                                />
                                : null}
                        </View>
                    </View>
                </View>

                <View style={{ width: width, height: headerHeight / 2.8, backgroundColor: colors.white, borderBottomColor: "#eee", borderBottomWidth: 1 }} >
                    <HomeSearch Customwidth={'90%'} emptySearch={emptySearch} setloading={setloading} setRenderData={setRenderData} />
                    <Text style={{ color: colors.black, fontSize: 12, fontFamily: fonts.PoppinsLight, marginLeft: 15 }}  ><Text style={{ fontFamily: fonts.PoppinsBold, fontSize: 14 }} >Jobs</Text> ({DataLength} jobs available) </Text>
                </View>


            </Animated.View>
            {DataLength !== 0 ?
                loading === true ?
                    <SkeletonPlaceholder  >
                        <ScrollView style={styles.ShadowStyle} >
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                            <View style={styles.ThirdShadow} />
                        </ScrollView>
                    </SkeletonPlaceholder>
                    :
                    <View >
                        <Animated.FlatList data={renderdata}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ paddingTop: headerHeight - 50 }}
                            onScroll={handleScroll}
                            ref={ref}
                            keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
                            renderItem={renderDataFlatList}
                            ListFooterComponent={<View style={styles.FlatBottom} />}
                        />
                    </View>
                :
                <View style={styles.imageBackgroundWrapper} >
                    <View style={styles.ImageWrap} >
                        <ImageBackground source={ImagePath.home_gif} style={styles.ImageBackgroundStyle} height={windowHeight}  >

                        </ImageBackground>
                    </View>
                </View>
            }

        </SafeAreaView>
    )
}

export default Home




const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        backgroundColor: '#1c1c1c',
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1,
        top: 40,
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    Floatcontainer: {
        backgroundColor: Colors.Pure_White,
    },
    calenderWrapper: {
        width: '100%',
        height: "100%",
    },
    CalenderArea: {
        width: '100%',
        height: '50%',
        borderBottomColor: "rgba(21, 91, 159, 0.25)",
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
    headerDateWrapper: {
        flexDirection: 'row',
        width: '100%',
        height: "50%",
        // backgroundColor: 'red',
        paddingHorizontal: '5%',
        paddingTop: '5%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subDateWrapper: {
        justifyContent: 'flex-end',
        paddingHorizontal: '3%',
    },
    DateText: {
        color: Colors.secondary_Black,
        fontSize: 44,
        fontFamily: fonts.PoppinsSemiBold,
        lineHeight: 60,
        // fontWeight: '500',
    },
    yearDayText: {
        color: '#155B9F66',
        fontSize: 14,
        fontFamily: fonts.PoppinsSemiBold,
        lineHeight: 21,
        fontWeight: '500',
    },
    totalJobSection: {
        padding: '2%',
        height: '60%',
    },
    JobsHeadTextArea: {
        fontFamily: fonts.PoppinsRegular,
        color: '#212529',
        marginLeft: 15,
        height: '5%',
    },
    JobsHeadText: {
        color: "#212529",
        fontFamily: fonts.PoppinsBold,
        fontSize: 18
    },
    imageBackgroundWrapper: {
        flex: 1,
        width: windowWidth,
        height: "50%",
        // zIndex: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
        top: 10,
        // margin: '5%',
    },
    ImageWrap: {
        width: windowWidth,
        height: windowHeight / 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'center',
    },
    ImageBackgroundStyle: {
        height: '85%',
        width: '85%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'flex-end'
    },
    FlatBottom: {
        paddingBottom: 150,
        height: windowHeight / 2,
    },
    ShadowStyle: {
        // alignItems: "center",
        width: '90%',
        alignSelf: 'center',
        height: windowHeight,
        marginTop: '70%',
        paddingHorizontal: 5,
    },
    DateTouchableShadow: {
        width: windowWidth / 1.1,
        alignSelf: 'center',
        height: windowHeight / 15,
        borderRadius: 10,
        marginVertical: 15,
    },
    SecondShadow: {
        width: windowWidth / 2,
        marginTop: 20,
        justifyContent: 'flex-end',
        height: 25,
        borderRadius: 4,
    },
    ThirdShadowView: {
        flexDirection: 'row',
    },
    ThirdShadow: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: 140,
        borderRadius: 10,
    },
    GraphShadow: {
        width: windowWidth / 1.2,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        justifyContent: 'flex-end',
        height: windowHeight / 4,
        borderRadius: 10,
    },
})