import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'
import MiIcon from 'react-native-vector-icons/MaterialIcons';

import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';





const CollapseiveCard = (props) => {
    const [Status, setStatus] = useState('IP')

    

    return (
        <Pressable style={styles.cardWrapper} activeOpacity={0.8} onPress={props.onPress} >
            <View>
                <Collapse touchableOpacityProps={{ activeOpacity: 1 }} >
                    <CollapseHeader>
                        <ImageBackground
                            source={
                                props.ScreenName == "Job Details" ? Images.yellowBack :
                                    props.ScreenName == "Timeline" ? Images.navyBlue :
                                        null
                            }
                            style={[styles.UpperCardArea, { backgroundColor: props.ScreenName == "Job Details" ? '#FFA600' : props.ScreenName == "Timeline" ? "#2672AB" : null, }]} >
                            <Text style={styles.CardHeading} >{props.ScreenName}</Text>
                            {/* <MiIcon name="keyboard-arrow-right" size={28} color="#FFFFFF" /> */}
                            <MiIcon name="keyboard-arrow-down" size={28} color="#FFFFFF" />

                        </ImageBackground>
                    </CollapseHeader>
                    <CollapseBody>
                        {props?.child}
                    </CollapseBody>
                </Collapse>

            </View>
        </Pressable>
    )
}

export default CollapseiveCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: '2%',
        marginBottom: '5%',
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
    UpperCardArea: {
        backgroundColor: '#FFA600',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '4%',
    },
    CardHeading: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Pure_White,
    },
    StatusView: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        borderRadius: 5,

    },
    CardStatus: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
        color: Colors.Pure_White,
    },
})