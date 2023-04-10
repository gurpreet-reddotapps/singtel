import { View, Text, Pressable } from 'react-native'
import React from 'react'
import fonts from '../../../assects/fonts'
import { windowHeight, windowWidth } from '../utils/Dimension'
import { Colors } from '../Constant/Colors'

const CustomButton = ({ title, onPress, style , Textstyle }) => {
    return (
        <Pressable onPress={onPress} style={[{ width: "90%", height: windowHeight / 15, alignItems: "center", justifyContent: "center", alignSelf: 'center', backgroundColor: Colors.primary_Color, borderRadius: 10 }, style]} >
            <Text style={[{ color: Colors.Pure_White, fontFamily: fonts.PoppinsRegular },  Textstyle]} >{title}</Text>
        </Pressable>
    )
}

export default CustomButton