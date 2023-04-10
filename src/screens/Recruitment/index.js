import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StyleSheet, Text, View, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { getAllJobs } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { LocationBlackIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { getLeaveCategoryBgColors, height, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { RecruitmentImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const Recruitment = ({ navigation }) => {
    const dispatch = useDispatch();
    const array = ["#F0A500", "#EB4747", "#155F7F", "#155F7F"]
    const [TabData] = useState([{ key: "myjobs", title: "My Jobs", data: "0", color: colors.progressColor },
    { key: "openjobs", title: "Open Jobs", data: "0", color: colors.blue },

    ])
    const [allJobs, setAllJobs] = useState([]);
    useEffect(() => {
        getAllJobs().then((res) => setAllJobs(res.data.all_jobs.data)).catch((err) => console.log("err", err))
    }, [])

    // const ListEmptyComponent = () => {
    //     return (
    //         <View style={{ height: height / 1.50, justifyContent: "center", alignItems: "center" }} >
    //             {/* <Text style={{color:colors.warningRed,fontSize:12,marginVertical:10}} >Please stay 5 seconds for notifications</Text> */}
    //             <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 20, color: colors.placeHolderTextColor }} >No leaves avalible to show</Text>
    //             <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.transBlack, textAlign: "center", marginVertical: 10 }} > </Text>
    //         </View>
    //     )
    // }



    const renderTabBar = (data) => {
        return (
            <View  >
                <FlatList style={{ alignSelf: "center", marginVertical: 5 }} showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                    console.log("KDFJKSLD", index)
                    return (
                        <Pressable onPress={() => data.jumpTo(item.key)} style={{
                            width: width / 2.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                            borderTopLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            borderBottomLeftRadius: (data.navigationState.index != 1) && data.navigationState.index == index ? 5 : 0,
                            borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                            alignItems: "center",
                            justifyContent: "center",

                        }} >
                            <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                        </Pressable>

                    )
                }} />
            </View>
        )
    }

    function renderItem({ item, indedx }) {
        return (
            <View style={{ width: width / 3.20, height: width / 2.5, margin: 10, backgroundColor: item, borderRadius: 20 }} >
                <ImageBackground style={{ flex: 1 }} source={RecruitmentImages.mask} >

                </ImageBackground>
            </View>
        )
    }


    const onShare = async (id) => {
        try {
            const result = await Share.share({
                message:
               'https://cristofori-career.reddotapps.com.sg/job-details/'+id,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };



    const ListEmptyComponent = () => {
        return (
            <View style={{ width: width, height: height / 2, alignItems: "center", justifyContent: "center" }} >
                <Image style={{ width: width, height: width / 3, resizeMode: "contain" }} source={Images.no_record_found} />
                <Text style={{ textAlign: "center", width: width / 1.20, alignSelf: "center", fontFamily: fonts.PoppinsRegular, color: colors.B212529, marginTop: 10 }} >No records found </Text>

            </View>
        )
    }


    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Recruitment"} />
            {/* <View>
                <FlatList style={{ paddingLeft: 5,marginVertical:width/15 }} horizontal data={array} renderItem={renderItem} />
            </View> */}
            {/* <TabViewComponent
                Screens={{ myjobs: MyJobs, openjobs: OpenJobs }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} /> */}
            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 14, color: colors.black, margin: 15, marginTop: 20 }} > Open jobs ({allJobs.length})</Text>
            <FlatList ListEmptyComponent={ListEmptyComponent} style={{ alignSelf: "center" }} data={allJobs} renderItem={({ item, index }) => {
                const required_skill = item.required_skills.replace("'\'", "0");
                console.log("SDLKJSOKDJKLSD", required_skill)
                return (
                    <View style={{ width: width / 1.10, height: width / 2.60, marginBottom: 20, backgroundColor: item, borderRadius: 10, overflow: "hidden" }}>
                        <View style={{ width: width / 1.10, height: width / 2.60, flexDirection: "column", justifyContent: "space-between", backgroundColor: getLeaveCategoryBgColors(index), paddingVertical: 10 }} >
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white }}>{item.title}</Text>
                                <View style={{ flexDirection: "row" }} >
                                    <Pressable onPress={() => onShare(item.id)} style={{ backgroundColor: '#FFFFFF50', padding: 8, borderRadius: 8, marginHorizontal: 10 }} >
                                        <Icon name="share-social" color={colors.white} />
                                    </Pressable>
                                    <Pressable onPress={() => navigation.navigate(routes.referJob, { item: item })} style={{ backgroundColor: '#FFFFFF50', padding: 8, borderRadius: 8 }} >
                                        <Icon name="arrow-redo-outline" color={colors.white} />
                                    </Pressable>
                                </View>
                            </View>



                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", paddingHorizontal: 10 }} >
                                <View style={{ backgroundColor: '#FFFFFF50', minWidth: width / 6, maxWidth: width / 3, paddingHorizontal: 10, height: 20, borderRadius: 5, alignItems: "center", justifyContent: "center" }} >
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }}>{item.position_level}</Text>
                                </View>
                                <View style={{ backgroundColor: '#FFFFFF50', minWidth: width / 6, maxWidth: width / 3, paddingHorizontal: 10, height: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginHorizontal: 10 }} >
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }}>{item.employment_type}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }} >
                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    {/* <LocationBlackIcon width={20} height={20} /> */}
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }}>{item.location}</Text>
                                </View>
                                {/* <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 13 }}>SGD {item.monthly_salary_range_min}-{item.monthly_salary_range_max}/<Text style={{ fontSize: 12, color: "#FFFFFF99" }} >Month</Text></Text> */}
                            </View>

                            <Pressable onPress={() => navigation.navigate(routes.jobDetails, { item: item })} style={{ flexDirection: "row", alignSelf: "center" }} >
                                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.white, fontSize: 12 }}>See details</Text>
                                <Icon style={{}} name='chevron-forward' color={colors.white} size={20} />
                                <Icon style={{ right: 12 }} name='chevron-forward' color={colors.white} size={20} />
                            </Pressable>
                        </View>
                        {/* <Image style={{ width: width / 3, height: width / 2.60, position: "absolute", alignSelf: "flex-end", left: width / 1.60, resizeMode: "contain" }} source={Images.eclip} /> */}
                    </View>
                )
            }} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default Recruitment;