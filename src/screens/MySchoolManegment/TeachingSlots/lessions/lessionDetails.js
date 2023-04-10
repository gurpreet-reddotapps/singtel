import React, { useRef, useState } from 'react';
import { View ,FlatList,Text,Pressable} from 'react-native';
import { colors } from '../../../../assects/colors';
import fonts from '../../../../assects/fonts';
import { height, iosOpacity, width } from '../../../../assects/strings';
import CustomHeader from '../../../../component/CustomHeader';
import TabViewComponent from '../../../../component/TabViewComponent';
import BasicDetails from './basicDetails';
import HomeWorks from './Homeworks/homeworks';




function LessionDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "9:00 to 10:00 am", status: "Complete" },
        { title: "10:00 to 11:00 am", status: "Pending" },
        { title: "11:00 to 12:00 pm", status: "Pending" },
        { title: "9:00 to 10:00 am", status: "Upcoming" },

    ]

    const [TabData] = useState([{ key: "basicDetails", title: "Basic Details", data: "0", color: colors.progressColor },
    { key: "homework", title: "Homework's", data: "0", color: colors.blue },
   
    ])


    function RenderTab({ item, index, data }) {
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
    }
    const renderTabBar = (data) => {
        return (
            <View style={[{ backgroundColor: colors.white, marginTop: 15, height: width / 8, elevation: 1, alignSelf: "center", borderRadius: 10 }, iosOpacity]} >
                <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => <RenderTab data={data} item={item} index={index} />} />
            </View>
        )
    }

    function RenderBasicDetails(){
        return(
            <BasicDetails navigation={navigation} route={route} />
        ) 
    }

    function RenderHomeWorks(){
        return(
            <HomeWorks navigation={navigation} route={route} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader backIcon title={route?.params?.item?.class_name} />
            <TabViewComponent
                Screens={{ basicDetails: RenderBasicDetails, homework: RenderHomeWorks }}
                renderTabBar={renderTabBar}
                TabRoutes={TabData} />

        </View>
    )
}
export default LessionDetails;