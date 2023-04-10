import { useFocusEffect } from '@react-navigation/core';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { createOrGetChat, getChatMessages, sendMessage, uploadChatDocument } from '../../api';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { PaperClipIcon, SendBtnBlueIcon } from '../../assects/Icons/leave';
import { hitSlop, iosOpacity, width } from '../../assects/strings';
import { LoaderComponet, ShowErrorMessage } from '../../component';
import CustomHeader from '../../component/CustomHeader';
import TabViewComponent from '../../component/TabViewComponent';
import TMS from './TMS';

const DashboardUsers = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(false);
    const [TabData] = useState([{ key: "tms", title: "TMS", data: "0", color: colors.progressColor },
    { key: "e-leave", title: "E-Leave", data: "0", color: colors.blue },
    { key: "payroll", title: "Payroll", data: "0", color: colors.blue },
    ])
    const sheetRef = useRef();

    function RenderTab({ item, index, data }) {
        return (
            <Pressable onPress={() => data.jumpTo(item.key)} style={{
                width: width / 3.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.primaryColor : colors.white,
                borderTopLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                borderBottomLeftRadius: (data.navigationState.index != 2) && data.navigationState.index == index ? 5 : 0,
                borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                alignItems: "center",
                justifyContent: "center",

            }} >
                <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
            </Pressable>

        )
    }

    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => <RenderTab data={data} item={item} index={index} />} />
            </View>
        )
    }
    // function TMS({ item, index }) {
    //     return (
    //         <View style={{ width: width / 2.40, height: width / 5.50, alignItems: "center", justifyContent: "center", backgroundColor: colors.green, borderRadius: 20, marginHorizontal: 5, marginVertical: 5 }}>
              
    //         </View>
    //     )
    // }
    function ELeave({ item, index }) {
        return (
            <View style={{ width: width / 2.40, height: width / 5.50, alignItems: "center", justifyContent: "center", backgroundColor: colors.green, borderRadius: 20, marginHorizontal: 5, marginVertical: 5 }}>
              
            </View>
        )
    }
    function Payroll({ item, index }) {
        return (
            <View style={{ width: width / 2.40, height: width / 5.50, alignItems: "center", justifyContent: "center", backgroundColor: colors.green, borderRadius: 20, marginHorizontal: 5, marginVertical: 5 }}>
              
            </View>
        )
    }
    return (
        <View style={styles.container} >
            <CustomHeader backIcon title={"Dashboard"} />
            <TabViewComponent
                Screens={{ "tms": TMS, "e-leave": ELeave ,"payroll":Payroll}}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} /> 
        </View >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default DashboardUsers;