import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, NativeModules, Platform } from "react-native";
import { BikeActiveIcon, BikeIcon, DollarSignActiveIcon, DollarSignIcon, HomeActiveIcon, HomeIcon, IconShedualActiveIcon, IconShedualIcon, LoanActiveIcon, LoanIcon, ManageBookingActiveIcon, ManageBookingIcon, MoreBtnActiveIcon, MoreBtnIcon, RecordsActiveIcon, RecordsIcon, UserProfileActiveIcon, UserProfileIcon } from '../assects/Icons/index';
import routes from "../routes/routes";
import NavigationString from "../screens/Vmo/routes/NavigationString";
import { colors } from "./colors";
import { CalendarActiveIcon, NotificationActiveIcon, ProfileActiveIcon, TabCalendarIcon, TabHomeIcon, TabMoreIcon, TabNotificationIcon, TabProfileIcon } from "./Icons/TabIcons";
import { DashboardVmoIcon, HomeVmoIcon, SettingCircleVmoIcon, SettngsVmoIcon } from "./Icons/Vmo";

export const { width, height } = Dimensions.get("screen");
console.log(" NativeModules.RNConfig.env", NativeModules.RNConfig.env)
export const BASE_URL =  NativeModules.RNConfig.env == "prod" ? 
'https://singtel-internal.reddotapps.com.sg/api' : NativeModules.RNConfig.env == "staging" ? 'https://singtel-internal.reddotapps.com.sg/api' :'https://singtel-internal.reddotapps.com.sg/api'
console.log("BASER", BASE_URL)

export const API_KEY = "XXX-XXXX";
export const AuthToken = async () => { return await AsyncStorage.getItem("userToken") }
export const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 }
export const dummyProfilePic = "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"

export const getTabName = (tab) => {
    switch (tab) {
        case 0:
            return "Home"
        case 1:
            return "Loan"
        case 2:
            return "Bookings"
        case 3:
            return "Profile"
    }
}


export const getTabIcon = (tab) => {
    switch (tab) {
        case 0:
            return TabProfileIcon
        case 1:
            return TabCalendarIcon
        case 2:
            return TabHomeIcon
        case 3:
            return TabNotificationIcon
        case 4:
            return TabMoreIcon
    }
}

export const getActiveTabIcon = (tab) => {
    switch (tab) {
        case 0:
            return ProfileActiveIcon
        case 1:
            return CalendarActiveIcon
        case 2:
            return TabHomeIcon
        case 3:
            return NotificationActiveIcon
        case 4:
            return TabMoreIcon
    }
}



export const getTabIconVmo = (tab) => {
    switch (tab) {
        case 0:
            return HomeVmoIcon
        case 1:
            return DashboardVmoIcon
        case 2:
            return SettngsVmoIcon
        case 3:
            return SettingCircleVmoIcon

    }
}

export const getLeaveCategoryBgColors = (index) => {
    return index % 4 === 0 ? "#4776E6" : index % 4 === 1 ? "#867BF5" : index % 4 === 2 ? "#FF5B62" : "#20C5B1"



    // switch (index) {
    //     case 0:
    //         return "#4776E6"
    //     case 1:
    //         return "#867BF5"
    //     case 2:
    //         return "#FF5B62"
    //     case 3:
    //         return "#20C5B1"

    // }
}


export const getLeaveCardColor = (index) => {
    switch (index) {
        case 0:
            return colors.yellow
        case 1:
            return "#1F8B88"
        case 2:
            return colors.dardRed
    }
}



export const ScreenRoutes = []


export const routesToExcluedNavBar = [
    routes.announcements,
    routes.announcementsPage,
    routes.attendanceManegmentStack,
    routes.attendanceManegment,
    routes.leaveManegmentStack,
    routes.leaveManegment,
    routes.leaveDetails,
    routes.myRequest,
    routes.leaveApproval,
    routes.myTeamLeaves,
    routes.leaveBalance,
    routes.applyNewLeave,
    routes.uploadDocuments,
    routes.vmoStack,
    routes.dormitoryStack,
    routes.recriutmentStack,
    routes.checkIncheckout,
    routes.myAttendance,
    routes.myHistory,
    routes.utotreporting,
    routes.setUpYourPin,
    routes.cameraScreen,
    routes.VMOTABS,
    routes.checkIncheckout,
    routes.reviewmodalscreen,
    routes.checkinmodalconfirm,
    routes.lessionDetails,
    routes.addHomework,
    routes.homeworkDetails,
    routes.addHomeworkFeedback,
    routes.chatsMessageScreen,
    routes.trialsDetails,
    routes.trialsRemarks,
    routes.sortScreen,
    routes.studentDetails,
    routes.ongoingLessonDetails,
    routes.examRecommendations,
    routes.examRecommendationsSuccess,
    routes.mockTest,
    routes.mockTestSuccess,
    routes.studentLessonInquiry,
    routes.studentLessonInquiryDetails,
    routes.childrenProfile,
    routes.switchLearner,
    routes.studentPrivacyPolicy,
    routes.studentTermsPolicy,
    routes.studentInquiryFor,
    routes.studentInquiryDetails,
    routes.studentInquirySent,
    routes.studentExams,
    routes.studentExamsDetails,






















    routes.schoolManagmentStack,
    NavigationString.JOB_DETAIL_SCREEN,
    NavigationString.ADMIN_JOB_DETAIL,
    NavigationString.ESTIMATE_MATERIAL,
    NavigationString.MATERIALS_SCREEN,
    NavigationString.CHECK_IN,
    NavigationString.CHECK_OUT,
    NavigationString.QUATATION_LIST,
    NavigationString.INSTALLER_IMAGES,
    NavigationString.INSTALLER_REMARKS,
    NavigationString.CUSTOMER_IMAGES,
    NavigationString.CUSTOMER_REMARK,
    NavigationString.QUATATION_DETAIL,
    NavigationString.ASSIGN_JOBS,
    NavigationString.NEW_QUOTATION,
    NavigationString.SURVEYOR_TAB,
    NavigationString.SURVEY_DETAIL,
    NavigationString.NEW_SURVEY_DETAIL,
    NavigationString.NEXT_NEW_SURVEY_DETAIL,
    NavigationString.EDIT_SURVEY_DETAIL,
    NavigationString.EDIT_NEXT_SURVEY_DETAIL,
    NavigationString.APPROVE_SURVEY_DETAIL,
    NavigationString.SERVICE_REPORT,



]

export const iosOpacity = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1
}