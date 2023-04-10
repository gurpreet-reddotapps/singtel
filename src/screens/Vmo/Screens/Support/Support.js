import { View, Text, SafeAreaView, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import VMOCustomHeader from '../../Components/VMOCustomHeader'
import { Colors } from '../../Constant/Colors'
import Images from '../../assets/Images'
import fonts from '../../../../assects/fonts'
import { Email, Location, Phone, Print, SupportSVG } from '../../assets/Icons'
import { windowHeight, windowWidth } from '../../utils/Dimension'

const Support = () => {


    const RenderTile = (prop) => (
        <View style={styles.tilesWrapper} >
            <View style={styles.tileStyle} >
                <View style={styles.tileIcon} >
                    {prop.Children}
                </View>
                <Text style={styles.TileHeading} >{prop.Title}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.SupportWrapper} >
            <VMOCustomHeader title={"Support"} backIcon />
            <View style={styles.SupportContentWrapper} >
                <View style={styles.ImageStyle} >
                    <SupportSVG width={200} height={200} />
                    <Text style={styles.MainHeading} >Get in touch</Text>
                    <Text style={styles.subHeading} >For all queries, please contact using
                        the details below.</Text>
                </View>
                <View style={styles.supportTile} >

                    <RenderTile Children={<Location width={windowWidth / 15} height={windowHeight / 25} />} Title={"8 Joo Koon Road Singapore 628972"} />
                    <RenderTile Children={<Print width={windowWidth / 15} height={windowHeight / 25} />} Title={"+65 245888965"} />
                    <RenderTile Children={<Phone width={windowWidth / 15} height={windowHeight / 25} />} Title={"+65 54895851"} />
                    <RenderTile Children={<Email width={windowWidth / 15} height={windowHeight / 25} />} Title={"general@bigfoot.com.sg"} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Support


const styles = StyleSheet.create({
    SupportWrapper: {
        flex: 1,
        backgroundColor: Colors.Pure_White,
    },
    SupportContentWrapper: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    ImageStyle: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    supportTile: {
        width: '100%',
        height: '60%',
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
    tilesWrapper: {
        width: '100%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        shadowColor: '#000',
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
    tileStyle: {
        backgroundColor: ' rgba(21, 91, 159, 0.06)',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 5,
    },
    tileIcon: {
        backgroundColor: 'rgba(21, 91, 159, 0.15)',
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },
    TileHeading: {
        flex: 1,
        fontSize: 14,
        paddingHorizontal: '2%',
        marginHorizontal: '5%',
        lineHeight: 24,
        fontFamily: fonts.PoppinsMedium,
        color: "#212529",

    },
    ArrowIcon: {
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },

})