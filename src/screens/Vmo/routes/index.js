// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, Easing, SafeAreaView, StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../../assects/colors';
// import { reduxCheckToken } from '../../../redux/action/User';
// import { width } from '../assets/strings';
import { Colors } from '../Constant/Colors';
//component
import MainStack from './MainStack';


// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();


const Routes = () => {
    // const { userToken, isLoading } = useSelector(state => state.userReducer);
    const isLoading = false;
    // const reduxDispatch = useDispatch()


    // useEffect(() => {
    //     setTimeout(async () => {
    //         reduxDispatch(reduxCheckToken());
    //     }, 500)
    // }, [])

    // if (isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size='large' />
    //         </View>
    //     )
    // }


    const config = {
        animation: 'timing',
        config: {
            duration: 250,
            easing: Easing.linear,
        }
    }

    const closeConfig = {
        animation: 'timing',
        config: {
            duration: 200,
            easing: Easing.linear,
        }
    }


    return (
        <View style={{ flex: 1 }} >
            <StatusBar showHideTransition='fade' backgroundColor={Colors.secondary_Blue} barStyle="light-content" />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                {MainStack(Stack)}
            </Stack.Navigator>
        </View>
    )
}

export default Routes
