import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY, AuthToken, BASE_URL } from "../assects/strings";
import { setLogOut } from "../redux/actions/users";

export const API = async (method, endpoint, data, token) => {
    return axios({
        method: method,
        url: `${BASE_URL}/${endpoint}`,
        data: data ? data : undefined,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => {
           return res
        })
        .catch((error) => {
            return error
        });
}



export const API_FOR_UPLOAD = async (method, endpoint, data, token) => {
    console.log("DSKLDLSJDL", data, `${BASE_URL}/${endpoint}`)
    return axios({
        method: method,
        url: `${BASE_URL}/${endpoint}`,
        data: data ? data : undefined,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((res) => { return res })
        .catch((err) => { throw err });
}



// all Api call here 

export const login = (data) => API('POST', 'mobile-app/login', data).then((res) => { return res }).catch((err) => { return err });


export const getHomeDetails = () => API('GET', 'hrms/get-home-details').then((res) => { return res }).catch((err) => { return err });


export const generatePaySlip = (data) => API('POST', 'generatePaySlip',data).then((res) => { return res }).catch((err) => { return err });


export const getUserShiftDetails = () => API('GET', 'hrms/get-user-shift').then((res) => { return res }).catch((err) => { return err });


export const getUserCanAccess = () => API('GET', 'hrms/get-can-access').then((res) => { return res }).catch((err) => { return err });


export const userCheckIn = (data) => API('POST', "hrms/user-check-in", data).then((res) => { return res }).catch((err) => { return err });

export const userCheckOut = (data) => API('POST', "hrms/user-check-out", data).then((res) => { return res }).catch((err) => { return err });

export const getProfilePictureUrl = (data) => API_FOR_UPLOAD('POST', "upload-profile-picture", data).then((res) => { return res }).catch((err) => { return err });

export const uploadChatDocument = (data) => API_FOR_UPLOAD('POST', "chat/upload-chat-documents", data).then((res) => { return res }).catch((err) => { return err });



export const updateProfilePicture = (data) => API("POST", "update-profile-picture", data).then((res) => { return res }).catch((err) => { return err });


export const getLeavePolicy = () => API('GET', "hrms/get-leave-policy").then((res) => { return res }).catch((err) => { return err });

export const getLeaveBalanceDetails = () => API("POST", "hrms/get-leave-balance-detail").then((res) => { return res }).catch((err) => { return err });

export const getLeaveCategoryDocuments = (data) => API("POST", "hrms/get-leave-category-documents", data).then((res) => { return res }).catch((err) => { return err });

export const getLeaveCalendar = (data) => API("POST", "hrms/get-leave-calendar", data).then((res) => { return res }).catch((err) => { return err });

export const getTeamAttendance = (data) => API("POST", "hrms/get-team-attendance", data).then((res) => { return res }).catch((err) => { return err });


export const getOrganizationHoliday = () => API("GET", "hrms/get-organization-holidays").then((res) => { return res }).catch((err) => { return err });

export const uploadApplicantDocument = (data) => API_FOR_UPLOAD('POST', "hrms/upload-applicant-documents", data).then((res) => { return res }).catch((err) => { return err });


export const referJobMobile = (data) => API("POST", "hrms/refer-job-mobile", data).then((res) => { return res }).catch((err) => { return err });



export const getLeaveCategory = () => API("GET", "hrms/get-leave-categories").then((res) => { return res }).catch((err) => { return err });



export const getFileUrl = (data) => API_FOR_UPLOAD('POST', "hrms/upload-leave-documents", data).then((res) => { return res }).catch((err) => { return err });

export const getAllLeaveCategory = (data) => API('GET', "hrms/get-all-leave-categories", data).then((res) => { return res }).catch((err) => { return err });

export const applyForLeaveAPI = (data) => API('POST', "hrms/submit-new-leave-request", data).then((res) => { return res }).catch((err) => { return err });

export const TestUser = (props) => { console.log("Manih", props) }

export const AllCustomerForOrder = () => API("POST", "all-customers-for-orders").then((res) => { return res }).catch((err) => { return err });

export const CustomerVehiclesList = (data) => API("POST", "customer-vehicles", data).then((res) => { return res }).catch((err) => { return err });

export const CreateNewOrderVMO = (data) => API("POST", "new-order", data).then((res) => { return res }).catch((err) => { return err });

export const CheckVehicleOrder = (data) => API("POST", "check-order-exists", data).then((res) => { return res }).catch((err) => { return err });

export const VmoHome = (data) => API("POST", "app/home-page", data).then((res) => { return res }).catch((err) => { return err });

export const getLeaveRequest = (data) => API("POST", "hrms/get-leave-requests", data).then((res) => { return res }).catch((err) => { return err });

export const getLeaveRequestStatus = (data) => API("POST", "hrms/get-leave-request-status", data).then((res) => { return res }).catch((err) => { return err });

export const cancelLeaveRequest = (data) => API("POST", "hrms/cancel-leave-request", data).then((res) => { return res }).catch((err) => { return err });

export const getSubOrdinateRequest = () => API("GET", 'hrms/get-subordinate-requests?status=-1').then((res) => { return res }).catch((err) => { return err });

export const getApprovedRequest = () => API("GET", 'hrms/get-approved-subordinate-requests').then((res) => { return res }).catch((err) => { return err });

export const getRejectedRequest = () => API("GET", 'hrms/get-rejected-subordinate-requests').then((res) => { return res }).catch((err) => { return err });

export const getAttendanceYearWise = (data) => API("POST", "hrms/get-attendance-year-wise", data).then((res) => { return res }).catch((err) => { return err });

export const getLeaveDayCount = (data) => API('POST', "hrms/get-leave-day-count", data).then((res) => { return res }).catch((err) => { return err });

export const getAttendanceMonthWise = (data) => API("POST", "hrms/get-attendance-month-wise", data).then((res) => { return res }).catch((err) => { return err });


export const getAttendanceDateRangeWise = (data) => API("POST", "hrms/get-attendance-date-range-wise", data).then((res) => { return res }).catch((err) => { return err });

export const leaveRequestComment = (data) => API("POST", "hrms/new-leave-request-comment", data).then((res) => { return res }).catch((err) => { return err });

export const ApproveSubordinateLeaveRequest = (data) => API("POST", "hrms/approve-subordinate-leave-request", data).then((res) => { return res }).catch((err) => { return err });

export const RejectSubordinateLeaveRequest = (data) => API("POST", "hrms/reject-subordinate-leave-request", data).then((res) => { return res }).catch((err) => { return err });


export const getAllJobs = () => API("POST", "hrms/all-jobs").then((res) => { return res }).catch((err) => { return err });





export const assignFcmToken = (data) => API("POST", "assign-fcm-token", data).then((res) => { return res }).catch((err) => { return err });

export const unAssignFcmToken = (data) => API("POST", "un-assign-fcm-token", data).then((res) => { return res }).catch((err) => { return err });


export const getNotifications = (data) => API("POST", "get-notifications", data).then((res) => { return res }).catch((err) => { return err });

export const readNotification = (data) => API("POST", "read-notification", data).then((res) => { return res }).catch((err) => { return err });

export const readAllNotification = () => API("POST", "read-all-notifications").then((res) => { return res }).catch((err) => { return err });

export const sendNotification = () => API("POST", "test-notification").then((res) => { return res }).catch((err) => { return err });


//chat support
export const createOrGetChat = (data) => API("POST", "chat/create-or-get-chat",data).then((res) => { return res }).catch((err) => { return err });

export const sendMessage = (data) => API("POST", "chat/send-message",data).then((res) => { return res }).catch((err) => { return err });

export const getChatMessages = (data) => API("POST", "chat/get-chat-messages",data).then((res) => { return res }).catch((err) => { return err });

export const getAllChatMessages = (data) => API("POST", "chat/get-all-chats-for-user",data).then((res) => { return res }).catch((err) => { return err });

// set up pin
export const ForgotPasswordRequest = (data) => API("POST", "forget-password-request",data).then((res) => { return res }).catch((err) => { return err });

export const ForgotPasswordVerify = (data) => API("POST", "forget-password-verify",data).then((res) => { return res }).catch((err) => { return err });



















// Teachers'App Api 

export const getTrialDetails = (data) => API("GET", `school-trial/${data}/teacher-summary`).then((res) => { return res }).catch((err) => { return err });

export const getSingleTrialDetails = (data) => API("GET", `school-trial/${data}`).then((res) => { return res }).catch((err) => { return err });

export const addRemarkOnTrial = (endpoint,data) => API("PUT", `school-trial/${endpoint}`,data).then((res) => { return res }).catch((err) => { return err });


export const getTeachingSlots = (data) => API("GET", `school-class/${data.id}/teacher-summary?currentDate=${data.date}`).then((res) => { return res }).catch((err) => { return err });

export const updateAttendance = (id,data) => API("PUT", `school-attendance/${id}`,data).then((res) => { return res }).catch((err) => { return err });


export const getHomeworkListByClassID = (data) => API("GET", `school-homework/${data}/homework-summary`).then((res) => { return res }).catch((err) => { return err });

export const createHomeWork = (data) => API("POST", `school-homework`,data).then((res) => { return res }).catch((err) => { return err });

export const getHomeWorkDetail = (data) => API("GET", `school-homework/${data}`).then((res) => { return res }).catch((err) => { return err });

export const getSubmittedHomeworkByHomeworkId = (data) => API("GET", `school-homework/${data}/get-submission`).then((res) => { return res }).catch((err) => { return err });


export const getStudentsListByTeacherId = (data) => API("GET", `school-student?teacher=${data}`).then((res) => { return res }).catch((err) => { return err });

export const getClassListByStudentId = (data) => API("GET", `school-enrollment/?inquiry_id=${data}`).then((res) => { return res }).catch((err) => { return err });

