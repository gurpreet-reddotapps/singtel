import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackWhiteIcon, BriefcaseIcon, CardCalendarIcon, ClockBadgeCheckmarkIcon, DollorIcon, DoubleBedIcon, LeavesIcon, VmoLogoIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, iosOpacity, width } from '../../assects/strings';
import CustomHeader from '../../component/CustomHeader';
import Slider from '../../component/SliderComponent';
import routes from '../../routes/routes';
import CheckInModal from '../CheckInCheckOut/Modals/CheckInModal';
import ImagePath from '../Vmo/Constant/ImagePath';
import { BedIcon, CheckInIcon, DirectoryIcon, PolicyIcon, RoomIcon, Setting24HrIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const Dashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const buttonArray = [
        { title: "Check In", icon: CheckInIcon ,onPress:()=>navigation.navigate(routes.checklistIn) },
        { title: "Contract", icon: PolicyIcon ,onPress:()=>navigation.navigate(routes.contract) },
        { title: "Services", icon: Setting24HrIcon ,onPress:()=>navigation.navigate(routes.services) },
        { title: "Check Out", icon: CheckInIcon ,onPress:()=>navigation.navigate(routes.checklistOut) },
        { title: "Directory", icon: DirectoryIcon ,onPress:()=>navigation.navigate(routes.directory) },

    ]

    function RenderItem({ item, index }) {

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={item.onPress} style={{ alignItems: "center" }} >
                <View style={{ width: width / 6, height: width / 6, alignItems: "center", justifyContent: "center", marginVertical: 5, marginHorizontal: width / 13, borderRadius: 15, backgroundColor: colors.C155B9F26 }} >
                    <item.icon width={width / 9} height={width / 9} />
                </View>
                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginVertical: 10 }} >{item.title}</Text>
            </TouchableOpacity>
        )
    }

    function onEndReachedCheckIn() {
       navigation.replace(routes.checklist)
    }
    function EmptyCard() {
        return (
            <View style={{ bottom: width / 10, height: width / 3, flexDirection: "column", alignItems: "center", justifyContent: "space-around" }} >
                <ImageBackground source={ImagePath.home_gif} style={{ width: width / 5, height: width / 5 }} resizeMode="contain" />
                <Text style={{ color: colors.warningRed }} >No dormitory assigned yet !</Text>
            </View>
        )
    }

    function HeaderBar(){
        return(
            <Pressable  onPress={()=>navigation.goBack()} style={{ width: width, height: width / 5, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, position: "absolute" }} >
            <ArrowBackWhiteIcon width={20} height={20} />
            <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 18, color: colors.white }} >Dormitory</Text>
            <Text style={{ width: 20 }} ></Text>
        </Pressable> 
        )
    }
    return (
        <View style={styles.container} >

            <StatusBar backgroundColor={"transparent"} barStyle="light-content" translucent={true} />

            <ImageBackground style={{ width: width, height: height / 3, alignItems: "center", justifyContent: "flex-end", overflow: "visible" }} source={DormitoryImages.bg} >
                <View style={[{ width: "86%", height: "60%", backgroundColor: colors.white, elevation: 5, top: "30%", borderRadius: 10 },iosOpacity]} >
                    <Image style={{ width: width / 5, height: width / 5, bottom: width / 10, alignSelf: "center" }} source={DormitoryImages.dormitory_pro} />
                    <View style={{ bottom: width / 10, height: width / 3, flexDirection: "column", alignItems: "center", justifyContent: "space-around" }} >
                        <View style={{alignItems:"center"}} >
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsMedium ,fontSize:16}} >Sea view dormitory</Text>
                            <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular }} >BLK 788D Woodlands, Singapore</Text>
                        </View>
                        <View style={{ width: width / 1.40, flexDirection: "row", alignItems: "center", justifyContent: "space-between", }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ width: width / 15, height: width / 15, alignItems: "center", justifyContent: "center", backgroundColor: colors.C155B9F26, borderRadius: 8 }} >
                                    <RoomIcon width={15} height={15} />
                                </View>
                                <Text style={{ color: colors.dardRed, marginLeft: 10,fontFamily:fonts.PoppinsMedium }} >Room # 123</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <View style={{ width: width / 15, height: width / 15, alignItems: "center", justifyContent: "center", backgroundColor: colors.C155B9F26, borderRadius: 8 }} >
                                    <BedIcon width={15} height={15} />
                                </View>
                                <Text style={{ color: colors.dardRed, marginLeft:10,fontFamily:fonts.PoppinsMedium }} >Bed # 123</Text>
                            </View>

                        </View>
                    </View>
                </View>
            </ImageBackground>

          
<HeaderBar/>
            <FlatList numColumns={3} style={{ marginTop: width / 3, alignSelf: "center" }} data={buttonArray} renderItem={RenderItem} />
            <Slider
                childrenContainer={{ backgroundColor: colors.C4C4C4 }}
                onEndReached={onEndReachedCheckIn}

                containerStyle={{
                    width: width / 1.20, height: width / 6.25, alignItems: "center", justifyContent: "center", paddingHorizontal: 6, backgroundColor: colors.CACACA, borderRadius: 100, borderWidth: 1, borderColor: colors.white, alignSelf: "center", marginBottom: 20
                }}
                thumbElement={
                    <View style={{ width: width / 8, height: width / 8, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderColor: colors.primaryColor, borderWidth: 1, borderRadius: 100 }} >
                        <ClockBadgeCheckmarkIcon width={width / 10} height={width / 10} />
                    </View>
                }
            >
                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium, backgroundColor: colors.CACACA }} >{'Confirm onboarding'}</Text>
            </Slider>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default Dashboard;