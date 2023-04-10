import React, { useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    Animated,
    FlatList,
    TextInput,
    Pressable,
} from 'react-native';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackWhiteIcon, CommentOutlineBlackIcon, CommentOutlineIcon, HeartIcon, SendIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
const HEADER_MAX_HEIGHT = width;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;



function AnnouncementsPage({navigation}) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const commentData = [{ image: Images.dummy1, name: "Robert Fox", time: "2d", comment: "Routine exercise every morning with sports, either running, or swimming, or jogging, or badminton, " },
    { image: Images.dummy1, name: "Robert Fox", time: "2d", comment: "Routine exercise every morning with sports, either running, or swimming, or jogging, or badminton, " },]

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.5, 0.5],
        extrapolate: 'clamp',
    });
    const imageTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
    });

    function renderComment ({item,index}){
        return (
            <View style={{ width: width, height: width / 3.5, paddingHorizontal: 20, flexDirection: "row", alignItems: "center", borderTopColor:colors.transBorder, borderTopWidth: 1 }} >
                <View style={{ width: width, flexDirection: "row" }} >
                    <Image style={{ width: width / 9, height: width / 9, borderRadius: 10 }} source={item.image} />
                    <View style={{ width: width / 1.30,marginLeft:10 }}  >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }} >{item.name}</Text>
                            <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsLight, fontSize: 12 }} >{item.time}</Text>
                        </View>
                        <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular, fontSize: 12 }} >{item.comment}</Text>

                    </View>
                </View>
            </View>
        )
    }

    return (

        <View style={styles.saveArea}>
            <View style={{ width: width, height: width / 7, zIndex: 10, flexDirection: "row", alignItems: "center", backgroundColor: colors.primaryColor, paddingHorizontal: 15 }} >
               <Pressable onPress={()=>navigation.goBack()} >
                <ArrowBackWhiteIcon width={width / 25} height={width / 25} />
                </Pressable>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }} >
                    <Image style={{ width: width / 10, height: width / 10, borderRadius: 100 }} source={Images.dummy1} />
                    <View>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white }} >HR Manager</Text>
                        <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: colors.white }} >Campaign Text/Content</Text>
                    </View>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.white, marginLeft: 15 }} >16 April 2022</Text>
                </View>
            </View>

            <Animated.ScrollView
                contentContainerStyle={{ paddingTop: width / 1.15, overflow: "visible" }}
                style={{ zIndex: 1 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true },
                )}>
                {/* {DATA.map(renderListItem)} */}
                <View style={{ flex: 1, backgroundColor: colors.white, borderTopLeftRadius: 10, borderTopRightRadius: 10, bottom: 10 }} >
                    <View style={{ width: width / 1.40, height: width / 8, borderBottomColor: "#0404041A", borderBottomWidth: 1, marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", alignSelf: "center" }} >
                        <View style={{ flexDirection: "row" }} >
                            <HeartIcon width={width / 15} height={width / 15} />
                            <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.B212529, marginHorizontal: 10 }} >1,100 Likes</Text>
                        </View>
                        <View style={{ flexDirection: "row" }} >
                            <CommentOutlineBlackIcon width={width / 20} height={width / 20} />
                            <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, color: colors.B212529, marginHorizontal: 10 }} >59 Comments</Text>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: "center", paddingHorizontal: 20, marginTop: width / 20 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.B212529, opacity: 0.6, lineHeight: 30 }} >❤️ LAUNCH OF WE CARE #SERVICEWEEKS2021</Text>
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.B212529, opacity: 0.5, lineHeight: 25 }} >At Woodgrove Division on 23rd January 2021
                        Mr.Sanny, CEO of Big-Foot Group of Companies{'\n'}
                        Together with Minister Lawrence Wong, Ms Hany Soh Adviser of Woodgrove GROs, Mr Alex Yam, Mayor of North West District. Distributed Festive Packs at the rental blocks and spread the festive cheer to the residents! 👍🏽{'\n'}
                        Watch the distribution unfold over the next few weeks and stay tuned to our Event Page:
                        https://www.facebook.com events/232727761775</Text>
                </View>

                <FlatList 
                style={{ marginTop: width / 15 }} 
                data={commentData} 
                renderItem={renderComment} 
                />

                <View style={{width:width/1.20,height:width/8,paddingHorizontal:10,flexDirection:"row",alignItems:"center",borderColor:colors.transPrimary60,borderWidth:1,borderRadius:10,marginTop:width/20,marginBottom:width/5,alignSelf:"center"}} >
                    <TextInput style={{flex:1,color:colors.black,paddingLeft:10}} placeholder={"Add a comment…"} placeholderTextColor={colors.transBlack} />
                    <SendIcon width={width/16} height={width/16} />
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
                <Animated.Image
                    style={[
                        styles.headerBackground,
                        {
                            opacity: imageOpacity,
                            transform: [{ translateY: imageTranslateY }],
                        },
                    ]}
                    source={Images.dummy2}
                />
            </Animated.View>
        </View>

    );
}

const styles = StyleSheet.create({
    saveArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#402583',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        borderRadius: 10,
        marginHorizontal: 12,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.black,
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    topBar: {
        marginTop: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 20,
    },
    avatar: {
        height: 54,
        width: 54,
        resizeMode: 'contain',
        borderRadius: 54 / 2,
    },
    fullNameText: {
        fontSize: 16,
        marginLeft: 24,
    },
});

export default AnnouncementsPage;
