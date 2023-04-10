import React, { useRef } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { height, width } from '../../assects/strings';
import { ButtonComponent } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import { HighlighterIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const Contract = ({ navigation }) => {
    const dispatch = useDispatch();
    const buttonArray = [
        { title: "Check In", img: DormitoryImages.d1 },
        { title: "Contract", img: DormitoryImages.d2 },
        { title: "Services", img: DormitoryImages.d3 },
        { title: "Check Out", img: DormitoryImages.d4 },

    ]
    const ref = useRef();

    const handleOK = (signature) => {
        console.log(signature);
        onOK(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        console.log("Empty");
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        console.log("clear success!");
    };

    // Called after end of stroke
    const handleEnd = () => {
        ref.current.readSignature();
    };

    // Called after ref.current.getData()
    const handleData = (data) => {
        console.log(data);
    };


    function RenderItem({ item, index }) {

        return (
            <View style={{ margin: 5 }} >
                <Image style={{ width: width / 2 - 20, height: width / 3, marginTop: 15 }} source={item.img} />
            </View>
        )
    }
    const style = `.m-signature-pad--footer {display: none; margin: 0px; height:100px;}`;

    return (

        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Contract"} />
            <ImageBackground resizeMode='contain' style={{ width: width, height: height / 2 + 20, justifyContent: "flex-end", paddingLeft: width / 6, paddingBottom: 10, alignSelf: "center", marginTop: width / 10 }} source={DormitoryImages.dummyDoc} >
                <TouchableOpacity style={{ width: width / 3, height: 30, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.C155B9F26 }} >
                    <HighlighterIcon width={15} height={15} />
                    <Text style={{ fontFamily: fonts.PoppinsRegular, color: colors.black }} >Signature</Text>
                </TouchableOpacity>
            </ImageBackground>
            <View style={{ flex: 1 }} >
            </View>
            <ButtonComponent style={{ width: width / 1.10, alignSelf: "center" }} title={"Send for review"} bgColor={colors.primaryColor} />
        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default Contract;