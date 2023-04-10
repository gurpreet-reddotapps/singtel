import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { ArrowBackWhiteIcon, BriefcaseIcon, CardCalendarIcon, ClockBadgeCheckmarkIcon, DollorIcon, DoubleBedIcon, LeavesIcon, VmoLogoIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
import { ButtonComponent } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import Slider from '../../component/SliderComponent';
import routes from '../../routes/routes';
import CheckInModal from '../CheckInCheckOut/Modals/CheckInModal';
import ImagePath from '../Vmo/Constant/ImagePath';
import { BedIcon, CameraIcon, CheckInIcon, DirectoryIcon, PolicyIcon, RoomIcon, Setting24HrIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
import ServiceModalCheckInOut from './Modals/ServiceModalCheckInOut';

const CheckListOut = ({ navigation }) => {
    const dispatch = useDispatch();
    const [showSuccess , setShowSuccess] = useState(false)
    const buttonArray = [
        { title: "Check In", img: DormitoryImages.d1 },
        { title: "Contract", img: DormitoryImages.d2 },
        { title: "Services", img: DormitoryImages.d3 },
        { title: "Check Out", img: DormitoryImages.d4 },

    ]

    function RenderItem({ item, index }) {

        return (
            <View style={{ margin: 5 }} >
                <Image style={{ width: width / 2 - 20, height: width / 3, marginTop: 15 }} source={item.img} />
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <CustomHeader backIcon title={"Check list"} />
            <StatusBar translucent={false} />

            <View>
                <FlatList style={{ paddingHorizontal: 10 }} numColumns={2} data={buttonArray} renderItem={RenderItem} />
            </View>
            <View style={{ width: width / 2 - 20, height: width / 3, alignItems: "center", justifyContent: "center", backgroundColor: colors.C155B9F26, marginLeft: 15, marginTop: 20 }} >
                <CameraIcon width={width / 10} height={width / 10} />
            </View>
            <View style={{ flex: 1 }} />
            <ButtonComponent onPress={()=>setShowSuccess(true)} style={{ width: width / 1.10, alignSelf: "center" }} title={"Confirm checkout"} bgColor={colors.primaryColor} />

            <ServiceModalCheckInOut  
            visible={showSuccess}
            onClose={()=>{setShowSuccess(false),navigation.navigate(routes.checkoutFeedback)}} 
            title="Items verified & check out successfully!         Please give us feedback." />
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default CheckListOut;