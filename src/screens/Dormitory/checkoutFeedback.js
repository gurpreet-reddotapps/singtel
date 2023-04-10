import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { AverageIcon, ElectricPlugIcon, HappyIcon, HighlighterIcon, PoorIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
// import Signature from 'react-native-signature-panel';
const CheckoutFeedback = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const emojis = [{ emoji: HappyIcon }, { emoji: AverageIcon }, { emoji: PoorIcon }]


    return (

        <View style={{ flex: 1, backgroundColor: 'white', alignItems: "center" }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Feedback"} />
            <View style={{ flex: 1 }} >
                <Text style={{ marginTop: width / 10, color: colors.black, fontFamily: fonts.PoppinsMedium, fontSize: 16, width: width, textAlign: "left", paddingLeft: 15 }} >How was your experience ?</Text>
                <View style={{ paddingLeft: 15, height: width / 5, marginTop: 20 }}  >
                    <FlatList horizontal data={emojis} renderItem={({ item, index }) => {
                        return (
                            <View style={{ marginRight: width / 10 }} >
                                <item.emoji width={width / 8} height={width / 8} />
                            </View>
                        )
                    }} />
                </View>
                <TextInput
                    multiline
                    style={{ width: width / 1.10, height: width / 3.5, alignSelf: "center", borderColor: "#006EE933", borderWidth: 1, borderRadius: 5, color: colors.black, paddingHorizontal: 15,textAlign:"left",textAlignVertical:"top" }} 
                    placeholder='Describe your experience here.' 
                    placeholderTextColor={colors.placeHolderTextColor} />
            </View>

            <ButtonComponent onPress={() => navigation.navigate(routes.applyForService)} title={"Send feedback"} bgColor={colors.primaryColor} style={{ width: width / 1.10 }} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default CheckoutFeedback;