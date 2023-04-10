import React, { useRef, useState } from 'react';
import { View, FlatList, Text, Pressable, Image, TextInput } from 'react-native';
import { colors } from '../../../../../assects/colors';
import fonts from '../../../../../assects/fonts';
import { width } from '../../../../../assects/strings';
import { ButtonComponent } from '../../../../../component';
import CustomHeader from '../../../../../component/CustomHeader';
import routes from '../../../../../routes/routes';

import { BorderDashedIcon, GuitarIcon, GuitarWhiteIcon, LocationWhiteIcon, MultiplyIcon, Person3Icon, WatchLaterIcon } from '../../../assects/icons';


function AddHomeWorkFeedback({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: width / 10, backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width / 1.15, height: width / 1.3, backgroundColor: colors.white, borderRadius: 10 }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Feedback</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>

                <TextInput
                    placeholder='Type here...'
                    placeholderTextColor={colors.placeHolderTextColor}
                    style={{ flex: 1, textAlign: "left", textAlignVertical: "top", color: colors.B212529, padding: 15, margin: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.CB7B7B733 }} />
                <ButtonComponent onPress={() => navigation.goBack()} title={"Save"} bgColor={colors.primaryColor} style={{ width: width / 1.30, alignSelf: "center" }} />
            </View>

        </View>
    )
}
export default AddHomeWorkFeedback;