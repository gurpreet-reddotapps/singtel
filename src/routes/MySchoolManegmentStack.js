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

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function TeachingSlotsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.teachingSlots} component={TeachingSlots} />
            <Stack.Screen name={routes.lessionDetails} component={LessionDetails} />
            <Stack.Screen name={routes.addHomework} component={AddHomeWork} />
            <Stack.Screen name={routes.homeworkDetails} component={HomeworkDetails} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.addHomeworkFeedback} component={AddHomeWorkFeedback} />




        </Stack.Navigator>
    )
}

function ChatStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.chatsStackSchool} component={ChatsSchoolManage} />
            <Stack.Screen name={routes.chatsMessageScreen} component={MessageScreen} />

        </Stack.Navigator>
    )
}


function StudentsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.studentsStack} component={Students} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.sortScreen} component={SortScreen} />
            <Stack.Screen name={routes.studentDetails} component={StudentDetails} />
            <Stack.Screen name={routes.ongoingLessonDetails} component={OngoingLessionDetails} />
            <Stack.Screen name={routes.examRecommendations} component={ExamRecommendations} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.examRecommendationsSuccess} component={ExamRecommendationSuccess} />
            <Stack.Screen name={routes.mockTest} component={MockTest} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.mockTestSuccess} component={MockTestSuccess} />
        </Stack.Navigator>
    )
}

function TrialsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name={routes.trialsStack} component={Trials} />
            <Stack.Screen name={routes.trialsDetails} component={TrialsDetails} />
            <Stack.Screen options={{ presentation: "transparentModal" }} name={routes.trialsRemarks} component={TrialsRemark} />

        </Stack.Navigator>
    )
}


function MySchoolManegment() {

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
            <Tab.Screen name={routes.teachingSlotsStack} options={({ navigation }) => tabBarOptions(<TeachingSlotsActiveIcon />, <TeachingSlotsInActiveIcon />, navigation, "Teaching Slot")} component={TeachingSlotsStack} />
            <Tab.Screen name={routes.chatsStackSchool} options={({ navigation }) => tabBarOptions(<MessageActiveIcon />, <MessageInActiveIcon />, navigation, "Chat")} component={ChatStack} />
            <Tab.Screen name={routes.studentsStack} options={({ navigation }) => tabBarOptions(<PeopleActiveIcon />, <PeopleInActiveIcon />, navigation, "Students")} component={StudentsStack} />
            <Tab.Screen name={routes.trialsStack} options={({ navigation }) => tabBarOptions(<BookActiveIcon />, <BookInActiveIcon />, navigation, "Trials")} component={TrialsStack} />
        </Tab.Navigator>
    )
}

export default MySchoolManegment