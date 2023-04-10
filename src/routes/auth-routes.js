import React from 'react';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import {View,Easing} from 'react-native';
import SplashScreen from '../screens/splash';
import route from './routes';
import { height, width } from '../assects/strings';
import LoginScreen from '../screens/AuthenticationScreens/loginScreen';
import SignupScreen from '../screens/AuthenticationScreens/signupScreen';
import OnBoardingScreen from '../screens/onboarding';
import ContactSupport from '../screens/AuthenticationScreens/ContactSupport';
import SetUpYourPinScreen from '../screens/Homepage/SetUpYourPin';
import ForgotPassword from '../screens/AuthenticationScreens/ForgotPassword';

const Stack = createStackNavigator();

console.log("SISJHSJHSJHJS",height,width)
const AuthNavigation = () =>{

    const config = {
        animation: 'timing',
        config: {
          duration: 400,
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
    
    return(
        <Stack.Navigator   screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}>  
            {/* <Stack.Screen  name={route.splash} component={SplashScreen} /> */}

            <Stack.Screen  name={route.onBoard} component={OnBoardingScreen} />
            <Stack.Screen  name={route.login} component={LoginScreen} />
            <Stack.Screen  name={route.contactSupprot} component={ContactSupport} />
            <Stack.Screen name={route.setUpYourPin} component={SetUpYourPinScreen} />
            <Stack.Screen name={route.forgotPassowrd} component={ForgotPassword} />



           
        </Stack.Navigator>
    )
}  
export default AuthNavigation;