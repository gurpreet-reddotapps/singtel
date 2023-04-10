import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import fonts from '../../../../assects/fonts'
import Images from '../../assets/Images'
import { Colors } from '../../Constant/Colors'
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';



const NavigationCard = (props) => {
    const [Status, setStatus] = useState('IP')
    const navigation = useNavigation();


    return (
        <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.8} onPress={props.screenName} >
            <ImageBackground
                source={
                    props.ScreenName == "Job Details" ? Images.yellowBack :
                        props.ScreenName == "Timeline" ? Images.navyBlue :
                            props.ScreenName == "Assign Jobs" ? Images.darkBlue :
                                props.ScreenName == "Service Report" ? Images.lightGreen :
                                    props.ScreenName == "Estimate material check" ? Images.lightPurple :
                                        props.ScreenName == "Check in markings" ? Images.darkGreen :
                                            props.ScreenName == "Materials" ? Images.blue :
                                                props.ScreenName == "Quotations" ? Images.mediumGreen :
                                                    props.ScreenName == "Installer images" ? Images.redback :
                                                        props.ScreenName == "Installer remarks" ? Images.lightGreen :
                                                            props.ScreenName == "Customer images" ? Images.darkPurple :
                                                                // props.ScreenName == "Survey Details" ? Images.serViceBack :
                                                                props.ScreenName == "Check out markings" ? Images.darkBlue :
                                                                    null
                }
                style={styles.UpperCardArea} >
                <Text style={styles.CardHeading} >{props.ScreenName}</Text>
                <MiIcon name="keyboard-arrow-right" size={28} color="#FFFFFF" />
                {/* <MiIcon name="keyboard-arrow-down" size={28} color="#FFFFFF" /> */}
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default NavigationCard

const styles = StyleSheet.create({
    cardWrapper: {
        backgroundColor: '#FFFFFF',
        marginVertical: 5,
        borderRadius: 10,
        margin: '2%',
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
        borderRadius: 10,
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