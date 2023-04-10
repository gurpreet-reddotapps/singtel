import React from 'react'
import NavigationStrings from '../routes/NavigationString'
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
import { Easing } from 'react-native';
import TabRoutes from './TabRoutes.';
import { CheckIn, CheckOut, CustomerImages, CustomerRemark, EstimateMaterial, InstallerImages, InstallerRemark, JobDetail, Material, MyChats, NewOrder, Profile, QuoInstallerImagestations, Quotations, ReportingOnly, Support, TermsCondition, UpdatePass } from '../Screens';

export default function (Stack) {

    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 50,
            mass: 3,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
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

        <>
            <Stack.Screen
                name={NavigationStrings.TABS_ROUTE}
                component={TabRoutes}
            />
            <Stack.Screen
                name={NavigationStrings.NEW_ORDER}
                component={NewOrder}
            />
            <Stack.Screen
                name={NavigationStrings.JOB_DETAIL_SCREEN}
                component={JobDetail}
            />

            <Stack.Screen
                name={NavigationStrings.ESTIMATE_MATERIAL}
                component={EstimateMaterial}
            />

            <Stack.Screen
                name={NavigationStrings.MATERIALS_SCREEN}
                component={Material}
            />

            <Stack.Screen
                name={NavigationStrings.CHECK_IN}
                component={CheckIn}
            />

            <Stack.Screen
                name={NavigationStrings.CHECK_OUT}
                component={CheckOut}
            />

            <Stack.Screen
                name={NavigationStrings.QUATATION_LIST}
                component={Quotations}
            />

            <Stack.Screen
                name={NavigationStrings.INSTALLER_IMAGES}
                component={InstallerImages}
            />

            <Stack.Screen
                name={NavigationStrings.INSTALLER_REMARKS}
                component={InstallerRemark}
            />

            <Stack.Screen
                name={NavigationStrings.CUSTOMER_IMAGES}
                component={CustomerImages}
            />

            <Stack.Screen
                name={NavigationStrings.CUSTOMER_REMARK}
                component={CustomerRemark}
            />

            <Stack.Screen
                name={NavigationStrings.PROFILE_SCREEN}
                component={Profile}
            />

            <Stack.Screen
                name={NavigationStrings.UPDATEPASSWORD_SCREEN}
                component={UpdatePass}
            />

            <Stack.Screen
                name={NavigationStrings.SUPPORT_SCREEN}
                component={Support}
            />

            <Stack.Screen
                name={NavigationStrings.TERMSCONDITION_SCREEN}
                component={TermsCondition}
            />

            <Stack.Screen
                name={NavigationStrings.REPORTING_ONLY}
                component={ReportingOnly}
            />

            <Stack.Screen
                name={NavigationStrings.MY_CHATS}
                component={MyChats}
            />


        </>
    )
}