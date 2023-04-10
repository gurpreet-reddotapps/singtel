import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../assects/colors';
import fonts from '../assects/fonts';
import { DrawerLogoutIcon } from '../assects/Icons/DrawerIcons';
import { CalendarActiveIcon, NotificationActiveIcon, ProfileActiveIcon, TabCalendarIcon, TabHomeIcon, TabNotificationIcon, TabProfileIcon } from '../assects/Icons/TabIcons';
import { width } from '../assects/strings';
import Announcements from '../screens/Announcements';
import AnnouncementsPage from '../screens/Announcements/AnnouncementsPage';
import AttendanceManegment from '../screens/AttendanceManegment';
import MyAttendance from '../screens/AttendanceManegment/myAttendance';
import MyHistory from '../screens/AttendanceManegment/myHistory';
import UtOtAbsentReporting from '../screens/AttendanceManegment/utotAbsentReporting';
import ChatSupport from '../screens/ChatSupport';
import ChatList from '../screens/ChatSupport/ChatList';
import CheckInCheckOut from '../screens/CheckInCheckOut';
import CheckInConfirmModalScreen from '../screens/CheckInCheckOut/CheckInConfirmModalScreen';
import ReviewModalScreen from '../screens/CheckInCheckOut/ReviewModalScreen';
import ApplyForServices from '../screens/Dormitory/applyForServices';
import CheckListIn from '../screens/Dormitory/checkListIn';
import CheckListOut from '../screens/Dormitory/checkListOut';
import CheckoutFeedback from '../screens/Dormitory/checkoutFeedback';
import Contract from '../screens/Dormitory/contract';
import Dashboard from '../screens/Dormitory/dashboard';
import Directory from '../screens/Dormitory/directory';
import ServicesDetails from '../screens/Dormitory/serviceDetails';
import Services from '../screens/Dormitory/services';
import HomePage from '../screens/Homepage';
import SetUpYourPinScreen from '../screens/Homepage/SetUpYourPin';
import LeaveManegment from '../screens/LeaveManegment';
import ApplyNewLeave from '../screens/LeaveManegment/applyNewLeave';
import LeaveApproval from '../screens/LeaveManegment/leaveApproval';
import LeaveBalance from '../screens/LeaveManegment/leaveBalance';
import LeaveDetails from '../screens/LeaveManegment/leaveDetails';
import MyRequests from '../screens/LeaveManegment/myRequest';
import UploadDocuments from '../screens/LeaveManegment/uploadDocuments';
import Notifications from '../screens/Notifications';
import Recruitment from '../screens/Recruitment';
import JobDetails from '../screens/Recruitment/jobDetails';
import ReferJob from '../screens/Recruitment/referJob';
import Settings from '../screens/Settings';
import NavigationString from '../screens/Vmo/routes/NavigationString';
import TabRoutes from '../screens/Vmo/routes/TabRoutes.';
import { AdminJobDetail, ApproveSurveyDetail, AssignJobs, CheckIn, CheckOut, CustomerImages, CustomerRemark, EditSurveyDetail, EstimateMaterial, InstallerImages, InstallerRemark, JobDetail, Material, NewQuotation, NewSurveyDetail, NextEditSurveyDetail, NextNewSurveyDetail, QuotationDetail, Quotations, ServiceReport, SurveyDetail, Surveyor } from '../screens/Vmo/Screens';
import CustomDrawer from './customDrawer';
import { default as route, default as routes } from './routes';
import CustomTabBar from './tab-bar';
import CameraScreen from '../screens/Homepage/FaceCamera';
import Test from '../screens/Homepage/Test';

import RecognitationFailed from '../screens/Homepage/RecognitationFailed';
import MySchoolManegment from './MySchoolManegmentStack';
import StudentManegmentStack from './StudentManegmentStack';
import MyTeamLeaves from '../screens/LeaveManegment/myTeamLeavs';
import WebViewScreen from '../screens/Homepage/WebView';
import TrainingWebview from '../screens/Training/TrainingWebview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const tabBarOptions = (icon, activeIcon, navigation) => {
    const isFocused = navigation?.isFocused();
    return ({
        unmountOnBlur: true,
        tabBarIcon: () => !isFocused ? activeIcon : icon
    })
}






function VmoStack() {

    return (
        <View style={{ flex: 1 }} >
            <StatusBar showHideTransition='fade' backgroundColor={"#155B9F"} barStyle="light-content" />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            >
                <Stack.Screen name={routes.VMOTABS} component={TabRoutes} />
            </Stack.Navigator>
        </View>
    )

}



function AttendanceManegmentStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={route.attendanceManegment} component={AttendanceManegment} />
            <Stack.Screen name={route.myAttendance} component={MyAttendance} />
            <Stack.Screen name={route.myHistory} component={MyHistory} />
            <Stack.Screen name={route.utotreporting} component={UtOtAbsentReporting} />



            {/* <Stack.Screen options={{ presentation: "transparentModal" }} name={route.checkIncheckout} component={CheckInCheckOut} /> */}
        </Stack.Navigator>
    )
}

function DormitoryStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.dormitory} component={Dashboard} />
            <Stack.Screen name={routes.checklistIn} component={CheckListIn} />
            <Stack.Screen name={routes.checklistOut} component={CheckListOut} />
            <Stack.Screen name={routes.checkoutFeedback} component={CheckoutFeedback} />
            <Stack.Screen name={routes.contract} component={Contract} />
            <Stack.Screen name={routes.services} component={Services} />
            <Stack.Screen name={routes.servicesDetails} component={ServicesDetails} />
            <Stack.Screen name={routes.applyForService} component={ApplyForServices} />
            <Stack.Screen name={routes.directory} component={Directory} />
        </Stack.Navigator>
    )
}


function RecriutmentStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.recriutment} component={Recruitment} />
            <Stack.Screen name={routes.jobDetails} component={JobDetails} />
            <Stack.Screen name={routes.referJob} component={ReferJob} />


        </Stack.Navigator>
    )
}


function HomePageStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.home} component={HomePage} />
            <Stack.Screen name={routes.announcements} component={Announcements} />
            <Stack.Screen name={routes.announcementsPage} component={AnnouncementsPage} />
            <Stack.Screen name={routes.leaveManegmentStack} component={LeaveManegmentStack} />
            <Stack.Screen name={routes.vmoStack} component={VmoStack} />
            <Stack.Screen name={routes.myHistory} component={MyHistory} />
            <Stack.Screen name={routes.setUpYourPin} component={SetUpYourPinScreen} />
            <Stack.Screen name={routes.cameraScreen} component={CameraScreen} />

            <Tab.Screen name={route.attendanceManegmentStack} component={AttendanceManegmentStack} />


            {/* VMO SCREENS  */}
            <Stack.Screen name={NavigationString.JOB_DETAIL_SCREEN} component={JobDetail} />

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

            <Stack.Screen name={NavigationString.NEW_QUOTATION} component={NewQuotation} />

            <Stack.Screen name={NavigationString.SURVEYOR_TAB} component={Surveyor} />

            <Stack.Screen name={NavigationString.SURVEY_DETAIL} component={SurveyDetail} />

            <Stack.Screen name={NavigationString.NEW_SURVEY_DETAIL} component={NewSurveyDetail} />

            <Stack.Screen name={NavigationString.NEXT_NEW_SURVEY_DETAIL} component={NextNewSurveyDetail} />

            <Stack.Screen name={NavigationString.EDIT_SURVEY_DETAIL} component={EditSurveyDetail} />

            <Stack.Screen name={NavigationString.EDIT_NEXT_SURVEY_DETAIL} component={NextEditSurveyDetail} />

            <Stack.Screen name={NavigationString.APPROVE_SURVEY_DETAIL} component={ApproveSurveyDetail} />

            <Stack.Screen name={NavigationString.SERVICE_REPORT} component={ServiceReport} />



            <Stack.Screen name={routes.dormitoryStack} component={DormitoryStack} />
            <Stack.Screen name={routes.recriutmentStack} component={RecriutmentStack} />

            <Stack.Screen name={routes.leaveDetails} component={LeaveDetails} />

            <Stack.Screen name={routes.schoolManagmentStack} component={MySchoolManegment} />



            {/* <Stack.Screen name={routes.leaveManegmentStack} component={LeaveManegment} />
            <Stack.Screen name={routes.applyNewLeave} component={ApplyNewLeave} />
            <Stack.Screen name={routes.uploadDocuments} component={UploadDocuments} />
            <Stack.Screen name={routes.myRequest} component={MyRequests} />
            <Stack.Screen name={routes.leaveDetails} component={LeaveDetails} /> */}

            <Stack.Screen name={routes.webviewScreen} component={WebViewScreen} />
            <Stack.Screen name={routes.trainingWebviewScreen} component={TrainingWebview} />


        </Stack.Navigator>
    )
}

function LeaveManegmentStack() {
    return (
        <Stack.Navigator initialRouteName={routes.home} screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.leaveManegment} component={LeaveManegment} />
            <Stack.Screen name={routes.applyNewLeave} component={ApplyNewLeave} />
            <Stack.Screen name={routes.uploadDocuments} component={UploadDocuments} />
            <Stack.Screen name={routes.myRequest} component={MyRequests} />
            <Stack.Screen name={routes.leaveDetails} component={LeaveDetails} />
            <Stack.Screen name={routes.leaveBalance} component={LeaveBalance} />
            <Stack.Screen name={routes.leaveApproval} component={LeaveApproval} />
            <Stack.Screen name={routes.myTeamLeaves} component={MyTeamLeaves} />

        </Stack.Navigator>
    )
}

function CheckInCheckOutStack() {
    return (
        <Stack.Navigator initialRouteName={routes.checkIncheckout} screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.checkIncheckout} component={CheckInCheckOut} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.reviewmodalscreen} component={ReviewModalScreen} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.checkinmodalconfirm} component={CheckInConfirmModalScreen} />
            <Stack.Screen name={routes.cameraScreen} component={CameraScreen} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.recognitationFailed} component={RecognitationFailed} />
        </Stack.Navigator>
    )
}

function NotificationsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.notfication} component={Notifications} />
            <Stack.Screen name={routes.announcementsPage} component={AnnouncementsPage} />
            <Stack.Screen name={routes.leaveDetails} component={LeaveDetails} />

        </Stack.Navigator>
    )
}

function RenderNotificationActiveIcon({ bedgeNumber }) {
    return (
        <View style={{ width: width / 15, height: width / 15, bottom: 15 }} >
            <View style={{ width: width / 25, height: width / 25, alignItems: "center", justifyContent: "center", backgroundColor: bedgeNumber != 0 ? colors.primaryColor : null, borderRadius: 100, alignSelf: "flex-end", top: 12, left: 4 }} >
                <Text style={{ color: colors.white, fontSize: 10 }} >{bedgeNumber}</Text>
            </View>
            <NotificationActiveIcon />
        </View>
    )
}

function RenderTabNotificationIcon({ bedgeNumber }) {
    return (
        <View style={{ width: width / 15, height: width / 15, bottom: 15 }} >
            <View style={{ width: width / 25, height: width / 25, alignItems: "center", justifyContent: "center", backgroundColor: bedgeNumber != 0 ? colors.primaryColor : null, borderRadius: 100, alignSelf: "flex-end", top: 12, left: 4 }} >
                {bedgeNumber != 0 ? <Text style={{ color: colors.white, fontSize: 10 }} >{bedgeNumber}</Text> : null}
            </View>
            <TabNotificationIcon />
        </View>
    )
}

function TabNavigatorStack() {
    const { notification } = useSelector(state => state.notificationDetail);
    const bedgeNumber = notification?.filter((data) => data.read == false)?.length
    return (
        <Tab.Navigator initialRouteName={routes.profile} tabBar={props => <CustomTabBar    {...props} />} screenOptions={{ headerShown: false, }}  >
            <Tab.Screen name={route.profile} options={({ navigation }) => tabBarOptions(<ProfileActiveIcon />, <TabProfileIcon />, navigation)} component={HomePageStack} />
            <Tab.Screen name={route.leaveManegmentStack} options={({ navigation }) => tabBarOptions(<CalendarActiveIcon />, <TabCalendarIcon />, navigation)} component={LeaveManegmentStack} />
            <Tab.Screen name={route.checkIncheckout} options={({ navigation }) => tabBarOptions(<TabHomeIcon />, <TabHomeIcon />, navigation)} component={CheckInCheckOutStack} />
            <Tab.Screen name={route.notficationStack} options={({ navigation }) => tabBarOptions(<RenderNotificationActiveIcon bedgeNumber={bedgeNumber} />, <RenderTabNotificationIcon bedgeNumber={bedgeNumber} />, navigation)} component={NotificationsStack} />
            <Tab.Screen name={route.more} options={({ navigation }) => tabBarOptions(<DrawerLogoutIcon />, <DrawerLogoutIcon />, navigation)} component={Settings} />
        </Tab.Navigator>
    )
}



const sideMenuDisabledScreens = [routes.profile, routes.VMOTABS, routes.attendanceManegmentStack]

function ChatStack() {
    const { user } = useSelector(state => state.userDetails);
    const { homeData, is_checked_in } = useSelector(state => state.homeDetails);
    const { userAcessData } = useSelector(state => state.userAccessDetails);

    return (
        <Stack.Navigator initialRouteName={userAcessData?.support_system ? routes.chatList : routes.chatSupport} screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.chatList} component={ChatList} />
            <Stack.Screen name={routes.chatSupport} component={ChatSupport} />
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    const { isStudent } = useSelector(state => state.appSwitch);

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{ headerShown: false, drawerStyle: { borderTopRightRadius: 10, width: width / 1.60, borderBottomEndRadius: 10 } }} >
            <Drawer.Screen
                options={({ navigation, route }) => {
                    const routeName = getFocusedRouteNameFromRoute(route)
                    if (sideMenuDisabledScreens.includes(routeName))
                        return ({ swipeEnabled: false })
                }}
                name={route.tab}
                // component={isStudent ? StudentManegmentStack : TabNavigatorStack}
                component={TabNavigatorStack}

            />
            <Drawer.Screen name={routes.chatSupportStack} component={ChatStack} />
            <Drawer.Screen name={routes.test} component={Test} />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    activeTabTitle: { color: colors.white, fontFamily: fonts.PoppinsRegular, fontSize: 11, marginBottom: -5 }
})

export default AppNavigation;