import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Easing } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import NavigationString from '../routes/NavigationString';
import MICIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Dashboard, Home, Jobs, Settings, Scan, NewOrder, JobDetail, EstimateMaterial, Material, CheckIn, CheckOut, Quotations, InstallerImages, InstallerRemark, CustomerImages, CustomerRemark, Profile, UpdatePass, Support, TermsCondition, ReportingOnly, MyChats, QuotationDetail, NewQuotation, AssignJobs, AdminHome, AdminJobDetail, NewReporting, NewAccidentalClaim, Surveyor, AdminJobs, NewSurveyor, NewInsuranceCompany, EditInsuranceCompany, EditSurveyor, SurveyDetail, ApproveSurveyDetail, ServiceReport, NewSurveyDetail, NextNewSurveyDetail, EditSurveyDetail, NextEditSurveyDetail, EditReporting } from '../Screens';
import CustomTab from './CustomTab';
import { DashBoardactive, DashBoardInActive, Homeactive, HomeInActive, Jobsactive, JobsInActive, ScanInActive, Settingsactive, SettingsInActive } from '../assets/Icons';
import { useSelector, useDispatch } from 'react-redux';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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

function HomePageStack() {
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    console.log(user?.user?.role, "THIS ONE IS HOME DATA !!!!!!!");

    return (
        <>
            <Stack.Navigator
                initialRouteName={(homeData?.user?.role === 0 || homeData?.user?.role === 4) ? NavigationString.ADMIN_HOME : NavigationString.HOME_SCREEN}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                {/* <Stack.Screen name={NavigationString.ADMIN_HOME} component={AdminHome} />

                <Stack.Screen name={NavigationString.ADMIN_JOB_DETAIL} component={AdminJobDetail} /> */}

                <Stack.Screen name={NavigationString.HOME_SCREEN} component={Home} />

                <Stack.Screen name={NavigationString.NEW_ORDER} component={NewOrder} />

                <Stack.Screen name={NavigationString.NEW_REPORTING} component={NewReporting} />

                <Stack.Screen name={NavigationString.NEW_ACCIDENTAL_CLAIM} component={NewAccidentalClaim} />

                <Stack.Screen name={NavigationString.JOB_DETAIL_SCREEN} component={JobDetail} />

                <Stack.Screen name={NavigationString.ESTIMATE_MATERIAL} component={EstimateMaterial} />

                <Stack.Screen name={NavigationString.MATERIALS_SCREEN} component={Material} />

                <Stack.Screen name={NavigationString.CHECK_IN} component={CheckIn} />

                <Stack.Screen name={NavigationString.CHECK_OUT} component={CheckOut} />

                <Stack.Screen name={NavigationString.QUATATION_LIST} component={Quotations} />

                <Stack.Screen name={NavigationString.INSTALLER_IMAGES} component={InstallerImages} />

                <Stack.Screen name={NavigationString.INSTALLER_REMARKS} component={InstallerRemark} />

                <Stack.Screen name={NavigationString.CUSTOMER_IMAGES} component={CustomerImages} />

                <Stack.Screen name={NavigationString.CUSTOMER_REMARK} component={CustomerRemark} />

                <Stack.Screen name={NavigationString.QUATATION_DETAIL} component={QuotationDetail} />

                <Stack.Screen name={NavigationString.ASSIGN_JOBS} component={AssignJobs} />

                <Stack.Screen name={NavigationString.NEW_QUOTATION} component={NewQuotation} />

                <Stack.Screen name={NavigationString.SURVEYOR_TAB} component={Surveyor} />

                <Stack.Screen name={NavigationString.SURVEY_DETAIL} component={SurveyDetail} />

                <Stack.Screen name={NavigationString.NEW_SURVEY_DETAIL} component={NewSurveyDetail} />

                <Stack.Screen name={NavigationString.NEXT_NEW_SURVEY_DETAIL} component={NextNewSurveyDetail} />

                <Stack.Screen name={NavigationString.EDIT_SURVEY_DETAIL} component={EditSurveyDetail} />

                <Stack.Screen name={NavigationString.EDIT_NEXT_SURVEY_DETAIL} component={NextEditSurveyDetail} />

                <Stack.Screen name={NavigationString.APPROVE_SURVEY_DETAIL} component={ApproveSurveyDetail} />

                <Stack.Screen name={NavigationString.SERVICE_REPORT} component={ServiceReport} />

            </Stack.Navigator>
        </>
    )
}



function DashboardStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.DASHBOARD_SCREEN} component={Dashboard} />

            </Stack.Navigator>
        </>

    )
}

function SCANSTACK() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.SCAN_SCREEN} component={Scan} />

                <Stack.Screen name={NavigationString.JOBS_SCREEN} component={Jobs} />

                <Stack.Screen name={NavigationString.JOB_DETAIL_SCREEN} component={JobDetail} />

                <Stack.Screen name={NavigationString.ESTIMATE_MATERIAL} component={EstimateMaterial} />

                <Stack.Screen name={NavigationString.MATERIALS_SCREEN} component={Material} />

                <Stack.Screen name={NavigationString.CHECK_IN} component={CheckIn} />

                <Stack.Screen name={NavigationString.CHECK_OUT} component={CheckOut} />

                <Stack.Screen name={NavigationString.QUATATION_LIST} component={Quotations} />

                <Stack.Screen name={NavigationString.INSTALLER_IMAGES} component={InstallerImages} />

                <Stack.Screen name={NavigationString.INSTALLER_REMARKS} component={InstallerRemark} />

                <Stack.Screen name={NavigationString.CUSTOMER_IMAGES} component={CustomerImages} />

                <Stack.Screen name={NavigationString.CUSTOMER_REMARK} component={CustomerRemark} />

                <Stack.Screen name={NavigationString.QUATATION_DETAIL} component={QuotationDetail} />

                <Stack.Screen name={NavigationString.ASSIGN_JOBS} component={AssignJobs} />

                <Stack.Screen name={NavigationString.HOME_SCREEN} component={Home} />

                <Stack.Screen name={NavigationString.ADMIN_JOBS_SCREEN} component={AdminJobs} />

                <Stack.Screen name={NavigationString.ADMIN_JOB_DETAIL} component={AdminJobDetail} />


            </Stack.Navigator>
        </>

    )
}



function JobsStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.JOBS_SCREEN} component={Jobs} />

                <Stack.Screen name={NavigationString.JOB_DETAIL_SCREEN} component={JobDetail} />

                <Stack.Screen name={NavigationString.ESTIMATE_MATERIAL} component={EstimateMaterial} />

                <Stack.Screen name={NavigationString.MATERIALS_SCREEN} component={Material} />

                <Stack.Screen name={NavigationString.CHECK_IN} component={CheckIn} />

                <Stack.Screen name={NavigationString.CHECK_OUT} component={CheckOut} />

                <Stack.Screen name={NavigationString.QUATATION_LIST} component={Quotations} />

                <Stack.Screen name={NavigationString.INSTALLER_IMAGES} component={InstallerImages} />

                <Stack.Screen name={NavigationString.INSTALLER_REMARKS} component={InstallerRemark} />

                <Stack.Screen name={NavigationString.CUSTOMER_IMAGES} component={CustomerImages} />

                <Stack.Screen name={NavigationString.CUSTOMER_REMARK} component={CustomerRemark} />

                <Stack.Screen name={NavigationString.QUATATION_DETAIL} component={QuotationDetail} />

                <Stack.Screen name={NavigationString.ASSIGN_JOBS} component={AssignJobs} />

                <Stack.Screen name={NavigationString.SURVEY_DETAIL} component={SurveyDetail} />

                <Stack.Screen name={NavigationString.NEW_SURVEY_DETAIL} component={NewSurveyDetail} />

                <Stack.Screen name={NavigationString.NEXT_NEW_SURVEY_DETAIL} component={NextNewSurveyDetail} />

                <Stack.Screen name={NavigationString.EDIT_SURVEY_DETAIL} component={EditSurveyDetail} />

                <Stack.Screen name={NavigationString.EDIT_NEXT_SURVEY_DETAIL} component={NextEditSurveyDetail} />

                <Stack.Screen name={NavigationString.APPROVE_SURVEY_DETAIL} component={ApproveSurveyDetail} />

                <Stack.Screen name={NavigationString.SERVICE_REPORT} component={ServiceReport} />

                <Stack.Screen name={NavigationString.HOME_SCREEN} component={Home} />



            </Stack.Navigator>
        </>

    )
}


function SettingStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.SETTINGS_SCREEN} component={Settings} />

                <Stack.Screen name={NavigationString.PROFILE_SCREEN} component={Profile} />

                <Stack.Screen name={NavigationString.UPDATEPASSWORD_SCREEN} component={UpdatePass} />

                <Stack.Screen name={NavigationString.SUPPORT_SCREEN} component={Support} />

                <Stack.Screen name={NavigationString.TERMSCONDITION_SCREEN} component={TermsCondition} />

                <Stack.Screen name={NavigationString.REPORTING_ONLY} component={ReportingOnly} />

                <Stack.Screen name={NavigationString.MY_CHATS} component={MyChats} />

            </Stack.Navigator>
        </>

    )
}


//ADMIN


function AdminJobsStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.ADMIN_JOBS_SCREEN} component={AdminJobs} />

                <Stack.Screen name={NavigationString.ADMIN_JOB_DETAIL} component={AdminJobDetail} />

                <Stack.Screen name={NavigationString.ESTIMATE_MATERIAL} component={EstimateMaterial} />

                <Stack.Screen name={NavigationString.MATERIALS_SCREEN} component={Material} />

                <Stack.Screen name={NavigationString.CHECK_IN} component={CheckIn} />

                <Stack.Screen name={NavigationString.CHECK_OUT} component={CheckOut} />

                <Stack.Screen name={NavigationString.QUATATION_LIST} component={Quotations} />

                <Stack.Screen name={NavigationString.INSTALLER_IMAGES} component={InstallerImages} />

                <Stack.Screen name={NavigationString.INSTALLER_REMARKS} component={InstallerRemark} />

                <Stack.Screen name={NavigationString.CUSTOMER_IMAGES} component={CustomerImages} />

                <Stack.Screen name={NavigationString.CUSTOMER_REMARK} component={CustomerRemark} />

                <Stack.Screen name={NavigationString.QUATATION_DETAIL} component={QuotationDetail} />

                <Stack.Screen name={NavigationString.ASSIGN_JOBS} component={AssignJobs} />

                <Stack.Screen name={NavigationString.SURVEY_DETAIL} component={SurveyDetail} />

                <Stack.Screen name={NavigationString.NEW_SURVEY_DETAIL} component={NewSurveyDetail} />

                <Stack.Screen name={NavigationString.NEXT_NEW_SURVEY_DETAIL} component={NextNewSurveyDetail} />

                <Stack.Screen name={NavigationString.APPROVE_SURVEY_DETAIL} component={ApproveSurveyDetail} />

                <Stack.Screen name={NavigationString.SERVICE_REPORT} component={ServiceReport} />



            </Stack.Navigator>
        </>

    )
}


function AdminHomeStack() {

    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: config,
                        close: closeConfig,
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name={NavigationString.ADMIN_HOME_SCREEN} component={AdminHome} />

                <Stack.Screen name={NavigationString.ADMIN_JOB_DETAIL} component={AdminJobDetail} />

                <Stack.Screen name={NavigationString.ESTIMATE_MATERIAL} component={EstimateMaterial} />

                <Stack.Screen name={NavigationString.MATERIALS_SCREEN} component={Material} />

                <Stack.Screen name={NavigationString.CHECK_IN} component={CheckIn} />

                <Stack.Screen name={NavigationString.CHECK_OUT} component={CheckOut} />

                <Stack.Screen name={NavigationString.QUATATION_LIST} component={Quotations} />

                <Stack.Screen name={NavigationString.INSTALLER_IMAGES} component={InstallerImages} />

                <Stack.Screen name={NavigationString.INSTALLER_REMARKS} component={InstallerRemark} />

                <Stack.Screen name={NavigationString.CUSTOMER_IMAGES} component={CustomerImages} />

                <Stack.Screen name={NavigationString.CUSTOMER_REMARK} component={CustomerRemark} />

                <Stack.Screen name={NavigationString.QUATATION_DETAIL} component={QuotationDetail} />

                <Stack.Screen name={NavigationString.ASSIGN_JOBS} component={AssignJobs} />

                <Stack.Screen name={NavigationString.NEW_ORDER} component={NewOrder} />

                <Stack.Screen name={NavigationString.NEW_REPORTING} component={NewReporting} />

                <Stack.Screen name={NavigationString.EDIT_REPORTING} component={EditReporting} />

                <Stack.Screen name={NavigationString.NEW_ACCIDENTAL_CLAIM} component={NewAccidentalClaim} />

                <Stack.Screen name={NavigationString.NEW_QUOTATION} component={NewQuotation} />

                <Stack.Screen name={NavigationString.SURVEYOR_TAB} component={Surveyor} />

                <Stack.Screen name={NavigationString.NEW_SURVEYOR} component={NewSurveyor} />

                <Stack.Screen name={NavigationString.NEW_INSAURANCE} component={NewInsuranceCompany} />

                <Stack.Screen name={NavigationString.SERVICE_REPORT} component={ServiceReport} />


            </Stack.Navigator>
        </>

    )
}



const TabRoutes = () => {
    const { homeData } = useSelector(state => state.homeDetails);
    const { user } = useSelector(state => state.userDetails);

    console.log("")
    const tabBarOptions = (icon, activeIcon, navigation) => {
        const isFocused = navigation?.isFocused();
        return ({
            unmountOnBlur: true,
            tabBarIcon: () => !isFocused ? activeIcon : icon
        })
    }


    return (
        (user?.user?.role === 0 || user?.user?.role === 4) ?
            <Tab.Navigator tabBar={props => <CustomTab    {...props} />} screenOptions={{ headerShown: false, }}  >
                <Tab.Screen name={NavigationString.HOME_STACK} component={AdminHomeStack} options={({ navigation }) => tabBarOptions(<Homeactive />, <HomeInActive />, navigation)} />
                <Tab.Screen name={NavigationString.DASHBOARD_STACK} component={DashboardStack} options={({ navigation }) => tabBarOptions(<DashBoardactive />, <DashBoardInActive />, navigation)} />
                <Tab.Screen name={NavigationString.SCAN_STACK} component={SCANSTACK} options={({ navigation }) => tabBarOptions(<ScanInActive />, <ScanInActive />, navigation)} />
                <Tab.Screen name={NavigationString.ADMIN_JOBS_STACK} component={AdminJobsStack} options={({ navigation }) => tabBarOptions(<Jobsactive />, <JobsInActive />, navigation)} />
                <Tab.Screen name={NavigationString.SETTINGS_STACK} component={SettingStack} options={({ navigation }) => tabBarOptions(<Settingsactive />, <SettingsInActive />, navigation)} />
            </Tab.Navigator>
            :
            <Tab.Navigator tabBar={props => <CustomTab    {...props} />} screenOptions={{ headerShown: false, }}  >
                <Tab.Screen name={NavigationString.HOME_STACK} component={HomePageStack} options={({ navigation }) => tabBarOptions(<Homeactive />, <HomeInActive />, navigation)} />
                <Tab.Screen name={NavigationString.DASHBOARD_STACK} component={DashboardStack} options={({ navigation }) => tabBarOptions(<DashBoardactive />, <DashBoardInActive />, navigation)} />
                <Tab.Screen name={NavigationString.SCAN_STACK} component={SCANSTACK} options={({ navigation }) => tabBarOptions(<ScanInActive />, <ScanInActive />, navigation)} />
                <Tab.Screen name={NavigationString.JOBS_STACK} component={JobsStack} options={({ navigation }) => tabBarOptions(<Jobsactive />, <JobsInActive />, navigation)} />
                {/* <Tab.Screen name={NavigationString.SETTINGS_STACK} component={SettingStack} options={({ navigation }) => tabBarOptions(<Settingsactive />, <SettingsInActive />, navigation)} /> */}
                <Tab.Screen name={NavigationString.SETTINGS_STACK} component={SettingStack} options={({ navigation }) => tabBarOptions(<IonIcon name='ios-arrow-back-circle-outline' size={24} color="#155B9F" />, <IonIcon name='ios-arrow-back-circle-outline' size={24} color="#505050" />, navigation)} />
            </Tab.Navigator>

    )
}

export default TabRoutes



const styles = StyleSheet.create({
    QRScannerWrapper: {
        bottom: '90%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    QRView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '30%',
        height: '180%',
        backgroundColor: '#AE282E',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 150,
    },
    QRText: {
        fontSize: 14,
        color: '#fff',
    },

});
