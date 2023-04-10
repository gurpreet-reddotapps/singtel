import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BookActiveIcon, BookInActiveIcon, MessageActiveIcon, MessageInActiveIcon, PeopleActiveIcon, PeopleInActiveIcon, TeachingSlotsActiveIcon, TeachingSlotsInActiveIcon } from '../screens/MySchoolManegment/assects/icons';
import ChatsSchoolManage from '../screens/MySchoolManegment/Chats';
import MessageScreen from '../screens/MySchoolManegment/Chats/MessageScreen';
import Students from '../screens/MySchoolManegment/Students';
import TeachingSlots from '../screens/MySchoolManegment/TeachingSlots';
import AddHomeWorkFeedback from '../screens/MySchoolManegment/TeachingSlots/lessions/Homeworks/addFeedback';
import AddHomeWork from '../screens/MySchoolManegment/TeachingSlots/lessions/Homeworks/addHomework';
import HomeworkDetails from '../screens/MySchoolManegment/TeachingSlots/lessions/Homeworks/homeworkDetails';
import LessionDetails from '../screens/MySchoolManegment/TeachingSlots/lessions/lessionDetails';
import Trials from '../screens/MySchoolManegment/Trials';
import TrialsRemark from '../screens/MySchoolManegment/Trials/trialsRemark';
import TrialsDetails from '../screens/MySchoolManegment/Trials/trialsDetails';
import routes from './routes';
import CustomTabBar from "./tab-bar";
import SortScreen from '../screens/MySchoolManegment/Students/SortScreen';
import StudentDetails from '../screens/MySchoolManegment/Students/StudentDetails/studentDetails';
import OngoingDetails from '../screens/MySchoolManegment/Students/StudentDetails/OngingDetails/ongoingDetails';
import OngoingLessionDetails from '../screens/MySchoolManegment/Students/StudentDetails/OngingDetails/lessionDetails/ongoingLessonDetails';
import ExamRecommendations from '../screens/MySchoolManegment/Students/StudentDetails/EventsDetails/ExamRecommendations/ExamRecommendations';
import ExamRecommendationSuccess from '../screens/MySchoolManegment/Students/StudentDetails/EventsDetails/ExamRecommendations/ExamRecommendationSuccess';
import MockTest from '../screens/MySchoolManegment/Students/StudentDetails/EventsDetails/MockTest/MockTest';
import MockTestSuccess from '../screens/MySchoolManegment/Students/StudentDetails/EventsDetails/MockTest/MockTestSuccess';
import { View } from 'react-native';
import { HomeActiveIcon, HomeInActiveIcon, MessageQueActiveIcon, MessageQueInActiveIcon, MyCourseActiveIcon, MyCourseInActiveIcon, StarActiveIcon, StarInActiveIcon } from '../screens/StudentManagment/assects/icons';
import StudentsHome from '../screens/StudentManagment/Home/studentHome';
import Inquiry from '../screens/StudentManagment/Inquiry/Inquiry';
import LessonInquiry from '../screens/StudentManagment/Inquiry/lessonInquiry';
import LessonInquiryDetails from '../screens/StudentManagment/Inquiry/lessonInquiryDetails';
import Events from '../screens/StudentManagment/Events/events';
import ChildrenProfile from '../screens/StudentManagment/Home/childrenProfile';
import SwitchLearner from '../screens/StudentManagment/Home/switchLearners';
import StudentPrivacyPolicy from '../screens/StudentManagment/Home/privacyPolicy';
import InquiryFor from '../screens/StudentManagment/Inquiry/InquiryFor';
import InquiryDetails from '../screens/StudentManagment/Inquiry/InquiryDetails';
import InquirSentModal from '../screens/StudentManagment/Inquiry/InquirSentModal';
import MyCourse from '../screens/StudentManagment/MyCourse/myCourse';
import StudentExams from '../screens/StudentManagment/MyCourse/Exams/studentExams';
import StudentExamsDetails from '../screens/StudentManagment/MyCourse/Exams/studentExamsDetails';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
            <Stack.Screen name={routes.studentHomeStack} component={StudentsHome} />
            <Stack.Screen name={routes.childrenProfile} component={ChildrenProfile} />
            <Stack.Screen options={{presentation:"transparentModal"}} name={routes.switchLearner} component={SwitchLearner} />
            <Stack.Screen  name={routes.studentPrivacyPolicy} component={StudentPrivacyPolicy} />
            <Stack.Screen  name={routes.studentTermsPolicy} component={StudentPrivacyPolicy} />
            <Stack.Screen  options={{presentation:"transparentModal"}} name={routes.studentInquiryFor} component={InquiryFor} />
            <Stack.Screen  options={{presentation:"transparentModal"}} name={routes.studentInquiryDetails} component={InquiryDetails} />
            <Stack.Screen  options={{presentation:"transparentModal"}} name={routes.studentInquirySent} component={InquirSentModal} />

        </Stack.Navigator>
        
    )
}

function InquiryStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
            <Stack.Screen name={routes.studentInquiry} component={Inquiry} />
            <Stack.Screen name={routes.studentLessonInquiry} component={LessonInquiry} />
            <Stack.Screen name={routes.studentLessonInquiryDetails} component={LessonInquiryDetails} />

        </Stack.Navigator>
    )
}

function myCourseStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
            <Stack.Screen name={routes.studentMyCourse} component={MyCourse} />
            <Stack.Screen name={routes.studentExams} component={StudentExams} />
            <Stack.Screen name={routes.studentExamsDetails} component={StudentExamsDetails} />
        </Stack.Navigator>
    )
}



function EventsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  >
            <Stack.Screen name={routes.studentEvents} component={Events} />
        </Stack.Navigator>
    )
}




function StudentManegmentStack() {

    const tabBarOptions = (icon, activeIcon, navigation, title) => {
        const isFocused = navigation?.isFocused();
        return ({
            unmountOnBlur: true,
            tabBarIcon: () => !isFocused ? activeIcon : icon,
            title: title

        })
    }


    return (
        <Tab.Navigator tabBar={props => <CustomTabBar taskTab={true}   {...props} />} screenOptions={{ headerShown: false, }}  >
            <Tab.Screen name={routes.studentHomeStack} options={({ navigation }) => tabBarOptions(<HomeActiveIcon />, <HomeInActiveIcon />, navigation, "Home")} component={HomeStack} />
            <Tab.Screen name={routes.studentInquiryStack} options={({ navigation }) => tabBarOptions(<MessageQueActiveIcon />, <MessageQueInActiveIcon />, navigation, "Inquiry")} component={InquiryStack} />
            <Tab.Screen name={routes.studentMyCourseStack} options={({ navigation }) => tabBarOptions(<MyCourseActiveIcon />, <MyCourseInActiveIcon />, navigation, "My Courses")} component={myCourseStack} />
            <Tab.Screen name={routes.studentEventsStack} options={({ navigation }) => tabBarOptions(<StarActiveIcon />, <StarInActiveIcon />, navigation, "Events")} component={EventsStack} />
        </Tab.Navigator>
    )
}

export default StudentManegmentStack