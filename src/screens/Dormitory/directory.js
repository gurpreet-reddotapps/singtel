import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon } from '../../assects/Icons';
import Images from '../../assects/Images';
import { height, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { ElectricPlugIcon, HighlighterIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const Directory = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const dummyArray = [
        { title: "Police", contactNo: "1800 255 0000", icon: DormitoryImages.police },
        { title: "Ambulance", contactNo: "1800 255 0000", icon: DormitoryImages.ambulance },
        { title: "Wade warren", contactNo: "1800 255 0000", icon: Images.dummy1 },
        { title: "Wade warren", contactNo: "1800 255 0000", icon: Images.dummy1 },
        { title: "Wade warren", contactNo: "1800 255 0000", icon: Images.dummy1 },
        { title: "Wade warren", contactNo: "1800 255 0000", icon: Images.dummy1 },
        { title: "Wade warren", contactNo: "1800 255 0000", icon: Images.dummy1 },
      


    ]
    function renderItem({ item, index }) {
        return (
            <View style={{ width: width,flexDirection:"row",alignItems:"center",paddingTop:15,paddingBottom:5,paddingHorizontal:15 }} >
                <Image style={{width:width/7,height:width/7,borderRadius:100}} source={item.icon} />
                <View style={{paddingLeft:15}} >
                    <Text style={{fontFamily:fonts.PoppinsMedium,color:colors.primaryColor}} >{item.title}</Text>
                    <Text style={{fontFamily:fonts.PoppinsRegular,color:colors.transBlack}} >{item.contactNo}</Text>
                </View>
            </View>
        )

    }
    function ItemSeparatorComponent() {
        return (
            <View style={{ borderBottomColor: colors.darkWhite, borderBottomWidth: 1 }} />
        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: "center" }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Directory"} />
            <FlatList ItemSeparatorComponent={ItemSeparatorComponent} data={dummyArray} renderItem={renderItem} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default Directory;