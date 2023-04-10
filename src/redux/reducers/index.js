import { combineReducers } from "redux";
import users from './users';
import userLocation from './userLocation';
import Job from "./Job";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import Material from "./Material";
import quotation from "./Quotataion";
import Insurance from "./Insurance";
import ServiceReport from "./ServiceReport.js";
import NewAccidental from "./NewAccidental";
import NewReporting from "./NewReporting";
import home from './home';
import Notifications from './Notifications';
import appSwitch from "./appSwitch";
import userAccess from "./userAccess";


const rootReducer = combineReducers({
    userDetails: users,
    userLocation: userLocation,
    homeDetails: home,
    JobDetails: Job,
    MateralDetail: Material,
    CheckInDetail: CheckIn,
    CheckOutDetail: CheckOut,
    quotationDetail: quotation,
    InsuranceDetail: Insurance,
    ServiceDetail: ServiceReport,
    NewAccidentalDetail: NewAccidental,
    NewReportingDetail: NewReporting,
    notificationDetail:Notifications,
    appSwitch:appSwitch,
    userAccessDetails:userAccess,

});
export default rootReducer;