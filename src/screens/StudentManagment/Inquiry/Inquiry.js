import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { width } from '../../../assects/strings';
import CustomHeader from '../../../component/CustomHeader';
import routes from '../../../routes/routes';
import { GuitarIcon } from '../../MySchoolManegment/assects/icons';

function Inquiry({navigation}) {
    const data = [{ title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    { title: "Guitar Lessons ", time: "10 mins ago", id: "#123", stauts: 0 },
    ]

    function CardComponent() {
        return (
            <Pressable onPress={()=>navigation.navigate(routes.studentLessonInquiry)} style={{ width: width / 1.10, height: width / 3.5, flexDirection: "row", borderRadius: 10, marginTop: width / 20, backgroundColor: colors.white, elevation: 2, alignSelf: "center" }} >
                <View style={{ width: 5, height: width / 3.5, backgroundColor: colors.lightGreen1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                </View>
                <View style={{ flex: 1, paddingTop: 10 }} >
                    <View style={{ height: width / 7, alignItems: "center" }} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: width / 1.20 }} >
                            <View style={{ flexDirection: "row" }} >
                                <GuitarIcon width={width / 12} height={width / 10} />

                                <View style={{ marginLeft: 10 }} >
                                    <Text style={{ fontFamily: fonts.PoppinsBold }} >Guitar Lessons </Text>
                                    <Text style={{ fontFamily: fonts.PoppinsMedium, color: "#6E798C" }} >#123 </Text>
                                </View>
                            </View>
                            <View  >
                                <Text style={{ fontFamily: fonts.PoppinsLight, fontSize: 12, color: ' #6E798C;' }} >10 mins ago</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: width / 3, height: width / 12, alignItems: "center", justifyContent: "center", borderRadius: 100, alignSelf: "flex-end", marginRight: 10, backgroundColor: colors.lightGreen1 }} >
                        <Text style={{ color: colors.white,fontFamily:fonts.PoppinsSemiBold,fontSize:12 }} >Trial complete</Text>
                    </View>

                </View>

            </Pressable>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <CustomHeader title={"Inquiry"} />
            <FlatList data={data} renderItem={CardComponent} />
          
        </View>
    )
}
export default Inquiry;