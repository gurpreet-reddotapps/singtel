import React, { useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { width } from '../../../assects/strings';
import { MultiplyIcon, SuccessGreenIcon } from '../../MySchoolManegment/assects/icons';

function InquirSentModal({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: width / 10, backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width / 1.15, height: width / 2, backgroundColor: colors.white, borderRadius: 10 }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    {/* <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Feedback</Text> */}
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>
                <View style={{ alignItems: "center", justifyContent: "center" }} >
                    <SuccessGreenIcon width={width / 6} height={width / 6} />
                </View>
                <Text style={{ fontFamily: fonts.PoppinsRegular,paddingHorizontal:20,marginTop:10, fontSize: 14,textAlign:"center", color: colors.B212529, alignSelf: "center" }} >Exam recommendation sent successfully!</Text>

            </View>

        </View>
    )
}
export default InquirSentModal;