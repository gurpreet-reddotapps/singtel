import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import { Chat } from '../../assets/Icons'
import { windowHeight, windowWidth } from '../../utils/Dimension'
import fonts from '../../../../assects/fonts'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/Images'

const MyChats = () => {
    const [chatsLength, setChatsLength] = useState(0)
    navigation = useNavigation();
    return (
        <SafeAreaView style={styles.MyChatsWrapper} >
            <VMOCustomHeader title={"My chats"} backIcon />
            <View style={styles.MyChatsContentWrapper} >
                {chatsLength === 0 || chatsLength === undefined ?
                    <>
                        <View style={styles.CenterContent} >
                            <Chat width={windowWidth / 1.2} height={windowHeight / 1.5} />
                        </View>
                        <View style={styles.TextArea} >
                            <Text style={styles.MainHeading} >No chats available!</Text>
                            <Text style={styles.subHeading} >Your chat section is empty. Start
                                conversation now.</Text>
                        </View>
                    </>
                    :
                    <View style={styles.ChatItemWrapper} >
                        <Pressable style={styles.ChatItem} onPress={() => { }} >
                            <View style={styles.ShadowItem} >
                                <View style={styles.ChatUserImageOver} >
                                    <Image style={styles.ChatUserImage} source={Images.profilePic} />
                                </View>
                                <View style={styles.GreenDot} ></View>
                            </View>
                            <View style={styles.NameMessageArea}>
                                <Text style={styles.ChatName} >Gunther Beard</Text>
                                <Text style={styles.MessageText} >Quisque blandit arcu quis turpis tincidunt facilisis…</Text>
                            </View>
                            <View style={styles.TimeCount} >
                                <Text>32 min</Text>
                                <Text style={styles.Count} >2</Text>
                            </View>
                            <View style={styles.BottomLine} />
                        </Pressable>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

export default MyChats

const styles = StyleSheet.create({
    MyChatsWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    MyChatsContentWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    CenterContent: {
        // backgroundColor: 'pink',
        width: '100%',
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    TextArea: {
        // backgroundColor: 'yellow',
        width: '100%',
        height: '50%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    MainHeading: {
        fontSize: 20,
        // paddingVertical: 10,
        color: '#000',
        fontFamily: fonts.PoppinsSemiBold,
        lineHeight: 30,
    },
    subHeading: {
        fontSize: 16,
        paddingVertical: 10,
        color: "rgba(33, 37, 41, 0.6)",
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 24,
        textAlign: 'center',
        width: '80%',
    },
    ChatItemWrapper: {
        // backgroundColor: 'red',
    },
    ChatItem: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // backgroundColor: 'red',
    },
    ChatUserImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        zIndex: 2,
    },
    ChatUserImageOver: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
        zIndex: 2,

    },
    ShadowItem: {
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 50,
        elevation: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    GreenDot: {
        backgroundColor: "#27AE60",
        height: 15,
        width: 15,
        position: "absolute",
        right: 0,
        top: 0,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        borderRadius: 50,
        zIndex: 5,
        borderColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 8,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 20,
        shadowOpacity: 0.25,
    },
    NameMessageArea: {
        width: '70%',
        paddingHorizontal: 15,
        justifyContent: "center",
    },
    TimeCount: {
        justifyContent: "center",
        alignItems: "center",
    },
    Count: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#155B9F",
        color: "#fff",
        paddingHorizontal: 6,
        borderRadius: 100,
    },
    ChatName: {
        fontFamily: fonts.PoppinsSemiBold,
        color: "#155B9F",
        fontSize: 14,
        lineHeight: 21,
    },
    MessageText: {
        fontFamily: fonts.PoppinsMedium,
        color: "#155B9F",
        fontSize: 12,
        lineHeight: 15,
    },
    BottomLine: {
        borderBottomColor: "rgba(21, 91, 159, 0.15)",
        borderBottomWidth: 0.5,
        alignSelf: 'center',
        width: '85%',
        position: 'absolute',
        bottom: 0,
        right: 10,
    },



})