import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../assects/colors';
import fonts from '../../assects/fonts';
import { iosOpacity, width } from '../../assects/strings';

const TMS = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const mapRef = useRef(null);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);
    const [loading, setLoading] = useState(false);
    const [TabData] = useState([{ key: "ut", title: "Under Time", data: "0", color: colors.progressColor },
    { key: "absent", title: "Absent", data: "0", color: colors.blue },
    { key: "ot", title: "Over Time", data: "0", color: colors.blue },
    ])
    const sheetRef = useRef();

    const UnderTimeView = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
            </View>
        )
    }
    const AbsentView = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
            </View>
        )
    }
    const OverTimeView = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
            </View>
        )
    }

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

    return (
        <View style={styles.container} >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" ,paddingHorizontal:20,marginVertical:20}} >
                <Text style={{ color: colors.primaryColor, fontFamily: fonts.PoppinsMedium }} >Attendance</Text>
                <Text style={{ color: colors.B212529, fontFamily: fonts.PoppinsRegular,fontSize:12 }} >12/07/2022,Tuesday</Text>
            </View>
            <View style={[{width:width/1.20,height:width/2,alignSelf:"center",borderRadius:5,backgroundColor:colors.white,elevation:3},iosOpacity]} >

            </View>

            <View style={{width:width/1.20,height:1,backgroundColor:colors.DBDBDB,marginVertical:width/12,alignSelf:"center"}} />

            <TabViewComponent
                Screens={{ "ut": UnderTimeView, "absent": AbsentView ,"ot":OverTimeView}}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} /> 
        </View >
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
    imageView: { width: width / 2, height: width / 2 }
})
export default TMS;