import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../utils/Dimension'
import { SearchIconIcon } from '../assets/Icons'

const CustomSearch = (props) => {
    return (
        <View style={[styles.SearchWrapper, { width: props.Customwidth }]} >
            <TextInput style={styles.searchText} placeholder="Search for jobs" placeholderTextColor={"#1E293BCC"} />
            <View style={styles.IconArea} >
                <SearchIconIcon width={windowWidth / 25} height={windowHeight / 25} />
            </View>
        </View>
    )
}

export default CustomSearch


const styles = StyleSheet.create({
    SearchWrapper: {
        width: '100%',
        height: windowHeight /20,
        marginVertical: '5%',
        paddingHorizontal: 2,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: "#155B9F99",
        borderWidth: 1,
        borderRadius: 100,

    },
    searchText: {
        color: '#000',
        flex: 1,
        fontSize: 12,
        height: '100%',
        paddingLeft: 12
    },
    IconArea: {
        width: '15%',
        height: '90%',
        alignItems: "center",
        justifyContent: "center",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        backgroundColor: "#155B9F"
    },
})