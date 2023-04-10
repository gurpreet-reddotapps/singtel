import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select';
import FeIcon from 'react-native-vector-icons/Feather'


const NewOrder = () => {
    return (
        <View style={{ flex: 1 }} >
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: 'Football', value: 'football' },
                    { label: 'Baseball', value: 'baseball' },
                    { label: 'Hockey', value: 'hockey' },
                ]}
                style={pickerSelectStyles}
                // style={{
                //     ...pickerSelectStyles, iconContainer: {
                //         top: 10,
                //         right: 12,
                //         bottom:150
                //     },
                // }}

                pickerProps={{ style: [pickerSelectStyles, { height: 45, overflow: 'hidden' }] }}
                useNativeAndroidPickerStyle={false}
            // Icon={() => {
            //     return <FeIcon name='chevron-down' size={20} color={"#505050"} />
            // }}
            />
        </View>
    )
}

export default NewOrder


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 10,
        // borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,


    },

    inputAndroid: {
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderColor: 'rgba(0, 110, 233, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        marginBottom: 0,
        shadowColor: 'rgba(0, 110, 233, 0.02)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        height: 45,
        width: "90%"

    },
});
