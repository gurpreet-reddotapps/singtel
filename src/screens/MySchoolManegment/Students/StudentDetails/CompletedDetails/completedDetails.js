import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { iosOpacity, width } from '../../../../../assects/strings';
import CustomHeader from '../../../../../component/CustomHeader';
import TabViewComponent from '../../../../../component/TabViewComponent';
import { GuitarIcon } from '../../../assects/icons';


function CompletedDetails({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const teachingSlots = [
        { title: "Guitar Lessons", status: "01 Jan 2022 - 31 March 2022", term: "Term 1", grade: "Grade 1" },
        { title: "Guitar Lessons", status: "01 Jan 2022 - 31 March 2022", term: "Term 2", grade: "Grade 2" },
        { title: "Guitar Lessons", status: "01 Jan 2022 - 31 March 2022", term: "Term 3", grade: "Grade 3" },
        { title: "Guitar Lessons", status: "01 Jan 2022 - 31 March 2022", term: "Term 4", grade: "Grade 4" },
    ]




    return (
        <View style={{ flex: 1, backgroundColor: colors.white }} >
            <FlatList style={{ marginTop: 20 }} data={teachingSlots} renderItem={({ item, index }) => {
                return (
                    <View style={{ width: width / 1.10, height: width / 3.5,flexDirection:"column",justifyContent:"space-evenly", padding: 10, backgroundColor: colors.white, borderRadius: 10, elevation: 1, alignSelf: "center", marginVertical: 10 }} >
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} >
                            <View style={{ flexDirection: "row", alignItems: "center" }} >
                                <GuitarIcon width={width / 25} height={width / 25} />
                                <Text style={{ fontFamily: fonts.PoppinsMedium, marginLeft: 10 }} >Guiter Lessons</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.PoppinsMedium, color: colors.D6D6D, fontSize: 12 }}  >{item.term}</Text>
                        </View>
                        <Text style={{ fontFamily: fonts.PoppinsMedium, marginLeft: 10 }} >{item.status}</Text>
                    </View>
                )
            }} />
        </View>
    )
}
export default CompletedDetails;