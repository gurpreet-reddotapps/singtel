import React, { useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { CheckmarkGreenIcon } from '../../assects/Icons';
import { height, width } from '../../assects/strings';
import { ButtonComponent, LoaderComponet } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import routes from '../../routes/routes';
import { CameraIcon, Change_dormitoryIcon, CleaningIcon, ElectricPlugIcon, HighlighterIcon, PlumbingIcon } from './assects/icons';
import { DormitoryImages } from './assects/images';
import ServiceAppliedModal from './Modals/ServiceAppliedModal';
// import Signature from 'react-native-signature-panel';
const ApplyForServices = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);


    const [services] = useState([
        { title: "Plumbing", Icon: PlumbingIcon },
        { title: "Cleaning", Icon: CleaningIcon },
        { title: "Electrical", Icon: ElectricPlugIcon },
        { title: "Change dormitory", Icon: Change_dormitoryIcon },

    ])


    return (

        <View style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar translucent={false} />
            <CustomHeader backIcon title={"Apply for service"} />
            <ScrollView>
                <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "left", paddingHorizontal: 15, marginTop: 15 }} >Service type</Text>
                <View>
                    <FlatList style={{ marginTop: 10 }} horizontal data={services} renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={0.8} onPress={item.onPress} style={{ alignItems: "center", marginHorizontal: 15 }} >
                                <item.Icon width={width / 6.5} height={width / 6.5} />
                                <Text style={{ color: colors.black, fontFamily: fonts.PoppinsMedium, marginVertical: 10, width: width / 5, textAlign: "center" }} >{item.title}</Text>
                            </TouchableOpacity>
                        )
                    }} />
                </View>


                <View style={{ alignSelf: "center" }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "left", marginTop: 0, marginBottom: 10 }} >Dormitory number</Text>
                    <TextInput style={{ width: width / 1.10, height: width / 8, borderColor: "#006EE933", borderWidth: 1, borderRadius: 8, color: colors.black, paddingLeft: 15 }} placeholder='Dormitory number' placeholderTextColor={colors.placeHolderTextColor} />
                </View>

                <View style={{ alignSelf: "center" }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "left", marginTop: 10, marginBottom: 10 }} >Room number</Text>
                    <TextInput style={{ width: width / 1.10, height: width / 8, borderColor: "#006EE933", borderWidth: 1, borderRadius: 8, color: colors.black, paddingLeft: 15 }} placeholder='Dormitory number' placeholderTextColor={colors.placeHolderTextColor} />
                </View>

                <View style={{ alignSelf: "center" }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "left", marginTop: 15, marginBottom: 10 }} >Details</Text>
                    <TextInput multiline value='Routine exercise every morning with sports, either running, or swimming, or jogging, or badminton, futsal, or similar sports. Work out to form a better body and live a healthier life. '
                        style={{ width: width / 1.10, height: width / 4, borderColor: "#006EE933", borderWidth: 1, borderRadius: 8, color: colors.black, paddingHorizontal: 15 }} placeholder='Dormitory number' placeholderTextColor={colors.placeHolderTextColor} />
                </View>


                <View style={{ paddingLeft: 20 }} >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.primaryColor, textAlign: "left", marginTop: 15, marginBottom: 10 }} >Upload images</Text>
                    <View style={{ width: width / 3.5, height: width / 5, alignItems: "center", justifyContent: "center", backgroundColor: colors.C155B9F26 }} >
                        <CameraIcon width={width / 13} height={width / 13} />
                    </View>
                </View>


            </ScrollView>
            <ButtonComponent onPress={()=> setShowSuccess(true)} title={"Request for service"} bgColor={colors.primaryColor} style={{ width: width / 1.10, alignSelf: "center" }} />
            <ServiceAppliedModal onClose={()=>{setShowSuccess(true),navigation.navigate(routes.services)}} visible={showSuccess} />
            <LoaderComponet visible={loading} />
        </View>
    )
}
const styles = StyleSheet.create({

    imageView: { width: width / 2, height: width / 2 }
})
export default ApplyForServices;