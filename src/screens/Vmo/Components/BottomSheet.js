import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import fonts from '../../../assects/fonts';

const BottomSheet = (props) => {
    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.RowItem} >
                <Text style={styles.PopUpHeading} >{props.Heading}</Text>
                <MaterialIcon
                    name="close"
                    size={25}
                    color="#777"
                    onPress={props.CloseIT}
                />
            </View>
            <View style={styles.PopUpBottomLine} ></View>
            <View>
                {props.children}
            </View>
        </ScrollView>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    RowItem: {
        flexDirection: "row",
        textAlign: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    PopUpHeading: {
        fontSize: 16,
        color: "#000",
        fontFamily: fonts.PoppinsMedium,
        paddingLeft: 10,
    },
    PopUpBottomLine: {
        minWidth: "100%",
        backgroundColor: "#ddd",
        padding: 1,
    },
})