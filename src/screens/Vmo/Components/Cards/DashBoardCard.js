import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import Images from '../../assets/Images'

const DashBoardCard = () => {
    return (
        <ImageBackground style={{ width: width / 3, height: width / 2, justifyContent: "space-between", marginHorizontal: index == 0 ? 15 : 5 }} source={item?.image} >
            <Text style={{ backgroundColor: colors.white, width: width / 5, borderRadius: 10, alignSelf: "flex-end", marginTop: 15, marginRight: 10, color: colors.black, fontSize: 10, lineHeight: 15, fontFamily: fonts.PoppinsRegular, textAlign: "center" }} >{item.request} Request</Text>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }} >
                <View style={{ marginBottom: width / 15 }} >
                    <item.icon width={15} height={20} />
                </View>
                <Text style={{ width: width / 4, fontFamily: fonts.PoppinsSemiBold, color: colors.white, fontSize: 16 }} >{item.title}</Text>
            </View>
            <View style={{ paddingHorizontal: 10, paddingBottom: 10 }} >
                <Text style={{ fontSize: 10, fontFamily: fonts.PoppinsLight, color: colors.white }} >Progress</Text>
                <View style={{ width: width / 4, height: 2, backgroundColor: colors.white, borderRadius: 10 }} />
                <Text style={{ fontSize: 10, fontFamily: fonts.PoppinsLight, color: colors.white, alignSelf: "flex-end" }} >30%</Text>
            </View>
        </ImageBackground>
    )
}

export default DashBoardCard


const styles = StyleSheet.create({
    ImageBackDashView: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        borderRadius: 20,
    },
    ImageBackDash: {
        height: '75%',
        // width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(2, 160, 252, 1)',
    },
    percenttext: {
        // paddingHorizontal: '10%',
        // paddingVertical: '10%',
    },

})