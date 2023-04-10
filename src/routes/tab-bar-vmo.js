import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../assects/colors';
import { routesToExcluedNavBar, width } from '../assects/strings';


const CustomTabBarVmo = ({ state, descriptors, navigation, isGuest }) => {
    const dispatch = useDispatch();
    const [checkInModal, setCheckInModal] = useState(false);
    const { userLatLng, userCurrentRegion } = useSelector(state => state.userLocation);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const [showLoader, setShowLoader] = useState(false);
    const [confirmatinModal, setConfirmationModal] = useState(false);
    let activeStackState = state.routes[state.index].state;
    const tabBarVisible = routesToExcluedNavBar.includes(activeStackState?.routes[activeStackState.index]?.name);

    return !tabBarVisible ? (
        <View style={{ width: width, height: width / 5, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", backgroundColor: colors.white, elevation: 5 }}  >
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, });
                    if (index == 2) {
                        if (userLatLng) {
                            homeData?.is_checked_in != true ? setCheckInModal("checkIn") : setCheckInModal("checkOut")
                        }
                        else {
                            getLocationPermisson()
                        }
                    }
                    else {
                        if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        key={index}
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        style={{ width:  width / 18, height:  width / 18, alignItems: "center" }}
                    >
                        {options.tabBarIcon({ options })}
                    </TouchableOpacity>
                );
            })}
        </View>
    ) : null
}

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 20, backgroundColor: "red", flexDirection: 'row', width: width, height: 45, borderRadius: 50, justifyContent: "center", alignItems: "center", alignSelf: 'center' }
})

export default CustomTabBarVmo