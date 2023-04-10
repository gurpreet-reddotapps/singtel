import { View, Text, TextInput, StyleSheet, Pressable, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { windowHeight, windowWidth } from '../utils/Dimension'
import { SearchIconIcon } from '../assets/Icons'
import { SearchAPI } from '../api'
import AntIcon from 'react-native-vector-icons/AntDesign';

const HomeSearch = (props) => {
    const [searchContent, setsearchContent] = useState()


    const SearchData = () => {
        props?.setloading(true)
        let data = {
            search: searchContent
        }
        SearchAPI(data).then((res) => {
            console.log(res?.data, "SEARCH RESULT");
            props?.setRenderData(res?.data)
            props?.setloading(false)
        }).catch(err => { return err; });
    }

    useEffect(() => {
        console.log(searchContent, 'VAL');
        if (searchContent == null || searchContent == undefined || searchContent == "") {
            console.log(searchContent, 'true');
            props?.emptySearch()
        }
    }, [searchContent])


    const tapForLog = () => {
        console.log(searchContent, 'VAL');
        if (searchContent == null || searchContent == undefined || searchContent == "") {
            console.log(searchContent, 'true');
        }
    }

    
    const CrossSearch = () => {
        setsearchContent("")
        Keyboard.dismiss()
    }


    return (
        <View style={[styles.SearchWrapper, { width: props.Customwidth }]} >
            <TextInput style={styles.searchText} value={searchContent} onChangeText={text => setsearchContent(text)} placeholder="Search for jobs" placeholderTextColor={"#1E293BCC"} />
            {(searchContent == undefined || searchContent == "") ?
                null
                :
                <Pressable style={styles.CloseIconArea} onPress={CrossSearch} >
                    <AntIcon name='close' color={"#444"} size={20} />
                </Pressable>
            }
            <Pressable style={styles.IconArea} onPress={SearchData} >
                <SearchIconIcon width={windowWidth / 25} height={windowHeight / 25} />
            </Pressable>
        </View>
    )
}

export default HomeSearch


const styles = StyleSheet.create({
    SearchWrapper: {
        width: '100%',
        height: windowHeight / 20,
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
        flex: 1,
        color: '#000',
        fontSize: 12,
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
    CloseIconArea: {
        marginHorizontal: 5,
    },

})