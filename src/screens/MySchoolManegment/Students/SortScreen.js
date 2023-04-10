import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '../../../assects/colors';
import fonts from '../../../assects/fonts';
import { CheckmarkGrayIcon } from '../../../assects/Icons';
import { width } from '../../../assects/strings';
import { ButtonComponent } from '../../../component';
import { CheckmarkWhiteIcon, MultiplyIcon } from '../assects/icons';

function SortScreen({ navigation, route }) {
    const dateStripRef = useRef();
    const [allDate, setAllDate] = useState(new Date())
    const sortData = [
        { title: "Name", value: 1 },
        { title: "Age", value: 0 },
        { title: "Gender", value: 0 },
        { title: "Grade", value: 0 },
    ]

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", paddingBottom: width / 10, backgroundColor: colors.transBlack60 }} >
            <View style={{ width: width / 1.20, height: width, backgroundColor: colors.white, borderRadius: 10 }} >
                <Pressable onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12 }}  >
                    <Text style={{ fontFamily: fonts.PoppinsMedium, fontSize: 16, color: colors.B212529 }} ></Text>
                    <Text style={{ fontFamily: fonts.PoppinsSemiBold, fontSize: 16, color: colors.B212529 }} >Sort</Text>
                    <MultiplyIcon width={width / 25} height={width / 25} />
                </Pressable>
                <FlatList data={sortData} renderItem={({ item, index }) => {
                    return (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} >
                            <View style={{ width: width / 20, height: width / 20, alignItems: "center", justifyContent: "center", margin: 12, borderRadius: 4, backgroundColor: item.value ? colors.cEB4747 : colors.white, borderColor: "#EDEDED", borderWidth: 1 }} >
                                {item?.value ? <CheckmarkWhiteIcon width={width / 30} height={width / 30} /> : null}
                            </View>
                            <Text style={{ fontFamily: fonts.PoppinsSemiBold, color: colors.black,marginLeft:5 }} >{item.title}</Text>
                        </View>
                    )
                }} />
                <ButtonComponent onPress={() => navigation.goBack()} title={"Save"} bgColor={colors.primaryColor} style={{ width: width / 1.30, alignSelf: "center" }} />
            </View>

        </View>
    )
}
export default SortScreen;