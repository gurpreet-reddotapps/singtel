import React from "react"
import { FlatList, Pressable, View ,Text} from "react-native"
import { colors } from "../../../../assects/colors"
import fonts from "../../../../assects/fonts"
import { height, iosOpacity, width } from "../../../../assects/strings"


export const renderTabBar = (data) => {
    return (
        <View style={[{ backgroundColor: colors.white, marginTop: 15, width: width / 1.15, elevation: 1, alignSelf: "center", borderRadius: 20 }, iosOpacity]} >
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={data.navigationState.routes} renderItem={({ item, index }) => {
                return (
                    <Pressable onPress={() => data.jumpTo(item.key)} style={{
                        width:data.navigationState.routes?.length == 3 ? width / 3.30 : width/2.30, height: width / 8, backgroundColor: data.navigationState.index == index ? colors.secondryColor : colors.white,
                        borderTopLeftRadius: (data.navigationState.index !=  data.navigationState.routes?.length == 3  ? 2 : 1) && data.navigationState.index == index ? 5 : 0,
                        borderBottomLeftRadius: (data.navigationState.index != data.navigationState.routes?.length == 3  ? 2 : 1) && data.navigationState.index == index ? 5 : 0,
                        borderTopRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                        borderBottomRightRadius: (data.navigationState.index != 0) && data.navigationState.index == index ? 5 : 0,
                        alignItems: "center",
                        justifyContent: "center",

                    }} >
                        <Text style={{ color: data.navigationState.index == index ? colors.white : colors.B212529, fontFamily: fonts.PoppinsRegular }} >{item.title}</Text>
                    </Pressable>

                )
            }} />
        </View>
    )
}