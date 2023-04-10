import axios from "axios";
import { API_KEY, AuthToken, BASE_URL} from "../../../assects/strings";


export const API = async (method, endpoint, data, token) => {
    return axios({
        method: method,
        url: `${BASE_URL}/${endpoint}`,
        data: data ? data : undefined,
        headers: {
            Authorization: 'Bearer ' + await AuthToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((res) => { return res })
        .catch((err) => { throw err });
}

export const APIFORMDATA = async (method, endpoint, data, token) => {
    return axios({
        method: method,
        url: `${BASE_URL}/${endpoint}`,
        data: data ? data : undefined,
        headers: {
            Authorization: 'Bearer ' + await AuthToken(),
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
        }
    })
        .then((res) => { return res })
        .catch((err) => { throw err });
}



// all Api call here 
//Admin User
export const AdminHomeAPI = (data) => API('POST', 'all-orders', data).then((res) => { return res }).catch((err) => { return err });

export const AdminGetOrderDetailAPI = (data) => API('POST', 'get-order-single', data).then((res) => { return res }).catch((err) => { return err });

export const AllOrdersAPI = (data) => API('POST', 'all-orders', data).then((res) => { return res }).catch((err) => { return err });


//Other User
export const HomeJobData = (data) => API('POST', 'app/home-page', data).then((res) => { return res }).catch((err) => { return err });

export const FetchDashboardAPI = (data) => API('POST', 'app/dashboard', data).then((res) => { return res }).catch((err) => { return err });

export const UpComingAPI = (data) => API('POST', 'app/upcoming-jobs', data).then((res) => { return res }).catch((err) => { return err });

export const WorkInProgressAPI = (data) => API('POST', 'app/work-in-progress-jobs', data).then((res) => { return res }).catch((err) => { return err });

export const OverDueAPI = (data) => API('POST', 'app/overdue-jobs', data).then((res) => { return res }).catch((err) => { return err });

export const GetCompletedJobsAPI = (data) => API('POST', 'app/completed-jobs', data).then((res) => { return res }).catch((err) => { return err });

export const CompletedJobsAPI = (data) => API('POST', 'complete-job', data).then((res) => { return res }).catch((err) => { return err });

export const JobDetailAPI = (data) => API('POST', 'app/get-job-detail', data).then((res) => { return res }).catch((err) => { return err });

export const UpdateProfileAPI = (data) => API('POST', 'app/update-profile', data).then((res) => { return res }).catch((err) => { return err });

export const GenerateJobCardAPI = (data) => API('POST', 'generate-job-card', data).then((res) => { return res }).catch((err) => { return err });

export const UpdatePasswordAPI = (data) => API('POST', 'app/update-password', data).then((res) => { return res }).catch((err) => { return err });

export const FetchEstimateMaterailAPI = (data) => API('POST', 'app/get-estimate-materials', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteEstimateAPI = (data) => API('POST', 'app/delete-estimate-material', data).then((res) => { return res }).catch((err) => { return err });

export const AddNewEstimateAPI = (data) => API('POST', 'app/add-estimate-material', data).then((res) => { return res }).catch((err) => { return err });

export const UpdateNewEstimateAPI = (data) => API('POST', 'app/update-estimate-material', data).then((res) => { return res }).catch((err) => { return err });

export const FetchQuotationListAPI = (data) => API('POST', 'app/get-customer-quotes', data).then((res) => { return res }).catch((err) => { return err });

export const NewQuotationAPI = (data) => API('POST', 'app/new-customer-quote', data).then((res) => { return res }).catch((err) => { return err });

export const PDF_Link = (data) => API('POST', 'generate-customer-quotation', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteCustomerQuoteAPI = (data) => API('POST', 'app/delete-customer-quote', data).then((res) => { return res }).catch((err) => { return err });

export const UploadDocumnetAPI = (data) => APIFORMDATA('POST', 'hrms/upload-leave-documents', data).then((res) => { return res }).catch((err) => { return err });

export const AcceptQuotationAPI = (data) => API('POST', 'accept-customer-quote', data).then((res) => { return res }).catch((err) => { return err });

export const FetchSingleQuoteAPI = (data) => API('POST', 'app/get-customer-quote-single', data).then((res) => { return res }).catch((err) => { return err });

export const UpdateQuoteAPI = (data) => API('POST', 'app/update-customer-quote', data).then((res) => { return res }).catch((err) => { return err });

export const FetchInstallerImagesAPI = (data) => API('POST', 'app/get-installer-images', data).then((res) => { return res }).catch((err) => { return err });

export const UploadOrderAPI = (data) => APIFORMDATA('POST', 'app/upload-order-images-mobile', data).then((res) => { return res }).catch((err) => { return err });

export const SaveInstallerImagesAPI = (data) => API('POST', 'app/save-installer-images', data).then((res) => { return res }).catch((err) => { return err });

export const GetInstallerRemarkAPI = (data) => API('POST', 'app/get-installer-remarks', data).then((res) => { return res }).catch((err) => { return err });

export const SaveInstallerRemarkAPI = (data) => API('POST', 'app/save-installer-remarks', data).then((res) => { return res }).catch((err) => { return err });

export const FetchCustomerImagesAPI = (data) => API('POST', 'app/get-customer-images', data).then((res) => { return res }).catch((err) => { return err });

export const GetCustomerRemark = (data) => API('POST', 'app/get-customer-remarks', data).then((res) => { return res }).catch((err) => { return err });

export const GetMaterialAPI = (data) => API('POST', 'app/get-materials', data).then((res) => { return res }).catch((err) => { return err });

export const MarkMaterailCollectedAPI = (data) => API('POST', 'app/mark-material-as-collected', data).then((res) => { return res }).catch((err) => { return err });

export const MarkMaterailReturnAPI = (data) => API('POST', 'app/return-collected-material', data).then((res) => { return res }).catch((err) => { return err });

export const CheckInFetchDataAPI = (data) => API('POST', 'app/get-check-in-materials', data).then((res) => { return res }).catch((err) => { return err });

export const CheckInDataStore = (data) => API('POST', 'app/save-check-in-materials', data).then((res) => { return res }).catch((err) => { return err });

export const UploadOrderImagesAPI = (data) => APIFORMDATA('POST', 'app/upload-order-images-mobile', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteImageAPI = (data) => API('POST', 'app/delete-order-images-mobile', data).then((res) => { return res }).catch((err) => { return err });

export const FetchSuperVisorAPI = (data) => API('POST', 'get-supervisors', data).then((res) => { return res }).catch((err) => { return err });

export const FetchCheckoutAPI = (data) => API('POST', 'app/get-check-out-materials', data).then((res) => { return res }).catch((err) => { return err });

export const SaveCheckOutDataAPI = (data) => API('POST', 'app/save-check-out-materials', data).then((res) => { return res }).catch((err) => { return err });

export const TimeLineAPI = (data) => API('POST', 'app/order-timeline', data).then((res) => { return res }).catch((err) => { return err });

export const FetchMechanicAPI = (data) => API('POST', 'get-mechanics', data).then((res) => { return res }).catch((err) => { return err });

export const FetchQCAPI = (data) => API('POST', 'get-qcs', data).then((res) => { return res }).catch((err) => { return err });

export const FetchWasherAPI = (data) => API('POST', 'get-washers', data).then((res) => { return res }).catch((err) => { return err });

export const AssignJobsAPI = (data) => API('POST', 'assign-job', data).then((res) => { return res }).catch((err) => { return err });

export const ReAssignJobsAPI = (data) => API('POST', 're-assign-mechanic', data).then((res) => { return res }).catch((err) => { return err });

export const AssignSecondaryMechanicAPI = (data) => API('POST', 'assign-secondary-job', data).then((res) => { return res }).catch((err) => { return err });

export const CloseJobsAPI = (data) => API('POST', 'complete-job', data).then((res) => { return res }).catch((err) => { return err });

export const StartJobAPI = (data) => API('POST', 'start-job', data).then((res) => { return res }).catch((err) => { return err });

export const EndJobAPI = (data) => API('POST', 'end-job', data).then((res) => { return res }).catch((err) => { return err });

export const FetchAllCustomersAPI = (data) => API('POST', 'all-customers-for-orders', data).then((res) => { return res }).catch((err) => { return err });

export const FetchCustomerVehicleAPI = (data) => API('POST', 'customer-vehicles', data).then((res) => { return res }).catch((err) => { return err });

export const NewOrderAPI = (data) => API('POST', 'new-order', data).then((res) => { return res }).catch((err) => { return err });

export const CheckOrderExistAPI = (data) => API('POST', 'check-order-exists', data).then((res) => { return res }).catch((err) => { return err });

export const SearchAPI = (data) => API('POST', 'app/search-jobs', data).then((res) => { return res }).catch((err) => { return err });

export const QR_CODE_Api = (data) => API('POST', 'app/qrscanner', data).then((res) => { return res }).catch((err) => { return err });

export const AllSurveyorAPI = (data) => API('POST', 'all-surveyors', data).then((res) => { return res }).catch((err) => { return err });

export const AllInsuranceCompanyAPI = (data) => API('POST', 'all-insurance-companies', data).then((res) => { return res }).catch((err) => { return err });

export const NewInsuranceAPI = (data) => API('POST', 'new-insurance-company', data).then((res) => { return res }).catch((err) => { return err });

export const NewSurveyorAPI = (data) => API('POST', 'new-surveyor', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteInsuranceAPI = (data) => API('POST', 'delete-insurance-company', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteSurveyorAPI = (data) => API('POST', 'delete-surveyor', data).then((res) => { return res }).catch((err) => { return err });

export const EditInsuranceCompanyAPI = (data) => API('POST', 'update-insurance-company', data).then((res) => { return res }).catch((err) => { return err });

export const EditSurveyorAPI = (data) => API('POST', 'update-surveyor', data).then((res) => { return res }).catch((err) => { return err });

export const FetchSurveyorAPI = (data) => API('POST', 'get-surveyors-for-orders', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteSurveyReportAPI = (data) => API('POST', 'delete-surver-report', data).then((res) => { return res }).catch((err) => { return err });

export const ApproveSurveyReportAPI = (data) => API('POST', 'accept-surver-report', data).then((res) => { return res }).catch((err) => { return err });

export const FetchServiceReportAPI = (data) => API('POST', 'app/get-service-report', data).then((res) => { return res }).catch((err) => { return err });

export const SaveServiceReportAPI = (data) => API('POST', 'app/save-service-report', data).then((res) => { return res }).catch((err) => { return err });

export const NewSurveyDetailAPI = (data) => API('POST', 'new-surver-report', data).then((res) => { return res }).catch((err) => { return err });

export const EditSurveyDetailAPI = (data) => API('POST', 'update-surver-report', data).then((res) => { return res }).catch((err) => { return err });

export const DeleteReportingAPI = (data) => API('POST', 'delete-order', data).then((res) => { return res }).catch((err) => { return err });

export const UpdateReportingAPI = (data) => API('POST', 'update-order', data).then((res) => { return res }).catch((err) => { return err });

export const AssginFCMTokenAPI = (data) => API('POST', 'assign-fcm-token', data).then((res) => { return res }).catch((err) => { return err });

export const ApproveMaterialAPI = (data) => API('POST', 'save-order-materials', data).then((res) => { return res }).catch((err) => { return err });

export const NotifySuperVisorAPI = (data) => API('POST', 'send-invoice-notification', data).then((res) => { return res }).catch((err) => { return err });

export const EstimateQtyAPI = (data) => API('POST', 'check-product-quantity', data).then((res) => { return res }).catch((err) => { return err });

export const BulkMaterialAPI = (data) => API('POST', 'app/bulk-mark-materials-as-collected', data).then((res) => { return res }).catch((err) => { return err });

export const AcknowledgeAPI = (data) => API('POST', 'acknowledge-job', data).then((res) => { return res }).catch((err) => { return err });

export const RequestReworkAPI = (data) => API('POST', 'request-rework', data).then((res) => { return res }).catch((err) => { return err });

export const RequestWashingAPI = (data) => API('POST', 'request-washer', data).then((res) => { return res }).catch((err) => { return err });


// EXAMPLE OF CALLING IN PAGE
// HomeJobData(data).then((res) => {
//  }).catch(err => {  return err; });
