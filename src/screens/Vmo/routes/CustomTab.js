import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Vibration, Text, Alert } from 'react-native';
import { routesToExcluedNavBar } from '../Constant/Strings';
import { windowHeight, windowWidth } from '../utils/Dimension';
import MICIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity as TouchOpac } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';


const CustomTab = ({ state, descriptors, navigation, isGuest }) => {
    let activeStackState = state.routes[state.index].state;

    const tabBarVisible = routesToExcluedNavBar.includes(activeStackState?.routes[activeStackState.index]?.name);

    // const navigation = useNavigation();




    return !tabBarVisible ? (
        <View style={styles.totalTabWrapper}  >
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, });

                    if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                }

                const AddAlert = () => {
                    Alert.alert("Select option", "Are you sure want to go back", [{ text: "No", style: "cancel" }, { text: "Yes", onPress: () => {navigation.popToTop();} }])
                }

                return (
                    index == 2 ?

                        <View
                            activeOpacity={0.6}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            key={index}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            testID={options.tabBarTestID}
                            style={styles.QRScannerWrapper} >
                            <TouchOpac onPress={onPress} style={styles.QRView} >
                                <MICIcon name='qrcode-scan' size={22} color="#fff" />
                                <Text style={styles.QRText}> SCAN QR</Text>
                            </TouchOpac>
                        </View>
                        : index == 4 ?
                            <TouchableOpacity
                                activeOpacity={0.6}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                key={index}
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={AddAlert}
                                style={styles.bottomStyle}
                            >
                                {options.tabBarIcon({ options })}
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity={0.6}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                key={index}
                                accessibilityRole="button"
                                accessibilityStates={isFocused ? ['selected'] : []}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                style={styles.bottomStyle}
                            >
                                {options.tabBarIcon({ options })}
                            </TouchableOpacity>
                );
            })
            }
        </View>
    ) : null
}

const styles = StyleSheet.create({
    totalTabWrapper: {
        width: "100%",
        height: windowHeight / 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
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
        // backgroundColor: "red",
        // paddingTop: 20,
    },
    totalTabWrapperForCenter: {
        width: "100%",
        height: windowHeight / 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        // elevation: 5
    },
    bottomStyle: {
        width: windowWidth / 18,
        height: windowHeight / 18,
        alignItems: "center",
    },
    centerStyle: {
        width: windowWidth / 18,
        height: windowHeight / 18,
        alignItems: "center",
    },
    QRScannerWrapper: {
        bottom: '90%',
        right: '0%',
        height: windowHeight / 35,
        // top: '0%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 5,
        // backgroundColor: "red",
    },
    QRView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '30%',
        height: '130%',
        backgroundColor: '#AE282E',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 150,
        zIndex: 5,
    },
    QRText: {
        fontSize: 14,
        color: '#fff',
    },
})

export default CustomTab